import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import FeedbackList from "./Components/FeedbackList";
import FeedbackStats from "./Components/FeedbackStats";
import FeedbackForm from "./Components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AbouticonLink from "./Components/AbouticonLink";
import FeedbackContext, { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AbouticonLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;

//FeedbackList feedback={feedback} Pass in the feedback values, currently it uses the default useState(FeedbackData)
