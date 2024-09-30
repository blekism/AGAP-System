import React from "react";
import "./VolunteerPage.css";
import Footer from "../Page/AgapFooter.jsx";
import NavBar from "../Page/LanNavBar.jsx";
import VPageImage1 from "../assets/images/VPageImage1.png";
import VPageImage2 from "../assets/images/VPageImage2.png";
import VPageImage3 from "../assets/images/VPageImage3.png";
import { useNavigate } from "react-router-dom";

export default function VolunteerPage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate(""); // Replace '/SignInPage' with the actual path ng sign-in page
  };

  return (
    <>
      {/*nav start*/}
      <NavBar />
      {/*nav end*/}

      {/*parent cont start*/}
      <div className="VolunteerPage-parentCont">
        {/*header cont start*/}
        <div className="VolunteerPage-headerCont">
          {/*container palang to para dun sa header na wala pa mahanap*/}
        </div>

        {/*body cont start*/}
        <div className="VolunteerPage-bodyCont">
          {/*left cont start*/}
          <div className="VolunteerPage-leftCont">
            <h1>
              Be a <br />
              Volunteer
            </h1>
            <p>
              As a volunteer with the NUD Community Exchange, you'll get to help
              others and learn new skills along the way. It's also a great way
              to meet new people and be part of something meaningful!
            </p>

            {/*button cont start*/}
            <div className="VolunteerPage-buttonContainer">
              <button
                className="VolunteerPage-button"
                onClick={handleSignInClick}
              >
                Apply Here
              </button>
            </div>
            {/*button cont start*/}
          </div>
          {/*left cont end*/}

          {/*right cont start*/}
          <div className="VolunteerPage-rightCont">
            <img
              src={VPageImage1}
              alt="volunteerimg"
              className="image"
              style={{ width: "95%", height: "20vh" }}
            />
            <img
              src={VPageImage2}
              alt="volunteerimg"
              className="image"
              style={{ width: "95%", height: "25vh" }}
            />
            <img
              src={VPageImage3}
              alt="volunteerimg"
              className="image"
              style={{ width: "95%", height: "20vh" }}
            />
          </div>
          {/*right cont end*/}
        </div>
        {/*body cont end*/}

        {/*footer start*/}
        <Footer />
        {/*footer end*/}
      </div>
    </>
  );
}
