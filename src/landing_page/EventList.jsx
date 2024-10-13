import React, { useState } from "react";
import "./EventList.css";
import DonateBlood from "../assets/images/donate_blood.png"
import Trees from "../assets/images/trees_vol.jpg"

const events = [
  {
    id: 1,
    image: DonateBlood,
    title: "Mobile Blood Donation",
    description: "The Health Services Office is inviting the NUD faculty, ASP, students, and the family members of NUD employees who have registered for the MBD and those who are willing to be a blood donor.",
    startDate: "2024-10-06",
    endDate: "2024-10-07",
  },
  {
    id: 2,
    image: DonateBlood,
    title: "Mobile Blood Donation",
    description: "The Health Services Office is inviting the NUD faculty, ASP, students, and the family members of NUD employees who have registered for the MBD and those who are willing to be a blood donor.",
    startDate: "2024-10-08",
    endDate: "2024-10-09",
  },
  {
    id: 3,
    image: Trees,
    title: "N.E.E.D Project",
    description: "In connection with the environment flagship program of NU Dasmariñas called N.E.E.D Project, the Community Extension Office is looking for Faculty, ASP, and student volunteers for N.E.E.D Trees to help clean the area at Sitio Malinta, Brgy. Sampaloc 2, Dasmariñas City, Cavite where trees are being planted.",
    startDate: "2024-10-10",
    endDate: "2024-10-11",
  },
  {
    id: 4,
    image: Trees,
    title: "N.E.E.D Project",
    description: "In connection with the environment flagship program of NU Dasmariñas called N.E.E.D Project, the Community Extension Office is looking for Faculty, ASP, and student volunteers for N.E.E.D Trees to help clean the area at Sitio Malinta, Brgy. Sampaloc 2, Dasmariñas City, Cavite where trees are being planted.",
    startDate: "2024-10-12",
    endDate: "2024-10-13",
  },
];

function EventList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEvents = events.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  return (
    <div className="event-part">
      <div className="event-title">
        <h1 className="etitle">WHATS NEW!</h1>
      </div>

      <div className="event-list">
        {selectedEvents.map((event) => (
          <div key={event.id} className="event-box">
            <div className="image-container">
              <img src={event.image} alt={event.title} className="event-image" />
            </div>
            <h2 className="event-box-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>

            <div className="event-buttons"> {/* Container for buttons */}
              <button className="action-button donate-button">Donate</button>
              <button className="action-button volunteer-button">Volunteer</button>
            </div>
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
        <span className="page-number">{currentPage} of {totalPages}</span>
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
