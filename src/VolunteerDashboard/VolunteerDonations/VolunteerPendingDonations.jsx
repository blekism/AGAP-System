import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerDashboardSidebar from "../VolunteerDashboardSidebar";
import VolunteerNavHeader from "../VolunteerNavHeader";
import "./VolunteerPendingDonations.css";
import Accept from "../../assets/images/Accept.png";
import Reject from "../../assets/images/Reject.png";

export default function VolunteerPendingDonations() {
  const [donations, setDonations] = useState([]);
  const [identifier, setIdentifier] = useState([]);
  const [donationItems, setDonationItem] = useState([]);

  const handleButtonClick = (id) => {
    setIdentifier(id);
    // Perform any action with the ID
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInput = {
          donation_id: identifier,
        };
        const response = await axios.post(
          "http://localhost/agap-backend/api/phase_1/read/readDonationItem.php",
          userInput, // Use the updated state
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setDonationItem(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [identifier]);

  // useEffect(() => {
  //   if (identifier !== null) {
  //     console.log("Updated Identifier:", identifier);
  //   }
  // }, [identifier]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(
        "http://localhost/AGAP-BACKEND/api/phase_1/read/readAllDonationsAdmin.php"
      )
      .then(function (response) {
        console.log(response.data);
        setDonations(response.data.data);
      });
  }, []);
  return (
    <>
      <div className="VolunteerPendingDonations-parentCont">
        <VolunteerNavHeader />
        <div className="VolunteerPendingDonations-bodyCont">
          <div className="VolunteerPendingDonations-leftCont">
            <VolunteerDashboardSidebar />
          </div>
          <div className="VolunteerPendingDonations-rightCont">
            <p>PENDING DONATIONS LIST</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">DONATION ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">RECEIPIENT</th>
                  <th scope="col">DATE ACCEPTED</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ACTION</th>
                  <th scope="col">VIEW ITEMS</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, key) => (
                  <tr key={key}>
                    <td>{donation.donation_id}</td>
                    <td>{donation.donor_lastName}</td>
                    <td>{donation.receiver_lastName}</td>
                    <td>{donation.received_date}</td>
                    <td>{donation.status_name}</td>
                    <td>
                      <button className="btn">
                        <img
                          src={Accept}
                          alt="Time In"
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: "none",
                          }}
                        />
                      </button>
                      <button className="btn">
                        <img
                          src={Reject}
                          alt="Time In"
                          style={{
                            width: "30px",
                            height: "30px",
                            padding: "none",
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      <div className="ViewItemsModal-ParentCont">
                        <button
                          type="button"
                          className="viewItemsBtn"
                          data-bs-toggle="modal"
                          data-bs-target="#viewItemsModalToggle"
                          onClick={() =>
                            handleButtonClick(donation.donation_id)
                          }
                        >
                          ITEMS
                        </button>

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
                                  <thead>
                                    <tr>
                                      <th scope="col">QUANTITY</th>
                                      <th scope="col">COST</th>
                                      <th scope="col">ITEM</th>
                                      <th scope="col">CATEGORY</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {donationItems.map((donationItem, key) => (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
