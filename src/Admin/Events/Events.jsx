import React from "react";
import "./Events.css";

export default function Events({ events }) {
  return (
    <div className="events">
      <div className="EventActions">
        <button type="button" className="btn btn-primary">
          Add Event
        </button>
        <button type="button" className="btn btn-primary">
          Add Event Announcement
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Link</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Contribution Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping results from db goes here */}
          {events.map((event, key) => (
            <tr key={key}>
              <td>{event.evenet_id}</td>
              <td>{event.event_name}</td>
              <td>{event.event_link}</td>
              <td>{event.description}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.contrib_amount}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
