import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Clipboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import logo from '../../../assets/images/Logo.png';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import OTPTextView from 'react-native-otp-textinput';
import {useDispatch, useSelector} from 'react-redux';
import {
  phoneOtp,
  requestedOtpData,
} from '../../redux/reducers/selectors/userSelector';
import {getPhoneOtpVerify} from '../../redux/actions';
import {navigationRef} from '../../../App';

const OtpScreen = () => {
  const otpInput = useRef(null);
  const [otp, setOtp] = useState(null);
  const data = useSelector(phoneOtp);

  const dispatch = useDispatch();
  const previousRequestedOtpData = useSelector(requestedOtpData);
  // console.log('show previousRequestedOtpData', previousRequestedOtpData);

  let phoneOtpdata = useSelector(phoneOtp);
  // console.log('show screen otp data id', otpInput);
  let res = {
    otp: otp,
    id: phoneOtpdata?.user_id,
  };
  // console.log(' show otp data-=-=====?>', res);

  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    return clearTimeout(counter);
  }, [counter]);

  const handleOnSubmit = () => {
    if (res.otp === null) {
      alert('please enter otp');
    } else if (res.otp?.length < 6) {
      alert('please enter proper otp');
    } else {
      dispatch(getPhoneOtpVerify(res));
    }
  };

  const handleRequestNewOtp = () => {
    if (previousRequestedOtpData.length > 0) {
      dispatch(getPhoneOtp(previousRequestedOtpData));
    }
  };

  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 10}}>
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
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#000',
            textAlign: 'center',
            marginTop: 15,
          }}>
          ओ.टी.पी
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <OTPTextView
          handleTextChange={value => setOtp(value)}
          inputCount={6}
          keyboardType="numeric"
        />
        <Text style={{textAlign: 'right', marginRight: '4%', color: '#808080'}}>
          ओटीपी भेजा गया {counter}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleOnSubmit()}
        style={{
          justifyContent: 'center',
          borderRadius: 20,
          alignItems: 'center',
          backgroundColor: '#F86F03',
          marginHorizontal: '20%',
          marginTop: '5%',
          height: 40,
        }}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>
          सत्यापित करना
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('login')}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10%',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'blue',
            textDecorationLine: 'underline',
          }}>
          वापस जाओ
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default OtpScreen;
const styles = StyleSheet.create({});
