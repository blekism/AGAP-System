import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./EventList.css";
import bloodimage from "../assets/images/blood.jpg";

const events = [
  {
    id: 1,
    title: "Blood Donation Drive",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "October 1 - October 13, 2024",
    place: "National University Dasmarinas, 4th Floor",
    image: bloodimage,
  },
  {
    id: 2,
    title: "Health Awareness Seminar",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "October 14, 2024",
    place: "National University Dasmarinas, Auditorium",
    image: bloodimage,
  },
  {
    id: 3,
    title: "Charity Fun Run",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "October 20, 2024",
    place: "National University Dasmarinas, Sports Complex",
    image: bloodimage,
  },
  {
    id: 4,
    title: "Volunteer Day",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "October 27, 2024",
    place: "National University Dasmarinas, Community Center",
    image: bloodimage,
  },
  {
    id: 5,
    title: "Food Drive",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "November 3, 2024",
    place: "National University Dasmarinas, Main Hall",
    image: bloodimage,
  },
  {
    id: 6,
    title: "Workshop on Mental Health",
    description: "A blood donation occurs when a person voluntarily has blood drawn and used for transfusions and/or made into biopharmaceutical medications by a process called fractionation (separation of whole blood components). A donation may be of whole blood or of specific components directly (apheresis). Blood banks often participate in the collection process as well as the procedures that follow it.",
    date: "November 10, 2024",
    place: "National University Dasmarinas, Room 201",
    image: bloodimage,
  },
];

const EventList = () => {
  const itemsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(events.length / itemsPerPage);

  const currentEvents = events.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="event-list-container">
      {currentEvents.map((event) => (
        <div key={event.id} className="event-container">
          <img src={event.image} alt={event.title} className="event-image" />
          <div className="event-content">
            <h2>{event.title}</h2>
            <p className="description">{event.description}</p>
            <p className="date">📅 {event.date}</p>
            <p className="location">📍 {event.place}</p>
            <hr className="divider" />
            <div className="action-buttons">
              <button className="donate-button">Donate</button>
              <button className="volunteer-button">Volunteer</button>
            </div>
          </div>
        </div>
      ))}

        <div className="pagination-container">
          <ReactPaginate
            previousLabel={<span>&laquo;</span>} 
            nextLabel={<span>&raquo;</span>}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination-item"}
            pageLinkClassName={"pagination-link"}
            previousClassName={"pagination-item"}
            previousLinkClassName={"pagination-link"}
            nextClassName={"pagination-item"}
            nextLinkClassName={"pagination-link"}
            breakClassName={"pagination-item"}
            breakLinkClassName={"pagination-link"}
            activeClassName={"active"}
          />
        </div>
    </div>
  );
};

export default EventList;
