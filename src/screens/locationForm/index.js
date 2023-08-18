import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderPage from '../../Components/header';
import Icont from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import FIcon from 'react-native-vector-icons/FontAwesome5';
// import {useDispatch, useSelector} from 'react-redux';
// import {getAllEvent, getEventPlace, getEventType} from '../../redux/actions';
import moment from 'moment';
import {colors} from '../../helper/colors';
import CustomPicker from '../../Components/CustomPicker';
import {
  createEvent,
  getCountryName,
  getEventPlace,
  getStateName,
  updateLocation,
  updateMyEvent,
} from '../../redux/actions';
import {ms} from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const dataFrequency = [
  {name: '--Selectt--', value: 'item1', id: 1},
  {name: 'india', value: 'item2', id: 2},
  {name: 'usa', value: 'item1', id: 3},
  {name: 'australia', value: 'item2', id: 4},
  {name: 'england', value: 'item2', id: 5},
  {name: 'newYork', value: 'item2', id: 6},
];
const stateData = [
  {name: '--Selectt--', value: 'item1', id: 1},
  {name: 'delhi', value: 'item2', id: 2},
  {name: 'punjab', value: 'item1', id: 3},
  {name: 'bihar', value: 'item2', id: 4},
  {name: 'up', value: 'item2', id: 5},
  {name: 'mohali', value: 'item2', id: 6},
];

