import React from "react";
import "./App.css";
import DonateVolunteerPage from "./DonateVolunteerPage/DonateVolunteerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./DonateVolunteerPage/SignInPage.jsx";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<DonateVolunteerPage />} />
            <Route path="/SignInPage" element={<SignInPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
