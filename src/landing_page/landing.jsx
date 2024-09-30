import { useState } from "react";
import "./landing.css";
import NavBar from "../Page/LanNavBar.jsx";
import Footer from "../Page/AgapFooter.jsx";
import head from "../assets/images/head.png";
import photo from "../assets/images/photo.jpg"; // Ensure this path is correct

function Landing() {
  return (
    <div>
      <NavBar />

      <div className="headerImg">
        <img src={head} alt="Landing Head" className="head-img" />
      </div>

      <div className="headerContent">
        <div></div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
