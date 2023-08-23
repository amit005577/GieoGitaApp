import axios from 'axios';
import configureStore from '../store';

export const GetRecord = (url, data) => {
  // let store = configureStore();
  // let dataset = store.getState();
  // let res = dataset.AuthReducer.accessToken;
  // console.log('show tokenapi call saga', res);
  
  return axios({
    method: 'POST',
    crossDomain: true,
    dataType: 'application/json; charset=utf-8',
    data,
    url: url,
  });
};

export const fetchRecord = async url => {
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
// console.log("show urll00000000000",token)

  return axios({
    method: 'GET',
    crossDomain: true,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });
};

// export const fetchRecord = async url => {
//   const store = configureStore();
//   let dataset = store.getState();
//   let token = await dataset.AuthReducer.accessToken;
//   console.log("show token in api ===>", token, url);

//   try {
//     const response = await axios({
//       method: 'GET',
//       crossDomain: true,
//       url: url,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error fetching record:", error);
//     throw error; // Rethrow the error for the caller to handle if needed
//   }
// };

// export const fetchRecord = async url => {
//   try {
//     const store = configureStore(); // Assuming this function is available
//     const dataset = store.getState();
//     const token = dataset.AuthReducer.accessToken;
//     console.log('show token or url',url,token)

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching record:", error);
//     throw error; // Rethrow the error for the caller to handle if needed
//   }
// };

export const fetchRecordWithoutToken = async url => {
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  return axios({
    method: 'GET',
    crossDomain: true,
    // dataType: 'application/json; charset=utf-8',
    url: url,
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // },
    // config,
  });
};

export const postApi = async (url, data) => {




  // console.log('🚀???????', data.count.payload);
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  // const _isToken = await AsyncStorage.getItem('token')
  // let token = JSON.parse(_isToken)
  // console.log("🚀 ~ file: index.js:35 ~ postApi ~ _isToken:", token)
  // console.log('show tokenapi call ', token);
  // const headers = {};
  // return
  if (token) {
    // headers.Authorization = `Bearer ${token}`;
    return axios({
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {count: data.count.payload},
      url: url,
    });
  }
};

export const registerApi = async (url, data) => {
  // console.log('🚀 ~ file: index.js:79 ~ postApi ~ data:', data, url);
  const store = configureStore();
  let dataset = store.getState();
  let token = await dataset.AuthReducer.accessToken;
  console.log("show token data",token)
  if (token) {
    return axios({
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
      url: url,
    });
  }
};
