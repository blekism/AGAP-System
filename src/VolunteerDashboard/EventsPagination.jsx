import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsPagination.css";
import EventsContent from "./EventsTemplate";
import NextPageL from "../assets/images/NextPageL.png";
import NextPageR from "../assets/images/NextPageR.png";

export default function EventsPagination({ events }) {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 1;
  const navigate = useNavigate();

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      navigate(`/VolunteerDashboard`);
    }
  };

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(`/VolunteerDashboard`);
    }
  };

  const startIndex = currentPage * eventsPerPage;
  const NUevents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <>
      <div className="EventsPagination-parentCont">
        <div className="EventsPagination-cont">
          <div className="EventsPagination-header">
            <h1>ON GOING EVENTS</h1>
          </div>
          {NUevents.map((events, index) => (
            <EventsContent
              key={index}
              title={events.title}
              content={events.content}
              date={events.date}
            />
          ))}

          <div
            className="FeaturedNewsTemplate-pageButtons"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
              paddingTop: "0",
            }}
          >
            <img
              src={NextPageL}
              alt="buttons"
              onClick={handlePrevious}
              className="pageButtonL"
              style={{
                cursor: currentPage === 0 ? "not-allowed" : "pointer",
                opacity: currentPage === 0 ? 0.5 : 1,
              }}
            />
            <img
              src={NextPageR}
              alt="buttons"
              onClick={handleNext}
              className="pageButtonR"
              style={{
                cursor:
                  currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages - 1 ? 0.5 : 1,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
