import React, { useState, useEffect } from "react";
import axios from "axios";
import DonationManagement from "./DonationManagement.jsx";
import "./DonationContent.css";
import Entered from "../../assets/images/entered.png";
import Stocked from "../../assets/images/stocked.png";
import Processed from "../../assets/images/process.png";
import Give from "../../assets/images/give.png";

export default function DonationContent() {
  const [category, setCategory] = useState({ status_id: 3000 });
  const [items, setItems] = useState([]);

  const handleCategory = (id) => {
    setCategory({ status_id: id });
  };

  useEffect(() => {
    console.log(category);
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost/AGAP-backend-main/api/phase_1/read/readAllDonationsAdmin.php",
          category,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
        setItems([]);
      }
    };
    fetchItems(); //fetch items when category changes
  }, [category]); //use effect will run everytime category changes

  return (
    <div className="ahuhu">
      <div className="DonationManagementParent">
        <ul
          className="nav nav-pills mb-3 custom"
          id="pills-tab"
          role="tablist"
          style={{
            backgroundColor: "#ededed",
            width: "fit-content",
            overflowY: "auto",
          }}
        >
          <li className="nav-item" role="presentation">
            <img src={Entered} alt="Clothes Icon" />

            <button
              className="nav-link active"
              id="pills-submitted-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-submitted"
              type="button"
              role="tab"
              aria-controls="pills-submitted"
              aria-selected="true"
              onClick={() => handleCategory(3000)}
            >
              Submitted
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Stocked} alt="Clothes Icon" />

            <button
              className="nav-link"
              id="pills-received-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-received"
              type="button"
              role="tab"
              aria-controls="pills-received"
              aria-selected="false"
              onClick={() => handleCategory(3001)}
            >
              Received
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Processed} alt="Clothes Icon" />

            <button
              className="nav-link"
              id="pills-processed-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-processed"
              type="button"
              role="tab"
              aria-controls="pills-processed"
              aria-selected="false"
              onClick={() => handleCategory(3002)}
            >
              Processed
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Give} alt="Clothes Icon" />

            <button
              className="nav-link"
              id="pills-turnover-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-turnover"
              type="button"
              role="tab"
              aria-controls="pills-turnover"
              aria-selected="false"
              onClick={() => handleCategory(3003)}
            >
              Turnover
            </button>
          </li>
        </ul>

        {/* START OF MAIN CONTENT */}
        <div
          className="tab-content"
          id="pills-tabContent"
          style={{
            backgroundColor: "white",
            padding: "20px",
            margin: "0px",
            overflowY: "auto",
          }}
        >
          <div
            className="tab-pane fade show active"
            id="pills-submitted"
            role="tabpanel"
            aria-labelledby="pills-submitted-tab"
            tabIndex="0"
          >
            <DonationManagement donations={items} />

            {/* item1 */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-received"
            role="tabpanel"
            aria-labelledby="pills-received-tab"
            tabIndex="0"
          >
            <DonationManagement donations={items} />

            {/* item2 */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-processed"
            role="tabpanel"
            aria-labelledby="pills-processed-tab"
            tabIndex="0"
          >
            <DonationManagement donations={items} />

            {/* item3 */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-turnover"
            role="tabpanel"
            aria-labelledby="pills-turnover-tab"
            tabIndex="0"
          >
            <DonationManagement donations={items} />

            {/* item4 */}
          </div>
        </div>
      </div>
    </div>
  );
}
