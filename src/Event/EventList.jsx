import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./EventList.css";
import bloodimage from "../assets/images/blood.jpg";

export default function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readEvents.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("this is the event list ", response.data.data);
        setEventList(response.data.data);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(eventList.length / itemsPerPage);

  const currentEvents = eventList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterOption = (option) => {
    console.log(`Filter selected: ${option}`);
    setShowFilter(false);
  };

  return (
    <>
      <div className="eSearch">
        <h1 className="eList">Event List</h1>

        <div className="bSearch">
          <input
            type="text"
            placeholder="Search events..."
            className="searchInput"
          />
        </div>

        <div className="eFilter">
          <button className="filterButton" onClick={toggleFilter}>
            Filter Options
          </button>
          {showFilter && (
            <div className="filterOptions">
              <div onClick={() => handleFilterOption("Oldest to Newest")}>
                Oldest to Newest
              </div>
              <div onClick={() => handleFilterOption("Newest to Oldest")}>
                Newest to Oldest
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="event-list-container">
        {currentEvents.map((event, key) => (
          <div key={key} className="event-container">
            <img src={bloodimage} className="event-image" />
            <div className="event-content">
              <h2 className="headerEventList">{event.event_name}</h2>
              <p className="description">{event.description}</p>
              <p className="date">📅 {event.start_date}</p>
              <p className="event_link">📍 {event.event_link}</p>
              <hr className="divider" />
              <div className="action-buttons">
                <Link className="donate-button" to={"/Donate"}>
                  Donate
                </Link>
                <Link
                  className="volunteer-button"
                  to={"/VolunteerConditionalRender"}
                >
                  Volunteer
                </Link>
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
    </>
  );
}
