import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthAutoLogin, actionAuthLogout,  actionReviewsNeeded, actionRouteSet, actionToursNeeded } from '../redux/actions';
import PageRouter from './PageRouter';


const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserName = useSelector(state => state.myUserName);

  useEffect(() => {
    // ova funkcija ce biti pozvana samo jednom kad se ova komponenta mountuje
    // a posto je ovo App komponenta koja se sam ojednom mountje i nikad ne dismountuje to je onda samo jednom za zivota apliakcija
    // znaci ovo je idelano mesto da pozovemo inicijanu proceduru

    // INIT
    dispatch(actionAuthAutoLogin()); // AUTOLOGIN procedura

  }, []);

  useEffect(() => {

    dispatch(actionToursNeeded());
    dispatch(actionReviewsNeeded());

  }, []);


  // HANDLERI ZA CLICKOVE NA OPCIJE

  const handleClickHome = (e) => {
    dispatch(actionRouteSet('HOME'));
  };

  const handleClickRegister = (e) => {
    dispatch(actionRouteSet('REGISTER'));
  };
  
  const handleClickLogin = (e) => {
    dispatch(actionRouteSet('LOGIN'));
  };
  
  const handleClickLogout = (e) => {
    dispatch(actionAuthLogout());
  };
  
  const handleClickAbout = (e) => {
    dispatch(actionRouteSet('ABOUT'));
  };

  const handleClickMyTours = (e) => {
    dispatch(actionRouteSet('MY_TOURS'));
  };
  
  const handleClickAddTour = (e) => {
    dispatch(actionRouteSet('ADD_TOUR'));
  };
  
  const handleClickAddReview = (e) => {
    dispatch(actionRouteSet('ADD_REVIEW'));
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
