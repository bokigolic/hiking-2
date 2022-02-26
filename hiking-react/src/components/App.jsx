import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageRouter from './PageRouter';
import { ajax } from '../utils/ajax-adapter';


const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserName = useSelector(state => state.myUserName);

  useEffect(() => {
    // ova funkcija ce biti pozvana samo jednom kad se ova komponenta mountuje
    // a posto je ovo App komponenta koja se sam ojednom mountje i nikad ne dismountuje to je onda samo jednom za zivota apliakcija
    // znaci ovo je idelano mesto da pozovemo inicijanu proceduru

    // INIT
    console.log('test 1')
    // AUTOLOGIN PROCEDURA
    ajax.myUserData()
      .then((response) => {
        console.log('test 2')
        console.log('.then() response za myuserData primljen', response)
        if (response && response.data && response.data.data && response.data.data.myUserData && response.data.data.myUserData._id) {
          // PROEVERNO JE SUCCES RESPONSE
          console.log(response.data.data.myUserData)
          const myUserData = response.data.data.myUserData;
          dispatch({
            // type: 'MY_USER_DATA_FETCHED',
            type: 'LOGIN_SUCCESS',
            payload: myUserData
          });
        }
      })

    console.log('test 3')

  }, []);


  useEffect(() => {
    // trazimo podatke od svih tura
    // KORAK 1) pre fetchovanja postavljam ospinner
    dispatch({
      type: 'TOURS_FETCHING'
    });
    setTimeout(() => {
      // strpal iso u setTimeout da bi nam usporilo da bi videli spinner
      ajax.tourGetAll()
        .then((response) => {
          console.log('response za tourGetAll');
          console.log(response);
          if (response && response.data && response.data.data && Array.isArray(response.data.data.tourGetAll)) {
            // KORAK kada se fetchovanej zavrsi
            dispatch({
              type: 'TOURS_FETCHED',
              payload: response.data.data.tourGetAll
            });
          }
        })
    }, 500)

  }, []);

  const handleClickHome = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'HOME'
    })
  };

  const handleClickRegister = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'REGISTER'
    })
  };

  const handleClickLogin = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'LOGIN'
    })
  };

  const handleClickLogout = (e) => {
    ajax.authLogout()
      .then(() => {
        // ovo kada se obavi backend deo logout procedure
        // logout korak 2) brisenje tokena
        ajax.deleteStoredToken(); // brisemo token sa hard diska
        ajax.configureHeaders(null); // brisemo token iz ajax headera
        // logout korak 3) izmena u reduxu da smo izlogovani
        dispatch({
          type: 'LOGOUT'
        });
        // ovim je logout procedura kompletirana
      })

  };

  const handleClickAbout = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ABOUT'
    })
  };

  const handleClickMyTours = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'MY_TOURS'
    })
  };

  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };

  const handleClickAddReview = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_REVIEW'
    })
  };


  let jsxLoggedInMessage = null;
  let jsxMenu = null;
  if (isLoggedIn) {
    // kada smo ulogovani
    jsxLoggedInMessage = (
      <>
        You are logged in <b>{myUserName}</b>
      </>
    );
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickLogout}>Logout</div>
        <div onClick={handleClickMyTours}>My Tours</div>
        <div onClick={handleClickAddTour}>Add tour</div>
        <div onClick={handleClickAddReview}>Add review</div>
        <div onClick={handleClickAbout}>About...</div>
      </>
    );
  } else {
    // kada smo izlogvani
    jsxMenu = (
      <>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>
        <div onClick={handleClickAbout}>About...</div>
      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking trails
        </p>
        <nav>

          {jsxMenu}
        </nav>
      </header>
      <div className="page-body">
        <p>{jsxLoggedInMessage}</p>
        <PageRouter />
      </div>
    </div>
  );
}

export default App;
