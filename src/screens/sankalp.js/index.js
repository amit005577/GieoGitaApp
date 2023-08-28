import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { setPledge, setcoditionalStatus } from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';

const SankalpScreen = () => {
  const { Translation, isLoading, getFormatedString } = useTranslation()

  const [count, setCount] = React.useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleOnsubmit = async () => {
    inputRef.current.clear();
    dispatch(setcoditionalStatus(true));
    dispatch(setPledge(count));
    await AsyncStorage.setItem('pledge', JSON.stringify(count));
    setCount(0);
  };

  const pledgeDataStore = useSelector(state => state.AppReducers.pledgeData);

  useEffect(() => {
    if (pledgeDataStore != null) {
      setCount(pledgeDataStore.target_count);
    } else {
      setCount(0);
    }
  }, []);

  const handleOnPress = async () => {
    await AsyncStorage.setItem('pledge', JSON.stringify(5265));
    dispatch(setcoditionalStatus(true));
  }

  let currentDateData = moment(new Date(), 'DD-MM-YYYY');
  let targetDate = moment('23-12-2023', 'DD-MM-YYYY');
  let noOfDays = targetDate.diff(currentDateData, 'days');

  let dailyCount = count / noOfDays
  let monthCountNumber = dailyCount * 30
  let weekCountNummber = dailyCount * 7


  return (
    <View style={styles.container}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      <ScrollView>
        <Text style={styles.myPledge}>{Translation.my_pledge} </Text>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.desctext,{textAlign:'justify'}]}>
            {Translation.my_pledge_description}
          </Text>
        </View>
          <Text style={{ ...styles.desctext, fontWeight: 'bold', }}>
            {getFormatedString(Translation.by_geeta_jayanti, {
              date: '25 December',
              year: '2024'
            })}
          </Text>
        <Text style={{ ...styles.desctext, fontWeight: 'bold', color: '#F7941C' }}>
          {Translation.ashtadash_shloki_geeta_path}
        </Text>
        <Text style={{ ...styles.desctext, fontWeight: 'bold' }}>
          {Translation.resolve_to}
        </Text>
        <View style={styles.textInputStyleContainer}>
          <TextInput
            placeholder={'00000'}
            onChangeText={setCount}
            ref={inputRef}
            style={styles.textInputStyle}
            inputMode="numeric"
            maxLength={5}
            placeholderTextColor={'#808080'}
          />
        </View>
        <Text style={styles.chalisaText}>
          {Translation.fixed_number}
        </Text>


        <View
          style={{ ...styles.graph1line, marginTop: 20, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>{Translation.daily}</Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>
              {Math.round(dailyCount) < 1 ? 1 : Math.round(dailyCount)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>{Translation.weekly} </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>
              {Math.round(weekCountNummber)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>{Translation.monthly} </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>
              {' '}
              {Math.round(monthCountNumber)}
            </Text>
          </View>
        </View>
        <View style={styles.graph1line}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>{Translation.total} </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>{count}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <TouchableOpacity
            onPress={() => handleOnsubmit()}
            style={styles.submitContainer}>
            <Text style={styles.submittext}>
              {Translation.surrender}
            </Text>
          </TouchableOpacity>
          <View style={styles.withoutPledge}>
            <Text style={{ fontSize: 10, color: 'black', alignSelf: 'center' }}>{Translation.note}:</Text>
            <Text style={{ fontSize: 10, color: 'black' }}>
              {Translation.note_description}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleOnPress()}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 16,
                color: 'orange',
                textDecorationLine: 'underline',
                textDecorationColor: 'orange'
              }}>
              {Translation.enter_without_resolution}
            </Text>

          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default SankalpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myPledge: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  desctext: {
    fontSize: 19,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  textInputStyleContainer: {
    width: 130,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  textInputStyle: {
    fontSize: 19,
    color: 'black',
  },
  chalisaText: {
    fontSize: 30,
    color: 'orange',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 20,
  },
  pledgeDate: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
    marginTop: 10,
  },
  graph1line: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F7941C',
    borderRightWidth: 0,
    // width: '100%',
    //
  },
  graphinside: {
    width: 140,
    borderRightWidth: 1,
    // borderWidth: 2,
    borderColor: 'orange',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    fontSize: 16,
    color: 'black',
  },
  submitContainer: {
    width: '100%',
    // paddingHorizontal: 20,
    height: 45,
    backgroundColor: '#F7941C',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    shadowOffset: 10,
    shadowColor: '#E5CE004F',
    shadowOpacity: 0.3,
  },
  submittext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  withoutPledge: {
    marginTop: 10,

    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  lastText: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    color: '#F7941C',
  },
});
