import React from "react";
import "./DonationPage.css";
import DonationStatus from "./DonationStatusContainer.jsx";
import DonateContainer from "./DonateContainer.jsx";
import Navbar from "../Page/NavBar.jsx";
import Footer from "../Page/AgapFooter.jsx";

export default function DonationPage() {
  return (
    <div className="DonationPageParent">
      <Navbar />

      <DonationStatus />
      <DonateContainer />

      <Footer />
    </div>
  );
}
