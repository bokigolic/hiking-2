


// ACTION TYPES konstante

import { ajax } from "../utils/ajax-adapter";

export const ROUTE_SET = 'ROUTE_SET';
export const ROUTE_WITH_PARAMS_SET = 'ROUTE_WITH_PARAMS_SET';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const TOURS_FETCHING = 'TOURS_FETCHING';
export const TOURS_FETCHED = 'TOURS_FETCHED';
export const TOURS_FAIL = 'TOURS_FAIL';
export const REVIEWS_FETCHING = 'REVIEWS_FETCHING';
export const REVIEWS_FETCHED = 'REVIEWS_FETCHED';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';


// ACTIONS CREATORS and THUNKs

export const actionRouteSet = (route) => {
  return {
    type: ROUTE_SET,
    payload: route
  };
};


export const actionRouteWithParamsSet = (route, params) => {
  return {
    type: 'ROUTE_WITH_PARAMS_SET',
    payload: {
      route: route,
      params: params
    }
  };
};


export const actionLoginSuccess = (myUserData) => {
  // ACTION CREATOR
  return {
    type: LOGIN_SUCCESS,
    payload: myUserData
  };
};


export const actionAuthAutoLogin = () => {
  // THUNK
  return (dispatch) => {

    // AUTOLOGIN PROCEDURA
    ajax.myUserData()
      .then((response) => {
        console.log('.then() response za myuserData primljen', response)
        if (response && response.data && response.data.data && response.data.data.myUserData && response.data.data.myUserData._id) {
          // PROEVERNO JE SUCCES RESPONSE
          console.log(response.data.data.myUserData)
          const myUserData = response.data.data.myUserData;
          dispatch(actionLoginSuccess(myUserData));
        }
      })

  };
};


export const actionAuthFormLogin = (formState) => {
  // THUNK
  return (dispatch) => {

    ajax.authLogin(formState)
      .then((response) => {
        // then je sledeci potez nakon neke async funkcije kad ona vrati nesto
        // sto je async funkciji return to je ovoj then funkciji ulazn iargument
        console.log(response);
        if (response && response.data && response.data.data && response.data.data.authLogin) {
          const token = response.data.data.authLogin;
          ajax.storeToken(token); // cuvamo token na hard disk
          ajax.configureHeaders(token); // podesavamo axios da svi buducei pozivi salju toke nkao http header
          // FORM LOGIN PROCEDURA ZAVRSENA
          dispatch(actionAuthAutoLogin()); // AUTOLOGIN PROCEDURA
        }
      })

  };
};


export const actionAuthRegister = (formState) => {
  // THUNK
  return (dispatch) => {

    ajax.authRegister(formState)
      .then(() => {
        // posle registraciej prebacujemo se na rutu LOGIN
        dispatch({
          type: ROUTE_SET,
          payload: 'LOGIN'
        })
      })

  };
};


export const actionAuthLogout = () => {
  // THUNK
  return (dispatch) => {

    ajax.authLogout()
      .then(() => {
        // ovo kada se obavi backend deo logout procedure
        // logout korak 2) brisenje tokena
        ajax.deleteStoredToken(); // brisemo token sa hard diska
        ajax.configureHeaders(null); // brisemo token iz ajax headera
        // logout korak 3) izmena u reduxu da smo izlogovani
        dispatch({
          type: LOGOUT
        });
        // ovim je logout procedura kompletirana
      })

  };
};



export const actionToursNeeded = () => {
  // THUNK
  return (dispatch) => {

    // trazimo podatke od svih tura
    // KORAK 1) pre fetchovanja postavljam ospinner
    dispatch({
      type: TOURS_FETCHING
    });
    setTimeout(() => {
      // strpal iso u setTimeout da bi nam usporilo da bi videli spinner
      ajax.tourGetAll()
        .then((response) => {
          console.log('response za tourGetAll');
          console.log(response);
          if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
            // KORAK kada se fetchovanje zavrsi
            dispatch({
              type: TOURS_FETCHED,
              payload: response.data.data.tourGetAll
            });
          }
        })
    }, 500)

  };
};


export const actionReviewsNeeded = () => {
  // THUNK
  return (dispatch) => {

    // KORAK 1) pre fetchovanja postavljam ospinner
    dispatch({
      type: REVIEWS_FETCHING
    });
    ajax.reviewGetAll()
      .then((response) => {
        console.log('response za reviewGetAll');
        console.log(response);
        if (response && response.data && response.data.data && Array.isArray(response.data.data.reviewGetAll)) {
          // KORAK kada se fetchovanje zavrsi
          dispatch({
            type: REVIEWS_FETCHED,
            payload: response.data.data.reviewGetAll
          });
        }
      })

  };
};


export const actionReviewCreate = (formState) => {
  // THUNK
  return (dispatch) => {

    ajax.reviewCreate(formState)
      .then((response) => {
        console.log('response za create rewie stigao', response);
      })

  };
};


export const actionTourCreate = (formState) => {
  // THUNK
  return (dispatch) => {

    ajax.tourCreate(formState)
      .then((response) => {
        console.log(response);
      })

  };
};

