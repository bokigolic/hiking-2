import React from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

const MojaKomponenta = () => {
  return <p>MojaKomponenta</p>;
};
//<FormLogin /> Javlja mi greeku da FormLogin nije definisana//
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hiking Trails</p>
        <MojaKomponenta />
        <MojaKomponenta />
        <MojaKomponenta />
        <FormLogin />
        <FormRegister />
      </header>
    </div>
  );
};

export default App;
