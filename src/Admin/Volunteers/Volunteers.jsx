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
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Volunteer ID</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Department</th>
              <th scope="col">Email</th>
              <th scope="col">Contact info</th>
              <th scope="col">Hours</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* mapping results from db goes here */}
            {volunteerMembers.map((member, key) => (
              <tr key={key}>
                <td>{member.account_id}</td>
                <td>{member.last_name}</td>
                <td>{member.designation_name}</td>
                <td>{member.category_name}</td>
                <td>{member.email}</td>
                <td>{member.contact_info}</td>
                <td>{member.total_hours}</td>
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

      <div className="volunteerApplicants">
        <p>Applicants</p>
        <table className="table table-striped">
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
          <tbody>
            {/* mapping results from db goes here */}
            {volunteerApplicants.map((member, key) => (
              <tr key={key}>
                <td>{member.account_id}</td>
                <td>{member.last_name}</td>
                <td>{member.designation_name}</td>
                <td>{member.category_name}</td>
                <td>{member.email}</td>
                <td>{member.contact_info}</td>
                <td>{member.total_hours}</td>
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
    </div>
  );
}
