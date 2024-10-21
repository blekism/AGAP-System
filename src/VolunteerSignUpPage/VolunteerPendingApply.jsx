import React from "react";
import bgImage from "../assets/images/agap_login.png";
import { useNavigate } from "react-router-dom";

function VolunteerPendingApply() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/LandingPage");
  };
  return (
    <div>
      <>
        <div
          className="login-container"
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
          <div className="form-box">
            <h2 className="form-title">Application Pending!</h2>
            <p style={{ paddingTop: "20px" }}>
              Your Application is pending. Please wait for Comex to contact you
              for your interview!
            </p>
            <button onClick={goToHome} className="btn btn-primary">
              Go back to Home
            </button>
          </div>
        </div>
      </>
    </div>
  );
}

export default VolunteerPendingApply;
