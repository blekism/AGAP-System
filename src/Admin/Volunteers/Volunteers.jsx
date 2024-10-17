import React, { useState } from "react";
import "./Volunteers.css";
import axios from "axios";
import InputTemplate from "../InputTemplateAdmin.jsx";

export default function VolunteerContent({
  volunteers,
  modalId,
  modalTarget,
  volunHeader,
}) {
  const [volunteerItem, setVolunteerItem] = useState({
    account_id: "",
    is_volunteer: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    section: "",
    dept_category_id: "",
    designation_id: "",
    email: "",
    contact_info: "",
    total_hours: 0,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setVolunteerItem((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase2&3/Update/update_volunteer_acc.php",
        volunteerItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log("Update successful!");
        } else {
          console.log("Update failed!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleItemClick = async (id, level) => {
    console.log("Item clicked: ", id);

    try {
      const response = await axios.post(
        "http://localhost/agap-backend-main/api/phase2&3/read/singleRead_volunteer_acc.php",
        { account_id: id, is_volunteer: level },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      setVolunteerItem(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectVolunteer = () => {
    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/update/updateDeclineVolunteer.php",
        { account_id: volunteerItem.account_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  const handleDeleteVolunteer = () => {
    axios
      .put(
        "http://localhost/agap-backend-main/api/phase2&3/Delete/delete_volunteer_acc.php",
        { account_id: volunteerItem.account_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <div className="volunteertbl" style={{ paddingRight: "10px" }}>
      <div className="volunteerMembers" style={{ maxHeight: "600px" }}>
        <p className="volunheader">{volunHeader}</p>
        <table className="table table-striped">
          <thead>
            <tr
              style={{
                fontSize: "17px",
                fontFamily: "Poppins",
                fontWeight: "500",
              }}
            >
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
              <tr
                key={key}
                style={{
                  fontSize: "15px",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
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
                    onClick={() =>
                      handleItemClick(member.account_id, member.is_volunteer)
                    }
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
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="volunteersInputBody">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        User ID
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        readOnly
                        value={volunteerItem.account_id}
                        name="account_id"
                        onChange={handleChange}
                      />
                    </div>
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      name="is_volunteer"
                      value={volunteerItem.is_volunteer}
                      onChange={handleChange}
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer_apply">
                        Volunteer Applicant
                      </option>
                      <option value="volunteer">Volunteer</option>
                    </select>
                    <InputTemplate
                      name="first_name"
                      value={volunteerItem.first_name}
                      onChange={handleChange}
                      title={"First Name"}
                    />
                    <InputTemplate
                      name="last_name"
                      value={volunteerItem.last_name}
                      onChange={handleChange}
                      title={"Last Name"}
                    />
                    <InputTemplate
                      name="middle_name"
                      value={volunteerItem.middle_name}
                      onChange={handleChange}
                      title={"Middle Name"}
                    />

                    <InputTemplate
                      name="section"
                      value={volunteerItem.section}
                      onChange={handleChange}
                      title={"Section"}
                    />

                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      name="dept_category_id"
                      value={volunteerItem.dept_category_id}
                      onChange={handleChange}
                    >
                      <option value="1">SECA</option>
                      <option value="2">SASE</option>
                      <option value="3">SBMA</option>
                      <option value="4">SHS</option>
                      <option value="5">OTHERS</option>
                    </select>

                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      name="designation_id"
                      value={volunteerItem.designation_id}
                      onChange={handleChange}
                    >
                      <option value="2000">STUDENT</option>
                      <option value="2001">STAFF</option>
                      <option value="2002">FACULTY</option>
                    </select>
                    <InputTemplate
                      name="email"
                      value={volunteerItem.email}
                      onChange={handleChange}
                      title={"Email"}
                    />
                    <InputTemplate
                      name="contact_info"
                      value={volunteerItem.contact_info}
                      onChange={handleChange}
                      title={"Contact Info"}
                    />
                    <InputTemplate
                      name="total_hours"
                      value={volunteerItem.total_hours ?? 0}
                      onChange={handleChange}
                      title={"Total Hours"}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  {modalId === "applicantItems" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleRejectVolunteer}
                    >
                      Reject
                    </button>
                  )}
                  {modalId === "memberItems" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleDeleteVolunteer}
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Accept
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
