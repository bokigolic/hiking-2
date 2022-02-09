import React from "react";
import { useDispatch } from "react-redux";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import PageROuter from "./PageRouter";

const MojaKomponenta = () => {
  return <p>MojaKomponenta</p>;
};
//<FormLogin /> Javlja mi greeku da FormLogin nije definisana//
const App = () => {
  const dispatch = useDispatch();

  const handleClickHome = (e) => {
    dispatch({
      type: "ROUTE_SET",
      payload: "HOME",
    });
  };

  const handleClickRegister = (e) => {
    dispatch({
      type: "ROUTE_SET",
      payload: "REGISTER",
    });
  };

  const handleClickLogin = (e) => {
    dispatch({
      type: "ROUTE_SET",
      payload: "LOGIN",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hiking Trails</p>
        <div onClick={handleClickHome}>Home</div>
        <div onClick={handleClickRegister}>Register</div>
        <div onClick={handleClickLogin}>Login</div>
      </header>
      <PageROuter />
      <MojaKomponenta />
      <MojaKomponenta />
      <MojaKomponenta />
      <FormLogin />
      <FormRegister />
    </div>
  );
};

export default App;
