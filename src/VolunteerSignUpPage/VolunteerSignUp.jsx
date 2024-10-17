import React, { useState } from "react";
import "./VolunteerSignUp.css";
import bgImage from "../assets/images/agap_login.png";
import VerifyAccount from "./VerifyAccount.jsx"; // Import the VerifyAccount component

function VolunteerSignUp() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleApplyClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setPopupVisible(true); // Show the popup
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // Close the popup
  };

  const handleSubmitPopup = () => {
    alert("Account verified!"); // Perform your form submission logic here
    setPopupVisible(false); // Close the popup after verification
  };

  return (
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
          <h2 className="form-title">FORMS</h2>
          <form onSubmit={handleApplyClick}>
            <div className="form-group">
              <select id="event" name="event">
                <option value="">Choose Event Name:</option>
                <option value="event1">Event 1</option>
                <option value="event2">Event 2</option>
              </select>
            </div>

            <div className="form-group">
              <select id="org" name="org">
                <option value="">Select your Sect/Dept/Org:</option>
                <option value="org1">Organization 1</option>
                <option value="org2">Organization 2</option>
              </select>
            </div>

            <div className="form-group1">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name:"
              />
            </div>

            <div className="form-group1">
              <input
                type="text"
                id="designation"
                name="designation"
                placeholder="Designation:"
              />
            </div>

            <button type="submit" className="apply-button">
              APPLY
            </button>
          </form>
        </div>
      </div>

      {isPopupVisible && (
        <VerifyAccount
          onClose={handleClosePopup}
          onSubmit={handleSubmitPopup}
        />
      )}
    </>
  );
}

export default VolunteerSignUp;
