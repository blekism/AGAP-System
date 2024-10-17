import React from "react";
import "./ProfilePage.css";
import Navbar from "../Page/NavBar.jsx";
import ProfileDetails from "./ProfileDetails.jsx"

function ProfilePage() {
  return (
    <>
      <Navbar />

      <div className="side">
        <div className="side-box">
          <h1 className="side-title">Personal Details</h1>
          <div className="profile-image">
            <div className="change-photo">
              <button className="change-photo-button">Change Profile Picture</button>
            </div>
          </div>

          <div className="signout-btn">
            <button className="signout-button">SIGN OUT</button>
          </div>
        </div>

        <div><ProfileDetails /></div>
      </div>
    </>
  );
}

export default ProfilePage;
