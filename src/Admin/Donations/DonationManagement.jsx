import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DonationContent({
  donations,
  modalId,
  modalTarget,
  footerModalId,
}) {
  const [donationItemsList, setDonationItemsList] = useState([]);
  const [itemClicked, setItemClicked] = useState({ donation_id: 0 });
  const [cookies] = useCookies(["donor_token"]);

  const handleItemClick = async (id) => {
    setItemClicked({ donation_id: id });
    console.log("The donation item id is " + id);
    console.log(cookies.donor_token);

    try {
      const response = await axios.post(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonationItem.php",
        { donation_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setDonationItemsList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    console.log("Update button clicked");

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/update/updateReceiveDonation.php",
        itemClicked,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <div
      style={{ paddingRight: "10px", overflowY: "auto", maxHeight: "750px" }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Donation ID</th>
            <th scope="col">Donor</th>
            <th scope="col">Status</th>
            <th scope="col">Recipient</th>
            <th scope="col">Time</th>
            <th scope="col">Recieved By</th>
            <th scope="col">Recieved Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping results from db goes here */}
          {donations.map((donation, key) => (
            <tr key={key}>
              <td>{donation.donation_id}</td>
              <td>{donation.donor_lastName}</td>
              <td>{donation.status_name}</td>
              <td>{donation.recipient_type}</td>
              <td>{donation.time}</td>
              <td>{donation.receiver_lastName}</td>
              <td>{donation.received_date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={modalTarget}
                  onClick={() => handleItemClick(donation.donation_id)}
                >
                  Items
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
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {/* mapping results from db goes here */}
                  {donationItemsList.map((item, key) => (
                    <tr key={key}>
                      <td>{item.item}</td>
                      <td>{item.cost}</td>
                      <td>{item.qty}</td>
                      <td>{item.category_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {modalId === footerModalId && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Decline
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
