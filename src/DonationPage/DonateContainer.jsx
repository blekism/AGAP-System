import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonateContainer.css";
import DonationItemTemplate from "./DonationItemTemplate.jsx";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function DonateContainer() {
  const [items, setItems] = useState([
    { qty: "", cost: "", category: "3", recipient: "3", item: "3" },
  ]);
  const [DonorID, setDonorID] = useState({});
  const [cookies] = useCookies(["donor_token"]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  useEffect(() => {
    if (cookies.donor_token) {
      try {
        const decode = jwtDecode(cookies.donor_token);
        console.log("token is ", decode.sub);
        setDonorID(decode.sub);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

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

    const totalCost = items.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    );
    const userInput = {
      recipient_id: items[0].recipient,
      account_id: DonorID,
      total_cost: totalCost,
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
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#confirmSubmit"
          >
            Submit Donation
          </button>
          <button>Cancel</button>
        </div>

        {/* modaaaal */}
        <div
          className="modal fade"
          id="confirmSubmit"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Are you sure you want to submit this donation?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">donation content here</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
