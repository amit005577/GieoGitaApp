import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../helper/colors';
import HeaderPage from '../../Components/header';
import { useDispatch } from 'react-redux';
import { deleteAcount } from '../../redux/actions';

const DeleteAccount = () => {
  const [textData, setText] = useState('');
  const dispatch = useDispatch();
  const DeletMyAcount=()=>{
    if(textData=="PERMANENTDELETE"){
        // alert("delete Account")

        dispatch(deleteAcount())
        
    }else{
        alert("please enter properly")
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.orange}}>
      <HeaderPage />
      <View style={styles.container}>
        {/* <Text>{textData?textData:''}</Text> */}
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            fontSize: 25,
            color: 'red',
          }}>
          DeleteAccount
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{alignSelf: 'center'}}>
            To confirm that you want to DELETE ALL your data and
          </Text>
          <Text style={{alignSelf: 'center'}}>
            counts,please type the words:
            <Text style={{fontWeight: 'bold', fontSize: 13}}>
              "PERMANENTDELETE"
            </Text>
            in the
          </Text>
          <Text style={{alignSelf: 'center'}}>
            below and click the button below.
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 35,
            width: '80%',
            alignSelf: 'center',
            marginTop: 20,
            borderColor: colors.orange,
            borderWidth: 2,
            borderRadius: 5,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Enter text"
            onChangeText={e => setText(e)}
            value={textData}
            autoCapitalize='sentences'
            style={{marginLeft:2,height:40}}
            
          />
        </View>

        <TouchableOpacity onPress={()=>DeletMyAcount()} style={{marginTop:30,padding:10,width:"90%",alignSelf:'center',borderRadius:20,backgroundColor:"red"}}>
            <Text style={{alignSelf:'center',fontSize:16,color:'#fff',fontWeight:'bold'}}>I want to permanently Delete my Account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
