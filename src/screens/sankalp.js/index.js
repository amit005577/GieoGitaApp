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
  const { Translation, isLoading } = useTranslation()

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
        <Text style={styles.myPledge}>मेरी प्रतिज्ञा</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.desctext}>
            यदि आप पूर्व में किसी संकल्प से या अन्य प्रकार से अष्टादश श्लोकी
            गीता पाठ कर रहे हैं, वह संख्या भी इस गीता जीवन गीत में मान्य है। आप
            उसको भी ऐप में अंकित कर सकते है
          </Text>
        </View>
        <Text style={{ ...styles.desctext, fontWeight: 'bold' }}>
          <Text style={{ ...styles.desctext, fontWeight: 'bold' }}>
            मैं गीता जयन्ती 23 दिसम्बर 2023 तक
          </Text>
        </Text>
        <Text style={{ ...styles.desctext, fontWeight: 'bold', color: '#F7941C' }}>
          अष्टादश श्लोकी गीता पाठ
        </Text>
        <Text style={{ ...styles.desctext, fontWeight: 'bold' }}>
          करने का संकल्प लेता/लेती हूं
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
          संकल्पित संख्या
        </Text>


        <View
          style={{ ...styles.graph1line, marginTop: 20, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>दैनिक</Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>
              {Math.round(dailyCount) < 1 ? 1 : Math.round(dailyCount)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>साप्ताहिक</Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>
              {Math.round(weekCountNummber)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>महीने के</Text>
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
            <Text style={styles.graphText}>कुल</Text>
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
              {'अर्पण करें'}
            </Text>
          </TouchableOpacity>
          <View style={styles.withoutPledge}>
            <Text style={{ fontSize: 10, color: 'black', alignSelf: 'center' }}>नोट:</Text>
            <Text style={{ fontSize: 10, color: 'black' }}>
              आप बिना संकल्प भी ऐप में पाठ सांख्य अर्पण कर सकते हैं
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
              बिना संकल्प के प्रवेश करे
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
