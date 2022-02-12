import { Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { calculateAverageRating } from "../utils/tour-utils";

const TourItem = (props) => {
  const tour = props.tour;

  const review = useSelector(state => state.reviews);
  const tour_id = tour._id;

  let averageRating = calculateAverageRating(review, tour_id);

  return (
    <div>
      <h4>{tour.name}</h4>
      <div>{tour.description}</div>
      <div>{tour.date}</div>
      <div>{tour.trail_length}</div>
      <div>{tour.difficulty}</div>
      <div>{tour.max_participants}</div>
      <div>Average rating: {averageRating}</div>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
    </div>
  )
};

export default TourItem;