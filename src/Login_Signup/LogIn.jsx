import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LogIn.css";
import bgImage from "../assets/images/agap_login.png";
import axios from "axios";
import Cookies from "universal-cookie";

function LogIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCredentials((values) => ({ ...values, [name]: value }));
  };

  const getJwtExpiry = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
    return payload.exp ? new Date(payload.exp * 1000) : null; // Convert seconds to milliseconds
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(credentials);

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/create/loginOrVerifyDonor.php",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log("Login successful!");
          cookies.set("donor_token", response.data.token, {
            path: "/",
            expires: getJwtExpiry(response.data.token),
            secure: true,
            sameSite: "strict",
          });
          navigate("/"); // gagawin tong redirect to donor dashboard kasi yun ang pinaka basic level of access for a user
        } else {
          console.log("Login failed!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-box d-flex">
          <div className="login-form p-4 d-flex flex-column justify-content-between">
            <h1
              className="text-center mb-4"
              style={{ fontSize: "36px", fontWeight: "600" }}
            >
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  style={{
                    background: "#EEE",
                    width: "364.514px",
                    margin: "auto",
                    borderRadius: "10.069px",
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  style={{
                    background: "#EEE",
                    width: "364.514px",
                    margin: "auto",
                    borderRadius: "10.069px",
                  }}
                />
              </div>
              <div className="mb-3">
                <a
                  href="#"
                  className="text-muted:hover"
                  style={{
                    lineHeight: "27.188px",
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: "#6c757d",
                  }}
                >
                  Forgot Your Password?
                </a>
              </div>
              <button type="submit" className="btn">
                SIGN IN
              </button>
            </form>

            <div className="text-center mt-3">
              <a href="#" className="text-asAdmin">
                Sign In as Admin.
              </a>
            </div>
          </div>

          <div className="register-box p-4">
            <h2>Hello!</h2>
            <p>
              Register with your personal account <br /> to use this app
            </p>
            <button
              className="btn2"
              style={{ background: "#354290", border: "3.398px solid #FFF" }}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
