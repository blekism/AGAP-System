import React, { useState } from "react";
import "./VerifyAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyAccount({ onClose, onSubmit }) {
  const [verificationCode, setVerificationCode] = useState({
    verification_code: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setVerificationCode((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/create/verifyAccount.php",
        verificationCode,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        if (response.data.status === 200) {
          console.log("Account verified!");
          navigate("/");
        }
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="popup-header">
          <h2>Verify Account</h2>
          <p className="popparagraph">
            Please enter the volunteer ID that was sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <input
              type="text"
              placeholder="Verification Code"
              required
              name="verification_code"
              value={verificationCode.verification_code}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyAccount;
