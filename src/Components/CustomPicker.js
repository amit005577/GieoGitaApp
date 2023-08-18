import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CustomPicker = ({data, selectedValue, setSelectedValue}) => {
  return (
    <View>
      <Picker
        placeholder='select value'
        selectedValue={selectedValue}
        selectionColor={"black"}
        dropdownIconColor={"black"}
        style={{color:'black'}}
        itemStyle={{color:'black'}}
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {data?.map(item => (
          <Picker.Item key={item.id} label={item.name} value={item.id} color='#111211' />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;
