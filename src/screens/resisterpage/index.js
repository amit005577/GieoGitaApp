import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native';
import logo from '../../../assets/images/Logo.png';

import React, {useDebugValue, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountryName, getStateName, registerMethod, targetChantData} from '../../redux/actions';
import {navigationRef} from '../../../App';
import { videoJson } from '../../Components/videoJson';
import FIcon from 'react-native-vector-icons/FontAwesome5';

const Register = ({navigation}) => {
  const [name, setname] = useState('');
  const [age, setage] = useState('');
  const [selectedGender, setGender] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModal, setCountryModal] = useState(false)
  const [city, setCity] = useState('')
  const [selected, setSelected] = useState(videoJson);
  const [stateModata, setstateModata] = useState(false)
  const [countryName, setcountryName] = useState('')
  const countryRespose = useSelector((state)=>state.AppReducers.countryNamelistData)
  const countryStateLIstData = useSelector((state)=>state.AppReducers.countryStateListData)
  const [selectedState, setselectedState] = useState(null)
  // console.log("selectedState",selectedState)
  // console.log("show country data dfksjdjf",countryRespose)
  // console.log('show single country name',countryName.id)
  let countryNameData = countryName?.name
  let stateNameData = selectedState?.name
  // console.log("show country name or state",countryNameData,stateNameData)
  const [dataset, setData] = useState([
    {
      id: 1,
      gender: 'Male',
    },
    {
      id: 2,
      gender: 'Female',
    },
  ]);
 

  useEffect(()=>{
     dispatch(getCountryName())
     dispatch(getStateName())
  },[])




  const handleGenderSElect = item => {
    // console.log('show item', item);
    // alert(item);
    setGender(item.gender);
    setModalVisible(false);
  };

  //   const [password, setpassword] = useState('');
  let data = {
    name,
    age,
    city,
    selectedGender,
    countryNameData,
    stateNameData
  };
  const dispatch = useDispatch();
  const handleOnpress = () => {
    dispatch(registerMethod(data));
    alert('Data Updated Successfully!');
    dispatch(targetChantData());

    navigationRef.goBack();
  };
 
  const handleOnpressCountry=(item)=>{
    setcountryName(item)
    setCountryModal(false)
  }

  const handlestateFuction=()=>{
    setstateModata(true)
    if(countryName){
      dispatch(getStateName(countryName.id))
    }else{
      alert("please select country")
    }
  
  }

  const handleOnpressState=(item)=>{
    alert("enter")
    // console.log("shwo itemm data state scren",item)
     setselectedState(item)
     setstateModata(false)
  }

  const handleselectState=(item)=>{
    // alert("enter")
    // console.log("shwo itemm data state scren",item)
     setselectedState(item)
     setstateModata(false)
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Image
          style={{
            width: 148,
            height: 148,
            borderRadius: 100,
            resizeMode: 'contain',
          }}
          source={logo}
        />
      </View>

      <Text style={styles.loginText}>अपने अकाउंट में लॉग इन करें</Text>
      <View>
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setname}
          placeholderTextColor={'#808080'}
          value={name}
          placeholder={'नाम दर्ज करें'}
        />
          
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setage}
          placeholderTextColor={'#808080'}
          value={age}
          placeholder={'आयु दर्ज करें'}
        />
         <TextInput
          style={styles.TextInputStyle}
          onChangeText={setCity}
          placeholderTextColor={'#808080'}
          value={city}
          placeholder={'शहर'}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            ...styles.TextInputStyle,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{color: '#808080'}}>
            {selectedGender != ''
              ? selectedGender != null
                ? selectedGender
                : 'लिंग चुनें'
              : 'लिंग चुनें'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCountryModal(true)}
          style={{
            ...styles.TextInputStyle,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{color: '#808080'}}>{countryName.name?countryName.name:'देश का नाम'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        disabled={countryName.name?false:true}
        onPress={() =>handlestateFuction()}
          style={{
            ...styles.TextInputStyle,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{color: '#808080'}}>{selectedState?.name?selectedState?.name:"राज्य"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleOnpress()}
        style={styles.touchableStyle}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 28}}>
          जमा करना
        </Text>
      </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          width: '100%',
          // justifyContent: 'center',
          alignContent: 'center',
          paddingHorizontal: 20,
          alignSelf: 'center',
          backgroundColor: '#00000088',
          flex: 1,
          justifyContent: 'center',
        }}>
        <FlatList
          data={dataset}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 320,
            //   alignItems: 'center',
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleGenderSElect(item)}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'black'}}>{item.gender}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
 
      <Modal
      animationType="slide"
      transparent={true}
      visible={countryModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setCountryModal(!countryModal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setCountryModal(!countryModal)}>
            <Text style={styles.textStyle}>रद्द करना</Text>
          </Pressable>
          <View style={{marginTop: 20}}>
            <FlatList
              data={countryRespose}
              keyExtractor={item => item.id}
              ListFooterComponent={() => <View style={{height:200}} />}
              ListEmptyComponent={()=>{
                return(
                  <ActivityIndicator size={'small'} color={'blue'} />
                )
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOnpressCountry(item)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                   
                    }}>
                    <View>
                      <Text style={styles.modalText}>{item.name}</Text>
                    </View>
                    <FIcon
                      name="check-circle"
                      size={20}
                      color={
                        item.name == countryName.name
                          ? 'green'
                          : 'orange'
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={stateModata}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setstateModata(!stateModata);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setstateModata(!stateModata)}>
            <Text style={styles.textStyle}>रद्द करना</Text>
          </Pressable>
          <View style={{marginTop: 20}}>
            <FlatList
              data={countryStateLIstData}
              keyExtractor={item => item.id}
              ListFooterComponent={() => <View style={{height:200}} />}
              ListEmptyComponent={()=>{
                return(
                  <ActivityIndicator size={'small'} color={'blue'} />
                )
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>handleselectState(item)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                   
                    }}>
                    <View>
                      <Text style={styles.modalText}>{item.name}</Text>
                    </View>
                    <FIcon
                      name="check-circle"
                      size={20}
                      color={
                        item.name == selectedState?.name
                          ? 'green'
                          : 'orange'
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 23,
    fontWeight: '400',
    alignSelf: 'center',
    color: '#944A45',
  },
  TextInputStyle: {
    height: 69,
    width: '100%',
    // margin: 12,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    color: 'black',
  },
  touchableStyle: {
    height: 69,
    width: '100%',
    // margin: 12,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    backgroundColor: '#F7941C',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // marginHorizontal:20,
    width:'100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
  },
});
