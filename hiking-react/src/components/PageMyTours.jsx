import { Box, Button, Container, CssBaseline, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsNeeded, actionRouteSet, actionRouteWithParamsSet, actionTourDelete, actionToursNeeded } from "../redux/actions";
import Spinner from "./Spinner";
import TourItem from "./TourItem";


const PageMyTours = (props) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours); // uzimamo podatak tours iz globalnog reducovog statea apliakcije
  const routeFreshness = useSelector((state) => state.routeFreshness);
  const myUserId = useSelector((state) => state.myUserId);

  useEffect(() => {
    // bice pozvan svaki put kad se routeFreshness promeni
    dispatch(actionToursNeeded());
    dispatch(actionReviewsNeeded());
  }, [routeFreshness]);


  const handleClickAddTour = (e) => {
    dispatch(actionRouteSet('ADD_TOUR'))
  };

  const _handleClickEditTour = (tour_id) => {
    dispatch(actionRouteWithParamsSet('EDIT_TOUR', {
      tour_id: tour_id
    }))
  };
  const _handleClickDeleteTour = (tour_id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      console.log('deleting tour_id:', tour_id);
      dispatch(actionTourDelete(tour_id));
    }
  };

  // const myTours = tours.data; // privremen osve ture tretiramo kao my dok ne bude zavrsen backend
  const myTours = tours.data.filter((tour)=>{
    if (tour.user_id === myUserId) {
      // my tour
      return true; // ostaje u nizu My tours
    }
    return false; // not my tour
  }); // privremen osve ture tretiramo kao my dok ne bude zavrsen backend

  let jsxSpinner = null;
  if (tours.fetching) {
    jsxSpinner = (
      <Spinner />
    );
  }

  let jsx = myTours.map((tour, index) => {
    const tour_id = tour._id;
    return (
      <tr key={tour._id}>
        <td><TourItem tour={tour} /></td>
        <td>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => { _handleClickEditTour(tour_id) }}
          >Edit</Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => { _handleClickDeleteTour(tour_id) }}
          >Delete</Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1> My Tours </h1>
      <table className="my-tours">
        <tbody>
          {jsxSpinner}
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
