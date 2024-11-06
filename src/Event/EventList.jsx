import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./EventList.css";
import grrr from "../assets/images/grrr.png";
import { useNavigate } from "react-router-dom";

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readEventsWithImage.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("this is the event list ", response.data.data);
        setEventList(response.data.data);
        setFilteredEvents(response.data.data);
      });
  }, []);

  useEffect(() => {
    const filtered = eventList.filter((event) =>
      event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, eventList]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

  const currentEvents = filteredEvents.slice(
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
    let sortedEvents = [...eventList];
    if (option === "Oldest to Newest") {
      sortedEvents.sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
      );
    } else if (option === "Newest to Oldest") {
      sortedEvents.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      );
    }
    setFilteredEvents(sortedEvents);
    setShowFilter(false);
    setCurrentPage(0);
  };

  const handleDonate = (id, name) => {
    navigate("/Donate", {
      state: { id, name },
    });
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        {currentEvents.length > 0 ? (
          currentEvents.map((event, key) => (
            <div key={key} className="event-container">
              {/* <img src={event.image} className="event-image" alt={"hmppy"} /> */}

              {event.image === null ? (
                <img src={grrr} className="event-image" alt={"hmppy"} />
              ) : (
                <img src={event.image} className="event-image" alt={"hmppy"} />
              )}

              <div className="event-content">
                <h2 className="headerEventList">{event.event_name}</h2>
                <p className="description">{event.description}</p>
                <p className="date">📅 {event.start_date}</p>
                <p className="event_link">🔗 {event.event_link}</p>
                <hr className="divider" />
                <div className="action-buttons">
                  <button
                    className="donate-button"
                    onClick={() =>
                      handleDonate(event.evenet_id, event.event_name)
                    }
                  >
                    Donate
                  </button>
                  <Link
                    className="volunteer-button"
                    to={"/VolunteerConditionalRender"}
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events-found">
            <p>No events found!</p>
          </div>
        )}

        {currentEvents.length > 0 && (
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
        )}
      </div>
    </>
  );
}
