import { useState } from "react";
import "./landing.css";
import NavBar from "../Page/LanNavBar.jsx";
import Footer from "../Page/AgapFooter.jsx";
import head from "../assets/images/head.png";
import comExImg from "../assets/images/comex-img.jpg";
import BePart from "./BePart.jsx";
import LandingCalendar from "./landing_calendar.jsx";
import photo from "../assets/images/photo.jpg"; 
import Partners from "./Partners.jsx"; // Import the Partners component

function Landing() {
  return (
    <div>
      <NavBar />

      <div className="headerImg">
        <img src={head} alt="Landing Head" className="head-img" />
      </div>

      <div className="headerContent">
        <div className="comEx-info">
          <div className="com-ex-header">
            <div className="comex-img">
              <img src={comExImg} className="comex-image"></img>
            </div>
          </div>

          <div className="comex-data">
              <h1 className="comex-title">NU-D Community Extension</h1>
              <p className="comex-data">
                Lorem ipsum dolor sit amet consectetur. Sit enim 
                eget gravida tortor. Cras enim rhoncus blandit ut 
                condimentum lorem sem. Enim ac id viverra orci gravida. 
                Lobortis vel turpis arcu vel. Sem sed nisi vehicula 
                elit. Fermentum dolor integer consectetur nisl eu eget.
                Gravida arcu viverra egestas scelerisque tortor nisl 
                vitae blandit diam. Magna convallis ac vitae turpis 
                nunc magna. Fermentum dolor integer consectetur nisl 
                eu eget. Gravida arcu viverra egestas scelerisque tortor 
                nisl vitae blandit diam. Magna convallis ac vitae turpis 
                nunc magna.
              </p>
          </div>
        </div>
      </div>

      <BePart />
      <LandingCalendar />

      <div className="paragraph">
        <div className="paragraph-data">
          <div className="first">
            <div className="first-box">
            </div>

            <div className="first-info">
              <h1 className="first-title">TITLE</h1>
              <p className="first-para">
                Lorem ipsum dolor sit amet consectetur. Sit enim eget gravida
                tortor. Cras enim rhoncus blandit ut condimentum lorem sem.
                Enim ac id viverra orci gravida. Lobortis vel turpis arcu 
                vel. Sem sed nisi vehicula elit. Fermentum dolor integer 
                consectetur nisl eu eget. Gravida arcu viverra egestas 
                scelerisque tortor nisl vitae blandit diam. Magna convallis 
                ac vitae turpis nunc magna.
              </p>
            </div>
          </div>

          <div className="second">
            <div className="second-info">
              <h1 className="second-title">TITLE</h1>
              <p className="second-para">
                Lorem ipsum dolor sit amet consectetur. Sit enim eget gravida
                tortor. Cras enim rhoncus blandit ut condimentum lorem sem.
                Enim ac id viverra orci gravida. Lobortis vel turpis arcu 
                vel. Sem sed nisi vehicula elit. Fermentum dolor integer 
                consectetur nisl eu eget. Gravida arcu viverra egestas 
                scelerisque tortor nisl vitae blandit diam. Magna convallis 
                ac vitae turpis nunc magna.
              </p>
            </div>

            <div className="second-box">
            </div>
          </div>
        </div>
      </div>

      <Partners />
      <Footer />
    </div>
  );
}

export default Landing;
