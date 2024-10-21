import React, { useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AGAP from "../assets/images/agapnew.png";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    if (!cookies.donor_token) {
      window.location.href = "/";
    } else {
      console.log("cookieeeeeees is valid");
    }
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ margin: "0px", height: "10vh" }}
      >
        <div className="container-fluid">
          <img
            src={AGAP}
            alt="agap logo"
            style={{
              width: "100px",
              height: "100px",
              marginLeft: "60px",
              marginTop: "0",
            }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/LandingPage" className="nav-link">
                  {/* change to logged in na home */}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Donate" className="nav-link">
                  Donate
                </Link>
              </li>
              {/* gawing conditial render yung part ng volunteers */}
              <li className="nav-item">
                <Link to="/VolunteerConditionalRender" className="nav-link">
                  Volunteers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ProfilePage" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/YourDonation" className="nav-link">
                  Your Donations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
