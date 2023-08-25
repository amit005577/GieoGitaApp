import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import { useTranslation } from '../../utills.js/translation-hook';
const windowWidth = Dimensions.get('window').width;
const MyEvent = ({ navigation }) => {
  const myEventData = useSelector(state => state.EventReducer.myEvent);
  const { Translation, isLoading } = useTranslation()

  const handleOnpress = (item) => {
    navigation.navigate('details', { data: item, isCurrentUser: true });
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.iconContianer}
        onPress={() => handleOnpress(item)}
      >
        <View style={{ width: '90%' }}>
          <View style={styles.singleItem}>
            <IconV name="globe" size={18} color={colors.black} />
            <Text numberOfLines={2} style={styles.textstyle}>
              {item.event_type}
            </Text>
          </View>
          <View style={styles.itemlistcontainer}>
            <View style={styles.oneItem} color={colors.black} >
              <Icon name="calendar" size={15} color={colors.black} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {moment(item?.create_at).format('DD-MMM-YYYY')}
              </Text>
            </View>
            <View style={styles.oneItem}>
              <IconE name="location" size={15} color={colors.black} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {item.place_type}
              </Text>
            </View>
            <View style={{ ...styles.oneItem }}>
              <IconF name="users" size={15} color={colors.black} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {item.participants}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Icon name="right" size={25} color={colors.black} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, }}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      <View style={{ paddingHorizontal: 10 }}>
        <View>
          <Text>{Translation.my_events} </Text>
        </View>
        <FlatList
          data={myEventData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default MyEvent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '100%',
  },
  firstRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addGroupBtn: {
    backgroundColor: colors.orange,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  eventText: {
    fontSize: 24,
  },
  addText: {
    color: 'white',
  },
  eventBtn: {
    // borderWidth: 1,
    width: windowWidth / 3.3,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 38,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  btnContainersss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTextall: {
    fontSize: 14,
    color: colors.black,
    width: 80,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textContainer: {
    borderWidth: 1,
    width: '75%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 42,
  },
  serchContainer: {
    borderWidth: 1,
    width: '23%',
    height: 39,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown',
  },
  searchText: {
    color: colors.white,
  },
  textShowingHeadingData: {
    marginTop: 10,
    color: colors.black,
    fontSize: 16,
  },
  flatlistContaner: {
    marginTop: 10,
    height: '100%',
    // marginBottom:500
  },
  itemcontainer: {
    // borderWidth: 1,
    height: 80,
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },
  itemlistcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'lightgrey',
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 10,
  },
  singleItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  oneItem: {
    width: windowWidth / 3.3,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // justifyContent:'space-around'
  },
  locatoionText: {
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  textHeader: {
    top: -14,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    // elevation:5,
    width: 100,
    left: 20,
  },
  textINput: {
    marginLeft: 15,
  },
  firstTextinput: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  secondList: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    height: 60,
    // justifyContent:'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal:10
  },
  haderStyle: {
    // color: 'black',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    // elevation:2
  },
  firstBlock: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  calenderStyle: {
    marginTop: 20,
    width: '47%',
  },
  calenderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: 'brown',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  saveText: {
    color: 'white',
  },
  modalView: {
    // margin: 20,
    // marginHorizontal:20,
    width: '100%',
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
    color: 'black',
  },
});
