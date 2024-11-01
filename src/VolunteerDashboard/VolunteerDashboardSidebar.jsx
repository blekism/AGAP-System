import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./VolunteerDashboardSidebar.css";
import Logout from "../assets/images/logout.png";
import Dashboard from "../assets/images/Dashboard.png";
import Donation from "../assets/images/Donation.png";
import LogRecord from "../assets/images/LogRecord.png";

export default function VolunteerDashboardSidebar() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["donor_token"]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("VolunteerDashboard")) {
      setActiveLink("dashboard");
    } else if (path.includes("VolunteerPendingDonations")) {
      setActiveLink("pending");
    } else if (path.includes("VolunteerAcceptedDonations")) {
      setActiveLink("accepted");
    } else if (path.includes("VolunteerLogPhase2")) {
      setActiveLink("phase2");
    } else if (path.includes("VolunteerLogPhase3")) {
      setActiveLink("phase3");
    } else if (path.includes("Home")) {
      setActiveLink("calendar");
    } else if (path.includes("settings")) {
      setActiveLink("settings");
    }
  }, [location]);

  const handleLogout = () => {
    removeCookie("donor_token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="VolunteerDashboard-sidebarCont">
        <div className="VolunteerDashboard-sidebarContTop">
          <div className="VolunteerDashboard">
            {/* lahat ng links dito is icchange pa*/}
            <img src={Dashboard} alt="Dashboard Icon" />
            <Link
              to="/VolunteerDashboard"
              className={`VolunteerDashboard-sidebarLink ${
                activeLink === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </Link>
          </div>

          <div className="VolunteerDashboardDonations">
            <div className="VolunteerDashboardDonations-Header">
              <img src={Donation} alt="Donations Icon" />
              <p style={{ marginLeft: "10px" }}>Donations</p>
            </div>

            <div className="VolunteerDashboardDonations-Sub">
              <Link
                to="/VolunteerPendingDonations"
                className={`VolunteerDashboard-sidebarLink ${
                  activeLink === "pending" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("pending")}
              >
                Pending
              </Link>
              <Link
                to="/VolunteerAcceptedDonations"
                className={`VolunteerDashboard-sidebarLink ${
                  activeLink === "accepted" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("accepted")}
              >
                Accepted
              </Link>
            </div>
          </div>

          <div className="VolunteerLog">
            <div className="VolunteerLog-Header">
              <img src={LogRecord} alt="Donations Icon" />
              <p style={{ marginLeft: "10px" }}>Log Records</p>
            </div>

            <div className="VolunteerLog-Sub">
              <Link
                to="/VolunteerLogPhase2"
                className={`VolunteerDashboard-sidebarLink ${
                  activeLink === "phase2" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("phase2")}
              >
                Phase 2
              </Link>
              <Link
                to="/VolunteerLogPhase3"
                className={`VolunteerDashboard-sidebarLink ${
                  activeLink === "phase3" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("phase3")}
              >
                Phase 3
              </Link>
            </div>
          </div>
        </div>

        <div className="VolunteerDashboard-sidebarContBottom">
          <div className="VolunteerDashboardLogout-ButtonContainer">
            <img src={Logout} alt="Logout Icon" />
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
