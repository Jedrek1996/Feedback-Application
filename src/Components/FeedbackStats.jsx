import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  //Calculate reading average
  let average =
    feedback.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;

/*
1-feedback.reduce to sum up the total ratings and divide after 
2-average = average.toFixed(1).replace(/[.,]0$/, ""); To show 1 decimal place and remove values with 0 decimals
3- {isNaN(average) ? 0 : average} If the values is not a number = 0 if not return average*/
