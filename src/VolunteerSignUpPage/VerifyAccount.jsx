import React from "react";
import './VerifyAccount.css'; // Optional: Import any CSS for styling

function VerifyAccount({ onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Add your verification logic here
    onSubmit(); // Call the onSubmit prop to handle confirmation
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="popup-header">
          <h2>Verify Account</h2>
          <p className="popparagraph">Please enter the volunteer ID that was 
            sent to your email address.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <input type="text" placeholder="Verification Code" required />
          </div>
          <p className="resend-code">Resend Code</p>
          <button type="submit" className="submit-button">Verify</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyAccount;
