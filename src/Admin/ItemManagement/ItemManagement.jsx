import React, { useState, useEffect } from "react";
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
import ItemTable from "./ItemManagementTable.jsx";
import axios from "axios";

export default function ItemManagement({ events }) {
  const [category, setCategory] = useState({ category_id: 4000 });
  const [items, setItems] = useState([]);
  const [deductItems, setDeductItems] = useState([]);
  const [eventItem, setEventItem] = useState("none");

  const handleChange = (event, itemName) => {
    const value = event.target.value;
    setDeductItems((prev) => ({ ...prev, [itemName]: value }));
  };

  const handleEventChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEventItem((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(deductItems);

    const itemsObject = { ...deductItems };

    const userInput = {
      items: itemsObject,
      evenet_id: eventItem.evenet_id,
    };

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/update/updateDeductFromStock.php",
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

  const handleCategory = (id) => {
    setCategory({ category_id: id });
  };

  useEffect(() => {
    console.log(category);
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost/AGAP-backend-main/api/phase_1/read/readSpecificCategory.php",
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

  const confirmAction = (event, action) => {
    if (window.confirm(action)) {
      handleSubmit(event);
    }
  };

  return (
    <div className="ahehe">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: "fit-content",
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
          onClick={(event) =>
            confirmAction(event, "Are you sure you want to deduct from stock?")
          }
        >
          Deduct From Stock
        </button>
        <select
          className="form-select mb-3"
          aria-label="Default select example"
          name="evenet_id"
          value={eventItem.evenet_id}
          onChange={handleEventChange}
          style={{
            width: "500px",
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
        >
          <option value="none">Select Event</option>
          {events
            .filter(
              (event) =>
                event.event_status !== "closed" &&
                event.event_status !== "finished"
            )
            .map((event, key) => (
              <option key={key} value={event.evenet_id}>
                {event.event_name}
              </option>
            ))}
        </select>
        <div className="ItemManagementParent">
          <ul
            className="nav nav-pills mb-3 custom"
            id="pills-tab"
            role="tablist"
            style={{
              backgroundColor: "#ededed",
              height: "fit-content",
              width: "fit-content",
            }}
          >
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
                onClick={() => handleCategory(4000)}
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
                onClick={() => handleCategory(4001)}
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
                onClick={() => handleCategory(4004)}
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
                onClick={() => handleCategory(4008)}
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
                onClick={() => handleCategory(4007)}
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
                onClick={() => handleCategory(4002)}
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
                onClick={() => handleCategory(4005)}
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
                onClick={() => handleCategory(4003)}
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
                onClick={() => handleCategory(4006)}
              >
                Toys
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
              id="pills-food"
              role="tabpanel"
              aria-labelledby="pills-food-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="food"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item1 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-clothes"
              role="tabpanel"
              aria-labelledby="pills-clothes-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="clothes"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item2 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-medicine"
              role="tabpanel"
              aria-labelledby="pills-medicine-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="medicine"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item3 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-electronics"
              role="tabpanel"
              aria-labelledby="pills-electronics-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="electronics"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item4 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-furniture"
              role="tabpanel"
              aria-labelledby="pills-furniture-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="furniture"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item5 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-household"
              role="tabpanel"
              aria-labelledby="pills-household-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="household"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item6 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-school"
              role="tabpanel"
              aria-labelledby="pills-school-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="school"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item7 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-selfcare"
              role="tabpanel"
              aria-labelledby="pills-selfcare-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="selfcare"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item8 */}
            </div>
            <div
              className="tab-pane fade"
              id="pills-toys"
              role="tabpanel"
              aria-labelledby="pills-toys-tab"
              tabIndex="0"
            >
              <ItemTable
                items={items}
                name="toys"
                onChange={handleChange}
                deductValue={deductItems}
              />

              {/* item9 */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
