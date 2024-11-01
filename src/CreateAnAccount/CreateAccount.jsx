import React, { useState } from "react";
import "./CreateAccount.css";
import logo from "../assets/images/agap_logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerifyAccount from "../VolunteerSignUpPage/VerifyAccount.jsx";

function CreateAccount() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleClosePopup = () => {
    setPopupVisible(false); // Close the popup
  };

  const handleSubmitPopup = () => {
    alert("Account verified!"); // Perform your form submission logic here
    setPopupVisible(false); // Close the popup after verification
  };

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    age: "",
    phoneNumber: "",
    currentAddress: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setUserInfo((values) => ({ ...values, [name]: value }));
  };

  const validateForm = () => {
    for (let key in userInfo) {
      if (userInfo[key] === "") {
        setErrorMessage("Please fill out all fields.");
        return false;
      }
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setModalVisible(true);
    }
  };

  const handleConfirmRegistration = () => {
    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/create/signupDonor.php",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 201) {
          console.log("Signup successful!");
          setPopupVisible(true);
          setModalVisible(false);
        }
      });
  };

  return (
    <div className="CreateAccountParent">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <div classname="headertitle">
              <h5
                className="header-title"
                style={{
                  fontSize: "20px",
                  fontStyle: "normal",
                  color: "#000000",
                  fontWeight: "bold",
                  lineHeight: "normal",
                }}
              >
                Create an account
              </h5>
              <h5
                style={{
                  fontSize: "16px",
                  fontStyle: "normal",
                  color: "#354290",
                  fontWeight: "bold",
                  lineHeight: "normal",
                }}
              >
                Already have an account? &nbsp;
                <Link
                  to={"/"}
                  style={{ color: "#354290", textDecorationLine: "underline" }}
                >
                  Log in
                </Link>
              </h5>
            </div>
            <div classname="headerlogo">
              <img src={logo} alt="AGAP Logo" className="logo" />
            </div>
          </div>

          {/* First Name and Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" style={{ color: "#354290" }}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="inputCreateAccount"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: "#354290" }}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="inputCreateAccount"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email" style={{ color: "#354290" }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="inputCreateAccount"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" style={{ color: "#354290" }}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="inputCreateAccount"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" style={{ color: "#354290" }}>
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="inputCreateAccount"
                name="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <p style={{ fontSize: "14px", color: "grey" }}>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
          )}

          {/* Show Password Checkbox */}
          <div className="form-check-horizontal">
            <input
              type="checkbox"
              id="showPassword"
              onChange={togglePasswordVisibility}
              checked={showPassword}
              className="inputCreateAccount"
            />
            <label
              htmlFor="showPassword"
              className="checkbox-label"
              style={{ color: "#354290" }}
            >
              Show Password
            </label>
          </div>

          {/* Date of Birth and Age */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob" style={{ color: "#354290" }}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={userInfo.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age" style={{ color: "#354290" }}>
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={userInfo.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone Number and Landline Number */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber" style={{ color: "#354290" }}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="inputCreateAccount"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currentAddress" style={{ color: "#354290" }}>
              Current Address
            </label>
            <input
              type="text"
              id="currentAddress"
              className="inputCreateAccount"
              name="currentAddress"
              value={userInfo.currentAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          {/* <button type="submit" className="btn">
            Create an account
          </button> */}

          <button type="submit" className="btn">
            Create an Account
          </button>
        </form>
      </div>

      {/* modaaaal */}

      {isModalVisible && (
        <div
          className="modal fade show"
          id="confirmRegister"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Confirm Registration
                </h1>
              </div>
              <div className="modal-body">
                Are you sure you want to register this account?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleConfirmRegistration}
                  style={{
                    backgroundColor: "#354290",
                    color: "white",
                  }}
                >
                  Create an account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <VerifyAccount
          onClose={handleClosePopup}
          onSubmit={handleSubmitPopup}
        />
      )}
    </div>
  );
}

export default CreateAccount;
