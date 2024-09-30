
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DonationPage from "./DonationPage/DonationPage.jsx";
import LogIn from './LogIn'
import VolunteerSignUp from "./VolunteerSignUp"

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<VolunteerSignUp />} />
          <Route path="/Donate" element={<DonationPage />} />   
          {/* <Route path="/Volunteer" element={<Volunteer />} /> */}
          {/* <Route path="/YourDonations" element={<YourDonations />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    <>
   
  )
}

export default App