const LocationForm = ({route}) => {
  const eventPlacetype = useSelector(
    state => state.EventReducer.eventPlaceData,
  );

  const [name, setName] = useState('');
  const [pin, setpin] = useState(null);
  const [address, setAddress] = useState('');
  const [CountryState, setCountryState] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectIconOne, setSelectIconOne] = useState(null);
  const [selectIcontwo, setSelectIcontwo] = useState(null);
  const [countryModal, setCountryModal] = useState(false);
  const [selectedState, setselectedState] = useState(null);
  const [stateModata, setstateModata] = useState(false);
  const [placeType, setplaceType] = useState('');
  const [country, setCountry] = useState(null);
  const [cityName, setcityName] = useState('');
  const dispatch = useDispatch();
  console.log("show country id",country)
  console.log("show selected state id",selectedState)

  const [formValid, setFormValid] = useState(false);
  const [check, setCheck] = useState(false);
  // alert(selectedValue)

  // const validateForm = () => {
  //   const requiredFields = [name, pin, address, selectedValue, selectIconOne, selectedState,country,cityName];
  //   const isAnyFieldEmpty = requiredFields.some(field => field == null || field == '');
  //   setFormValid(!isAnyFieldEmpty);
  // };
  const currentEvent = useSelector(state => state.EventReducer.currentEvent);
  console.log("show current reducer",currentEvent)
  const handlefirstCheckBox = () => {
    setSelectIconOne('1');
    setSelectIcontwo('0');
  };
  useEffect(() => {
    dispatch(getCountryName());
    // dispatch(getStateName())
  }, []);
  const handleSecondCheckBox = () => {
    setSelectIcontwo('1');
    setSelectIconOne('0');
  };
  const countryStateLIstData = useSelector(
    state => state.AppReducers.countryStateListData,
  );

  useEffect(() => {
    dispatch(getEventPlace());
  }, []);

  const countryRespose = useSelector(
    state => state.AppReducers.countryNamelistData,
  );

  const handleOnpressCountry = item => {
    setCountry(item);
    setCountryModal(false);
  };

  const handlestateFuction = () => {
    setstateModata(true);
    if (country) {
      dispatch(getStateName(country.id));
    } else {
      alert('please select country');
    }
  };
  console.log('show data rout', route.params);
  let item = route.params;
  console.log('show item data inrout', item);

  let data = {
    // name: item.name,
    // publicEvent: item.publicEvent,
    // start: item.start,
    // end: item.end,
    // phone: item.phone,
    // email: item.email,
    // organizer: item.organizer,
    // event_type: item.event_type,
    // participants: item.participants,
    // personPerDay: item.personPerDay,
    // phonepublic: item.phonepublic,
    // frequency: item.frequency,
    // instraction: item.instraction,
    place_name:name,
    place_type: selectedValue,
    pincode: pin,
    CountryState: selectedState?.id,
    is_public_place: selectIconOne,
    country_id: country?.id,
    state_id:selectedState?.id,
    address: address,
    city: cityName,
    address:address,
    id:currentEvent?.id
  };

  //edited data

  let editedData = {
    // name: item.name,
    // publicEvent: item.publicEvent,
    // start: item.start,
    // end: item.end,
    // phone: item.phone,
    // email: item.email,
    // organizer: item.organizer,
    // event_type: item.event_type,
    // participants: item.participants,
    // personPerDay: item.personPerDay,
    // phonepublic: item.phonepublic,
    // frequency: item.frequency,
    // instraction: item.instraction,
    place_type: selectedValue,
    pin: pin,
    CountryState: selectedState?.name,
    public_event: selectIconOne,
    country: country?.name,
    address: address,
    city: cityName,
    // id: item.ID,
  };

  // name, pin, address, selectedValue, selectIconOne, selectedState,country,cityName
  const handleONsubmit = () => {
    setCheck(true);

    if (name == '' && name == null) {
      Alert.alert('Please Enter Place Name');
    } else if (pin == '' && pin == null) {
      Alert.alert('Please Enter Pin');
    } else if (address == '' && address == null) {
      Alert.alert('Please Enter address');
    } else if (selectedValue == null) {
      Alert.alert('Please Enter Place Type');
    } else if (country == null) {
      Alert.alert('Please select country');
    } else if (selectedState == null) {
      Alert.alert('Please select select');
    } else if (cityName == '' && cityName == null) {
      Alert.alert('Please Enter cityName');
    } else {
      // if (route?.params.Editable) {
      //   dispatch(updateMyEvent(editedData));
      // } else {
        console.log("show location data from page",data)

        dispatch(updateLocation(data));
      // }
    }
    console.log('show all form data', data);
  };


  const handleselectState = item => {
    setselectedState(item);
    setstateModata(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderPage />
      <ScrollView style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          style={styles.iconContianer}
        >
          <View style={{width: '90%'}}>
            <View style={styles.singleItem}>
              <IconV name="globe" size={18} color={"black"}/>
              <Text numberOfLines={2} style={styles.textstyle}>
                {currentEvent.event_type}
              </Text>
            </View>
            <View style={styles.itemlistcontainer}>
              <View style={styles.oneItem}>
                <Icon name="calendar" size={15} color={"black"} />
                <Text style={{...styles.textstyle, fontSize: 14}}>
                  {moment(currentEvent?.create_at).format('DD-MMM-YYYY')}
                </Text>
              </View>
              <View style={styles.oneItem}>
                <IconE name="location" size={15} color={"black"}/>
                <Text style={{...styles.textstyle, fontSize: 14}}>
                  {currentEvent.place_type}
                </Text>
              </View>
              <View style={{...styles.oneItem}}>
                <IconF name="users" size={15} color={"black"}/>
                <Text style={{...styles.textstyle, fontSize: 14}}>
                  {currentEvent.participants}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Icon name="right" size={25} />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.locatoionText}>Location</Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(93)}}>
            <Text style={styles.haderStyle}>Place Name</Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              placeholder="Please Enter Name"
              onChangeText={setName}
              value={name}
              placeholderTextColor={'black'}
              //   style={styles.textINput}
            />
          </View>
        </View>
        {check && name == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(87)}}>
            <Text style={styles.haderStyle}>Place Type</Text>
          </View>
          <View style={styles.firstTextinput}>
            <CustomPicker
              label="select value"
              data={eventPlacetype}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </View>
        </View>
        {check && selectedValue == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(148)}}>
            <Text style={styles.haderStyle}>List as public event</Text>
          </View>
          <View style={styles.secondList}>
            <TouchableOpacity
              onPress={() => handlefirstCheckBox()}
              style={styles.firstBlock}>
              <Icont
                name={
                  selectIconOne == '1' ? 'circle-slice-8' : 'circle-outline'
                }
                size={24}
                color={selectIconOne == '1' ? 'blue' : 'black'}
              />
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSecondCheckBox()}
              style={styles.firstBlock}>
              <Icont
                name={
                  selectIcontwo == '1' ? 'circle-slice-8' : 'circle-outline'
                }
                size={24}
                color={selectIcontwo == '1' ? 'blue' : 'black'}
              />
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {check && selectIconOne == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={styles.calenderContainer}>
          <TouchableOpacity
            style={styles.calenderStyle}
            // onPress={showDatePicker}
            onPress={() => setCountryModal(true)}>
            <View style={{...styles.textHeader, width: ms(64)}}>
              <Text style={styles.haderStyle}>Country</Text>
            </View>
            <View style={styles.firstTextinput}>
              <Text style={{alignSelf: 'center', fontSize: 16, color: 'black'}}>
                {country ? country.name : '--Select Country--'}
              </Text>
            </View>
            {check && country == null && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.calenderStyle}
            //   onPress={()=>setShowModal(true)}
          >
            <View style={{...styles.textHeader, width: ms(73)}}>
              <Text style={styles.haderStyle}>Pin Code</Text>
            </View>
            <View style={styles.firstTextinput}>
              <TextInput
                placeholder="Please Enter Pin"
                placeholderTextColor={'black'}
                onChangeText={setpin}
                value={pin}
                keyboardType="numeric"
                maxLength={6}
                //   style={styles.textINput}
              />
            </View>
            {check && pin == null && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(68)}}>
            <Text style={styles.haderStyle}>Address</Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              placeholder="Please Enter Address"
              onChangeText={setAddress}
              value={address}
              placeholderTextColor={'black'}
              //   style={styles.textINput}
            />
          </View>
        </View>
        {check && address == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={styles.calenderContainer}>
          <TouchableOpacity
            style={styles.calenderStyle}
            // onPress={showDatePicker}
          >
            <View style={{...styles.textHeader, width: ms(37)}}>
              <Text style={styles.haderStyle}>City</Text>
            </View>
            <View style={styles.firstTextinput}>
              <TextInput
                placeholder="Please Enter city"
                onChangeText={setcityName}
                value={cityName}
                placeholderTextColor={'black'}
                //   style={styles.textINput}
              />
            </View>
            {check && cityName == '' && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.calenderStyle}
            onPress={() => handlestateFuction()}>
            <View style={{...styles.textHeader, width: ms(47)}}>
              <Text style={styles.haderStyle}>State</Text>
            </View>
            <View style={styles.firstTextinput}>
              <Text style={{alignSelf: 'center', fontSize: 16,color:'black'}}>
                {selectedState ? selectedState.name : '--Select State--'}
              </Text>
              {/* <CustomPicker
                data={stateData}
                selectedValue={CountryState}
                setSelectedValue={setCountryState}
              /> */}
            </View>
            {check && selectedState == null && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleONsubmit()}>
          <Text style={styles.saveText}>Save and Continue</Text>
        </TouchableOpacity>
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
                  ListFooterComponent={() => <View style={{height: 200}} />}
                  ListEmptyComponent={() => {
                    return <ActivityIndicator size={'small'} color={'blue'} />;
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
                          <Text style={styles.modalText}>{item?.name}</Text>
                        </View>
                        <FIcon
                          name="check-circle"
                          size={20}
                          color={
                            item.name == country?.name ? 'green' : 'orange'
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
        {/* state modal */}
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
                  ListFooterComponent={() => <View style={{height: 200}} />}
                  ListEmptyComponent={() => {
                    return <ActivityIndicator size={'small'} color={'blue'} />;
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handleselectState(item)}
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
      </ScrollView>
    </View>
  );
};

export default LocationForm;

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
    shadowOffset: {height: 1, width: 1}, // IOS
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
  textstyle: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  oneItem: {
    width: windowWidth / 3,
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
    top: -11,
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
