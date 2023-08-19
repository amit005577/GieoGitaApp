import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../actionTypes';
import {GetRecord, fetchRecord} from '../axios';
import {channelId, navigationRef} from '../../../App';
import {emailResponse} from '../reducers/selectors/userSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useNotificaiton} from '../../Notifications/AuthNotifications';
import configureStore from '../store';

// const config = {
//   headers: {Authorization: `Bearer ${res}`},
// };

const GetEmailOtpRequest = function* (data) {
  try {
    yield put({type: actions.SHOW_LOADING, payload: true});
    let postData = {
      email: data.payload,
    };
    const requesUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/auth/signup-email-send-otp';
    const response = yield call(GetRecord, requesUrl, postData);

    if (response != null && response.status == 200) {
      yield put({
        type: actions.STORE_EMAIL_RESPONSE,
        payload: response?.data?.data,
      });
      navigationRef.navigate('emailOtp');
    }
  } catch (error) {
    // console.log('show error', error);
    alert('Network Error');
  }
};

const GetEmailOtpVerify = function* (data) {
  try {
    const postData = {id: data.payload.id, otp: data.payload.otp};
    const requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/auth/signup-verify-otp';
    const res = yield call(GetRecord, requestUrl, postData);
    // console.log('show res', res);
    if (res != null && res.status == 200) {
      let token = res?.data?.data;
      AsyncStorage.setItem('token', JSON.stringify(token?.access_token));
      yield put({type: actions.EMAIL_LOGIN_SUCCESS, payload: true});
    }
  } catch (error) {
    // console.log('show error');
  }
};

const fetchCountryCode = function* () {
  try {
    // yield put({type: actions.SHOW_LOADING, payload: true});
    const requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/get-all-countries-list';
    const res = yield call(fetchRecord, requestUrl);
    if (res.data != null && res.data.status == 200) {
      yield put({type: actions.GET_COUNTRY_CODE_SUCCESS, payload: res?.data});
      // yield put({type: actions.SHOW_LOADING, payload: false});
    }
  } catch (error) {
    // console.log('show error', error);
    yield put({type: actions.SHOW_LOADING, payload: false});
  }
};

const GetPhoneOtp = function* (data) {
  const {displayNotification} = useNotificaiton();
  try {
    let postData = {phone: data.payload};
    yield put({type: actions.SHOW_LOADING, payload: true});

    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/auth/signup-phone-send-otp';
    // console.log('show post data get otp', postData, requestUrl);
    let res = yield call(GetRecord, requestUrl, postData);
    // console.log('show phone otp response', res.data);
    if (res?.data != null) {
      let otpdata = res.data.data.otp;
      // console.log('show inside res ', otpdata);
      yield put({
        type: actions.GET_PHONE_OTP_SUCCESS,
        payload: res?.data?.data,
      });
      displayNotification('OTP', otpdata + '');
      yield put({type: actions.SHOW_LOADING, payload: false});
      navigationRef.navigate('otp');
    } else {
      yield put({type: actions.SHOW_LOADING, payload: false});
      // console.log('show else res', res.data);
      alert('Something went wrong Please try again');
    }

    // console.log('show otp res saga', res.data.data.otp);
  } catch (error) {
    // console.log('show error from phone', error);
    yield put({type: actions.SHOW_LOADING, payload: false});
  }
};

const getPhoneNumberVerify = function* (data) {
  // alert("enter")

  // console.log('show data verify', data);
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/auth/signup-verify-otp';
    let postData = {
      otp: data.payload.otp,
      id: data.payload.id,
    };
    const res = yield call(GetRecord, requestUrl, postData);
    // console.log('show outside res', res);
    if (res !== null && res.status == 200) {
      // console.log("show inside res",res)
      let tokenData = res?.data?.data?.access_token;
      AsyncStorage.setItem('token', JSON.stringify(tokenData));
      yield put({type: actions.PHONE_OTP_VERIFY_SUCCESS, payload: true});
      // console.log('show res phone verify success', res);
    } else if (res.status == 201 && res.data.status === 'error') {
      alert('Enter correct Otp');
    }
  } catch (error) {}
};

const AuthSaga = [
  takeLatest(actions.GET_EMAIL_OTP, GetEmailOtpRequest),
  takeLatest(actions.GET_EMAIL_OTP_VERIFY, GetEmailOtpVerify),
  takeLatest(actions.GET_COUNTRY_CODE, fetchCountryCode),
  takeLatest(actions.GET_PHONE_OTP, GetPhoneOtp),
  takeLatest(actions.GET_PHONE_OTP_VERIFY, getPhoneNumberVerify),
];

export default AuthSaga;
