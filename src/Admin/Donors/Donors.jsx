import React, { useState } from "react";
import axios from "axios";
import InputTemplate from "../InputTemplateAdmin.jsx";

export default function DonorContent({ donors }) {
  const [donorItem, setDonorItem] = useState({
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
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setDonorItem((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/update/update_donors_acc.php",
        donorItem,
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

  const handleItemClick = async (id) => {
    console.log("Item clicked: ", id);
    try {
      const response = await axios.post(
        "http://localhost/agap-backend-main/api/phase_1/read/singleRead_donors_acc.php",
        { account_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setDonorItem(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmAction = (event, action) => {
    if (window.confirm(action)) {
      handleSubmit(event);
    }
  };
  return (
    <div style={{ paddingRight: "10px", maxHeight: "750px" }}>
      <table className="table table-striped">
        <thead>
          <tr
            style={{
              fontSize: "17px",
              fontFamily: "Poppins",
              fontWeight: "500",
            }}
          >
            <th scope="col">Donor ID</th>
            <th scope="col">Level</th>
            <th scope="col">Name</th>
            <th scope="col">Section</th>
            <th scope="col">Department</th>
            <th scope="col">Designation</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Verified At</th>
            <th scope="col">Total Donations</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, key) => (
            <tr
              key={key}
              style={{
                fontSize: "15px",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <td>{donor.account_id}</td>
              <td>{donor.is_volunteer}</td>
              <td>{donor.last_name + " " + donor.first_name}</td>
              <td>{donor.section}</td>
              <td>{donor.category_name}</td>
              <td>{donor.designation_name}</td>
              <td>{donor.email}</td>
              <td>{donor.contact_info}</td>
              <td>{donor.verified_at}</td>
              <td>{donor.total_donations}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#donorsModal"
                  onClick={() => handleItemClick(donor.account_id)}
                >
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="donorsModal"
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
                    value={donorItem.account_id}
                    name="account_id"
                    onChange={handleChange}
                  />
                </div>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  name="is_volunteer"
                  value={donorItem.is_volunteer}
                  onChange={handleChange}
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer_apply">Volunteer Applicant</option>
                  <option value="volunteer">Volunteer</option>
                </select>

                <InputTemplate
                  value={donorItem.last_name}
                  name="last_name"
                  onChange={handleChange}
                  title={"Last Name"}
                />
                <InputTemplate
                  value={donorItem.first_name}
                  name="first_name"
                  onChange={handleChange}
                  title={"First Name"}
                />
                <InputTemplate
                  value={donorItem.middle_name}
                  name="middle_name"
                  onChange={handleChange}
                  title={"Middle Name"}
                />
                <InputTemplate
                  value={donorItem.section}
                  name="section"
                  onChange={handleChange}
                  title={"Section"}
                />

                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  name="dept_category_id"
                  value={donorItem.dept_category_id}
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
                  value={donorItem.designation_id}
                  onChange={handleChange}
                >
                  <option value="2000">STUDENT</option>
                  <option value="2001">STAFF</option>
                  <option value="2002">FACULTY</option>
                </select>

                <InputTemplate
                  value={donorItem.email}
                  name="email"
                  onChange={handleChange}
                  title={"Email"}
                />
                <InputTemplate
                  value={donorItem.contact_info}
                  name="contact_info"
                  onChange={handleChange}
                  title={"Contact Info"}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) =>
                    confirmAction(
                      event,
                      "Are you Sure you want to update this donor?"
                    )
                  }
                >
                  Understood
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
