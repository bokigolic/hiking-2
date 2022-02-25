// SVI AJAX REQUESTOVI, PODESAVNJADA SALJE TOKEN SA SVAKI MREQUESTOM itd...

import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};


ajax.storeToken = (token) => {
  window.localStorage.setItem('hiking_token', token);
};

ajax.getStoredToken = () => {
  const token = window.localStorage.getItem('hiking_token');
  return token;
};

ajax.deleteStoredToken = () => {
  const token = window.localStorage.removeItem('hiking_token');
  return token;
};


ajax.preparedHeadersForAxios = {
  'Content-Type': 'application/json'
};

ajax.configureHeaders = (token) => {
  if (token === null) {
    // kad smo izlogovani
    ajax.preparedHeadersForAxios = {
      'Content-Type': 'application/json'
    };
  } else {
    // kad treba da budemo ulogovani i stalno saljemo token
    ajax.preparedHeadersForAxios = {
      'Content-Type': 'application/json',
      'x-hiking-token': token
    };
  }
};


ajax.authRegister = async (formData) => {
  // slanje requeta za registraciju novog korisnika

  // GRAPHQL
  const graphql_query = {
    query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '" password2: "' + formData.password2 + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za authRegister stigao:', response);
  return response;
};


ajax.authLogin = async (formData) => {
  // slanje requeta za registraciju novog korisnika

  // GRAPHQL
  const graphql_query = {
    query: '{ authLogin( username: "' + formData.username + '" password: "' + formData.password + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za authLogin stigao:', response);
  return response;
};


ajax.authLogout = async () => {
  // slanje requeta za registraciju novog korisnika

  // const token = ajax.getStoredToken(); // uzimamo prethodno sacuvan token sa hard diska
  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ authLogout( token: "' + token + '") }'
  };
  */
  const graphql_query = {
    query: '{ authLogout }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za authLogout stigao:', response);
  return response;
};


ajax.myUserData = async () => {
  // slanje requeta za registraciju novog korisnika

  const token = ajax.getStoredToken(); // uzimamo prethodno sacuvan token sa hard diska
  ajax.configureHeaders(token); // podesavamo axios da svi buducei pozivi salju toke nkao http header
  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ myUserData( token: "' + token + '") { is_success _id username } }'
  };
  */
  const graphql_query = {
    query: '{ myUserData { is_success _id username } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za myUserData stigao:', response);
  return response;
};








ajax.salji_post_request = () => {
  // saljemo klasican request


  // saljemo graphql request

};


ajax.sacuvaj_token_lokalno_i_trajno = (token) => {

  // ako je u pitanju web broeser
  // window.localStorage.setItem('hiking_token', token)

  // ako je u pitanju web browser cookie

  // ako je u pitanju android react-native aplikacije
  // androidStorage('hiking_token', token)

};