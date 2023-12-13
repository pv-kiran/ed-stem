import { Route, Routes } from "react-router-dom";
import "./App.css";
import SurveyForm from "./components/SurveyForm";
import SurveyDetails from "./components/SurveyDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SurveyForm></SurveyForm>}></Route>
        <Route
          path="/survey/:id"
          element={<SurveyDetails></SurveyDetails>}></Route>
      </Routes>
    </>
  );
}

export default App;
