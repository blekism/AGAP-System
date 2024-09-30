import React from "react";
import "./VolunteerSignUp.css";
import bgImage from "../assets/images/agap_login.png";

function VolunteerSignUp() {
  return (
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
      {/* Add your sign-up form or content here */}
      <div className="signup-form">
        <h2>Volunteer Sign Up</h2>
        <form>{/* Form fields go here */}</form>
      </div>
    </div>
  );
}

export default VolunteerSignUp;
