import React from 'react';
import { Text, View } from 'react-native';

const CustomeToast = () => {
  return (
    <View style={{ position: 'absolute', top: 200, alignSelf: 'center', backgroundColor: '#f2be79', padding: 10, borderRadius: 30, elevation: 5 }}>
      <Text style={{ color: '#f2faf4', fontWeight: '600', fontSize: 16 }} >{'Clipboard to copied!'} </Text>
    </View>
  );
};

export default CustomeToast;
