import React, { useState, useEffect } from "react";
import Trash from "../assets/images/trash.png";
import "./DonationItemTemplate.css";
import axios from "axios";

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
  removeItem,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value3);
  const [itemCategory, setItemCategory] = useState([]);

  const items = [
    "pencil",
    "ballpen",
    "toothbrush",
    "storybooks",
    "seed packs",
    "toothpaste",
    "sanitary napkins",
    "tissue",
    "clothes",
    "blanket",
    "medicine",
    "emergency kit",
    "canned goods",
    "rice",
    "noodles",
    "water",
    "milk",
    "shampoo",
    "soap",
    "crayons",
    "coloring books",
    "slippers",
    "toys",
    "school bags",
    "school shoes",
    "school uniform",
    "diapers",
    "socks",
    "notebooks",
    "writing pads",
    "long brown envelope",
    "folders",
    "short brown envelope",
    "scissors",
    "short plastic envelope",
    "long plastic envelope",
    "correcting tape",
    "highlighter",
    "sharpener",
    "eraser",
    "ruler",
  ];

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readItemCategory.php"
      )
      .then(function (response) {
        console.log(response.data);
        setItemCategory(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setInputValue(value3);
  }, [value3]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange3(e);

    if (value) {
      const filteredSuggestions = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onChange3({ target: { name: name3, value: suggestion } });
  };

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
          required
        >
          <option value="3">Choose Category</option>
          {itemCategory.map((category, index) => (
            <option key={index} value={category.item_category_id}>
              {category.category_name}
            </option>
          ))}

          {/* <option value="4000">School Supplies</option>
          <option value="4004">Food</option> */}
        </select>
      </div>

      {/* item start */}
      <div
        className="itemInputParent"
        style={{ position: "relative", width: "12%", marginBottom: "30px" }}
      >
        <input
          type="text"
          className="form-control mt-4"
          value={inputValue}
          onChange={handleInputChange}
          name={name3}
          required
          placeholder="Item"
        />
        {suggestions.length > 0 && (
          <ul
            className="suggestions-list"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              listStyleType: "none",
              padding: "5px",
              margin: 0,
              width: "fit-content",
              zIndex: 1,
              borderRadius: "5px",
              marginTop: "7px",
              height: suggestions.length > 5 ? "200px" : "auto",
              overflowY: "auto",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

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
          required
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
          required
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
          required
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
          required
        >
          <option value="3">Choose Recipient</option>
          <option value="6000">Volunteer</option>
          <option value="6001">Benificiaries</option>
        </select>
      </div>

      <div className="EditButtons">
        <img src={Trash} className="icon" onClick={removeItem} />
      </div>
    </div>
  );
}
