import React, { useState } from "react";
import axios from "axios";

export default function DonorContent({ donors }) {
  const [donorItem, setDonorItem] = useState([]);

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
  return (
    <div style={{ paddingRight: "10px", maxHeight: "750px" }}>
      <table className="table table-striped">
        <thead>
          <tr>
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
          {/* mapping results from db goes here */}
          {donors.map((donor, key) => (
            <tr key={key}>
              <td>{donor.account_id}</td>
              <td>{donor.is_volunteer}</td>
              <td>{donor.last_name}</td>
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
            <div className="modal-body">
              <p>{donorItem.account_id}</p>
              <p>{donorItem.is_volunteer}</p>
              <p>{donorItem.last_name}</p>
              <p>{donorItem.first_name}</p>
              <p>{donorItem.section}</p>
              <p>{donorItem.category_name}</p>
              <p>{donorItem.designation_name}</p>
              <p>{donorItem.email}</p>
              <p>{donorItem.contact_info}</p>
            </div>
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
  );
}
