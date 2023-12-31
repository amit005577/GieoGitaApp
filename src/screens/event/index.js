import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import {
  getAllEvent,
  getEventPlace,
  getEventType,
  getMyEvent,
  targetChantData,
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import CustomModal from './components/CustomModal';

const windowWidth = Dimensions.get('window').width;
const data = [
  { name: 'All Event', value: 'All Event', id: 1 },
  { name: 'My Event', value: 'My Event', id: 2 },
];

const EventPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const allEventData = useSelector(state => state.EventReducer.allEventData);
  const eventtypeData = useSelector(state => state.EventReducer.eventTypeData);

  const eventPlaceData = useSelector(
    state => state.EventReducer.eventPlaceData,
  );
  const [EventData, setEventData] = useState([]);

  const [selectedItem, setselectedItem] = useState(data[0]?.name);
  const [showModal, setShowModal] = useState(false);
  const [eventType, seteventType] = useState(eventtypeData[0]?.name);
  const [showModalEventTyope, setShowModalEventTyope] = useState(false);

  const [placeType, setplaceType] = useState(eventPlaceData[0]?.name);
  const [showModalPlaceType, setshowModalPlaceType] = useState(false);
  const myEventData = useSelector(state => state.EventReducer.myEvent);
  const [editLoder, setEditLoder] = useState(false)
  const { Translation, isLoading, getFormatedString } = useTranslation()


  useEffect(() => {
    dispatch(targetChantData());

    dispatch(getAllEvent());
    dispatch(getEventType());
    dispatch(getEventPlace());
    dispatch(getMyEvent());
  }, []);
  const profileDetail = useSelector(state => state.AppReducers.getTargetpledge);

  useEffect(() => {
    setEventData(allEventData);
  }, [allEventData]);

  const handleModalVisible = () => {
    setShowModal(true);
  };

  const filterEvent = item => {
    let newData = allEventData?.filter(val => item === val.event_type);
    setEventData(newData);
  };

  const handleSelectedItem = item => {
    setselectedItem(item.name);
    if (item.name == 'All Event') {
      setEventData(allEventData);
    } else if ((item.name = 'My Event')) {
      setEventData(myEventData);
    }
    setShowModal(false);
  };

  const handleEventTypeFunction = item => {
    seteventType(item.name);
    filterEvent(item.name);
    setShowModalEventTyope(false);
  };
  const handlePlacetypeFunction = item => {
    setplaceType(item.name);
    filterEvent(item.name);
    let newData = allEventData?.filter(val => item.name == val.place_type);
    setEventData(newData);
    setshowModalPlaceType(false);
  };

  const handleOnpress = item => {
    navigation.navigate('details', { data: item, isCurrentUser: validateCurrentUser(item.phone, item.email) });
  };


  useEffect(() => {
    setEditLoder(true)
    if (myEventData != null && EventData != null && EventData.length > 1) {
      setTimeout(() => {
        checkEditableOrNot();
        setEditLoder(false)
      }, 1000)

    }
    setEditLoder(false)
  }, [myEventData, placeType, eventType]);

  const checkEditableOrNot = () => {
    let mergedArray = EventData?.reduce((acc, obj) => {
      let existingObj = acc.find(item => item.id === obj.id);
      if (existingObj) {
        // Merge properties of the existing object with the new object
        Object.assign(existingObj, obj);
      } else {
        // For elements from 'second' array, add 'editable' property
        if (myEventData?.some(item => item.id === obj.id)) {
          obj.editable = true;
        }
        acc.push(obj);
      }
      return acc;
    }, []);

    setEventData(mergedArray);
  };

  const handleFilter = (input) => {
    const text = input.toLowerCase()
    var filteredData = EventData.filter((item, i) => {
      if (item.event_type == null || item.event_type == undefined && item?.event_type?.includes(text)) {
        return
      }
      const event_type = item.event_type.toLowerCase()
      return event_type?.includes(text)
    })
    if (text == '') {
      setEventData(allEventData)
    } else {
      setEventData(filteredData)
    }
  }


  const validateCurrentUser = (phone, email) => {
    if (profileDetail && profileDetail?.length > 0) {
      return profileDetail[0]?.phone?.includes(phone) || profileDetail[0]?.email?.includes(email)
    } else {
      return false
    }
  }


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.iconContianer}
        onPress={() => handleOnpress(item)}
        onLongPress={() => handleOnlongPress(item)}>
        <View style={{ flex: 1 }}>
          <View style={styles.singleItem}>
            <IconV name="globe" color='#4d4c4a' size={18} />
            <Text numberOfLines={2} style={styles.textstyle}>
              {item.event_type}
            </Text>
          </View>
          <View style={styles.itemlistcontainer}>
            <View style={styles.oneItem}>
              <Icon name="calendar" color='#4d4c4a' size={15} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {moment(item?.create_at).format('DD-MMM-YYYY')}
              </Text>
            </View>
            <View style={styles.oneItem}>
              <IconE name="location" color='#4d4c4a' size={15} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {item.place_type}
              </Text>
            </View>
            <View style={{ ...styles.oneItem }}>
              <IconF name="users" color='#4d4c4a' size={15} />
              <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                {item.participants}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('form', { data: item, isCurrentUser: validateCurrentUser(item.phone, item.email) })} style={{ justifyContent: 'center', alignItems: 'center' }} >
          {
            validateCurrentUser(item.phone, item.email) ?
              <IconF name="edit" color='orange' size={25} />
              : null
          }
          <Icon name="right" color='#4d4c4a' size={25} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      {editLoder ? <ActivityIndicator size={'large'} /> : null}
      <View style={styles.container}>
        <View style={styles.firstRowStyle}>
          <Text style={styles.eventText}>{Translation.events}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('form')}
            style={styles.addGroupBtn}>
            <Text style={styles.addText}>{Translation.add_group_or_event}</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.btnContainersss}>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => handleModalVisible()}>
            <Text numberOfLines={1} style={styles.btnTextall}>
              {selectedItem ? selectedItem : Translation.all_event}
            </Text>
            <Icon name="down" color='#4d4c4a' size={10} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => setShowModalEventTyope(true)}>
            <Text maxLength={2} numberOfLines={1} style={styles.btnTextall}>
              {' '}
              {eventType ? eventType : Translation.event_type}
            </Text>
            <Icon name="down" color='#4d4c4a' size={10} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => setshowModalPlaceType(true)}>
            <Text numberOfLines={1} style={styles.btnTextall}>
              {' '}
              {placeType ? placeType : Translation.place_type}
            </Text>
            <Icon name="down" color='#4d4c4a' size={10} />
          </TouchableOpacity>
        </View>

        <CustomModal
          data={data}
          selectedItem={selectedItem}
          setselectedItem={setselectedItem}
          showModal={showModal}
          setShowModal={setShowModal}
          handleSelectedItem={handleSelectedItem}
        />
        <CustomModal
          data={eventtypeData}
          selectedItem={eventType}
          setselectedItem={seteventType}
          showModal={showModalEventTyope}
          setShowModal={setShowModalEventTyope}
          handleSelectedItem={handleEventTypeFunction}
        />
        <CustomModal
          data={eventPlaceData}
          selectedItem={placeType}
          setselectedItem={setplaceType}
          showModal={showModalPlaceType}
          setShowModal={setshowModalPlaceType}
          handleSelectedItem={handlePlacetypeFunction}
        />
        <View style={styles.textContainer}>
          <TextInput
            placeholder={Translation.find_event}
            onChangeText={handleFilter}
            autoCapitalize="none"
            clearButtonMode="always"
            autoCorrect={false}
            placeholderTextColor={'black'}
            style={{ color: '#111211', flex: 1 }}
          >
          </TextInput>
          <IconF name="search" size={25} color='gray' />
        </View>

        <Text style={styles.textShowingHeadingData}>
          {getFormatedString(Translation.shwoing_out_of_events, {
            eventCount: EventData.length,
            allEvent:  EventData.length
          })}
        </Text>
        <View style={styles.flatlistContaner}>

          <FlatList
            data={EventData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
            renderItem={renderItem}
            ListFooterComponent={() => {
              return <View style={{ height: 330 }} />;
            }}
          />
        </View>
      </View>

    </View>
  );
};

export default EventPage;

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
    color: 'black'
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
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
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
    alignItems: 'center',
    backgroundColor: '#e0e0de',
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 5
  },
  singleItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  oneItem: {
    width: windowWidth / 4,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // justifyContent:'space-around'
  },

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    height: 380,
    width: '90%',
    // alignItems: 'center',
    shadowColor: '#000',
    paddingHorizontal: 20,
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
    width: 100,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fistRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  txtItem: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  itemHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textDetails: {
    fontSize: 12,
    // fontWeight:'bold',
    color: 'black',
  },
  btn: {
    backgroundColor: 'brown',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  editIcon: {
    padding: 5,
  }
});

//   <CustomPicker
//   data={data}
//   selectedItem={selectedItem}
//   setSelectedItem={setSelectedItem}
// />
//  <CustomPicker
//   data={data}
//   selectedItem={selectedItem}
//   setSelectedItem={setSelectedItem}
// />
//  <CustomPicker
//   data={data}
//   selectedItem={selectedItem}
//   setSelectedItem={setSelectedItem}
// />
