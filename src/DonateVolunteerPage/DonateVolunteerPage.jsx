import React from "react";
import "./DonateVolunteerPage.css";
import CallforDonation from "../assets/CallforDonation.png";
import Donate from "../assets/Donate.png";
import AgapFooter from "./AgapFooter";
import { useNavigate } from "react-router-dom";

export default function DonateVolunteerPage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/SignInPage"); // Replace '/SignInPage' with the actual path ng sign-in page
  };

  return (
    <>
      <div className="DonateVolunteerPage-navbarCont"></div>

      <div className="DonateVolunteerPage-parentCont">
        <div className="DonateVolunteerPage-headerCont"></div>
        <div className="DonateVolunteerPage-bodyCont">
          <div className="DonateVolunteerPage-topCont">
            <img
              src={CallforDonation}
              alt="NU Logo"
              className="image"
              style={{ width: "25%", height: "30vh" }}
            />
            <img
              src={CallforDonation}
              alt="NU Logo"
              className="image"
              style={{
                width: "25%",
                height: "30vh",
              }}
            />
            <img
              src={CallforDonation}
              alt="NU Logo"
              className="image"
              style={{
                width: "25%",
                height: "30vh",
              }}
            />
          </div>
          <hr className="border DonateVolunteerPage-custom-border border-2 opacity-100" />
          <p
            style={{
              fontSize: "32px",
            }}
          >
            Do you want to help other people by donating and be a <br />{" "}
            volunteer to NU-D Community Extension?
          </p>
          <div className="DonateVolunteerPage-buttonContainer">
            <button
              className="DonateVolunteerPage-button"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Sign in to donate or apply as a ComEx volunteer.
          </p>
          <hr className="border DonateVolunteerPage-custom-border border-2 opacity-100" />
          <div className="DonateVolunteerPage-bottomCont">
            <img
              src={Donate}
              alt="NU Logo"
              className="image"
              style={{
                width: "35%",
                height: "30vh",
              }}
            />
            <img
              src={Donate}
              alt="NU Logo"
              className="image"
              style={{
                width: "35%",
                height: "30vh",
              }}
            />
          </div>
        </div>
        <AgapFooter />
      </div>
    </>
  );
}
