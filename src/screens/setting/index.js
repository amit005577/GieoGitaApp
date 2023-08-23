import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderPage from '../../Components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../../App';
import {
  Logout,
  languageList
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';


const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const langList = useSelector(state => state.AppReducers.languageList);

  const [languageListData, setlanguageList] = useState([])
  const { handleUpdateLanuage, selectedLang, handleSelectedLanguage, isLoading, Translation } = useTranslation()


  const handleOnpressLanguage = data => {
    let newData = []
    handleUpdateLanuage({ langCode: data.code })

    languageListData.map((item) => {
      if (item.id == data.id) {
        newData.push({ ...item, isSelected: true })
      } else {
        newData.push({ ...item, isSelected: false })
      }
      setlanguageList(newData)
    })
    setModalVisible(false);
    handleSelectedLanguage(data)

  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(Logout(false));
    } catch (error) {
      // console.log('show error async', error);
    }
  };

  useEffect(() => {
    setlanguageList(langList)
  }, [langList])

  useEffect(() => {
    dispatch(languageList());
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />

      <View style={styles.rowContainer}>
        <View style={styles.imageConatier}>{/* <Text>image</Text> */}</View>
        <View>

        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('update');
        }}
        style={styles.onecontainer}>
        <View style={styles.textCotaier}>
          <Text style={styles.texstyle}>{Translation.my_pledge}</Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.onecontainer}>
        <View style={styles.textCotaier}>
          <Text style={styles.texstyle}>{Translation.select_language} {selectedLang.name}</Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('help')}
        style={styles.onecontainer}>
        <View style={styles.textCotaier}>
          <Text style={styles.texstyle}>{Translation.help}</Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigationRef.navigate("event")} style={styles.onecontainer}>
        <View style={styles.textCotaier}>
          <Text style={styles.texstyle}>{Translation.event_and_group}</Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </TouchableOpacity>
      <View style={styles.onecontainer}>
        <View style={styles.textCotaier}>
          <Text style={styles.texstyle}>{Translation.promotional_material}</Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={{ ...styles.onecontainer, borderBottomWidth: 0.5 }}>
        <View style={styles.textCotaier}>
          <Text
            style={{
              ...styles.texstyle,
              textDecorationLine: 'underline',
              color: 'blue',
            }}>
            {Translation.log_out}
          </Text>
        </View>
        <View style={styles.iconStylecontainer}>
          <Icon name={'right'} size={10} color={'orange'} />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>रद्द करना</Text>
            </Pressable>
            <View style={{ marginTop: 20 }}>
              <FlatList
                data={languageListData}
                keyExtractor={item => item.id}
                ListFooterComponent={() => <View style={{ height: 200 }} />}
                ListEmptyComponent={() => {
                  return (
                    <ActivityIndicator size={'small'} color={'blue'} />
                  )
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleOnpressLanguage(item)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <View>
                        <Text style={styles.modalText}>{item.name}</Text>
                      </View>
                      <FIcon
                        name="check-circle"
                        size={20}
                        color={
                          item.isSelected
                            ? 'green'
                            : 'lightgray'
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

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    height: 35,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // height: 40,
  },
  texttitle: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  onecontainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    height: 40,
    // marginTop: 10,
    // justifyContent: 'center',
  },
  textCotaier: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    left: 20,
  },
  iconStylecontainer: {
    width: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  texstyle: {
    fontSize: 18,
    color: 'black',
    // borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // marginTop: 300,
    backgroundColor: '#ffffffff',
    // borderRadius: 20,
    // padding: 35,
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // bottom: 0,
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'orange',
    alignSelf: 'center',
    right: 10,
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    // marginTop: 20,
    marginBottom: 20,
    // textAlign: 'center',
    fontSize: 22,
    color: '#434343',
  },
  eventstyle: {
    backgroundColor: '#434343',
    width: 240,
    height: 53,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

const languageData = [
  {
    id: 1,
    language: 'Hindi',
  },
  {
    id: 2,
    language: 'Englist',
  },
  {
    id: 3,
    language: 'Marathi',
  },
  {
    id: 4,
    language: 'Gujrati',
  },
  {
    id: 5,
    language: 'Telgu',
  },
  {
    id: 6,
    language: 'Bangla',
  },
  {
    id: 7,
    language: 'Odia',
  },
  {
    id: 8,
    language: 'Tamil',
  },
  {
    id: 9,
    language: 'Bangla',
  },
  {
    id: 10,
    language: 'Odia',
  },
  {
    id: 11,
    language: 'Tamil',
  },
];
