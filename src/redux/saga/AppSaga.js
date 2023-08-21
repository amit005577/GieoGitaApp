import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../actionTypes';
import {
  GetRecord,
  fetchRecord,
  fetchRecordWithoutToken,
  postApi,
  registerApi,
} from '../axios';
import {channelId, navigationRef} from '../../../App';
import {
  emailResponse,
  tokenDataAxios,
} from '../reducers/selectors/userSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useNotificaiton} from '../../Notifications/AuthNotifications';
import configureStore from '../store';
import {Alert} from 'react-native';

const PledgeSagaFunction = function* (data) {
  // console.log('show data count', data);
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/change-traget-count';
    let postData = {
      count: data,
    };
    // console.log('🚀 ~ file: AppSaga.js:24 ~ postData:', postData);
    // console.log('🚀 ~ file: AppSaga.js:24 ~ requestUrl:', requestUrl);
    // console.log('show post data nn count', data, token);
    const res = yield call(postApi, requestUrl, postData);
    if (res.data.data != null) {
      // console.log('show runn inside');
      yield put({type: actions.PLEDGE_DATA, payload: res.data.data});
    }
    // console.log('show count res', res.data.data);
  } catch (error) {
    // console.log('show PledgeSagaFunction api', error);
  }
};

const UpdateChant = function* (data) {
  // console.log('show data count single', data);
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/user/reads-update';
    let postData = {
      count: data,
    };
    // console.log('🚀 ~ file: AppSaga.js:24 ~ postData:', postData);
    // console.log('🚀 ~ file: AppSaga.js:24 ~ requestUrl:', requestUrl);
    // console.log('show post data nn count', data, token);
    const res = yield call(postApi, requestUrl, postData);
    // console.log('show post count datasaga ddfsd', res);
    // if (res.data.data != null) {
    // console.log('show runn inside');
    //   yield put({type: actions.PLEDGE_DATA, payload: res.data.data});
    // }
    // console.log('show count res', res.data.data);
  } catch (error) {
    // console.log('show UpdateChant error api', error);
  }
};

const getHomePageData = function* () {
  // console.log('Home Page Data');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/pages/20';

    const res = yield call(fetchRecordWithoutToken, requestUrl);
    if (res.data != null) {
      yield put({type: actions.HOME_DATA, payload: res.data});
    }
    // console.log('🚀 ~ file: AppSaga.js:41 ~ res:', JSON.stringify(res.data));
  } catch (error) {
    // console.log('show getHomePageData error api', error);
  }
};

const chantHistoryapi = function* () {
  // console.log('chat history');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/user/reads-get/';
    //  console.log("show ruy=nning...............")
    const res = yield call(fetchRecord, requestUrl);
    if (res.data != null) {
      yield put({type: actions.STORE_CHANT_HISTORY, payload: res.data.data});
    }
    // console.log(
    //   '🚀 ~ file: chant history ~ res:=-=-=>',
    //   JSON.stringify(res.data),
    // );
  } catch (error) {
    // console.log('show chantHistoryapi error api', error);
  }
};

const getPdfSaga = function* () {
  // console.log('cha pdf');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/pages/1';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show response pdf saga', res);
    if (res.data != null) {
      yield put({type: actions.PDF_DATA_SUCCESS, payload: res.data.data});
    }
    // console.log(
    //   '🚀 ~ file: chant pdf data ~ res:=-=-=>',
    //   JSON.stringify(res.data),
    // );
  } catch (error) {
    console.log('show getPdfSaga error api', error);
  }
};

const getVideoData = function* () {
  // console.log('vide enter');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/pages/25';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show response video saga', res);
    if (res.data != null) {
      yield put({type: actions.VIDEO_DATA_SUCCESS, payload: res.data.data});
    }
    // console.log(
    //   '🚀 ~ file: chant video data ~ res:=-=-=>',
    //   JSON.stringify(res.data),
    // );
  } catch (error) {
    // console.log('show getVideoData error api', error);
  }
};

const getLanguageList = function* () {
  // console.log('list lang enter');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/show-all-language';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show response list language data saga', res);
    if (res.data != null) {
      yield put({type: actions.LANGUAGE_LIST_SUCCESS, payload: res.data.data});
    }
    // console.log(
    // '🚀 ~ file: chant language list data ~ res:=-=-=>',
    //   JSON.stringify(res.data.data),
    // );
  } catch (error) {
    // console.log('show  getLanguageList error api', error);
  }
};
const getTargetPledgeData = function* () {
  // console.log('list pledge dnfksdnf enter');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/profile-details';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show response list target chant profigle data saga', res);
    if (res.data != null) {
      yield put({
        type: actions.TARGET_CHANT_DATA_SUCCESS,
        payload: res.data.data,
      });
    }
    // console.log(
      // '🚀 ~ file: chant profole list data ~ res:=-=-=>',
    //   JSON.stringify(res.data.data),
    // );
  } catch (error) {
    // Alert.alert('server error');
    // console.log('show getTargetPledgeData error api', error);
  }
};
const getCurrenCountData = function* () {
  // console.log('list current montthly count');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/show-current-chants-count';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show  montuhly data res data saga', res);
    if (res.data != null) {
      yield put({
        type: actions.CURRENT_COUNT_STATUS_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    // console.log('show getCurrenCountData error api', error);
  }
};

const getAllpdfDataSaga = function* () {
  // console.log('list pdf saga  count');
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/pages/1';

    const res = yield call(fetchRecordWithoutToken, requestUrl);
    // console.log(
    // 'show  montuhly data res data saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {
      yield put({
        type: actions.SAVE_PDF_DATA,
        payload: res.data.data,
      });
    }
  } catch (error) {
    // console.log('show getAllpdfDataSaga error api', error);
  }
};

