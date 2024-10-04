import React from "react";
import "./Volunteers.css";

export default function VolunteerContent({
  volunteerMembers,
  volunteerApplicants,
}) {
  return (
    <div className="volunteertbl" style={{ paddingRight: "10px" }}>
      <div className="volunteerMembers">
        <p>Members</p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Volunteer ID</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Department</th>
              <th scope="col">Events</th>
              <th scope="col">Accepted By</th>
              <th scope="col">Status</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{/* mapping results from db goes here */}</tbody>
        </table>
      </div>

      <div className="volunteerApplicants">
        <p>Applicants</p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Volunteer ID</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Department</th>
              <th scope="col">Events</th>
              <th scope="col">Accepted By</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{/* mapping results from db goes here */}</tbody>
        </table>
      </div>
    </div>
  );
}
