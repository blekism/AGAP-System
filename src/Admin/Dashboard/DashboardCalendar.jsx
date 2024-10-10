import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./DashboardCalendar.css";

export default function DashboardCalendar({ events }) {
  // const events1 = [
  //   { title: 'Event 1', start: '2024-10-15', end: '2024-10-18' },
  //   { title: 'Event 2', date: '2024-10-20' },
  //   { title: 'Event 3', date: '2024-10-25' }
  // ];
  return (
    <div
      className="dashboard-calendar"
      style={{ flexGrow: 1, backgroundColor: "white", padding: "20px", display: "flex", flexDirection: "column" }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={"40vh"}
        events={events.map((event) => {
          return {
            title: event.event_name,
            date: event.start_date,
          };
        })}
        // events={events1}
        // events={[
        //   { title: 'Event 1', start: '2024-10-15', end: '2024-10-18' },
        //   { title: 'Event 2', date: '2024-10-20' },
        //   { title: 'Event 3', date: '2024-10-25' }
        // ]}
      />
      <div className="eventList" 
      style={{backgroundColor: "#ededed", 
              display: "flex", 
              alignItems: "start", 
              borderRadius: "10px",
              marginTop: "10px", padding: "10px",
              overflowY: "auto"}}>
                <h5>Upcoming Events</h5>




      </div>



    </div>
  );
}
