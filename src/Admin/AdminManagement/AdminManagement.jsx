import React, { useState, useEffect } from "react";
import axios from "axios";
import InputTemplate from "../InputTemplateAdmin.jsx";

export default function AdminManagement() {
  const [adminList, setAdminList] = useState([]);
  const [admin, setAdmin] = useState({
    admin_id: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    password: "",
    email: "",
    contact_info: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
    password: "",
    email: "",
    contact_info: "",
  });

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readAdminList.php"
      )
      .then(function (response) {
        console.log(response.data); //read admins
        setAdminList(response.data.data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase2&3/Update/updateAdmin.php", //change this to updateAdmins.php
        admin,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          alert("Update successful!");
        } else {
          alert("Update failed!");
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
        "http://localhost/agap-backend-main/api/phase2&3/read/readSingleAdmin.php",
        { admin_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("the admin info izzzzz", response.data);
      setAdmin(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAdmin((values) => ({ ...values, [name]: value }));
  };

  const handleNewAdminChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewAdmin((values) => ({ ...values, [name]: value }));
  };

  const handleNewAdminSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase2&3/insert/insertNewAdmin.php",
        newAdmin,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 201) {
          console.log("Insert successful!");
        } else {
          console.log("Insert failed!");
        }
      });
  };

  return (
    <div style={{ paddingRight: "10px", maxHeight: "750px" }}>
      <div className="AdminButtonHeader" style={{ marginBottom: "10px" }}>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newAdminModal"
        >
          Add new Admin
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr
            style={{
              fontSize: "17px",
              fontFamily: "Poppins",
              fontWeight: "500",
            }}
          >
            <th scope="col">Admin ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Contact Info</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {adminList.map((admin, key) => (
            <tr
              key={key}
              style={{
                fontSize: "15px",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <td>{admin.admin_id}</td>
              <td>
                {admin.last_name +
                  " " +
                  admin.first_name +
                  " " +
                  admin.middle_name}
              </td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.contact_info}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#AdminModal"
                  onClick={() => handleItemClick(admin.admin_id)}
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
        id="AdminModal"
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
                    value={admin.admin_id}
                    name="account_id"
                    onChange={handleChange}
                  />
                </div>

                <InputTemplate
                  value={admin.last_name}
                  name="last_name"
                  onChange={handleChange}
                  title={"Last Name"}
                />
                <InputTemplate
                  value={admin.first_name}
                  name="first_name"
                  onChange={handleChange}
                  title={"First Name"}
                />
                <InputTemplate
                  value={admin.middle_name}
                  name="middle_name"
                  onChange={handleChange}
                  title={"Middle Name"}
                />

                <InputTemplate
                  value={admin.email}
                  name="email"
                  onChange={handleChange}
                  title={"Email"}
                />
                <InputTemplate
                  value={admin.contact_info}
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
                <button type="submit" className="btn btn-primary">
                  Understood
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* adding new admin modal start */}

      <div
        className="modal fade"
        id="newAdminModal"
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
            <form onSubmit={handleNewAdminSubmit}>
              <div className="modal-body">
                <InputTemplate
                  value={newAdmin.last_name}
                  name="last_name"
                  onChange={handleNewAdminChange}
                  title={"Last Name"}
                />
                <InputTemplate
                  value={newAdmin.first_name}
                  name="first_name"
                  onChange={handleNewAdminChange}
                  title={"First Name"}
                />
                <InputTemplate
                  value={newAdmin.middle_name}
                  name="middle_name"
                  onChange={handleNewAdminChange}
                  title={"Middle Name"}
                />

                <InputTemplate
                  value={newAdmin.email}
                  name="email"
                  onChange={handleNewAdminChange}
                  title={"Email"}
                />

                <InputTemplate
                  value={newAdmin.password}
                  name="password"
                  onChange={handleNewAdminChange}
                  title={"Password"}
                />

                <InputTemplate
                  value={newAdmin.contact_info}
                  name="contact_info"
                  onChange={handleNewAdminChange}
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
                <button type="submit" className="btn btn-primary">
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
