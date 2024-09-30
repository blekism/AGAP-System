import React from "react";
import "./DonationPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DonationStatus from "./DonationStatusContainer.jsx";
import DonateContainer from "./DonateContainer.jsx";
import Template from "./DonationItemTemplate.jsx";
import Navbar from "../Page/NavBar.jsx";

export default function DonationPage() {
  return (
    <div className="DonationPageParent">
      <Navbar />

      <DonationStatus />
      <DonateContainer />
    </div>
  );
}
