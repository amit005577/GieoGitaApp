
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
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




const AllEventSaga = function* () {
    yield put({type:actions.LODER,payload:true})
    console.log('list event ');
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/events';
  
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
      yield put({type:actions.LODER,payload:false})
    } catch (error) {
      console.log('show error api', error);
      yield put({type:actions.LODER,payload:false})
    }
  };
  const GetEventTypeSaga = function* () {
   
    console.log('list GetEventTypeSaga saga 0-0----');
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/event-types';
  
      const res = yield call(fetchRecordWithoutToken, requestUrl);
      console.log(
        'show  GetEventTypeSaga data saga',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        yield put({
          type: actions.GET_EVENT_TYPE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log('show error api', error);
    }
  };

  const GetEventPlaceSaga = function* () {
   
    console.log('list GetEventPlaceSaga ');
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/event-place-types';
  
      const res = yield call(fetchRecordWithoutToken, requestUrl);
      console.log(
        'show  GetEventPlaceSaga saga',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        yield put({
          type: actions.GET_EVENT_PLACE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log('show error api', error);
    }
  };

  const SearchEventSaga = function* () {
   
    console.log('list GetEventPlaceSaga ');
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/events-search';
  
      const res = yield call(fetchRecordWithoutToken, requestUrl);
      console.log(
        'show  GetEventPlaceSaga saga',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        yield put({
          type: actions.GET_EVENT_PLACE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log('show error api', error);
    }
  };


  const CreateEventSaga = function* (data) {
    console.log('list CreateEventSaga count', data);
    let _data = {
        name: data.payload.name,
      CountryState: data.payload.CountryState,
      address:data.payload.address,
      instraction:data.payload.instraction,
      city: data.payload.city,
      country: data.payload.country,
      start: data.payload.start,
      end:data.payload.end,
      event_type: data.payload.event_type,
      frequency: data.payload.frequency,
      participants: data.payload.participants,
      personPerDay: data.payload.personPerDay,
      phonepublic: data.payload.phonepublic,
      pin: data.payload.pin,
      place_type: data.payload.place_type,
      publicEvent: data.payload.publicEvent,
      public_event: data.payload.public_event,
      organizer:data.payload.organizer,
      targe_chants:"1000",
      phone:data.payload.phone,
      email:data.payload.email,
      short_content:"new show",
      status:"true",
      joing_links:"link",
      plateform:"youtube",
      content:"new content"
    }
    console.log("show updated list",_data)
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/events-store';
  
      const res = yield call(registerApi, requestUrl, _data);
      console.log(
        'show  CreateEventSaga=-=-=-= saga',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        Alert.alert("Event is created")
        navigationRef.navigate("myEvent")
        yield put({
          type: actions.GET_MY_EVENT,
 
        });
      }
    } catch (error) {
      console.log('show error api', error);
    }
  };



  const MyEventSaga = function* () {
    console.log('list MyEventSaga count');
    
    // console.log("show updated list",_data)
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/my-events';
  
      const res = yield call(fetchRecord, requestUrl);
      console.log(
        'show  MyEventSaga=-=-=',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        yield put({
          type: actions.GET_MY_EVENT_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log('show error api', error);
    }
  };


  const UpdateMyEventSaga = function* (data) {
    console.log('list update event run', data);
    let _data = {
      id:data.payload.id,
      name: data.payload.name,
      start:data.payload.start,
      end:data.payload.end,
      instraction:data.payload.instraction,
      joing_links:"dfsmksd",
      plateform:"fklsdjf",
      organizer:data.payload.organizer,
      targe_chants:"100",
      participants: data.payload.participants,
      phone:data.payload.phone,
      public_event:data.payload.publicEvent,
      email:data.payload.email,
      frequency:data.payload.frequency,
      short_content:"fjshdfjk",
      event_type:"2",
      place_type:data.payload.place_type,
      content:"fsjdfkhk" ,
      status:"true"
    


//
      // id:"29",
        // name: data.payload.name,
      // CountryState: data.payload.CountryState,
      // address:data.payload.address,
      // instraction:data.payload.instraction,
      // city: data.payload.city,
      // country: data.payload.country,
      // start: data.payload.start,
      // end:data.payload.end,
      // event_type: data.payload.event_type,
      // frequency: data.payload.frequency,
      // participants: data.payload.participants,
      // personPerDay: data.payload.personPerDay,
      // phone_visible: data.payload.phonepublic,
      // pin: data.payload.pin,
      // place_type: data.payload.place_type,
      // public_event: data.payload.publicEvent,
      // public_event: data.payload.public_event,
      // organizer:data.payload.organizer,
      // targe_chants:"1000",
      // phone:data.payload.phone,
      // email:data.payload.email,
      // short_content:"new show",
      // status:"true",
      // joing_links:"link",
      // plateform:"youtube",
      // content:"new content",
      
    }
    console.log("show updated list",_data)
    try {
      let requestUrl =
        'https://projects.cityinnovates.in/gieo_gita/api/v1/events-update';
  
      const res = yield call(registerApi, requestUrl, _data);
      console.log(
        'show  UpdateMYEcewnt=-=-=-= saga',
        JSON.stringify(res.data.data),
      );
      if (res.data != null) {
        Alert.alert("Event is updated")
        navigationRef.navigate("myEvent")
        yield put({
          type: actions.GET_MY_EVENT,
 
        });
      }
    } catch (error) {
      console.log('show error api update Event', error);
    }
  };

const EventSaga = [
    takeLatest(actions.GET_ALL_EVENT, AllEventSaga),
    takeLatest(actions.GET_EVENT_TYPE, GetEventTypeSaga),
    takeLatest(actions.GET_EVENT_PLACE,GetEventPlaceSaga ),
    takeLatest(actions.GET_SEARCH_EVENT,SearchEventSaga ),
    takeLatest(actions.CREATE_EVENT,CreateEventSaga ),
    takeLatest(actions.GET_MY_EVENT,MyEventSaga ),
    takeLatest(actions.UPDATE_MY_EVENT,UpdateMyEventSaga ),
   
  
  ];
  
  export default EventSaga;