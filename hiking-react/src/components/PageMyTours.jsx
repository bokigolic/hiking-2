import { Box, Button, Container, CssBaseline, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import TourItem from "./TourItem";

const PageMyTours = (props) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours); // uzimamo podatak tours iz globalnog reducovog statea apliakcije

  const myTours = tours; // privremen osve ture tretiramo kao my dok ne bude zavrsen backend

  let jsx = myTours.map((tour, index) => {
    return (
      <tr key={tour._id}>
        <td><TourItem tour={tour} /></td>
        <td>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Edit</Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >Delete</Button>
        </td>
      </tr>
    );
  });

  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };

  return (
    <>
      <h1> My Tours </h1>
      <table className="my-tours">
        <tbody>
          {jsx}
        </tbody>
      </table>
      <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickAddTour}
          >Add new tour</Button>
    </>
  );
};

export default PageMyTours;
