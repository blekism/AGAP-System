import React, { useState, useEffect } from "react";
import axios from "axios";
import VolunteersTables from "./Volunteers.jsx";
// import "./VolunteersManagement.css";
import Entered from "../../assets/images/entered.png";
import Stocked from "../../assets/images/stocked.png";

export default function VolunteersManagement() {
  const [category, setCategory] = useState({ is_volunteer: "volunteer" });
  const [items, setItems] = useState([]);

  const handleCategory = (id) => {
    setCategory({ is_volunteer: id });
  };

  useEffect(() => {
    console.log(category);
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost/agap-backend-main/api/phase2&3/read/read_volunteer_acc.php",
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
    <div className="ahehe">
      <div
        className="VolunteersManagementParent"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ul
          className="nav nav-pills mb-3 custom"
          id="pills-tab"
          role="tablist"
          style={{
            backgroundColor: "#ededed",
            width: "fit-content",
            overflowY: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <li className="nav-item" role="presentation">
            <img src={Entered} alt="Clothes Icon" />

            <button
              className="nav-link active"
              id="pills-members-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-members"
              type="button"
              role="tab"
              aria-controls="pills-members"
              aria-selected="true"
              onClick={() => handleCategory("volunteer")}
            >
              Members
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Stocked} alt="Clothes Icon" />

            <button
              className="nav-link"
              id="pills-applicants-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-applicants"
              type="button"
              role="tab"
              aria-controls="pills-applicants"
              aria-selected="false"
              onClick={() => handleCategory("volunteer_apply")}
            >
              Applicants
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
            id="pills-members"
            role="tabpanel"
            aria-labelledby="pills-members-tab"
            tabIndex="0"
          >
            <VolunteersTables
              volunteers={items}
              modalId="memberItems"
              modalTarget="#memberItems"
              volunHeader="Members"
            />

            {/* item1 */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-applicants"
            role="tabpanel"
            aria-labelledby="pills-applicants-tab"
            tabIndex="0"
          >
            <VolunteersTables
              volunteers={items}
              modalId="applicantItems"
              modalTarget="#applicantItems"
              volunHeader="Applicants"
            />

            {/* item2 */}
          </div>
        </div>
      </div>
    </div>
  );
}
