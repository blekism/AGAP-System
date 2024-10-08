import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./DashboardCalendar.css";

export default function DashboardCalendar({ events }) {
  return (
    <div
      className="dashboard-calendar"
      style={{ flexGrow: 1, backgroundColor: "white", padding: "20px" }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={"70vh"}
        events={events.map((event) => {
          return {
            title: event.event_name,
            date: event.start_date,
          };
        })}
      />
    </div>
  );
}
