import React, { useState, useEffect } from "react";
import "./VolunteerSignUp.css";
import bgImage from "../assets/images/agap_login.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

function VolunteerSignUp() {
  const [volunteerInfo, setVolunteerInfo] = useState({
    section: "",
    department: "",
    designation: "",
  });
  const [volunteerId, setVolunteerId] = useState({});
  const [cookies, removeCookie] = useCookies(["donor_token"]);

  useEffect(() => {
    if (cookies.donor_token) {
      try {
        const decoded = jwtDecode(cookies.donor_token);
        setVolunteerId(decoded.sub);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleApplyClick = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase_1/create/ApplyAsVolunteer.php",
        volunteerInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          removeCookie("donor_token");
          alert(
            "Application Submitted Successfully! Please Log in again to continue."
          );
          window.location.href = "/";
        }
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setVolunteerInfo((values) => ({
      ...values,
      [name]: value,
      account_id: volunteerId,
    }));
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
        <div className="form-box">
          <h2 className="form-title">FORMS</h2>
          <form onSubmit={handleApplyClick}>
            <div className="form-group1">
              <input
                type="text"
                id="section"
                name="section"
                placeholder="Section:"
                value={volunteerInfo.section}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <select
                id="department"
                name="department"
                onChange={handleChange}
                value={volunteerInfo.department}
              >
                <option value="">Select your Department</option>
                <option value="1">SECA</option>
                <option value="2">SASE</option>
                <option value="3">SBMA</option>
                <option value="4">SHS</option>
              </select>
            </div>

            <div className="form-group">
              <select
                id="designation"
                name="designation"
                onChange={handleChange}
                value={volunteerInfo.designation}
              >
                <option value="">Select your Designation:</option>
                <option value="2000">STUDENT</option>
                <option value="2001">STAFF</option>
                <option value="2002">FACULTY</option>
              </select>
            </div>
            <button type="submit" className="apply-button">
              APPLY
            </button>

            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#confirmVolunteer"
            >
              Submit Application
            </button>

            {/* modaaaaal */}

            <div
              className="modal fade"
              id="confirmVolunteer"
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
                      Confirm Volunteer Application
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to register this account as a
                    volunteer?
                  </div>
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
                      className="btn"
                      data-bs-dismiss="modal"
                    >
                      Create an account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VolunteerSignUp;
