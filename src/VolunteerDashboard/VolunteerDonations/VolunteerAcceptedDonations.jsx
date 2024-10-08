import React from "react";
import "./VolunteerAcceptedDonations.css";
import VolunteerDashboardSidebar from "../VolunteerDashboardSidebar";
import VolunteerNavHeader from "../VolunteerNavHeader";
import ViewItemsModal from "./ViewItemsModal";
import Accept from "../../assets/images/Accept.png";
import Reject from "../../assets/images/Reject.png";

export default function VolunteerAcceptedDonations() {
  return (
    <>
      <div className="VolunteerAcceptedDonations-parentCont">
        <VolunteerNavHeader />
        <div className="VolunteerAcceptedDonations-bodyCont">
          <div className="VolunteerAcceptedDonations-leftCont">
            <VolunteerDashboardSidebar />
          </div>
          <div className="VolunteerAcceptedDonations-rightCont">
            <p>ACCEPTED DONATIONS LIST</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">EVENT NAME</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL COST</th>
                  <th scope="col">VIEW ITEMS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="ViewItemsModal-ParentCont">
                      <button
                        type="button"
                        className="viewItemsBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#viewItemsModalToggle"
                        // onClick={() => handleButtonClick(donation.donation_id)}
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
                                  {/* {donationItems.map((donationItem, key) => ( 
                                   <tr key={key}>
                                      <td>{donationItem.qty}</td>
                                      <td>{donationItem.cost}</td>
                                      <td>{donationItem.item}</td>
                                      <td>{donationItem.category_name}</td>
                                    </tr>
                                  ))} */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
