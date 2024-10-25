import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Page/NavBar.jsx";
import SampleProfilePic from "../assets/Images/SampleProfilePic.jpg";

export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    address: "",
    contact_info: "",
    section: "",
    dept_category_id: "",
    designation_id: "",
    email: "",
    password: "",
  });
  const [cookies, removeCookie] = useCookies(["donor_token"]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    if (cookies.donor_token) {
      try {
        const decoded = jwtDecode(cookies.donor_token);
        setDecodedToken(decoded);
        if (decoded.acclvl === "volunteer") {
          setIsVolunteer(true);
        } else {
          setIsVolunteer(false);
        }
      } catch (error) {
        console.error("There was an error decoding the token!", error);
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonorAccount.php",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setProfileDetails(response.data.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      account_id: profileDetails.account_id,
    }));
  };

  const handleSubmitProfileDetails = (e) => {
    try {
      axios
        .put(
          "http://localhost/agap-backend-main/api/phase_1/update/updateUserAccount.php",
          profileDetails,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.donor_token,
            },
            withCredentials: true,
          }
        )
        .then(function (response) {
          console.log(response.data);
        });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const confirmAction = (action) => {
    let confirmMessage = "";

    if (action == "saveChanges") {
      confirmMessage = "Are you sure you want to submit these changes?";
    }
    if (window.confirm(confirmMessage)) {
      if (action == "saveChanges") {
        handleSubmitProfileDetails();
      }
    }
  };

  return (
    <>
      <div className="ProfilePageParentCont">
        <div className="ProfilePageHeaderCont">
          <Navbar />
        </div>
        <form onSubmit={handleSubmitProfileDetails}>
          <div className="ProfilePageBodyCont">
            <div className="ProfilePageBodyCont-Left">
              <p>Your Profile</p>

              <div className="ProfilePicture">
                <img src={SampleProfilePic} />
                <button>Change Photo</button>
              </div>

              <div className="signout-btn">
                <button type="button">LOG OUT</button>
              </div>
            </div>

            <div className="ProfilePageBodyCont-Right">
              <div className="ProfilePageBodyCont-Right-Header">
                <p>Profile Details</p>
              </div>
              <div className="ProfileDetailsCont">
                <div className="ProfileDetailsCont1">
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">First Name:</span>
                    <input
                      type="text"
                      name="first_name"
                      class="form-control"
                      value={profileDetails.first_name}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Last Name:</span>
                    <input
                      type="text"
                      name="last_name"
                      class="form-control"
                      value={profileDetails.last_name}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="ProfileDetailsCont2">
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Date of Birth:</span>
                    <input
                      type="text"
                      name="dob"
                      class="form-control"
                      value={profileDetails.dob}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div className="ProfileDetailsCont3">
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Address:</span>
                    <input
                      type="text"
                      name="address"
                      class="form-control"
                      value={profileDetails.address}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Contact Information:</span>
                    <input
                      type="text"
                      name="contact_info"
                      class="form-control"
                      value={profileDetails.contact_info}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                {isVolunteer && (
                  <div className="ProfileDetailsCont4">
                    <div
                      class="input-group"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <span class="input-group-text">Section:</span>
                      <input
                        type="text"
                        name="section"
                        class="form-control"
                        value={profileDetails.section}
                        onChange={handleInputChange}
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                    <div class="input-group">
                      <label
                        class="input-group-text"
                        for="inputGroupSelect01"
                        style={{ height: "45px" }}
                      >
                        Dept:
                      </label>
                      <select
                        class="form-select"
                        name="dept_category_id"
                        id="inputGroupSelect01"
                        value={profileDetails.dept_category_id}
                        onChange={handleInputChange}
                        style={{ height: "45px" }}
                      >
                        <option value="1">SECA</option>
                        <option value="2">SASE</option>
                        <option value="3">SBMA</option>
                        <option value="4">SHS</option>
                        <option value="5">OTHERS</option>
                      </select>
                    </div>
                    <div class="input-group">
                      <label
                        class="input-group-text"
                        for="inputGroupSelect01"
                        style={{ height: "45px" }}
                      >
                        Designation:
                      </label>
                      <select
                        class="form-select"
                        name="dept_category_id"
                        id="inputGroupSelect01"
                        value={profileDetails.designation_id}
                        onChange={handleInputChange}
                        style={{ height: "45px" }}
                      >
                        <option value="2000">STUDENT</option>
                        <option value="2001">STAFF</option>
                        <option value="2002">FACULTY</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="ProfileDetailsCont5">
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Email:</span>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      value={profileDetails.email}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>

                <div
                  className="EditProfileDetails-buttonContainer"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className="EditProfileDetails-button"
                    type="button"
                    onClick={() => confirmAction("saveChanges")}
                    style={{
                      width: "20%",
                      borderRadius: "40px",
                      background: "#354290",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
