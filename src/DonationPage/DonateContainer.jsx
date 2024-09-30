import React, { useState } from "react";
import axios from "axios";
import "./DonateContainer.css";
import DonationItemTemplate from "./DonationItemTemplate.jsx";

export default function DonateContainer() {
  const [items, setItems] = useState([
    { qty: "", cost: "", category: "3", recipient: "3", item: "3" },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addElement = () => {
    if (items.length < 5) {
      setItems([
        ...items,
        { qty: "", cost: "", category: "3", recipient: "3", item: "3" },
      ]);
    } else {
      alert("You can only add up to 4 items.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(items);
    const userInput = {
      recipient_id: items[0].recipient,
      account_id: "DONOR - 2024-12d6fd4",
      items: items.map((item) => ({
        item: item.item,
        item_category_id: item.category,
        qty: item.qty,
        cost: item.cost, // Replace with actual signature if available
      })),
    };
    console.log(userInput);
    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/create/insertDonation.php",
        userInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <div className="DonationParentContainer">
      <div className="DonationParentHeader">
        <h3>Donate</h3>
        <button onClick={addElement}>Add New Item</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="EventType">
          <p>Event Name: </p>
          <p>Organization/Department: </p>
        </div>
        <div className="ItemInput">
          {items.map((item, index) => (
            <DonationItemTemplate
              key={index}
              value1={item.qty}
              onChange1={(e) => handleInputChange(index, e)}
              name1="qty"
              value2={item.cost}
              onChange2={(e) => handleInputChange(index, e)}
              name2="cost"
              value3={item.item}
              onChange3={(e) => handleInputChange(index, e)}
              name3="item"
              value4={item.category}
              onChange4={(e) => handleInputChange(index, e)}
              name4="category"
              value5={item.recipient}
              onChange5={(e) => handleInputChange(index, e)}
              name5="recipient"
            />
          ))}
        </div>
        <div className="SubmitDonationGroup">
          <button type="submit">Submit Donation</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  );
}
