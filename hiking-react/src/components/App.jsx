import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageRouter from './PageRouter';
import { ajax } from '../utils/ajax-adapter';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ova funkcija ce biti pozvana samo jednom kad se ova komponenta mountuje
    // a posto je ovo App komponenta koja se sam ojednom mountje i nikad ne dismountuje to je onda samo jednom za zivota apliakcija
    // znaci ovo je idelano mesto da pozovemo inicijanu proceduru

    // INIT
    ajax.myUserData()

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
        <PageRouter />
      </div>
    </div>
  );
}

export default App;
