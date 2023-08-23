import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/Logo.png';
import facebook from '../../../assets/images/facebook.png';
import Google from '../../../assets/images/google.png';
import Loader from '../../Components/Loader';
import {
  getPhoneOtp,
  requestPhoneData
} from '../../redux/actions';
import { loder } from '../../redux/reducers/selectors/userSelector';
import { useTranslation } from '../../utills.js/translation-hook';

const LoginPage = ({ navigation }) => {
  const { Translation, isLoading } = useTranslation()

  const [text, onChangeText] = React.useState('');
  const dispatch = useDispatch();
  const loding = useSelector(loder);
  const handleRequestOtp = () => {
    let data = `+91${text}`;
    // console.log('show phone number with code', data.length);
    if (data.length <= 3) {
      alert('Please enter phone number');
    } else if (data.length < 13) {
      alert('Please enter proper number');
    } else {
      dispatch(getPhoneOtp(data));
      dispatch(requestPhoneData(data));
    }
  };

  return (
    <SafeAreaView style={{flex:1}} >
      {isLoading ?
        <Loader /> : null
      }
      <View style={{ paddingHorizontal: 23 }}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image
            style={{
              width: 176,
              height: 176,
              borderRadius: 100,
              resizeMode: 'contain',
            }}
            source={logo}
          />
        </View>

        <Text style={styles.loginText}>अपने अकाउंट में लॉग इन करें</Text>
        {loding ? <ActivityIndicator size={'large'} color={'red'} /> : null}

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={'#808080'}
            value={text}
            inputMode="numeric"
            maxLength={10}
            placeholder={'फोन नंबर दर्ज'}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleRequestOtp()}
          style={styles.touchableStyle}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 28 }}>
            जमा करना
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 30,
            fontWeight: '400',
            color: '#6D6D6D',
          }}>
          ओर
        </Text>
        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#808080' }}>
          साथ प्रवेश करना
        </Text>

        <TouchableOpacity
          style={{
            borderRadius: 2,
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
          }}>
          <Image source={Google} style={{ height: 50, width: 50 }} />
          <Image
            source={facebook}
            style={{ height: 50, width: 50, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', marginTop: 10, color: '#808080' }}>
          कोई खाता नहीं है{' '}
          <Text style={{ color: '#F7941C', textDecorationLine: 'underline' }}>
            यहां रजिस्टर करें
          </Text>
        </Text>
      </View>
    </SafeAreaView>

  );
};

export default LoginPage;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#944A45',
  },
  TextInputStyle: {
    height: 55,
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
});
