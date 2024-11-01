import React, { useState } from 'react';
import "./EventPage.css";
import Navbar from "../Page/NavBar.jsx";
import EventCar from "./EventCar.jsx";
import EventList from "./EventList.jsx"
import Footer from "../Page/AgapFooter.jsx";

function EventPage() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterOption = (option) => {
    console.log(`Filter selected: ${option}`);
    setShowFilter(false);
  };

  return (
    <div>
      <Navbar />
      
      <h1 className='eventtitle'>
        Events
      </h1>

      <div className='eCar'>
        <EventCar />
      </div>

      <div className='eSearch'>
        <h1 className='eList'>
          Event List
        </h1>

        <div className='bSearch'>
          <input type="text" placeholder="Search events..." className="searchInput" />
        </div>

        <div className='eFilter'>
          <button className="filterButton" onClick={toggleFilter}>
            Filter Options
          </button>
          {showFilter && (
            <div className="filterOptions">
              <div onClick={() => handleFilterOption("Oldest to Newest")}>Oldest to Newest</div>
              <div onClick={() => handleFilterOption("Newest to Oldest")}>Newest to Oldest</div>
            </div>
          )}
        </div>
      </div>
      <EventList />
      <Footer />
    </div>
  );
}

export default EventPage;
