import React, { useState, useEffect } from "react";
import "./VolunteerSignUp.css";
import bgImage from "../assets/images/agap_login.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import logo from "../assets/images/agap_logo1.png";

function VolunteerSignUp() {
  const [volunteerInfo, setVolunteerInfo] = useState({
    section: "",
    department: "",
    designation: "",
  });
  const [volunteerId, setVolunteerId] = useState({});
  const [cookies, removeCookie] = useCookies(["donor_token"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

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
    if (validateForm()) {
      setModalVisible(true);
    }
  };

  const handleConfirmApplication = () => {
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

  const validateForm = () => {
    for (let key in volunteerInfo) {
      if (volunteerInfo[key] === "") {
        setErrorMessage("Please fill out all fields.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
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
          <div className="form-header">
            <h2 className="form-title" style={{ marginTop: "55px" }}>
              FORMS
            </h2>
            <div classname="headerlogo">
              <img src={logo} alt="AGAP Logo" className="logo" />
            </div>
          </div>

          <div className="contentCont">
            <form onSubmit={handleApplyClick}>
              <div className="form-group">
                <label style={{ color: "#354290" }}>Section</label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  placeholder="Section"
                  value={volunteerInfo.section}
                  onChange={handleChange}
                  style={{ backgroundColor: "#f5f5f5", padding: "15px" }}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ color: "#354290" }}>Department</label>
                <select
                  class="form-select"
                  id="department"
                  name="department"
                  onChange={handleChange}
                  value={volunteerInfo.department}
                  required
                >
                  <option value="">Select your Department</option>
                  <option value="1">SECA</option>
                  <option value="2">SASE</option>
                  <option value="3">SBMA</option>
                  <option value="4">SHS</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ color: "#354290" }}>Designation</label>
                <select
                  class="form-select"
                  id="designation"
                  name="designation"
                  onChange={handleChange}
                  value={volunteerInfo.designation}
                  required
                >
                  <option value="">Select your Designation:</option>
                  <option value="2000">STUDENT</option>
                  <option value="2001">STAFF</option>
                  <option value="2002">FACULTY</option>
                </select>
              </div>
              {/* <button type="submit" className="apply-button">
              APPLY
            </button> */}
              <div
                className="submitButtonCont"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <button type="submit" className="apply-button">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* modaaaaal */}

        {isModalVisible && (
          <div
            className="modal fade show"
            id="confirmVolunteer"
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
                    Confirm Volunteer Application
                  </h1>
                </div>
                <div className="modal-body">
                  Are you sure you want to register this account as a volunteer?
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
                    type="submit"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={handleConfirmApplication}
                    style={{
                      backgroundColor: "#354290",
                      color: "white",
                    }}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VolunteerSignUp;
