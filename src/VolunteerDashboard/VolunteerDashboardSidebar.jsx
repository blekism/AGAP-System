import React from "react";
import { Link } from "react-router-dom";
import "./VolunteerDashboardSidebar.css";

export default function VolunteerDashboardSidebar() {
  return (
    <>
      <div className="VolunteerDashboard-sidebarCont">
        <div className="VolunteerDashboard-sidebarContTop">
          <div className="VolunteerDashboard">
            {/* lahat ng links dito is icchange pa*/}
            <Link
              to="/VolunteerDashboard"
              className="VolunteerDashboard-sidebarLink"
            >
              Dashboard
            </Link>
          </div>

          <div className="VolunteerDashboardDonations">
            <p>Donations</p>
            <div className="VolunteerDashboardDonations-Sub">
              <Link
                to="/VolunteerPendingDonations"
                className="VolunteerDashboard-sidebarLink"
              >
                Pending
              </Link>
              <Link to="/Home" className="VolunteerDashboard-sidebarLink">
                Accepted
              </Link>
            </div>
          </div>

          <div className="VolunteerDashboardYourRecords">
            <p>Your Records</p>
            <div className="VolunteerDashboardYourRecords-Sub">
              <Link to="/Home" className="VolunteerDashboard-sidebarLink">
                Attendance
              </Link>
              <Link to="/Home" className="VolunteerDashboard-sidebarLink">
                Turnover
              </Link>
            </div>
          </div>

          <div className="VolunteerDashboardDonations">
            <Link to="/Home" className="VolunteerDashboard-sidebarLink">
              View Calendar
            </Link>
          </div>
        </div>

        <div className="VolunteerDashboard-sidebarContBottom">
          <div className="VolunteerDashboardSettings">
            <Link to="/Home" className="VolunteerDashboard-sidebarLink">
              Settings
            </Link>
          </div>

          <div className="VolunteerDashboardLogout-ButtonContainer">
            <img alt="Items Icon" />
            <button className="VolunteerDashboardLogout-button">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
