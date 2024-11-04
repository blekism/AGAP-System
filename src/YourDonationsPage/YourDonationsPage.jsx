import React from "react";
import DonationStatus from "../DonationPage/DonationStatusContainer.jsx";
import YourDonationConatiner from "./YourDonationContainer.jsx";
import Navbar from "../Page/Navbar.jsx";
import Footer from "../Page/AgapFooter.jsx";
import "./YourDonationsPage.css";

export default function YourDonationsPage() {
  return (
    <div className="DonationPageParent">
      <Navbar />

      <DonationStatus />
      <YourDonationConatiner />

      <div className="DonationPageParent-FooterCont">
        <Footer />
      </div>
    </div>
  );
}
