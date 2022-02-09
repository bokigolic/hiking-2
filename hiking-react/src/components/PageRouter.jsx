import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import PageHome from "./PageHome";

const PageRouter = () => {
  const route = useSelector(state => state.route); // uzimamo podatak route iz globalnog reducovog statea apliakcije

  let jsx = null;
  if (route === 'HOME') {
    jsx = (
      <PageHome />
    );
  } else if (route === 'REGISTER') {
    jsx = (
      <FormRegister />
    );
  } else if (route === 'LOGIN') {
    jsx = (
      <FormLogin />
    );
  } else {
    jsx = (
      <p>Page not found!</p>
    );
  }

  return (
    <>
      {jsx}
    </>
  )
};

export default PageRouter;