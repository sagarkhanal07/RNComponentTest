import React from 'react';
import { View } from 'react-native';

import MyComponent from '../component/MyComponent';
// import MyComponentOld from '../component/MyComponentOld';
import sampleData from '../sampleData.json';
import APP_COLORS from '../theme/colors';

const HomePage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.primary,
        padding: 20,
        paddingTop: 40,
      }}
    >
      <MyComponent data={sampleData} />
      {/* <MyComponentOld data={sampleData} /> */}
    </View>
  );
};

export default HomePage;
