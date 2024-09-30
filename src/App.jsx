import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DonationPage from "./DonationPage/DonationPage.jsx";
import LogIn from "./Login_Signup/LogIn.jsx";
import VolunteerSignUp from "./Login_Signup/VolunteerSignUp.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<LogIn />} />
          <Route path="/Donate" element={<DonationPage />} />
          {/* <Route path="/Volunteer" element={<Volunteer />} /> */}
          {/* <Route path="/YourDonations" element={<YourDonations />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