const reisterDetailSaga = function* (data) {
  // console.log('list pdf register detail  count', data);
  let _data = {
    name: data.payload.name,
    // city: data.payload.city,
    age: data.payload.age,
    gender: data.payload.selectedGender,
    state: data.payload.stateNameData,
    country: data.payload.countryNameData,
    email:data.payload.email
  };
  // console.log('show submitting saga data', _data);
  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/profile-update';
      console.log("show hit api before data ",_data,requestUrl)
    const res = yield call(registerApi, requestUrl, _data);

    // console.log(
    //   'show  montuhly data res data saga',
    //   JSON.stringify(res),
    // );
    if (res.data != null) {
      // if (res.data.data.message.email == 'The email has already been taken.') {
      //   Alert.alert('The email has already been taken.');
      // } else {
        yield put({
          type: actions.SAVE_PDF_DATA,
          payload: res.data.data,
        });
        yield put({type: actions.TARGET_CHANT_DATA})
        Alert.alert("profile updated successfully")
        navigationRef.navigate("chant")
      }
    // }
  } catch (error) {
    Alert.alert("This email is already taken")
    // console.log('This data regiter taken', error);
  }
};

const getliveDatasaga = function* () {
  // console.log('enter live data ');

  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/show-current-chants-count';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show live chants', JSON.stringify(res.data.data));
    if (res.data != null) {
      yield put({
        type: actions.lIVE_CHANTS_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    // console.log('show getliveDatasaga error api', error);
  }
};

const getCountryNameSaga = function* () {
  // console.log('enter country name data ');

  try {
    let requestUrl =
      'https://projects.cilearningschool.com/gieo_gita/api/v1/get-all-countries-list';

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show country name', JSON.stringify(res.data.data));
    if (res.data != null) {
      yield put({
        type: actions.COUTRY_NAME_LIST_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    // console.log('show getCountryNameSaga error api', error);
  }
};

const getCountryStateSaga = function* (payload) {
  // console.log('enter country state data simgle',payload);

  try {
    let requestUrl = `https://projects.cilearningschool.com/gieo_gita/api/v1/get-all-state-list/${payload.payload}`;
    // console.log("show request url state",requestUrl)

    const res = yield call(fetchRecord, requestUrl);
    // console.log('show country state name list', JSON.stringify(res.data.data));
    if (res.data != null) {
      yield put({
        type: actions.COUTRY_STATE_NAME_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    // console.log('show getCountryStateSaga error api', error);
  }
};
const getTranslationsSaga = function* ({payload}) {
console.log('>>>>>>>>>>>>>>>>>>>>',payload);
  try {
    let requestUrl = `http://projects.cilearningschool.com/gieo_gita/api/v1/translation-get/${payload.langCode}`;
    
    const res = yield call(fetchRecord, requestUrl);
    if (res.data != null) {
      var result = {};
      const translations = res?.data?.data

      translations.map((item,index) => {
        result[translations[index].key] = translations[index].value;
      })
      console.log('::::::::::::???????', result);

      yield put({
        type: actions.GET_LANGUAGE_TRANSLATION_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    // console.log('show getTranslationsSaga error api saga', error);
  }
};

const AppSaga = [
  takeLatest(actions.TARGET_COUNT_PLEDGE, PledgeSagaFunction),
  takeLatest(actions.GET_HOME_PAGE_DATA, getHomePageData),
  takeLatest(actions.CHANT_COUNT_UPDATE, UpdateChant),
  takeLatest(actions.CHANT_HISTORY, chantHistoryapi),
  takeLatest(actions.GET_PDF_DATA, getPdfSaga),
  takeLatest(actions.VIDEO_DATA_GET, getVideoData),
  takeLatest(actions.LANGUAGE_LIST, getLanguageList),
  takeLatest(actions.TARGET_CHANT_DATA, getTargetPledgeData),
  takeLatest(actions.CURRENT_COUNT_STATUS, getCurrenCountData),
  takeLatest(actions.PDF_DATA_GET, getAllpdfDataSaga),
  takeLatest(actions.REGISTER_DETAILS, reisterDetailSaga),
  takeLatest(actions.GET_lIVE_CHANTS, getliveDatasaga),
  takeLatest(actions.COUTRY_NAME_LIST, getCountryNameSaga),
  takeLatest(actions.COUTRY_STATE_NAME, getCountryStateSaga),
  takeLatest(actions.GET_LANGUAGE_TRANSLATION, getTranslationsSaga),
];

export default AppSaga;
