import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DonationPage from "./DonationPage/DonationPage.jsx";
import LogIn from "./Login_Signup/LogIn.jsx";
// import VolunteerSignUp from "./Login_Signup/VolunteerSignUp.jsx";
import DonateVolunteerPage from "./DonateVolunteerPage/DonateVolunteerPage";
import Landing from "./landing_page/landing";
import VolunteerPage from "./VolunteerPage/VolunteerPage";
import VolunteerDashboard from "./VolunteerDashboard/VolunteerDashboard";
import VolunteerPendingDonations from "./VolunteerDashboard/VolunteerPendingDonations/VolunteerPendingDonations";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Donate" element={<DonationPage />} />
          <Route path="/Home" element={<DonateVolunteerPage />} />
          <Route path="/Volunteers" element={<VolunteerPage />} />
          <Route path="/VolunteerDashboard" element={<VolunteerDashboard />} />
          <Route
            path="/VolunteerPendingDonations"
            element={<VolunteerPendingDonations />}
          />
          {/* <Route path="/Volunteer" element={<Volunteer />} /> */}
          {/* <Route path="/YourDonations" element={<YourDonations />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
