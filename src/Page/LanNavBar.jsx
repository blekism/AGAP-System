import React from "react";
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
              <li
                className="nav-item"
                style={{
                  marginRight: "20px",
                  textAlign: "center",
                  fontfamily: "Poppins",
                  fontsize: "25px",
                  fontstyle: "normal",
                  fontweight: "500",
                }}
              >
                <Link
                  to="/Home"
                  className="nav-link"
                  style={{ color: "#354290", textdecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li
                className="nav-item"
                style={{
                  marginRight: "20px",
                  textAlign: "center",
                  fontfamily: "Poppins",
                  fontsize: "25px",
                  fontstyle: "normal",
                  fontweight: "500",
                }}
              >
                <Link
                  to="/LogIn"
                  className="nav-link"
                  style={{ color: "#354290", textdecoration: "none" }}
                >
                  Donate
                </Link>
              </li>
              <li
                className="nav-item"
                style={{
                  marginRight: "20px",
                  textAlign: "center",
                  fontfamily: "Poppins",
                  fontsize: "25px",
                  fontstyle: "normal",
                  fontweight: "500",
                }}
              >
                <Link
                  to="/Volunteers"
                  className="nav-link"
                  style={{ color: "#354290", textdecoration: "none" }}
                >
                  Volunteers
                </Link>
              </li>
              <li
                className="nav-item"
                style={{
                  marginRight: "20px",
                  textAlign: "center",
                  fontfamily: "Poppins",
                  fontsize: "25px",
                  fontstyle: "normal",
                  fontweight: "500",
                }}
              >
                <Link
                  to="/LogIn"
                  className="nav-link"
                  style={{ color: "red", textdecoration: "none" }}
                >
                  Sign Up or Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
