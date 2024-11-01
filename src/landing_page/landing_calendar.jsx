import React, { useState, useEffect } from "react";
import "./landing_calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Import timeGridPlugin
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default function LandingCalendar() {
  const [event, setEvent] = useState([]); // Renamed to events

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); // Read events
        setEvents(response.data.data); // Set events
      })
      .catch((error) => console.error("Error fetching events:", error)); // Added error handling
  }, []);

  return (
    <>
      <div
        className="lan-cal"
        id="Calendar"
        style={{ marginBottom: "-50px" }}
      ></div>
      <div
        className="row lancalendar"
        style={{ marginTop: "10%", marginLeft: "0" }}
      >
        <div className="lancalendar-content">
          <div className="row">
            <div className="col-12">
              <h4>NUD Community Extension Events</h4>
            </div>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today",
            }}
            fixedWeekCount={false}
            showNonCurrentDates={true}
            events={event.map((event) => { 
              return {
                title: event.event_name,
                start: event.start_date,
                end: event.end_date,
              };
            })}
          />
        </div>
      </div>
    </>
  );
}
