export const calculateAverageRating = (reviews, tour_id)=> {
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