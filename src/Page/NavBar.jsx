import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AGAP from "../assets/images/AGAP.png";

export default function NavBar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ margin: "0px" }}
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
                <Link to="/" className="nav-link">
                  {/* change to logged in na home */}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Donate" className="nav-link">
                  Donate
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Volunteers" className="nav-link">
                  Volunteers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/YourDonations" className="nav-link">
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
