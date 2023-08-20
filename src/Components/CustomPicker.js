import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CustomPicker = ({data, selectedValue, setSelectedValue}) => {
  return (
    <View style={{backgroundColor:'white'}}>
      <Picker
        placeholder='select value'
        selectedValue={selectedValue}
        selectionColor={"black"}
        dropdownIconColor={"black"}
        backgroundColor={'white'}
        themeVariant={'light'}
        style={{color:'black',backgroundColor:'white'}}
        
        itemStyle={{  color: "blue", fontFamily:"Ebrima", fontSize:17 }}
        
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {data?.map(item => (
          <Picker.Item  key={item.id} label={item.name} value={item.id}  />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;
