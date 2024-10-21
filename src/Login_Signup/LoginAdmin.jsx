import React, { useState } from "react";
import bgImage from "../assets/images/agap_login.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginAdmin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["donor_token"]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setCredentials((values) => ({ ...values, [name]: value }));
  };

  const getJwtExpiry = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? new Date(payload.exp * 1000) : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(credentials);

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/create/loginAdmin.php",
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
          setCookie("admin_token", response.data.token, {
            path: "/",
            expires: getJwtExpiry(response.data.token),
            secure: true,
            sameSite: "strict",
          });
          navigate("/AdminPage");
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
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="login-box d-flex"
          style={{ width: "33%", height: "50vh" }}
        >
          <div className="login-form p-4 d-flex flex-column ">
            <h1
              className="text-center mb-4"
              style={{
                fontSize: "36px",
                fontWeight: "600",
                paddingTop: "10%",
                paddingBottom: "5%",
              }}
            >
              Sign In As Admin
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

              <button type="submit" className="btn">
                SIGN IN
              </button>
            </form>

            <div className="text-center" style={{ paddingTop: "15%" }}>
              <Link className="text-asAdmin" to="/">
                Sign In as User.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
