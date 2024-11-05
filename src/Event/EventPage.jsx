import React, { useState } from "react";
import "./EventPage.css";
import Navbar from "../Page/NavBar.jsx";
import EventCar from "./EventCar.jsx";
import EventList from "./EventList.jsx";
import Footer from "../Page/AgapFooter.jsx";

function EventPage() {
  return (
    <div>
      <Navbar />

      <h1 className="eventtitle">Events</h1>

      <div className="eCar">
        <EventCar />
      </div>
      <EventList />
      <Footer />
    </div>
  );
}

export default EventPage;
