import { Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";

const PageSingleTour = (props) => {
  const tours = useSelector((state) => state.tours); // uzimamo routeParams iz redux statea
  const routeParams = useSelector((state) => state.routeParams); // uzimamo routeParams iz redux statea
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);

  const [tour, setTour] = useState({});

  useEffect(() => {
    // pokrece se samo kad primi podatke tour_id i tours
    const tour = getSingleTourById(tour_id, tours);
    setTour(tour);
  }, [tour_id, tours]);

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const filteredReviews = reviews.data.filter((review) => {
    if (review.tour_id === tour_id) {
      // to je review od ove ture
      return true; // otsaje unizu
    }
    return false;
  });

  // let jsxReviews = reviews.map((review)=>{
  let jsxReviews = filteredReviews.map((review) => {
    return (
      <div key={review._id}>
        <Rating
          name="rating"
          value={review.rating}
          readOnly
        />
        <div>{review.rating}</div>
        <div>{review.text}</div>
      </div>
    );
  });

  return (
    <div>
      <h1>{tour.name}</h1>
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

      <h2>Reviews</h2>
      {jsxReviews}
    </div>
  );
};

export default PageSingleTour;