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


ajax.tourCreate = async (formData) => {
  // slanje requeta za kreiranje nove ture

  // GRAPHQL
  const graphql_query = {
    query: '{ tourCreate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ') }'
  };
  /*
  name: '',
  description: '',
  date: '02/09/2022',
  difficulty: 'EASY',
  trail_length: 1,
  max_participants: 99
  */
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourCreate stigao:', response);
  return response;
};


ajax.tourGetAll = async () => {
  // slanje requeta za dobijanje svih tura sa backenda

  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_created date_created } }'
  };
  */
  const graphql_query = {
    query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_id } }'
  };
  /*
  name: '',
  description: '',
  date: '02/09/2022',
  difficulty: 'EASY',
  trail_length: 1,
  max_participants: 99
  */
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourGetAll stigao:', response);
  return response;
};


ajax.reviewCreate = async (formData) => {
  // slanje requeta za kreiranje novog review

  // GRAPHQL
  const graphql_query = {
    query: '{ reviewCreate( rating: ' + formData.rating + ' text: "' + formData.text + '" tour_id: "' + formData.tour_id + '" ) }'
  };
  /*
  rating: 0,
  text: '',
  tour_id: tour_id,
  */
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za reviewCreate stigao:', response);
  return response;
};


ajax.reviewGetAll = async () => {
  // slanje requeta za dobijanje svih reviewa sa backenda

  // GRAPHQL
  const graphql_query = {
    query: '{ reviewGetAll { _id user_id tour_id rating text } }'
  };
  /*
    _id: String
    user_id: String
    tour_id: String
    rating: Int
    text: String
  */
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourGetAll stigao:', response);
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