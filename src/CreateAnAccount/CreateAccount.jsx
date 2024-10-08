import React, { useState } from "react";
import "./CreateAccount.css";
import logo from "../assets/images/agap_logo1.png";
import { Link } from "react-router-dom";

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="CreateAccountParent">
      <div className="form-container">
        <form>
          <div className="form-header">
            <div classname="headertitle">
              <h5
                className="header-title"
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  color: "#354290",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Create an account
              </h5>
              <h5
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  color: "#354290",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Already have an account?
                <Link
                  to={"/login"}
                  style={{ color: "#111", textDecorationLine: "underline" }}
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: "#354290" }}>
                Last Name
              </label>
              <input type="text" id="lastName" className="inputCreateAccount" />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email" style={{ color: "#354290" }}>
              Email Address
            </label>
            <input type="email" id="email" className="inputCreateAccount" />
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
              />
            </div>
          </div>
          <p style={{ fontSize: "14px", color: "#354290" }}>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

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
              <input type="date" id="dob" />
            </div>
            <div className="form-group">
              <label htmlFor="age" style={{ color: "#354290" }}>
                Age
              </label>
              <input type="number" id="age" />
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="landlineNumber" style={{ color: "#354290" }}>
                Landline Number
              </label>
              <input
                type="tel"
                id="landlineNumber"
                className="inputCreateAccount"
              />
            </div>
          </div>

          {/* Province and Street Address */}
          <div className="form-group">
            <label htmlFor="province" style={{ color: "#354290" }}>
              Province
            </label>
            <input type="text" id="province" className="inputCreateAccount" />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress" style={{ color: "#354290" }}>
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              className="inputCreateAccount"
            />
          </div>

          {/* City and Province */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" style={{ color: "#354290" }}>
                City
              </label>
              <input type="text" id="city" className="inputCreateAccount" />
            </div>
            <div className="form-group">
              <label htmlFor="provinceInput" style={{ color: "#354290" }}>
                Province
              </label>
              <input
                type="text"
                id="provinceInput"
                className="inputCreateAccount"
              />
            </div>
          </div>

          <div className="form-check-horizontal1">
            <input
              type="checkbox"
              id="terms"
              onChange={togglePasswordVisibility}
              checked={showPassword}
              className="inputCreateAccount"
            />
            <label
              htmlFor="terms"
              className="checkbox-label1"
              style={{ color: "#354290" }}
            >
              {" "}
              Do you accept our
              <a href="#" style={{ color: "#00DBEB" }}>
                {" "}
                terms and condition
              </a>{" "}
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
