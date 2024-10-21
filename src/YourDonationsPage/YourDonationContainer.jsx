import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./YourDonationContainer.css";
import YourDonationTemplate from "./YourDonationTemplate.jsx";

export default function YourDonationConatiner() {
  const [yourDonation, setYourDonation] = useState([]);
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonationDonor.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("this is your donations ", response.data.data);
        setYourDonation(response.data.data);
      });
  }, []);

  return (
    <div className="YourDonationParentContainer">
      <div className="YourDonationParentHeader">
        <h3>Your Donations</h3>
      </div>

      <div className="YourDonationInput">
        {yourDonation.map((yourDonations, key) => (
          <YourDonationTemplate
            key={key}
            donationid={yourDonations.donation_id}
            statusName={yourDonations.status_name}
            receivedBy={yourDonations.received_by}
            receivedDate={yourDonations.received_date}
            modalId={yourDonations.donation_id}
            modalTarget={"#" + yourDonations.donation_id}
          />
        ))}
      </div>
    </div>
  );
}
