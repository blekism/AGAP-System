import React from "react";
import Processed from "../assets/images/processed.png";
import Submitted from "../assets/images/submitted.png";
import Recieved from "../assets/images/recieved.png";
import Turnover from "../assets/images/turnover.png";
import "./DonationStatusContainer.css";

export default function DonationStatusContainer() {
  return (
    <>
      <div className="DonationStatusParent">
        <div className="DonationStatusHeader">
          <h6>Our Donation Process</h6>
        </div>
        <div className="DonationStatusBody">
          <div className="Submitted">
            <img src={Submitted} alt="Submitted" />
            <p>Submitted</p>
          </div>
          <div className="Recieved">
            <img src={Recieved} alt="Recieved" />
            <p>Recieved</p>
          </div>
          <div className="Processed">
            <img src={Processed} alt="Processed" />
            <p>Processed</p>
          </div>
          <div className="Turnover">
            <img src={Turnover} alt="Turnover" />
            <p>Turnover</p>
          </div>
        </div>
      </div>
    </>
  );
}
