import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import FormTour from "./FormTour";
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
  } else if (route === 'ADD_TOUR') {
    jsx = (
      <FormTour />
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