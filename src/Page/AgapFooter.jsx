import React from "react";
import "./AgapFooter.css";
import Phone from "../assets/images/phone.png";
import Mail from "../assets/images/Mail.png";
import Location from "../assets/images/Location.png";
import Schedule from "../assets/images/Schedule.png";
import Info from "../assets/images/Info.png";
import AGAPFooterlogo from "../assets/images/AGAPFooterlogo.png";

export default function AgapFooter() {
  return (
    <>
      {/*footer container start*/}
      <div className="Agap-FooterCont">
        {/*footer logo start*/}
        <div className="Agap-FooterLogo">
          <img
            src={AGAPFooterlogo}
            alt="AGAP Logo"
            className="logoImage"
            style={{
              marginRight: "10px",
              marginLeft: "50px",
              width: "200px",
              height: "16vh",
              marginTop: "5px",
            }}
          />
        </div>
        {/*footer logo end*/}

        {/*footer about us start*/}
        <div className="Agap-FooterAboutUs">
          <div className="Agap-FooterAboutUsTop">
            <img
              src={Info}
              alt="info"
              className="infoImage"
              style={{
                width: "20px",
                height: "20px",
                marginTop: "10px",
                marginRight: "10px",
              }}
            />
            <p> ABOUT AGAP</p>
          </div>

          <p
            style={{
              margin: "0px",
            }}
          >
            2024 Agap. All right reserve
          </p>

          <div className="Agap-FooterTextBottom">
            <hr className="border Agap-custom-border border-2 opacity-100" />
            <p>
              The AGAP is a digital platform for optimizing donation and
              volunteer management in Community Service Programs of National
              University-Dasmarinas NSTP/ComEx.
            </p>
          </div>
        </div>
        {/*footer about us end*/}

        {/*footer contact us start*/}
        <div className="Agap-FooterContacts">
          <div className="Agap-FooterContactUs">
            <img src={Phone} style={{ width: "20px", height: "20px" }} />
            <p> CONTACT US</p>
          </div>

          <div className="Agap-FooterContactLocation">
            <img src={Location} style={{ width: "20px", height: "20px" }} />
            <p>Governor’s Drive, Sampaloc 1, City of Dasmariñas, Cavite 4114</p>
          </div>

          <div className="Agap-FooterContactNum">
            <img src={Phone} style={{ width: "20px", height: "20px" }} />
            <p>09399151561 (Smart) / 09661381357 (Globe)</p>
          </div>

          <div className="Agap-FooterContactEmail">
            <img src={Mail} style={{ width: "20px", height: "20px" }} />
            <p> agapcomex@nu-dasma.edu.ph</p>
          </div>

          <div className="Agap-FooterContactHours">
            <img src={Schedule} style={{ width: "20px", height: "20px" }} />
            <p>
              Service Hours : Monday - Friday (8:30 AM - 5:30 PM); Saturday
              (8:30 AM - 12:30 PM)
            </p>
          </div>
        </div>
        {/*footer contact us end*/}
      </div>
      {/*footer container end*/}
    </>
  );
}
