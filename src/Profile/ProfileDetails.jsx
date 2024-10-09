import React from "react";
import "./ProfileDetails.css";

const profileData = [
  { label: "Name", value: "Tomiwa Dolapo" },
  { label: "Phone Number", value: "090348676656" },
  { label: "Gender", value: "Female" },
  { label: "Email", value: "tomiola@gmail.com" },
  { label: "Date of Birth", value: "August 27, 1999" },
  { label: "Nationality", value: "Philippines" },
  { label: "Address Line", value: "No 35 Jimmy Ebi Street" },
  { label: "City", value: "Silang" },
  { label: "Province", value: "Cavite" },
];

function ProfileDetails() {
  return (
    <div className="profile-details-container">
      <div className="profile-detail horizontal-group">
        <span className="detail-label">Name</span>
        <span className="detail-value">Tomiwa Dolapo</span>
        <span className="detail-label">Phone Number</span>
        <span className="detail-value">090348676656</span>
      </div>

      <div className="profile-detail horizontal-group">
        <span className="detail-label">Gender</span>
        <span className="detail-value">Female</span>
        <span className="detail-label">Email</span>
        <span className="detail-value">tomiola@gmail.com</span>
      </div>

      <div className="profile-detail">
        <span className="detail-label">Date of Birth</span>
        <span className="detail-value">August 27, 1999</span>
      </div>

      <div className="profile-detail">
        <span className="detail-label">Nationality</span>
        <span className="detail-value">Philippines</span>
      </div>

      <div className="profile-detail">
        <span className="detail-label">Address Line</span>
        <span className="detail-value">No 35 Jimmy Ebi Street</span>
      </div>

      <div className="profile-detail">
        <span className="detail-label">City</span>
        <span className="detail-value">Silang</span>
      </div>

      <div className="profile-detail">
        <span className="detail-label">Province</span>
        <span className="detail-value">Cavite</span>
      </div>
    </div>
  );
}

export default ProfileDetails;
