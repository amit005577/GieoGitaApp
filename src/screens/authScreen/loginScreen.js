import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import React, { useEffect } from 'react';


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
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginPage = ({ navigation }) => {
  const { Translation, isLoading } = useTranslation()

  const [text, onChangeText] = React.useState('');
  const dispatch = useDispatch();
  const loding = useSelector(loder);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '219115132027-803rl40f31j6d6j0vbpd0tm35j6hlspi.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  },[])


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
      alert(
        +"\n" + userInfo.user.givenName
        + "\n" + userInfo.user.familyName
        + "\n" + userInfo.user.email
        + "\n" + userInfo.user.name
        + "\n" + userInfo.user.photo
      )
      
    } catch (error) {
      alert(':::: ' + JSON.stringify(error))
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };


  const handleRequestOtp = () => {
    let data = `+91${text}`;
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
    <SafeAreaView style={{ flex: 1 }} >
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

        <Text style={styles.loginText}>{Translation.login_to_your_account}</Text>
        {loding ? <ActivityIndicator size={'large'} color={'red'} /> : null}

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={'#808080'}
            value={text}
            inputMode="numeric"
            maxLength={10}
            placeholder={Translation.enter_phone_number}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleRequestOtp()}
          style={styles.touchableStyle}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 28 }}>
            {Translation.login_submit}
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
          {Translation.side}
        </Text>
        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#808080' }}>
          {Translation.login_with}
        </Text>

        <View style={{
          flexDirection: 'row',
          marginTop: 20,
          alignSelf: 'center'
        }} >

          <TouchableOpacity
            onPress={() => signIn()}
          >
            <Image source={Google} style={{ height: 50, width: 50 }} />
          </TouchableOpacity>

          <TouchableOpacity
          >
            <Image
              source={facebook}
              style={{ height: 50, width: 50, marginLeft: 10 }}
            />
          </TouchableOpacity>

        </View>


        <Text style={{ alignSelf: 'center', marginTop: 10, color: '#808080' }}>
          {Translation.do_not_have_an_account}{' '}
          <Text style={{ color: '#F7941C', textDecorationLine: 'underline' }}>
            {Translation.register_here}
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
