import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./YourDonationContainer.css";

export default function YourDonationConatiner() {
  const [yourDonation, setYourDonation] = useState([]);
  const [yourDonationItems, setYourDonationItems] = useState([]);
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonationDonor.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("this is your donations ", response.data.data);
        setYourDonation(response.data.data);
      });
  }, []);

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
        console.log(response.data.data);
        setYourDonationItems(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="YourDonationParentContainer">
      <div className="YourDonationParentHeader">
        <h3>Your Donations</h3>
      </div>

      <div className="YourDonationInput">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">DONATION ID</th>
              <th scope="col">LAST NAME</th>
              <th scope="col">RECEIPIENT</th>
              <th scope="col">TOTAL COST</th>
              <th scope="col">DATE AND TIME DONATED</th>
              <th scope="col">VIEW ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {yourDonation.map((yourDonations, key) => (
              <tr key={key}>
                <td>{yourDonations.donation_id}</td>
                <td>{yourDonations.donor_lastName}</td>
                <td>{yourDonations.recipient_type}</td>
                <td>{yourDonations.total_cost}</td>
                <td></td>
                <td>
                  <div className="YourDonationContainerButton">
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#viewItemsModalToggle"
                      onClick={() =>
                        handleButtonClick(yourDonations.donation_id)
                      }
                      style={{
                        backgroundColor: "#354290",
                        color: "#ffffff",
                      }}
                    >
                      Items
                    </button>

                    <div
                      className="modal fade"
                      id="viewItemsModalToggle"
                      aria-hidden="true"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      aria-labelledby="viewItemsModalToggleLabel"
                      tabIndex="-1"
                    >
                      <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">DONATION ITEMS LIST</h5>
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
                                  <th scope="col">ITEM</th>
                                  <th scope="col">QUANTITY</th>
                                  <th scope="col">COST</th>
                                  <th scope="col">CATEGORY</th>
                                </tr>
                              </thead>
                              <tbody style={{ fontSize: "15px" }}>
                                {yourDonationItems.map((donationItem, key) => (
                                  <tr key={key}>
                                    <td>{donationItem.item}</td>
                                    <td>{donationItem.qty}</td>
                                    <td>{donationItem.cost}</td>
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
        {/* {yourDonation.map((yourDonations, key) => (
          <YourDonationTemplate
            key={key}
            donationid={yourDonations.donation_id}
            statusName={yourDonations.status_name}
            receivedBy={yourDonations.received_by}
            receivedDate={yourDonations.received_date}
            modalId={yourDonations.donation_id}
            modalTarget={"#" + yourDonations.donation_id}
          />
        ))} */}
      </div>
    </div>
  );
}
