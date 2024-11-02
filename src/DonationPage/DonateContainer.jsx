import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonateContainer.css";
import DonationItemTemplate from "./DonationItemTemplate.jsx";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function DonateContainer() {
  const [items, setItems] = useState([
    {
      qty: "",
      unit_cost: "",
      total_item_cost: "",
      category: "3",
      recipient: "3",
      item: "3",
    },
  ]);
  const [validEvents, setValidEvents] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("");
  const [DonorID, setDonorID] = useState({});
  const [cookies] = useCookies(["donor_token"]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "qty" || name === "unit_cost") {
      const qty = parseInt(newItems[index].qty) || 0;
      const cost = parseInt(newItems[index].unit_cost) || 0;
      newItems[index].total_item_cost = qty * cost;
    }

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

    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        const filteredEvents = response.data.data.filter(
          (event) =>
            event.event_status !== "closed" && event.event_status !== "finished"
        );
        setValidEvents(filteredEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEventChange = (event) => {
    setDropDownValue(event.target.value);
  };

  const addElement = () => {
    if (items.length < 5) {
      setItems([
        ...items,
        {
          qty: "",
          unit_cost: "",
          total_item_cost: "",
          category: "3",
          recipient: "3",
          item: "3",
        },
      ]);
    } else {
      alert("You can only add up to 4 items.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(items);

    const totalCost = items.reduce(
      (acc, item) => acc + parseFloat(item.total_item_cost),
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
        unit_cost: item.unit_cost,
        total_item_cost: item.total_item_cost,
      })),
    };

    if (dropDownValue !== "") {
      userInput.event_id = dropDownValue;
    }

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
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleEventChange}
            name="event_id"
            value={dropDownValue}
            style={{ width: "40%" }}
          >
            <option value="">
              Choose an event (you can choose to leave this blank)
            </option>
            {validEvents.map((event, key) => (
              <option key={key} value={event.evenet_id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>
        <div className="ItemInput">
          {items.map((item, index) => (
            <DonationItemTemplate
              key={index}
              value1={item.qty}
              onChange1={(e) => handleInputChange(index, e)}
              name1="qty"
              value2={item.unit_cost}
              onChange2={(e) => handleInputChange(index, e)}
              name2="unit_cost"
              value3={item.item}
              onChange3={(e) => handleInputChange(index, e)}
              name3="item"
              value4={item.category}
              onChange4={(e) => handleInputChange(index, e)}
              name4="category"
              value5={item.recipient}
              onChange5={(e) => handleInputChange(index, e)}
              name5="recipient"
              value6={item.total_item_cost}
              onChange6={(e) => handleInputChange(index, e)}
              name6="total_item_cost"
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
