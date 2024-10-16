import React from "react";
import DonationStatus from "../DonationPage/DonationStatusContainer.jsx";
import YourDonationConatiner from "./YourDonationContainer.jsx";
import Navbar from "../Page/NavBar.jsx";
import Footer from "../Page/AgapFooter.jsx";

export default function YourDonationsPage() {
  return (
    <div className="DonationPageParent">
      <Navbar />

      <DonationStatus />
      <YourDonationConatiner />

      <Footer />
    </div>
  );
}
