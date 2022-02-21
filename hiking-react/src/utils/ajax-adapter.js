// SVI AJAX REQUESTOVI, PODESAVNJADA SALJE TOKEN SA SVAKI MREQUESTOM itd...

import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};


ajax.storeToken = (token) => {
  window.localStorage.setItem('hiking_token', token);
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