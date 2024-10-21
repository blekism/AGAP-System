import React, { useState, useEffect } from "react";
import "./landing_calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default function LandingCalendar() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        setEvent(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="lan-cal">
        <div className="lan-cal-area">
          <h1 className="lan-cal-title">Events in (Month)</h1>
        </div>

        <div className="fullCalendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
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
