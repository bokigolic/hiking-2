import React from 'react';
import { useDispatch } from 'react-redux';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import PageRouter from './PageRouter';


const App = () => {
  const dispatch = useDispatch()

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

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hiking trails
        </p>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>
        <div onClick={handleClickAbout}>About...</div>
      </header>
      <PageRouter />
    </div>
  );
}

export default App;
