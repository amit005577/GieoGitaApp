import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomModal from './components/CustomModal';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEvent,
  getEventPlace,
  getEventType,
  getMyEvent,
  targetChantData,
} from '../../redux/actions';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const data = [
  { name: 'All Event', value: 'item1', id: 1 },
  { name: 'My Event', value: 'item2', id: 2 },
];

const EventPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const allEventData = useSelector(state => state.EventReducer.allEventData);
  const eventtypeData = useSelector(state => state.EventReducer.eventTypeData);
  const EventLoading = useSelector(state => state.EventReducer.eventLoading);
  // console.log('show Event Loading', EventLoading);
  const eventPlaceData = useSelector(
    state => state.EventReducer.eventPlaceData,
  );
  // console.log('show allEventData type', allEventData);
  // console.log('show eventPlaceData', eventPlaceData);
  const [EventData, setEventData] = useState(null);
  // console.log('show ditagdjfsldjf', EventData);

  const [selectedItem, setselectedItem] = useState(data[0]?.name);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventType, seteventType] = useState(eventtypeData[0]?.name);
  const [showModalEventTyope, setShowModalEventTyope] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [placeType, setplaceType] = useState(eventPlaceData[0]?.name);
  const [showModalPlaceType, setshowModalPlaceType] = useState(false);
  // const [text, setText] = useState('');
  const [selectedItemFromList, setSelectedItemFromList] = useState(null);
  const myEventData = useSelector(state => state.EventReducer.myEvent);
  const [editLoder, setEditLoder] = useState(false)


  // console.log("show selected item from list obhecjdkfj=-===", selectedItemFromList)

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
    // console.log('show new Data', newData);
    setEventData(newData);
  };

  const handleSelectedItem = item => {
    setselectedItem(item.name);
    if (item.name == 'All Event') {
      setEventData(allEventData);
    } else if ((item.name = 'My Event')) {
      // alert("my event")
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
    navigation.navigate('details', item);
  };

  const handleDetailsPage = item => {
    setModalVisible(false);
    navigation.navigate('details', item);
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

  const handleOnlongPress = item => {
    setModalVisible(true);
    setSelectedItemFromList(item);
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

  // const validateUser = () => {
  //   if (profileDetail && profileDetail?.length > 0 && selectedItemFromList?.phone != null && selectedItemFromList?.phone != undefined) {
  //     return profileDetail[0]?.phone?.includes(selectedItemFromList?.phone)
  //   } else {
  //     return false
  //   }
  // }
  console.log(profileDetail);

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
      <HeaderPage />
      {editLoder && <ActivityIndicator size={'large'} />}
      <View style={styles.container}>
        <View style={styles.firstRowStyle}>
          <Text style={styles.eventText}>Events</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('form')}
            style={styles.addGroupBtn}>
            <Text style={styles.addText}>Add Group or Event</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.btnContainersss}>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => handleModalVisible()}>
            <Text numberOfLines={1} style={styles.btnTextall}>
              {selectedItem ? selectedItem : 'All Event'}
            </Text>
            <Icon name="down" color='#4d4c4a' size={10} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => setShowModalEventTyope(true)}>
            <Text maxLength={2} numberOfLines={1} style={styles.btnTextall}>
              {' '}
              {eventType ? eventType : 'Event type'}
            </Text>
            <Icon name="down" color='#4d4c4a' size={10} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eventBtn}
            onPress={() => setshowModalPlaceType(true)}>
            <Text numberOfLines={1} style={styles.btnTextall}>
              {' '}
              {placeType ? placeType : 'Place type'}
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
            placeholder="Find Event"
            onChangeText={handleFilter}
            autoCapitalize="none"
            clearButtonMode="always"
            autoCorrect={false}
            placeholderTextColor={'gray'}
            style={{ color: '#111211', flex: 1 }}
          >
          </TextInput>
          <IconF name="search" size={25} color='gray' />
        </View>

        <Text style={styles.textShowingHeadingData}>
          {"Shwoing 0 out of 0 events or groups"}
        </Text>
        <View style={styles.flatlistContaner}>
          {EventLoading ? (
            <ActivityIndicator size={'small'} color={'orange'} />
          ) : null}
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <View style={styles.fistRow}>
              <Text style={styles.itemHeading}>Event ID:{selectedItemFromList?.id}</Text>
              {validateUser() ? (
                <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('form', { data: selectedItemFromList })}>
                  <IconV name="pencil" color='#149103' size={20} />
                </TouchableOpacity>
              ) : null}

            </View>
            <Text style={styles.txtItem}>
              {selectedItemFromList?.event_type}
            </Text>
            <View>
              <Text style={styles.itemHeading}>Address:</Text>
              <View style={{ width: '60%' }}>
                <Text style={styles.textDetails}>
                  {selectedItemFromList?.address}
                </Text>
                <Text style={styles.textDetails}>{selectedItemFromList?.country_id}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleDetailsPage(selectedItemFromList)}
                style={{ ...styles.btn, width: 100 }}>
                <Text style={{ ...styles.textDetails, color: '#fff' }}>
                  Details
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={{ ...styles.itemHeading, alignSelf: 'flex-end' }}>
                  Organizer
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <IconV name="old-phone" size={20} color='gray' style={{ marginRight: 5 }} />
                  <Text style={styles.textDetails}>
                    {selectedItemFromList?.organizer}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('listpage')}
              style={{ ...styles.btn, width: 130, marginTop: 20 }}>
              <Text style={{ ...styles.textDetails, color: '#fff' }}>
                Submission List
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
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
