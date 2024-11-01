import React from "react";
import "./TurnoverPage.css";
import Navbar from "../Page/Navbar";
import Footer from "../Page/AgapFooter";
import TurnoverTemplate from "./TurnoverTemplate";
import donate_blood from "../assets/images/donate_blood.png";
import SampleProfilePic from "../assets/images/SampleProfilePic.jpg";
import brigada from "../assets/images/brigada_eskwela.jpg";
import need from "../assets/images/need_project.jpg";

export default function TurnoverPage() {
  return (
    <>
      <div className="TurnoverParentCont">
        <Navbar />
        <div className="TurnoverHeaderCont">
          <h1>Turnover Documentation</h1>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "150px" }}
            name="eventfilter"
            // value={StatusFilter}
            // onChange={filterEvents}
          >
            <option value="none">Choose Event</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="finished">Finished</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="TurnoverContentCont">
          <TurnoverTemplate documentation={donate_blood} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={SampleProfilePic} />
          <TurnoverTemplate documentation={SampleProfilePic} />
          <TurnoverTemplate documentation={need} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={SampleProfilePic} />
          <TurnoverTemplate documentation={donate_blood} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={donate_blood} />
          <TurnoverTemplate documentation={need} />
          <TurnoverTemplate documentation={brigada} />
          <TurnoverTemplate documentation={donate_blood} />
        </div>
        <div className="TurnoverFootertCont">
          <Footer />
        </div>
      </div>
    </>
  );
}
