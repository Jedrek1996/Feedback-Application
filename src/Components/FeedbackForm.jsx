import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  // Takes in a callback and an array of dependcy (if it changes useEffect will run)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false);
      setText(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const setRate = (rating) => {
    console.log("parent");
    setRating(rating);
  };

  const handleTextChange = (e) => {
    if (text === "") {
      setbtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setbtnDisabled(true);
      setMessage("Text must be 10 characters or more!");
    } else {
      setbtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };

  // Create new array of feedback. The new rating is from the RatingSelect prop
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      //Handle add pushes the data to the app
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRate} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled} version="secondary">
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
