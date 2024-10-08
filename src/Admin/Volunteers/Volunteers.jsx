import React from "react";
import "./Volunteers.css";

export default function VolunteerContent({ volunteers, modalId, modalTarget }) {
  return (
    <div className="volunteertbl" style={{ paddingRight: "10px" }}>
      <div className="volunteerMembers" style={{ maxHeight: "750px" }}>
        <p>Members</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ width: "13%" }}>
                Volunteer ID
              </th>
              <th scope="col" style={{ width: "14%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "7%" }}>
                Designation
              </th>
              <th scope="col" style={{ width: "7%" }}>
                Department
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Email
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Contact info
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Hours
              </th>
              <th scope="col" style={{ width: "5%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* mapping results from db goes here */}
            {volunteers.map((member, key) => (
              <tr key={key}>
                <td>{member.account_id}</td>
                <td>{member.last_name + " " + member.first_name}</td>
                <td>{member.designation_name}</td>
                <td>{member.category_name}</td>
                <td>{member.email}</td>
                <td>{member.contact_info}</td>
                <td>{member.total_hours}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={modalTarget}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id={modalId}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">edit volunteer here</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
