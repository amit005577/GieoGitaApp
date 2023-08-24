
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from '../actionTypes';
import {
  GetRecord,
  fetchRecord,
  fetchRecordWithoutToken,
  postApi,
  registerApi,
} from '../axios';
import { Alert } from 'react-native';
import { navigationRef } from '../../../App';
import { setIsLoading } from '../actions';


const AllEventSaga = function* () {
  yield put(setIsLoading(true))
  yield put({ type: actions.LODER, payload: true })
  // console.log('list event ');
  try {
    let requestUrl =
      `${Constants.BASE_URL}events`;

    const res = yield call(fetchRecordWithoutToken, requestUrl);
    console.log(
      'show  event data res data saga',
      JSON.stringify(res),
    );
    if (res.data != null) {
      yield put({
        type: actions.GET_ALL_EVENT_SUCCESS,
        payload: res.data.data,
      });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    // console.log('show error api', error);
    yield put(setIsLoading(false))
  }
};

const GetEventTypeSaga = function* () {

  yield put(setIsLoading(true))
  // console.log('list GetEventTypeSaga saga 0-0----');
  try {
    let requestUrl =
      `${Constants.BASE_URL}event-types`;

    const res = yield call(fetchRecordWithoutToken, requestUrl);

    if (res.data != null) {
      yield put({
        type: actions.GET_EVENT_TYPE_SUCCESS,
        payload: res.data.data,
      });
    }
    yield put(setIsLoading(false))

  } catch (error) {
    yield put(setIsLoading(false))

    // console.log('show error api', error);
  }
};

const GetEventPlaceSaga = function* () {
  yield put(setIsLoading(true))

  // console.log('list GetEventPlaceSaga ');
  try {
    let requestUrl =
      `${Constants.BASE_URL}event-place-types`;

    const res = yield call(fetchRecordWithoutToken, requestUrl);
    // console.log(
    //   'show  GetEventPlaceSaga saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {
      yield put({
        type: actions.GET_EVENT_PLACE_SUCCESS,
        payload: res.data.data,
      });
    }
    yield put(setIsLoading(false))

    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
    yield put(setIsLoading(false))

  }
};

const SearchEventSaga = function* () {
  yield put(setIsLoading(true))

  // console.log('list GetEventPlaceSaga ');
  try {
    let requestUrl =
      `${Constants.BASE_URL}events-search`;

    const res = yield call(fetchRecordWithoutToken, requestUrl);
    // console.log(
    //   'show  GetEventPlaceSaga saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {
      yield put({
        type: actions.GET_EVENT_PLACE_SUCCESS,
        payload: res.data.data,
      });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
  }
};


const CreateEventSaga = function* (data) {
  yield put(setIsLoading(true))

  // console.log('list CreateEventSaga count', data);
  let _data = {
    name: data.payload.name,
    instraction: data.payload.instraction,
    start: data.payload.start,
    end: data.payload.end,
    event_type: data.payload.event_type,
    frequency: data.payload.frequency,
    participants: data.payload.participants,
    personPerDay: data.payload.personPerDay,
    phone_visible: data.payload.phone_visible,
    place_type: "0",
    public_event: data.payload.public_event,
    organizer: data.payload.organizer,
    targe_chants: data.payload.targe_chants,
    phone: data.payload.phone,
    email: data.payload.email,
    short_content: data.payload.short_content,
    status: "true",
    joing_links: data.payload.joing_links,
    plateform: data.payload.plateform,
    content: data.payload.content
  }
  // console.log("show crteate event list",_data)
  try {
    let requestUrl =
      `${Constants.BASE_URL}events-store`;

    const res = yield call(registerApi, requestUrl, _data);
    // console.log(
    //   'show  CreateEventSaga=-=-=-= saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {

      yield put({
        type: actions.CREATE_EVENT_SUCCESS, payload: res.data.data

      });
      Alert.alert("Event is created")
      navigationRef.navigate("formPlace")
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
  }
};



const MyEventSaga = function* () {
  // console.log('list MyEventSaga count');
  yield put(setIsLoading(true))

  // console.log("show updated list",_data)
  try {
    let requestUrl =
      `${Constants.BASE_URL}my-events`;

    const res = yield call(fetchRecord, requestUrl);
    // console.log(
    //   'show  MyEventSaga=-=-=',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {
      yield put({
        type: actions.GET_MY_EVENT_SUCCESS,
        payload: res.data.data,
      });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
  }
};


