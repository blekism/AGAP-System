import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Member from "../../assets/images/Member.png";

export default function Header({ username }) {
  return (
    <div className="HeaderParentContainer">
      <div className="WelcomeContainer">
        <h1>Welcome Back, {username}!</h1>
        <p>Lorem ipsum dolor sit amet constectur adipscing</p>
      </div>

      <div className="UserProfileContainer">
        <img src={Member} alt="Items Icon" />
        <Link to="/ProfilePage" className="Profile">
          {username}
        </Link>
      </div>
    </div>
  );
}
