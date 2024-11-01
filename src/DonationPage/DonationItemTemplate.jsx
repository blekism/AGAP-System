import React, { useState } from "react";
import Pen from "../assets/images/pen.png";
import Trash from "../assets/images/trash.png";
import "./DonationItemTemplate.css";

export default function DonationItemTemplate({
  value1,
  onChange1,
  name1,
  value2,
  onChange2,
  name2,
  value3,
  onChange3,
  name3,
  value4,
  onChange4,
  name4,
  value5,
  onChange5,
  name5,
  value6,
  onChange6,
  name6,
}) {
  return (
    <div className="ItemContainerParent">
      <div className="CategoryDropDown">
        <select
          className="form-select mt-4"
          aria-label="Default select example"
          value={value4}
          onChange={onChange4}
          name={name4}
          style={{ width: "100%" }}
        >
          <option value="3">Choose Category</option>
          <option value="4000">School Supplies</option>
          <option value="4004">Food</option>
        </select>
      </div>

      {/* item start */}
      <select
        className="form-select mt-4"
        aria-label="Default select example"
        value={value3}
        onChange={onChange3}
        name={name3}
        style={{ width: "12%", marginBottom: "30px" }}
      >
        <option value="3">Choose Item</option>
        <option value="pen">item 1</option>
        <option value="bag">item 2</option>
        <option value="food">item 3</option>
      </select>
      {/* item end */}

      {/* quantity start*/}
      <div
        className="input-group input-group-sm"
        style={{ width: "10%", marginBottom: "5px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Quantity"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          value={value1}
          onChange={onChange1}
          name={name1}
        />
      </div>
      {/* quantity end*/}

      {/* cost start */}
      <div
        className="input-group input-group-sm"
        style={{ width: "12%", marginBottom: "5px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Cost per Unit"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          value={value2}
          onChange={onChange2}
          name={name2}
        />
      </div>
      {/* cost end */}

      {/* total cost start */}
      <div
        className="input-group input-group-sm"
        style={{ width: "12%", marginBottom: "5px" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Total Cost"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          readOnly
          value={value6}
          onChange={onChange6}
          name={name6}
        />
      </div>
      {/* total cost end */}

      <div className="CategoryDropDown">
        <select
          className="form-select mt-4"
          aria-label="Default select example"
          value={value5}
          onChange={onChange5}
          name={name5}
          style={{ width: "100%" }}
        >
          <option value="3">Choose Recipient</option>
          <option value="6000">Volunteer</option>
          <option value="6001">Benificiaries</option>
        </select>
      </div>

      <div className="EditButtons">
        <img src={Trash} className="icon" />
      </div>
    </div>
  );
}
