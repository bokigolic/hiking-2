import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { ajax } from "../utils/ajax-adapter";

const ReviewItem = (props) => {
  const review = props.review;

  const [userName, setUserName] = useState(''); // lokalni satte samo za ovu turu

  useEffect(() => {
    // pokrece se samo jednom, kad se ova komponenta mountuje
    ajax.userProfileGet(review.user_id)
      .then((response) => {
        console.log('response', response);
        // data.data.userProfileGet._id
        if (response.data.data.userProfileGet.username) {
          setUserName(response.data.data.userProfileGet.username);
        }
      })
  }, [])


  return (
    <div key={review._id}>
      <Rating
        name="rating"
        value={review.rating}
        readOnly
      />
      <div>Review by: ({review.user_id}) {userName}</div>
      <div>{review.rating}</div>
      <div>{review.text}</div>
    </div>
  );
};

export default ReviewItem;