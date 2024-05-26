// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MyComponentOld = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(data.filter(item => item.name.includes(searchTerm)));
    }, 1000);
  }, [searchTerm]);

  const handleSelect = item => {
    setSelectedItems(currentSelectedItems => [...currentSelectedItems, item]);
  };

  const handleClear = () => {
    inputRef.current.clear();
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
            <Text>
              {selectedItems.includes(item) ? 'Selected' : 'Not selected'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyComponentOld;
