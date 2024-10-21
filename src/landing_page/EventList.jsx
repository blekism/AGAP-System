import React, { useState, useEffect } from "react";
import "./EventList.css";
import DonateBlood from "../assets/images/donate_blood.png";
import Trees from "../assets/images/trees_vol.jpg";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readEventAnnouncement.php"
      )
      .then(function (response) {
        console.log(response.data); //read events
        setEvents(response.data.data);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEvents = events.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  return (
    <div className="event-part">
      <div className="event-title">
        <h1 className="etitle">WHATS NEW!</h1>
      </div>

      <div className="event-list">
        {selectedEvents.map((event, key) => (
          <div key={key} className="event-box">
            <div className="image-container">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
            </div>
            <h2 className="event-box-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; {/* Left arrow */}
        </button>
        <span className="page-number">
          {currentPage} of {totalPages}
        </span>
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}

export default EventList;
