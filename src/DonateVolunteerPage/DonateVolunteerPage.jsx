import React from "react";
import "./DonateVolunteerPage.css";
import CallforDonation from "../assets/CallforDonation.png";
import Donate from "../assets/Donate.png";
import AgapFooter from "../Page/AgapFooter.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../Page/NavBar.jsx";

export default function DonateVolunteerPage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/SignInPage"); // Replace '/SignInPage' with the actual path ng sign-in page
  };

  return (
    <>
      {/*nav start*/}
      <NavBar />
      {/*nav end*/}

      {/*parent cont start*/}
      <div className="DonateVolunteerPage-parentCont">
        {/*header cont start*/}
        <div className="DonateVolunteerPage-headerCont">
          {/*container palang to para dun sa header na wala pa mahanap*/}
        </div>

        {/*body cont start*/}
        <div className="DonateVolunteerPage-bodyCont">
          {/*top cont start*/}
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

          {/*button cont start*/}
          <div className="DonateVolunteerPage-buttonContainer">
            <button
              className="DonateVolunteerPage-button"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          {/*button cont start*/}

          <p
            style={{
              fontSize: "20px",
            }}
          >
            Sign in to donate or apply as a ComEx volunteer.
          </p>
          {/*top cont end*/}

          <hr className="border DonateVolunteerPage-custom-border border-2 opacity-100" />

          {/*bottom cont start*/}
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
          {/*bottom cont end*/}
        </div>
        {/*body cont end*/}

        <AgapFooter />
      </div>
      {/*parent cont end*/}
    </>
  );
}