const UpdateMyEventSaga = function* (data) {
  // console.log('list update event run', data);
  yield put(setIsLoading(true))

  let _data = {
    id: data.payload.id,
    name: data.payload.name,
    instraction: data.payload.instraction,
    start: data.payload.start,
    end: data.payload.end,
    event_type: data.payload.event_type,
    frequency: data.payload.frequency,
    participants: data.payload.participants,
    personPerDay: data.payload.personPerDay,
    phone_visible: data.payload.phone_visible,
    place_type: '0',
    public_event: data.payload.public_event,
    organizer: data.payload.organizer,
    targe_chants: data.payload.targe_chants,
    phone: data.payload.phone,
    email: data.payload.email,
    short_content: data.payload.short_content,
    status: "true",
    joing_links: data.payload.joing_links,
    plateform: data.payload.plateform,
    content: data.payload.content
  }
  // console.log("show updated list-==-=-=-=-=",_data)
  try {
    let requestUrl =
      `${Constants.BASE_URL}events-update`;

    const res = yield call(registerApi, requestUrl, _data);
    // console.log(
    //   'show  UpdateMYEcewnt=-=-=-= saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {

      yield put({
        type: actions.CREATE_EVENT_SUCCESS, payload: res.data.data

      });
      Alert.alert("Event is updated")
      navigationRef.navigate("formPlace")
      // yield put({
      //   type: actions.GET_MY_EVENT,

      // });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api update Event', error);
  }
};



const UpdateMyLocation = function* (data) {
  // console.log('list update event run', data);
  yield put(setIsLoading(true))

  let _data = {
    place_name: data.payload.place_name,
    place_type: data.payload.place_type,
    pincode: data.payload.pincode,
    CountryState: data.payload.CountryState,
    is_public_place: data.payload.is_public_place,
    country_id: data.payload.country_id,
    state_id: data.payload.state_id,
    address: data.payload.address,
    city: data.payload.city,
    address: data.payload.address,
    id: data.payload.id,
    status: "true"
  }

  // console.log("show  update my lodacton list",_data)
  try {
    let requestUrl =
      `${Constants.BASE_URL}events-store-location`;

    const res = yield call(registerApi, requestUrl, _data);
    // console.log(
    //   'show  updated location from saga=-=-=-= saga',
    //   JSON.stringify(res.data.data),
    // );
    if (res?.data != null) {

      yield put({
        type: actions.UPDATE_LOCATION_SUCCESS, payload: res?.data?.data

      });
      Alert.alert("Event is updated")
      navigationRef.navigate("updatedEvent")
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api update Event', error);
  }
};

const SubscribeEventSaga = function* (data) {
  // console.log("show id payload",data)
  yield put(setIsLoading(true))

  try {
    let requestUrl =
      `${Constants.BASE_URL}events-subscriptions/${data.payload}`;

    const res = yield call(fetchRecord, requestUrl);
    // console.log(
    //   'show   subscribe event-------=-=-=',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data != null) {

      yield put({
        type: actions.SUBSCRIBE_EVENT_SUCCESS,
        payload: res.data.data,
      });
      Alert.alert("Event Subscribe Successfully")
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
  }
};

const confirmationEventSaga = function* (data) {
  // console.log("show id payload",data)
  yield put(setIsLoading(true))

  let _data = {
    id: data.payload.params.id,
    banner: data.payload.params.image,
    thumbnail: data.payload.params.image,
  }

  try {
    let requestUrl =
      `${Constants.BASE_URL}events-store-banner`;
    // console.log("show resposne api previos;;;;;;;", requestUrl, _data)
    const res = yield call(registerApi, requestUrl, _data);
    // console.log(
    //   'show   subscribe event-------=-=-=',
    //   JSON.stringify(res.data.data),
    // );
    if (res.data.data != null) {
      data.payload.callback()
      //  return res.data.data

      // Alert.alert("Event Confirmed Successfully")
      // navigationRef.navigate("home")
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
    // console.log('show error api', error);
  }
};
const EventSaga = [
  takeLatest(actions.GET_ALL_EVENT, AllEventSaga),
  takeLatest(actions.GET_EVENT_TYPE, GetEventTypeSaga),
  takeLatest(actions.GET_EVENT_PLACE, GetEventPlaceSaga),
  takeLatest(actions.GET_SEARCH_EVENT, SearchEventSaga),
  takeLatest(actions.CREATE_EVENT, CreateEventSaga),
  takeLatest(actions.GET_MY_EVENT, MyEventSaga),
  takeLatest(actions.UPDATE_MY_EVENT, UpdateMyEventSaga),
  takeLatest(actions.UPDATE_LOCATION, UpdateMyLocation),
  takeLatest(actions.SUBSCRIBE_EVENT, SubscribeEventSaga),
  takeLatest(actions.EVENT_CONFERMATION_IMAGE, confirmationEventSaga)


];

export default EventSaga;