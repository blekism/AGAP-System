import React from "react";
import "./ViewItemsModal.css";

export default function ViewItemsModal() {
  return (
    <>
      <div className="ViewItemsModal-ParentCont">
        <button
          type="button"
          className="viewItemsBtn"
          data-bs-toggle="modal"
          data-bs-target="#viewItemsModalToggle"
          onClick={() => handleButtonClick(row.id)}
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
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
