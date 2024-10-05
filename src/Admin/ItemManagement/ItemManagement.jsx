import React, { useState } from "react";
import "./ItemManagement.css";
import Clothes from "../../assets/images/clothes.png";
import Food from "../../assets/images/food.png";
import Medicine from "../../assets/images/medical_supplies.png";
import Electronics from "../../assets/images/electronic.png";
import Furniture from "../../assets/images/furniture.png";
import Household from "../../assets/images/household.png";
import School from "../../assets/images/school.png";
import SelfCare from "../../assets/images/selfcare.png";
import Toys from "../../assets/images/toys.png";
import Logout from "../../assets/images/logout.png";

export default function ItemManagement() {
  const [items, setItems] = useState([]);

  return (
    <div className="ItemManagementParent">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <img src={Food} alt="Food Icon" />
          <button
            className="nav-link active"
            id="pills-food-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-food"
            type="button"
            role="tab"
            aria-controls="pills-food"
            aria-selected="true"
          >
            Food
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Clothes} alt="Clothes Icon" />
          <button
            className="nav-link"
            id="pills-clothes-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-clothes"
            type="button"
            role="tab"
            aria-controls="pills-clothes"
            aria-selected="false"
          >
            Clothes
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Medicine} alt="Medicine Icon" />
          <button
            className="nav-link"
            id="pills-medicine-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-medicine"
            type="button"
            role="tab"
            aria-controls="pills-medicine"
            aria-selected="false"
          >
            Medicine
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Electronics} alt="Electronics Icon" />
          <button
            className="nav-link"
            id="pills-electronics-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-electronics"
            type="button"
            role="tab"
            aria-controls="pills-electronics"
            aria-selected="false"
          >
            Electronics
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Furniture} alt="Furniture Icon" />
          <button
            className="nav-link"
            id="pills-furniture-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-furniture"
            type="button"
            role="tab"
            aria-controls="pills-furniture"
            aria-selected="false"
          >
            Furniture
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Household} alt="Household Icon" />
          <button
            className="nav-link"
            id="pills-household-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-household"
            type="button"
            role="tab"
            aria-controls="pills-household"
            aria-selected="false"
          >
            Household
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={School} alt="School Icon" />
          <button
            className="nav-link"
            id="pills-school-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-school"
            type="button"
            role="tab"
            aria-controls="pills-school"
            aria-selected="false"
          >
            School
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={SelfCare} alt="SelfCare Icon" />
          <button
            className="nav-link"
            id="pills-selfcare-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-selfcare"
            type="button"
            role="tab"
            aria-controls="pills-selfcare"
            aria-selected="false"
          >
            SelfCare
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <img src={Toys} alt="Toys Icon" />
          <button
            className="nav-link"
            id="pills-toys-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-toys"
            type="button"
            role="tab"
            aria-controls="pills-toys"
            aria-selected="false"
          >
            Toys
          </button>
        </li>
      </ul>
    </div>
  );
}
