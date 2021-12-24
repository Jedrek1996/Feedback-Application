import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: "Item from context1", rating: 10 },
    { id: 2, text: "Item from context2", rating: 20 },
    { id: 3, text: "Item from context3", rating: 30 },
  ]);

  //Item empty object when click on edit id rating text will go in
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  //Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  //SET ITEM TO BE UPDATED it feedbackitem
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

//Context provider allow other components to access the state. And wraps whatever components needs the data.
//Anything that is to be passed is to be stored in value
//Dont need to pass props through each components and easier to use

// FeedbackContext.Provider value={{state,function}}; whatever you want to use that is stored in the context

// TO useContext, Import useContext form react and import FeedbackContenxt to where you want to use.
//In apps js wrap whatever that will be using the state with FeedbackProvider
//const {feedback} = useContext(FeedbackContext) to pull out the function/state from the specific context
