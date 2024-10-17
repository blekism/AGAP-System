import React, { useState } from "react";
import "./YourDonationTemplate.css";
import axios from "axios";

export default function YourDonationTemplate({
  donationid,
  statusName,
  receivedBy,
  receivedDate,
}) {
  const [yourDonationItems, setYourDonationItems] = useState([]);
  const handleButtonClick = (id) => {
    console.log("Button Clicked", id);

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonationItem.php",
        {
          donation_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setYourDonationItems(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="YourDonationContainerParent">
        <div className="YourDonationContainerHeader">
          <p>{donationid}</p>
          <div className="YourDonationContainerButton">
            <button
              data-bs-toggle="modal"
              data-bs-target="#viewItemsModalToggle"
              onClick={() => handleButtonClick(donationid)}
            >
              Items
            </button>
          </div>

          <div
            className="modal fade"
            id="viewItemsModalToggle"
            aria-hidden="true"
            aria-labelledby="viewItemsModalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog  modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">ITEMS LIST</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <table className="table table-striped">
                    <thead style={{ fontSize: "18px" }}>
                      <tr>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">COST</th>
                        <th scope="col">ITEM</th>
                        <th scope="col">CATEGORY</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "15px" }}>
                      {yourDonationItems.map((donationItem, key) => (
                        <tr key={key}>
                          <td>{donationItem.qty}</td>
                          <td>{donationItem.cost}</td>
                          <td>{donationItem.item}</td>
                          <td>{donationItem.category_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="YourDonationContainerBody">
          <p>Status: {statusName} </p>
          <p>Received By: {receivedBy} </p>
          <p>Received Date: {receivedDate} </p>
        </div>
      </div>
    </>
  );
}
