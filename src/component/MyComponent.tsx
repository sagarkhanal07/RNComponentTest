// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import debounce from 'lodash.debounce';

import APP_COLORS from '../theme/colors';

const DEBOUNCE_RATE = 300; //in milliseconds
const PLACEHOLDER_TEXT = 'Search by movie name';

const ItemComponent = React.memo(
  ({ item, selectedItems, handleSelect, isSelected }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.itemContainer, isSelected && styles.itemSelected]}
        onPress={() => handleSelect(item)}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemStatus}>
          {selectedItems.includes(item.id) ? 'Selected' : 'Not selected'}
        </Text>
      </TouchableOpacity>
    );
  },
);

const MyComponent = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      setDataSource(
        data.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }, DEBOUNCE_RATE);
    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [searchTerm, data]);

  const handleSelect = useCallback(item => {
    setSelectedItems(currentSelectedItems =>
      currentSelectedItems.includes(item.id)
        ? currentSelectedItems.filter(id => id !== item.id)
        : [...currentSelectedItems, item.id],
    );
  }, []);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder={PLACEHOLDER_TEXT}
          placeholderTextColor={APP_COLORS.muted}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            selectedItems={selectedItems}
            isSelected={selectedItems.includes(item.id)}
            handleSelect={handleSelect}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: APP_COLORS.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  clearButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: APP_COLORS.backgroundSecondary,
    borderRadius: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: APP_COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemSelected: {
    backgroundColor: APP_COLORS.selected,
  },
  itemName: {
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10,
  },
  itemStatus: {
    fontSize: 16,
    color: 'gray',
    flexShrink: 0,
  },
});

export default MyComponent;
