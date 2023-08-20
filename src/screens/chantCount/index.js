import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import React, {useEffect} from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';

import EIcon from 'react-native-vector-icons/Entypo';

import moment from 'moment';
import HeaderPage from '../../Components/header';
import {
  chantHistory,
  chantUpdatecount,
  getcurrentcountStatus,
  liveChants,
  targetChantData,
} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../../../App';

const ChantCount = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [todaysDate, setTodaysDate] = React.useState(moment().format('DD MMM'));
  const [number, setNumber] = React.useState(0);
  const monthlyData = useSelector(
    state => state.AppReducers.getCurrentCountData,
  );
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  const liveChantsData = useSelector(state => state.AppReducers.liveDataChants);

  useEffect(() => {
    dispatch(targetChantData());
    dispatch(chantHistory());
    dispatch(getcurrentcountStatus());
    dispatch(liveChants());
  }, []);
  const [disable, setDisable] = React.useState(true);

  const handleOnpress = () => {
    setModalVisible(true);
    setDisable(true);
    dispatch(chantUpdatecount(number));
    dispatch(chantHistory());
    dispatch(getcurrentcountStatus());
  };

  const dateIncrement = () => {
    let _newDate = moment(todaysDate, 'DD MMMM')
      .add(1, 'day')
      .format('DD MMMM');
    setTodaysDate(_newDate);
  };

  const dateDecrement = () => {
    let _newDate = moment(todaysDate, 'DD MMMM')
      .subtract(1, 'day')
      .format('DD MMMM');
    setTodaysDate(_newDate);
  };

  const NumberDecreament = () => {
    setNumber(number - 1);
    setDisable(false);
  };

  const NumberIncreament = () => {
    setNumber(number + 1);
    setDisable(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderPage />

      <ScrollView>
        <TouchableOpacity
          onPress={() => navigationRef.navigate('event')}
          style={styles.eventstyle}>
          <Text style={{color: 'white', fontSize: 21}}>घटनाएँ और समूह</Text>
        </TouchableOpacity>
        <Text style={styles.chantsTitle}>कुल मंत्र</Text>

        <View>
          <View style={styles.contContainer}>
            <Text style={styles.numberText}>
              {liveChantsData.total_app_count}
            </Text>
          </View>
        </View>
        {!datapledge ? (
          <ActivityIndicator size={'small'} color={'orange'} />
        ) : null}

        <TouchableOpacity
          style={styles.userNameContainer}
          onPress={() => navigation.navigate('register')}>
          <Text style={styles.userText}>
            {datapledge[0]?.name == null || datapledge[0]?.name == ''
              ? 'नाम'
              : datapledge[0]?.name}
          </Text>

          <Icon
            name={'caretdown'}
            size={10}
            style={{marginLeft: 10, color: 'black'}}
          />
        </TouchableOpacity>

        <View style={styles.textContainerstyle}>
          <Text style={styles.YourChantStyle}>कुल मंत्र:</Text>

          <View style={styles.btncountcontaiiner}>
            <Text style={styles.normalStyle}>
              कुल मंत्र:{monthlyData?.life_time_count}
            </Text>
          </View>

          <View style={{...styles.btncountcontaiiner, marginTop: 10}}>
            <Text style={styles.normalStyle}>
              सप्ताह की प्रगति:{monthlyData?.weekly_count}
            </Text>
          </View>

          <View style={{...styles.btncountcontaiiner, marginTop: 10}}>
            <Text style={styles.normalStyle}>
              माह की प्रगति:{monthlyData?.month_count}
            </Text>
          </View>
        </View>

        <View style={styles.monthContainer}>
          <TouchableOpacity onPress={() => dateDecrement()}>
            <FIcon
              name="arrow-left-circle"
              size={25}
              style={{...styles.iconStyle}}
            />
          </TouchableOpacity>

          <View style={styles.monthContentStyle}>
            <Text style={{fontWeight: 'bold', color: '#434343'}}>
              {todaysDate}
            </Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => dateIncrement()}>
              <FIcon
                name="arrow-right-circle"
                size={25}
                style={{...styles.iconStyle}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...styles.btncountcontaiiner,
            alignSelf: 'center',
            backgroundColor: '#EFEFEF',
          }}>
          <Text style={styles.countToday}>आज:{monthlyData?.today_count}</Text>
        </View>

        <View style={styles.countercontainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              NumberDecreament();
            }}
            disabled={number == 0}>
            <EIcon name={'minus'} size={30} style={styles.iconstyle} />
          </TouchableOpacity>

          <View>
            <View style={[styles.Bigcountercontainer]}></View>
            <View
              style={{position: 'absolute', right: 50, top: 56, width: 100}}>
              <Text style={{...styles.countTextNumber, alignSelf: 'center'}}>
                {number}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{...styles.iconContainer, borderColor: 'green'}}
            onPress={() => {
              NumberIncreament();
            }}>
            <EIcon name={'plus'} size={30} style={styles.iconstyle} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={disable}
          onPress={() => handleOnpress()}
          style={{
            ...styles.btncountcontaiiner,
            alignSelf: 'center',
            borderRadius: 10,
            height: 42,
            borderWidth: 1,
            borderColor: '#E5CE004F',
          }}>
          <Text style={[styles.textSubmit, {fontSize: 20}]}>अर्पण करे</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('listpage')}
          style={{
            ...styles.btnContainer,

            width: '50%',

            marginTop: 20,

            backgroundColor: 'black',
          }}>
          <Text style={styles.textSubmit}>पूर्ण अर्पण सूची</Text>
        </TouchableOpacity>

        <View style={{height: 50}} />
      </ScrollView>
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
            <View style={{marginTop: 20}}>
              <Text style={styles.modalText}>जप गिनती</Text>
              <Text style={styles.modalText}>अद्यतन</Text>
              <Text style={styles.modalText}>सफलतापूर्वक</Text>
              <Text style={styles.modalText}>[{number}]</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible), setNumber(0);
                }}>
                <Text style={styles.textStyle}>ठीक</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChantCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btncountcontaiiner: {
    backgroundColor: 'darkorange',
    width: '80%',
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginTop: 5,
    height: 34,
  },
  headerContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignContent: 'center',

    alignItems: 'center',

    height: 70,

    backgroundColor: 'orange',
  },

  textContainer: {
    display: 'flex',
  },

  textStyle: {
    alignSelf: 'center',

    color: 'white',
  },

  titleStyle: {
    alignSelf: 'center',

    marginTop: 18,

    fontSize: 22,

    color: 'white',
  },

  chantsTitle: {
    marginTop: 15,

    alignSelf: 'center',

    fontSize: 22,

    color: 'black',
    fontWeight: 'bold',
  },

  contContainer: {
    // borderWidth: 1,

    backgroundColor: '#cccccc',

    opacity: 0.5,

    width: '80%',

    alignContent: 'center',

    marginTop: 10,

    borderRadius: 25,

    height: 39,

    justifyContent: 'center',

    alignContent: 'center',

    alignSelf: 'center',
  },

  numberText: {
    alignSelf: 'center',

    color: 'black',
  },

  userNameContainer: {
    borderWidth: 1,

    borderColor: 'black',

    alignContent: 'center',

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    // width: '40%',
    padding: 10,

    // height: 50,

    borderRadius: 30,

    alignSelf: 'center',

    marginTop: 15,
  },

  userText: {
    fontSize: 23,

    color: 'black',

    fontWeight: '500',
  },

  textContainerstyle: {
    justifyContent: 'center',

    alignContent: 'center',

    alignItems: 'center',
  },

  YourChantStyle: {
    fontSize: 30,

    color: 'black',

    fontWeight: '500',

    marginTop: 19,
  },

  normalStyle: {
    // fontSize: 16,

    color: 'black',

    // marginTop: 5,
  },

  monthContainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignContent: 'center',

    alignItems: 'center',

    height: 120,
  },

  monthContentStyle: {
    borderWidth: 5,
    fontWeight: 'bold',
    height: 60,

    width: 90,

    justifyContent: 'center',

    alignContent: 'center',

    alignItems: 'center',

    borderRadius: 10,

    // marginTop: 20,

    borderColor: 'orange',

    margin: 20,
  },

  iconStyle: {
    justifyContent: 'center',

    alignSelf: 'center',

    alignItems: 'center',

    // marginTop: 20,

    color: '#BB6646',
  },

  countToday: {
    alignSelf: 'center',
    color: '#434343',
    // fontSize: 18,

    //

    // fontWeight: 'bold',
  },

  countercontainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    marginTop: 20,
  },

  iconContainer: {
    height: 60,

    width: 60,

    justifyContent: 'center',

    alignSelf: 'center',

    alignItems: 'center',

    borderWidth: 5,

    borderColor: 'red',

    borderRadius: 100,
  },

  Bigcountercontainer: {
    height: 170,

    width: 170,

    justifyContent: 'center',

    alignContent: 'center',

    alignItems: 'center',

    borderWidth: 5,

    borderRadius: 100,

    margin: 20,

    borderColor: 'orange',
  },

  iconstyle: {
    fontWeight: 'bold',

    color: 'black',
  },

  countTextNumber: {
    fontSize: 65,

    fontWeight: 'bold',

    color: 'black',
  },

  btnContainer: {
    backgroundColor: 'lightgrey',

    alignSelf: 'center',

    alignContent: 'center',

    alignItems: 'center',

    height: 50,

    borderRadius: 30,

    justifyContent: 'center',
  },

  textSubmit: {
    fontWeight: 'bold',

    fontSize: 16,

    color: 'white',
  },
  //
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    // padding: 35,
    height: 250,
    width: '90%',
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
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orange',
  },
  textStyle: {
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  modalText: {
    // marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
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
