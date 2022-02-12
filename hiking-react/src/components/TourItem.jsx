import { useSelector } from "react-redux";


const calculateAverageRating = (reviews, tour_id)=> {
  let averageRating = 0;
  let totalRating = 0;
  let count = 0;
  reviews.forEach((review)=>{
    if (review.tour_id === tour_id) {
      // znaci ovo je review koji pripada toj turi i za njega uzimamo rating u obzir za racunanje
      totalRating += review.rating; //       totalRating = totalRating + review.rating;
      count++; // count += 1;
    }
  });
  if (count !== 0) {
    averageRating = totalRating / count;
  }
  return averageRating;
};


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
    </div>
  )
};

export default TourItem;