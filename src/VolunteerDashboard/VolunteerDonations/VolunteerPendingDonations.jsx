import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import VolunteerDashboardSidebar from "../VolunteerDashboardSidebar";
import VolunteerNavHeader from "../VolunteerNavHeader";
import "./VolunteerPendingDonations.css";

export default function VolunteerPendingDonations() {
  const [donations, setDonations] = useState([]);
  const [identifier, setIdentifier] = useState([]);
  const [donationItems, setDonationItem] = useState([]);
  const [cookies] = useCookies(["donor_token"]);

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
          "http://localhost/agap-backend-main/api/phase_1/read/readDonationItem.php",
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
        "http://localhost/agap-backend-main/api/phase2&3/read/readAllDonationsVolunteer.php"
      )
      .then(function (response) {
        console.log(response.data);
        const filteredData = response.data.data.filter(
          (donation) => donation.status_name === "SUBMITTED"
        );
        setDonations(response.data.data);
      });
  }, []);

  const handleItemUpdate = async () => {
    if (identifier !== null) {
      console.log("Update button clicked");

      try {
        const response = await axios.put(
          "http://localhost/agap-backend-main/api/phase_1/update/updateReceiveDonation.php",
          { donation_id: identifier },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.donor_token,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating donation:", error);
      }
    } else {
      console.log("No donation selected for update.");
    }
  };

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
                  <th scope="col">DONOR</th>
                  <th scope="col">RECEIPIENT</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">VIEW ITEMS</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((donation) => donation.status_name === "SUBMITTED")
                  .map((donation, key) => (
                    <tr key={key}>
                      <td>{donation.donation_id}</td>
                      <td>{donation.donor_lastName}</td>
                      <td>{donation.recipient_type}</td>
                      <td>{donation.status_name}</td>
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
                                      {donationItems.map(
                                        (donationItem, key) => (
                                          <tr key={key}>
                                            <td>{donationItem.qty}</td>
                                            <td>{donationItem.cost}</td>
                                            <td>{donationItem.item}</td>
                                            <td>
                                              {donationItem.category_name}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#acceptDonationConfirmationModal"
                                    style={{
                                      background: "#354290",
                                      color: "white",
                                    }}
                                  >
                                    ACCEPT
                                  </button>
                                  <button
                                    type="button"
                                    className="btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalToggle3"
                                    style={{
                                      background: "#354290",
                                      color: "white",
                                    }}
                                  >
                                    REJECT
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="AcceptDonationConfirmationModal">
                            <div
                              className="modal fade"
                              id="acceptDonationConfirmationModal"
                              aria-hidden="true"
                              aria-labelledby="acceptDonationConfirmationModalLabel"
                              tabIndex="-1"
                            >
                              <div className="modal-dialog  modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Confirmation
                                    </h5>
                                  </div>

                                  <div
                                    className="body"
                                    style={{
                                      height: "5vh",
                                      paddingLeft: "20px",
                                      paddingTop: "10px",
                                    }}
                                  >
                                    <h5
                                      style={{
                                        fontWeight: "400",
                                      }}
                                    >
                                      Are you sure you want to accept this
                                      Donation?
                                    </h5>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleItemUpdate}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModalToggle2"
                                    >
                                      Yes
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                    >
                                      No
                                    </button>
                                  </div>
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
