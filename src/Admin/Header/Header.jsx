import React from "react";
import "./Header.css";

export default function Header({ username }) {
  return (
    <div className="HeaderParentContainer">
      <div className="WelcomeContainer">
        <h1>Welcome, {username}!</h1>
      </div>
    </div>
  );
}
