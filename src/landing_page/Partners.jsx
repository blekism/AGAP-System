import React from "react";
import "./Partners.css"; 
import logo1 from "../assets/images/logo_1.png"; 
import logo2 from "../assets/images/logo_2.png";
import logo3 from "../assets/images/logo_3.png";
import logo4 from "../assets/images/logo_4.png";
import logo5 from "../assets/images/logo_5.png";
import logo6 from "../assets/images/logo_6.png";
import logo7 from "../assets/images/logo_7.png";
import logo8 from "../assets/images/logo_8.png";
import logo9 from "../assets/images/logo_9.png"; // Fixed filename typo
import logo10 from "../assets/images/logo_10.png";

function Partners() {
  // Array of image sources
  const partnerImages = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
  ];

  return (
    <>
      <div className="partners-page">
        <h1 className="partners-title">
          NUD Community Extension Partners
        </h1>

        <div className="partners-row">
          {partnerImages.map((image, index) => (
            <div className="partner-image" key={index}>
              <img src={image} alt={`Partner ${index + 1}`} className="partner-img" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Partners;
