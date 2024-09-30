import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DonationPage from "./DonationPage/DonationPage.jsx";
import LogIn from "./Login_Signup/LogIn.jsx";
import VolunteerSignUp from "./Login_Signup/VolunteerSignUp.jsx";
import DonateVolunteerPage from "./DonateVolunteerPage/DonateVolunteerPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Donate" element={<DonationPage />} />
          <Route path="/Home" element={<DonateVolunteerPage />} />
          {/* <Route path="/Volunteer" element={<Volunteer />} /> */}
          {/* <Route path="/YourDonations" element={<YourDonations />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
