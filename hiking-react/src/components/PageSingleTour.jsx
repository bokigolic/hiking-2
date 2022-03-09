import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsNeeded } from "../redux/actions";
import { Button, Rating, Typography } from "@mui/material";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";
import FormReview from "./FormReview";
import ReviewItem from "./ReviewItem";
import { ajax } from "../utils/ajax-adapter";


const checkIJoined = (isLoggedIn, myUserId, participants) => {
  // funkcioja otrkiva da li sam ja joinovao ovu turu
  let i_am_participant = false;
  if (isLoggedIn) {
    // ako smo ulogovani
    participants.forEach((item) => {
      if (item.user_id === myUserId) {
        i_am_participant = true;
      }
    });
  } else {
    // ako nismo ulogovani nismo ni joinovali
  }
  return i_am_participant;
};


const PageSingleTour = (props) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours); // uzimamo routeParams iz redux statea
  const routeParams = useSelector((state) => state.routeParams); // uzimamo routeParams iz redux statea
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);
  const routeFreshness = useSelector((state) => state.routeFreshness);

  const [participants, setParticipants] = useState([]);
  const numberOfParticipants = participants.length;

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserId = useSelector(state => state.myUserId);
  const i_am_participant = checkIJoined(isLoggedIn, myUserId, participants);

  useEffect(() => {
    // bice pozvan svaki put kad se routeFreshness promeni

    dispatch(actionReviewsNeeded()); // refresh reviewsa

    // refresh participants
    ajax.tourParticipantsGet(tour_id)
      .then((response) => {
        console.log('response za aprticipnte se vratio');
        console.log(response);
        if (response && response.data && response.data.data && Array.isArray(response.data.data.tourParticipantsGet)) {
          setParticipants(response.data.data.tourParticipantsGet); // upisujumo participante iz baze u lokalni state ove komponente
        }
      })

  }, [routeFreshness]);

  const [tour, setTour] = useState({});

  useEffect(() => {
    // pokrece se samo kad primi podatke tour_id i tours
    const tour = getSingleTourById(tour_id, tours.data);
    setTour(tour);
  }, [tour_id, tours]);

  const handleClickJoin = (e) => {
    console.log('click join...');
    ajax.tourJoin(tour_id)
      .then((response) => {
        // ovde pozivamo refrresh na osnovu kojeg cem oda dobijemo svezije participante
        dispatch({
          type: 'REFRESH'
        });
      })

  };

  const handleClickLeave = (e) => {
    console.log('click leave...');
    ajax.tourLeave(tour_id)
      .then((response) => {
        // ovde pozivamo refrresh na osnovu kojeg cem oda dobijemo svezije participante
        dispatch({
          type: 'REFRESH'
        });
      })

  };


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
      <ReviewItem review={review} />
    );
  });

  let jsxBtnJoinLeave = null;
  if (i_am_participant) {
    // leave
    jsxBtnJoinLeave = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickLeave}
      >Leave</Button>
    );
  } else {
    // join
    jsxBtnJoinLeave = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickJoin}
      >Join</Button>
    );
  }


  return (
    <div>
      <h1>{tour.name}</h1>
      <div>{tour.description}</div>
      <div>Date: {tour.date}</div>
      <div>Trail length: {tour.trail_length}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Max. number of participants: {tour.max_participants}</div>
      <div>Already joined: {numberOfParticipants}</div>
      <div>Average rating: {averageRating}</div>
      <Typography component="legend">Average rating</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
      <br />
      {jsxBtnJoinLeave}
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => { }}
      >Like</Button>

      <h2>Reviews</h2>
      {jsxReviews}
      <FormReview tour_id={tour_id} />
    </div>
  );
};

export default PageSingleTour;