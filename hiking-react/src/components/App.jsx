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
  if (isLoggedIn) {
    jsxLoggedInMessage = (
      <>
        You are logged in <b>{myUserName}</b>
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
          <div onClick={handleClickHome}>Home</div>
          <div onClick={handleClickRegister}>Register</div>
          <div onClick={handleClickLogin}>Login</div>
          <div onClick={handleClickMyTours}>My Tours</div>
          <div onClick={handleClickAddTour}>Add tour</div>
          <div onClick={handleClickAddReview}>Add review</div>
          <div onClick={handleClickAbout}>About...</div>
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
