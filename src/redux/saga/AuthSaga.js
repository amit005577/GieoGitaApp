import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, put, takeLatest } from 'redux-saga/effects';
import { navigationRef } from '../../../App';
import { useNotificaiton } from '../../Notifications/AuthNotifications';
import * as actions from '../actionTypes';
import { GetRecord, fetchRecord } from '../axios';

const GetEmailOtpRequest = function* (data) {
  try {
    yield put({type: actions.SHOW_LOADING, payload: true});
    let postData = {
      email: data.payload,
    };
    const requesUrl =
      `${Constants.BASE_URL}auth/signup-email-send-otp`;
    const response = yield call(GetRecord, requesUrl, postData);

    if (response != null && response.status == 200) {
      yield put({
        type: actions.STORE_EMAIL_RESPONSE,
        payload: response?.data?.data,
      });
      navigationRef.navigate('emailOtp');
    }
  } catch (error) {
    alert('Network Error');
  }
};

const GetEmailOtpVerify = function* (data) {
  try {
    const postData = {id: data.payload.id, otp: data.payload.otp};
    const requestUrl =
      `${Constants.BASE_URL}auth/signup-verify-otp`;
    const res = yield call(GetRecord, requestUrl, postData);
    if (res != null && res.status == 200) {
      let token = res?.data?.data;
      AsyncStorage.setItem('token', JSON.stringify(token?.access_token));
      yield put({type: actions.EMAIL_LOGIN_SUCCESS, payload: true});
    }
  } catch (error) {
  }
};

const fetchCountryCode = function* () {
  try {
    const requestUrl =
      `${Constants.BASE_URL}get-all-countries-list`;
    const res = yield call(fetchRecord, requestUrl);
    if (res.data != null && res.data.status == 200) {
      yield put({type: actions.GET_COUNTRY_CODE_SUCCESS, payload: res?.data});
    }
  } catch (error) {
    yield put({type: actions.SHOW_LOADING, payload: false});
  }
};

const GetPhoneOtp = function* (data) {
  const {displayNotification} = useNotificaiton();
  try {
    let postData = {phone: data.payload};
    yield put({type: actions.SHOW_LOADING, payload: true});

    let requestUrl =
      `${Constants.BASE_URL}auth/signup-phone-send-otp`;
    let res = yield call(GetRecord, requestUrl, postData);
    if (res?.data != null) {
      let otpdata = res.data.data.otp;
      yield put({
        type: actions.GET_PHONE_OTP_SUCCESS,
        payload: res?.data?.data,
      });
      displayNotification('OTP', otpdata + '');
      yield put({type: actions.SHOW_LOADING, payload: false});
      navigationRef.navigate('otp');
    } else {
      yield put({type: actions.SHOW_LOADING, payload: false});
      alert('Something went wrong Please try again');
    }

  } catch (error) {
    yield put({type: actions.SHOW_LOADING, payload: false});
  }
};

const getPhoneNumberVerify = function* (data) {
  try {
    let requestUrl =
      `${Constants.BASE_URL}auth/signup-verify-otp`;
    let postData = {
      otp: data.payload.otp,
      id: data.payload.id,
    };
    const res = yield call(GetRecord, requestUrl, postData);
    if (res !== null && res.status == 200) {
      let tokenData = res?.data?.data?.access_token;
      AsyncStorage.setItem('token', JSON.stringify(tokenData));
      yield put({type: actions.PHONE_OTP_VERIFY_SUCCESS, payload: true});
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
