import { useEffect, useState } from "react";
import { Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actionRouteWithParamsSet } from "../redux/actions";
import { calculateAverageRating } from "../utils/tour-utils";
import { ajax } from "../utils/ajax-adapter";

const TourItem = (props) => {
  const dispatch = useDispatch();
  const tour = props.tour;

  const reviews = useSelector(state => state.reviews);
  const tour_id = tour._id;

  const [userName, setUserName] = useState(''); // lokalni satte samo za ovu turu

  useEffect(() => {
    // pokrece se samo jednom, kad se ova komponenta mountuje
    ajax.userProfileGet(tour.user_id)
      .then((response) => {
        console.log('response', response);
        // data.data.userProfileGet._id
        if (response.data.data.userProfileGet.username) {
          setUserName(response.data.data.userProfileGet.username);
        }
      })
  }, [])

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const handleClickSingleTour = (e) => {
    dispatch(actionRouteWithParamsSet('TOUR', {
      tour_id: tour_id
    }))
  };

  return (
    <div>
      <h4 onClick={handleClickSingleTour}>{tour.name}</h4>
      <div>{tour.description}</div>
      <div>Created by: {tour.user_id} - usename: {userName}</div>
      <div>Date: {tour.date}</div>
      <div>Trail length: {tour.trail_length}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Max. number of participants: {tour.max_participants}</div>
      <div>Average rating: {averageRating}</div>
      <Typography component="legend">Average rating</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
    </div>
  )
};

export default TourItem;