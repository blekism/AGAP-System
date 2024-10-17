import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DashboardCalendar.css";

export default function DashboardCalendar({ events }) {
  return (
    <div
      className="dashboard-calendar"
      style={{
        flexGrow: 1,
        backgroundColor: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={"75vh"}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        events={events.map((event) => {
          return {
            title: event.event_name,
            start: event.start_date,
            end: event.end_date,
          };
        })}
      />
    </div>
  );
}
