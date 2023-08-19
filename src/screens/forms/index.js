import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderPage from '../../Components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomPicker from '../../Components/CustomPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {createEvent, getCountryName, getEventType, getStateName, updateMyEvent} from '../../redux/actions';
import {navigationRef} from '../../../App';
import CustomCountrySelector from '../../Components/CustomCountrySelector';
import {ms} from 'react-native-size-matters';
const dataFrequency = [
  {id: 1, name: '--Selectt--'},
  {id: 2, name: 'One Time'},
  {name: 'Daily', id: 3},
  {name: 'Weekly', id: 4},
  {name: 'Monthly', id: 5},
  {name: 'Random', id: 6},
];
const EventForm = ({route}) => {
  const [name, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [selectIconOne, setSelectIconOne] = useState(null);
  const [selectIcontwo, setSelectIcontwo] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [participant, setParticipant] = useState('');
  const [personPerDay, setPersonPerDay] = useState(null);
  const [phonepublic, setPhonepublic] = useState(null);
  const [checkboxSlect, setCheckboxSlect] = useState(null);
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [check, setCheck] = useState(false);
  const [laoder, setLaoder] = useState(false);
  const [joiningLink, setJoiningLink] = useState('');

  // if data is comming for edit

  let routeData = route?.params;
  console.log('show routeData', routeData?.data.public_event);
  // alert(selectedValue)
  const frequencyRecord=()=>{
    let response = []
  dataFrequency.map((item)=>{
    if(item.id==routeData?.data.frequency){
     response.push(item)
    }
   
  })
    return response
  }

  useEffect(() => {
    if (routeData != null) {
      setName(routeData?.data.name);
      setSelectIconOne(routeData?.data.public_event);
      setDescription(routeData?.data.content);
      setstartDate(routeData?.data.create_at);
      setEmail(routeData?.data.email);
      setEndDate(routeData?.data.end);
      setSelectedValue(routeData?.data.event_type);
      setFrequency(frequencyRecord());
      setOrganizer(routeData?.data.organizer);
      setParticipant(routeData?.data.participants);
      setNumber(routeData?.data.phone);
      setPhonepublic(routeData?.data.phone_visible);
      setSelectIconOne(routeData?.data.public_event=='Yes'?"1":"0")
      setPersonPerDay(routeData?.data.targe_chants)
      setPhonepublic(routeData?.data.phone_visible=='Yes'?"1":"0")
    }
  }, [routeData]);

  // if data is comming for edit

  const pickerRef = useRef();
  // console.log('frequencjfksljf', frequency);
  const [countryCode, setCountryCode] = useState({
    code: 'IN',
    icon: 'https://projects.cityinnovates.in/gieo_gita/public/assets/img/flags/in.png',
    id: 101,
    name: 'India',
    phone_code: 91,
  });
  const [modalVisible, setmodalVisible] = useState(false);
  // console.log('show frequency', frequency);
  // console.log('show date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  // console.log('show slected value data', selectedValue);
  const countryRespose = useSelector(
    state => state.AppReducers.countryNamelistData,
  );
  const countryStateLIstData = useSelector(
    state => state.AppReducers.countryStateListData,
  );
  // console.log('show country pade dfdsflks', countryRespose);

  useEffect(() => {
    // dispatch(getAllEvent());
    dispatch(getCountryName());
    dispatch(getStateName());
    dispatch(getEventType());
    // dispatch(getEventPlace());
  }, []);
  const eventtypeData = useSelector(state => state.EventReducer.eventTypeData);
  const newItem = {id: 0, name: 'select'};

  useEffect(() => {
    if (eventtypeData[0].name != 'select') {
      eventtypeData.unshift(newItem);
    }
  }, [eventtypeData]);

  // console.log('show event type data00000', eventtypeData);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerEnd = () => {
    setShowModal(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setstartDate(date);
    hideDatePicker();
  };
  const handleConfirmEnd = date => {
    // console.warn('A date has been picked: ', date);
    setEndDate(date);
    setShowModal(false);
  };
  const data = [
    {name: 'All Event', value: 'item1', id: 1},
    {name: 'My Event', value: 'item2', id: 2},
  ];

  const platformData = [
    {id: 1, name: '--Selectt--'},
    {id: 2, name: 'Zoom'},
    {name: 'WhatsApp', id: 3},
    {name: 'YouTube', id: 4},
    {name: 'Other', id: 5},
  ];
  const handlefirstCheckBox = () => {
    setSelectIconOne('1');
    setSelectIcontwo('0');
  };
  const handleSecondCheckBox = () => {
    setSelectIcontwo('1');
    setSelectIconOne('0');
  };
  const handlphonePublicCheckbox = () => {
    setPhonepublic('1');
    setCheckboxSlect('0');
  };
  const handlephonepublicSecondCheckbox = () => {
    setCheckboxSlect('1');
    setPhonepublic('0');
  };
  // console.log('show eventType', selectedValue);
  let formData = {
    name: name,
    event_type: selectedValue,
    frequency: frequency,
    start: startDate,
    participants: participant,
    phone_visible: phonepublic,
    personPerDay: personPerDay,
    end: endDate,
    phone: number,
    email: email,
    organizer: organizer,
    instraction: description,
    short_content: description,
    plateform:platform,
    joing_links:joiningLink,
    targe_chants:personPerDay,
    public_event:selectIconOne,
    content:description
  };

  let formDataEdit = {
    name: name,
    event_type: selectedValue,
    frequency:frequency.length>0? frequency[0].id:null,
    start: startDate,
    participants: participant,
    phone_visible: phonepublic,
    personPerDay: personPerDay,
    end: endDate,
    phone: number,
    email: email,
    organizer: organizer,
    instraction: description,
    short_content: description,
    plateform:platform,
    joing_links:joiningLink,
    targe_chants:personPerDay,
    public_event:selectIconOne,
    content:description,
    id:routeData?.data.id
  };

  const handleONsubmit = () => {
    setLaoder(true);
    setCheck(true);

    if (name.length <= 2) {
      setLaoder(false);
      Alert.alert('please Enter Event Name');
    } else if (selectIconOne == null) {
      setLaoder(false);
      Alert.alert('please list as prublic event or not');
    } else if (selectedValue == null) {
      setLaoder(false);
      Alert.alert('please envent type');
    } else if (frequency == null) {
      setLaoder(false);
      Alert.alert('please Enter frequency fileds');
    } else if (description.length <= 2) {
      setLaoder(false);
      Alert.alert('please Enter description fileds');
    } else if (participant == '') {
      setLaoder(false);
      Alert.alert('please Enter Participants fileds');
    } else if (personPerDay == null) {
      setLaoder(false);
      Alert.alert('please Enter person per day fileds');
    } else if (phonepublic == null) {
      setLaoder(false);
      Alert.alert('please tell you want to public your phone no ');
    } else if (number.length < 10) {
      setLaoder(false);
      Alert.alert('please Enter Proper number');
    } else if (email == '') {
      setLaoder(false);
      Alert.alert('please Enter email fileds');
    } else {
      setLaoder(false);
      if (routeData!=null) {
        // alert('update')
        console.log("show edit data===============>",formDataEdit)
        dispatch(updateMyEvent(formDataEdit));
        // navigationRef.navigate('formPlace');
      } else {
        // alert('create')
        dispatch(createEvent(formData));
        // navigationRef.navigate('formPlace');
      }
    }
  };

  return (
    <View style={styles.contaier}>
      <HeaderPage />
      {laoder && <ActivityIndicator size={'large'} color={'red'} />}
      <ScrollView style={styles.mainContianer}>
        <Text style={styles.goupText}>Add Group or Event</Text>
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(100)}}>
            <Text style={styles.haderStyle}>Event Name</Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              placeholder="Please Enter Name"
              onChangeText={setName}
              value={name}
                style={styles.textINput}
            />
          </View>
        </View>
        {check && name == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(156)}}>
            <Text style={styles.haderStyle}>List as public event</Text>
          </View>
          <View style={styles.secondList}>
            <TouchableOpacity
              onPress={() => handlefirstCheckBox()}
              style={styles.firstBlock}>
              <Icon
                name={
                  selectIconOne == '1' ? 'circle-slice-8' : 'circle-outline'
                }
                size={24}
                color={selectIconOne == '1' ? 'blue' : 'gray'}
              />
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSecondCheckBox()}
              style={styles.firstBlock}>
              <Icon
                name={
                  selectIcontwo == '1' ? 'circle-slice-8' : 'circle-outline'
                }
                size={24}
                color={selectIcontwo == '1' ? 'blue' : 'gray'}
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
        <View style={{marginTop: 20}}>
          <View style={styles.textHeader}>
            <Text style={styles.haderStyle}>Event Type</Text>
          </View>
          <View style={styles.firstTextinput}>
            <CustomPicker
              ref={pickerRef}
              data={eventtypeData ? eventtypeData : []}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </View>
        </View>
        {check && selectedValue == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
{
  selectedValue==7&&(
    <View style={{marginTop: 20}}>
    <View style={styles.textHeader}>
      <Text style={styles.haderStyle}>Platform</Text>
    </View>
    <View style={styles.firstTextinput}>
      <CustomPicker
        ref={pickerRef}
        data={platformData}
        selectedValue={platform}
        setSelectedValue={setPlatform}
      />
    </View>
  </View>
  )
}
{
  selectedValue==7&&(
    <View style={{marginTop: 20}}>
    <View style={{...styles.textHeader, width: ms(100)}}>
      <Text style={styles.haderStyle}>Joining link</Text>
    </View>
    <View style={styles.firstTextinput}>
      <TextInput
        placeholder="Please Enter Name"
        onChangeText={setJoiningLink}
        value={joiningLink}
          style={styles.textINput}
      />
    </View>
  </View>
  )
}




        <View style={{marginTop: 20}}>
          <View style={styles.textHeader}>
            <Text style={styles.haderStyle}>Frequency</Text>
          </View>
          <View style={styles.firstTextinput}>
            <CustomPicker
              ref={pickerRef}
              data={dataFrequency}
              selectedValue={frequency}
              setSelectedValue={setFrequency}
            />
          </View>
        </View>
        {check && frequency == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        {/* Date picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}

        />
        <DateTimePickerModal
          isVisible={showModal}
          mode="date"
          onConfirm={handleConfirmEnd}
          onCancel={hideDatePickerEnd}
        />
        <View style={styles.calenderContainer}>
          <TouchableOpacity
            style={styles.calenderStyle}
            onPress={showDatePicker}>
            <View style={{...styles.textHeader}}>
              <Text style={styles.haderStyle}>Start Date</Text>
            </View>
            <View style={styles.firstTextinput}>
              <Text style={{color:'black'}}>
                {startDate
                  ? moment(startDate).format('DD-MMM-YYYY')
                  : 'Slect start date'}
              </Text>
            </View>
            {check && startDate == null && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.calenderStyle}
            onPress={() => setShowModal(true)}>
            <View style={{...styles.textHeader, width: ms(75)}}>
              <Text style={styles.haderStyle}>End Date</Text>
            </View>
            <View style={styles.firstTextinput}>
              <Text style={{color:'black'}}>
                {' '}
                {endDate
                  ? moment(endDate).format('DD-MMM-YYYY')
                  : 'Slect end date'}
              </Text>
            </View>
            {check && startDate == null && (
              <Text style={{color: 'red', left: 10}}>field is required</Text>
            )}
          </TouchableOpacity>
          {/* { check&& endDate==null&& <Text style={{color:'red',left:10}}>field is required</Text>} */}
        </View>

        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(135)}}>
            <Text style={styles.haderStyle}>Event Description</Text>
          </View>
          <View
            style={{
              ...styles.firstTextinput,
              height: 120,
              justifyContent: null,
            }}>
            <TextInput
              onChangeText={setDescription}
              value={description}
              multiline
              placeholder='Enter description'
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        {check && description == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(220), left: 20}}>
            <Text style={{...styles.haderStyle}}>
              Expected participants per day
            </Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              onChangeText={setParticipant}
              value={participant}
              keyboardType="numeric"
              placeholder="0000"
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        {check && participant == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(200), left: 20}}>
            <Text style={styles.haderStyle}>Chants per person per day </Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              onChangeText={setPersonPerDay}
              value={personPerDay}
              keyboardType="numeric"
              placeholder="0000"
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        {check && personPerDay == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <CustomCountrySelector
          data={countryRespose}
          setModalVisible={setmodalVisible}
          modalVisible={modalVisible}
          setSelectedItem={setCountryCode}
          selectedItem={countryCode}
        />
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(120), left: 20}}>
            <Text style={styles.haderStyle}>Organizer Name</Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              placeholder="Please Enter Name"
              onChangeText={setOrganizer}
              value={organizer}
              placeholderTextColor={'black'}
              //   style={styles.textINput}
            />
          </View>
        </View>
        {check && organizer == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(125), left: 20}}>
            <Text style={styles.haderStyle}>Organizer Phone</Text>
          </View>
          <View
            style={{
              ...styles.firstTextinput,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: null,
            }}>
            <TouchableOpacity
              onPress={() => setmodalVisible(true)}
              style={{
                width: '45%',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
              }}>
              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Image
                  source={{
                    uri: countryCode.icon,
                  }}
                  height={20}
                  width={20}
                />
                <Text style={{color:'black'}}>+{countryCode.id}</Text>
                <Text style={{color:'black'}}>{countryCode.code}</Text>

                {/* <Text>Select country Code </Text> */}
              </View>
            </TouchableOpacity>
            <TextInput
            placeholder='Mobile'
              onChangeText={setNumber}
              maxLength={10}
              value={number}
              inputMode="numeric"
              style={{
                width: '55%',
                height: 60,
                borderLeftWidth: 1,
                borderColor: 'grey',
              }}
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        {check && number == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(210), left: 20}}>
            <Text style={styles.haderStyle}>Make Phone Number Public</Text>
          </View>
          <View style={styles.secondList}>
            <TouchableOpacity
              onPress={() => handlphonePublicCheckbox()}
              style={styles.firstBlock}>
              <Icon
                name={phonepublic == '1' ? 'circle-slice-8' : 'circle-outline'}
                size={24}
                color={phonepublic == '1' ? 'blue' : 'black'}
              />
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlephonepublicSecondCheckbox()}
              style={styles.firstBlock}>
              <Icon
                name={
                  checkboxSlect == '1' ? 'circle-slice-8' : 'circle-outline'
                }
                size={24}
                color={checkboxSlect == '1' ? 'blue' : 'black'}
              />
              <Text style={{marginLeft: 5, fontSize: 18, color: 'black'}}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {check && phonepublic == null && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}

        <View style={{marginTop: 20}}>
          <View style={{...styles.textHeader, width: ms(120), left: 20}}>
            <Text style={styles.haderStyle}>Organizer Email</Text>
          </View>
          <View style={styles.firstTextinput}>
            <TextInput
              placeholder="Please Enter Name"
              onChangeText={setEmail}
              value={email}
                style={styles.textINput}
            />
          </View>
        </View>
        {check && email == '' && (
          <Text style={{color: 'red', left: 10}}>field is required</Text>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => handleONsubmit()}>
          <Text style={styles.saveText}>Save and Continue</Text>
        </TouchableOpacity>
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContianer: {
    paddingHorizontal: 10,
  },
  goupText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
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
  textHeader: {
    top: -11,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    // elevation:5,
    width: ms(85),
    left: 20,
  },
  textINput: {
    // marginLeft: 15,
    color:'gray'
  },
  firstBlock: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  calenderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderStyle: {
    marginTop: 20,
    width: '45%',
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
});
