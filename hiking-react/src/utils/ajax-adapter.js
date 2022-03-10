import config from "./config";
import { urlLib } from "./url-lib";
import axios from "axios";
import { convert_to_json } from "./ajax-utils";


// SVI AJAX REQUESTOVI, PODESAVNJADA SALJE TOKEN SA SVAKI MREQUESTOM itd...

export const ajax = {};


ajax.storeToken = (token) => {
  window.localStorage.setItem(config.TOKEN_LOCALSTOARGE_KEY, token);
};

ajax.getStoredToken = () => {
  const token = window.localStorage.getItem(config.TOKEN_LOCALSTOARGE_KEY);
  return token;
};

ajax.deleteStoredToken = () => {
  const token = window.localStorage.removeItem(config.TOKEN_LOCALSTOARGE_KEY);
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
      // 'x-hiking-token': token
      [config.TOKEN_HEADER_KEY]: token
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourCreate stigao:', response);
  return response;
};


ajax.tourUpdate = async (formData) => {
  // slanje requeta za update postojece ture

  // GRAPHQL
  const graphql_query = {
    query: '{ tourUpdate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ' tour_id: "' + formData.tour_id + '") }'
  };
  /*
  tour_id: '879877965646'
  name: '',
  description: '',
  date: '02/09/2022',
  difficulty: 'EASY',
  trail_length: 1,
  max_participants: 99
  */
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourUpdate stigao:', response);
  return response;
};


ajax.tourDelete = async (tour_id) => {
  // slanje requeta za tourDelete postojece ture

  // GRAPHQL
  const graphql_query = {
    query: '{ tourDelete( tour_id: "' + tour_id + '") }'
  };
  // takodje za brisanje koristimo i user_id korisnika koji je kreirao turu ali taj podatak ce biti izvucen pomocu tokena
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourDelete stigao:', response);
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourGetAll stigao:', response);
  return response;
};


ajax.tourJoin = async (tour_id) => {
  // slanje requeta za participate in tour
  // GRAPHQL
  const graphql_query = {
    query: '{ tourJoin( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourJoin stigao:', response);
  return response;
};


ajax.tourLeave = async (tour_id) => {
  // slanje requeta za participate in tour
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLeave( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourLeave stigao:', response);
  return response;
};


ajax.tourLike = async (tour_id) => {
  // slanje requeta za like ture
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLike( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourLike stigao:', response);
  return response;
};


ajax.tourUnlike = async (tour_id) => {
  // slanje requeta za brisanej like tour
  // GRAPHQL
  const graphql_query = {
    query: '{ tourUnlike( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourUnlike stigao:', response);
  return response;
};


ajax.tourParticipantsGet = async (tour_id) => {
  // slanje requeta za participate in tour
  // GRAPHQL
  const graphql_query = {
    query: '{ tourParticipantsGet( tour_id: "' + tour_id + '" ) { user_id } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios // ovo je PUBLIC api ali token ipak saljemo iako ne igra ulogu
  });
  console.log('axios response za tourParticipantsGet stigao:', response);
  return response;
};


ajax.tourLikeListGet = async (tour_id) => {
  // slanje requeta za listu ko je lajkovao turu
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLikeListGet( tour_id: "' + tour_id + '" ) { user_id } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios // ovo je PUBLIC api ali token ipak saljemo iako ne igra ulogu
  });
  console.log('axios response za tourLikeListGet stigao:', response);
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourGetAll stigao:', response);
  return response;
};


ajax.userProfileGet = async (user_id) => {
  // slanje requeta za userProfileGet

  // GRAPHQL
  const graphql_query = {
    query: '{ userProfileGet( user_id: "' + user_id + '") { is_success _id username } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za userProfileGet stigao:', response);
  return response;
};




ajax.salji_post_request = () => {
  // saljemo klasican request


  // saljemo graphql request

};


ajax.sacuvaj_token_lokalno_i_trajno = (token) => {

  // ako je u pitanju web broeser
  // window.localStorage.setItem(config.TOKEN_LOCALSTOARGE_KEY, token)

  // ako je u pitanju web browser cookie

  // ako je u pitanju android react-native aplikacije
  // androidStorage(config.TOKEN_LOCALSTOARGE_KEY, token)

};