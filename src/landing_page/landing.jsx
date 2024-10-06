import { useState } from "react";
import "./landing.css";
import NavBar from "../Page/LanNavBar.jsx";
import Footer from "../Page/AgapFooter.jsx";
import head from "../assets/images/head.png";
import comExImg from "../assets/images/comex-img.jpg";
import BePart from "./BePart.jsx";
import LandingCalendar from "./landing_calendar.jsx";
import photo from "../assets/images/photo.jpg"; 
import Partners from "./Partners.jsx"; 
import EventList from "./EventList.jsx";
import brigada from "../assets/images/brigada_eskwela.jpg";
import need from "../assets/images/need_project.jpg";

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
              The Community Extension Office plays a crucial role 
              in fostering a culture of volunteerism and community 
              service within National University. They actively 
              promote and facilitate volunteer opportunities, 
              encouraging students, faculty, and staff to contribute 
              their time and skills to various community projects. 
              Additionally, the office works to raise awareness about 
              the importance of charitable giving and encourages 
              donations to support local organizations and 
              initiatives. By emphasizing volunteerism and charitable 
              contributions, the Community Extension Office helps to 
              create a more compassionate and socially responsible 
              campus community while also making a positive impact on 
              the surrounding areas.
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
            <img src={need} alt="Description of image 2" className="box-image" />
            </div>

            <div className="first-info">
              <h1 className="first-title">N.E.E.D Project</h1>
              <p className="first-para">
              In line with the Science Month Celebration of Edilberto S. 
              Legaspi Integrated High School, the Nationalian Environment
              Enthusiasts of Dasmariñas (N.E.E.D) took part in cleaning the 
              Putakte Falls in Barangay Langkaan II as part of the flagship 
              program of NUD called the N.E.E.D Project. 
              </p>
            </div>
          </div>

          <div className="second">
            <div className="second-info">
              <h1 className="second-title">Brigada Eskwela of NSTP Department</h1>
              <p className="second-para">
              Successful turnover of school supplies for Delfin J. 
              Jaranilla Elementary School and Ramona S. Tirona  
              Memorial School spearheaded by NSTP Coordinator Mr. 
              Christoper John M. Pantoja along with the NSTP Faculty 
              and ComEx Brigade volunteers. 
              </p>
            </div>

            <div className="second-box">
            <img src={brigada} alt="Description of image 2" className="box-image" />
            </div>
          </div>
        </div>
      </div>

      <EventList />

      <hr className="divider-last" />

      <Partners />
      <Footer />
    </div>
  );
}

export default Landing;
