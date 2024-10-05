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
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Event Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Contribution Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{/* mapping results from db goes here */}</tbody>
      </table>
    </div>
  );
}
