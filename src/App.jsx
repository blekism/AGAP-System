import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DonationPage from "./DonationPage/DonationPage.jsx";
import LogIn from "./Login_Signup/LogIn.jsx";
// import VolunteerSignUp from "./Login_Signup/VolunteerSignUp.jsx";
import DonateVolunteerPage from "./DonateVolunteerPage/DonateVolunteerPage";
import Landing from "./landing_page/landing";
import VolunteerPage from "./VolunteerPage/VolunteerPage";

import VolunteerDashboard from "./VolunteerDashboard/VolunteerDashboard";
import VolunteerPendingDonations from "./VolunteerDashboard/VolunteerDonations/VolunteerPendingDonations";
import VolunteerAcceptedDonations from "./VolunteerDashboard/VolunteerDonations/VolunteerAcceptedDonations";

import AdminPage from "./Admin/AdminPage.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Donate" element={<DonationPage />} />
          <Route path="/Home" element={<DonateVolunteerPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/Volunteers" element={<VolunteerPage />} />
          <Route path="/VolunteerDashboard" element={<VolunteerDashboard />} />
          <Route
            path="/VolunteerPendingDonations"
            element={<VolunteerPendingDonations />}
          />
          <Route
            path="/VolunteerAcceptedDonations"
            element={<VolunteerAcceptedDonations />}
          />

          
          

          
          {/* <Route path="/AdminDashboard" element={<div>Admin Dashboard Component</div>} />
          <Route path="/ManageDonations" element={<div>Manage Donations Component</div>} />
          <Route path="/ManageVolunteers" element={<div>Manage Volunteers Component</div>} />
          <Route path="/ManageDonors" element={<div>Manage Donors Component</div>} />
          <Route path="/ManageEvents" element={<div>Manage Events Component</div>} />
          <Route path="/ViewCalendar" element={<div>View Calendar Component</div>} />
          <Route path="/ManageItems" element={<div>Manage Items Component</div>} />
          <Route path="/Profile" element={<div>Manage Items Component</div>} /> */}

          {/* <Route path="/Volunteer" element={<Volunteer />} /> */}
          {/* <Route path="/YourDonations" element={<YourDonations />} /> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
