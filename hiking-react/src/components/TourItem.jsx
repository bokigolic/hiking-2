import { Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateAverageRating } from "../utils/tour-utils";

const TourItem = (props) => {
  const dispatch = useDispatch();
  const tour = props.tour;

  const reviews = useSelector(state => state.reviews);
  const tour_id = tour._id;

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const handleClickSingleTour = (e) => {
    dispatch({
      type: 'ROUTE_WITH_PARAMS_SET',
      payload: {
        route: 'TOUR',
        params: {
          tour_id: tour_id
        }
      }
    })
  };

  return (
    <div>
      <h4 onClick={handleClickSingleTour}>{tour.name}</h4>
      <div>{tour.description}</div>
      <div>Date: {tour.date}</div>
      <div>Trail length: {tour.trail_length}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Myx. number of participants: {tour.max_participants}</div>
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