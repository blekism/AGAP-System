import React from "react";
import bgImage from "../assets/images/agap_login.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/agap_logo1.png";
import "./VolunteerPendingApply.css";

function VolunteerPendingApply() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/LandingPage");
  };
  return (
    <>
      <div
        className="VolunteerPendingApplyParentCont"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="VolunteerPendingApplyChildCont">
          <div className="VolunteerPendingApplyHeaderCont">
            <h2
              className="form-title"
              style={{ paddingTop: "30px", fontWeight: "bold" }}
            >
              Application Pending!
            </h2>
            <div className="VolunteerPendingApplyHeaderCont-logo">
              <img src={logo} alt="AGAP Logo" className="logo" />
            </div>
          </div>

          <div className="VolunteerPendingApplyContentCont">
            <p style={{ paddingTop: "20px" }}>
              Your Application is pending. Please wait for Comex to contact you
              for your interview!
            </p>
            <button onClick={goToHome} className="btn btn-primary">
              Go back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerPendingApply;
