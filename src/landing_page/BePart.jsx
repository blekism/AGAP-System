
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './BePart.css'
import Donate from "../assets/images/volunteers_comex.png"; 
import Volunteer from "../assets/images/donate_comex.png"; 
import photo from "../assets/images/photo.jpg"; 

function BePart() {
  return (
    <>
    <div className="bePart">
        <h1 className="bePart-title">
            BE PART OF US!
        </h1>

        <div className="bePart-img">
            <div className="bePart-donate">
                <img src={Donate} className="donate"></img>
                <h1 className="donate-title">
                    Donate
                </h1>
                <h2 className="donate-text">
                    Go to Donate Page
                </h2>
            </div>

            <div className="bePart-volunteer">
                <img src={Volunteer} className="volunteer"></img>
                <h1 className="volunteer-title">
                    Volunteer
                </h1>
                <h2 className="volunteer-text">
                    Register to be NUD ComEx Volunteer
                </h2>
            </div>
        </div>
    </div>

    </>

  );
}

export default BePart;
