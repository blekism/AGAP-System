import React, { useState, useEffect, useRef } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Page/NavBar.jsx";
import profilePlaceholder from "../assets/Images/profilePlaceholder.png";

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
  const profileDetailsRef = useRef(null);
  const [insertState, setInsertState] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [initialProfileDetails, setInitialProfileDetails] = useState(null);

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
        setInitialProfileDetails(response.data.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: value,
        account_id: profileDetails.account_id,
      };

      const hasChanges = Object.keys(updatedDetails).some(
        (key) => updatedDetails[key] !== initialProfileDetails[key]
      );
      const isValid = validateForm(updatedDetails);

      setModalVisible(hasChanges && isValid);

      return updatedDetails;
    });
  };

  const handleLogout = () => {
    removeCookie("donor_token");
    window.location.href = "/";
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
    }
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
          if (response.data.status === 200) {
            setInsertState(2);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          } else {
            setInsertState(3);
            setShowAlert(true);
            setModalVisible(false);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          }
        })
        .catch(function (error) {
          setInsertState(3);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const validateForm = (details = profileDetails) => {
    for (let key in details) {
      if (details[key] === "") {
        setErrorMessage("Please fill out all fields.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  return (
    <>
      <div className="ProfilePageParentCont">
        <div className="ProfilePageHeaderCont">
          <Navbar />
        </div>
        <form onSubmit={handleClick} ref={profileDetailsRef}>
          <div className="ProfilePageBodyCont">
            <div className="ProfilePageBodyCont-Left">
              <p>Your Profile</p>

              <div className="ProfilePicture">
                <img src={profilePlaceholder} />
                <button>Change Photo</button>
              </div>

              <div className="signout-btn" onClick={handleLogout}>
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
                    <span class="input-group-text">FIRST NAME:</span>
                    <input
                      type="text"
                      name="first_name"
                      class="form-control"
                      value={profileDetails.first_name}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">LAST NAME:</span>
                    <input
                      type="text"
                      name="last_name"
                      class="form-control"
                      value={profileDetails.last_name}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
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
                    <span class="input-group-text">DATE OF BIRTH:</span>
                    <input
                      type="text"
                      name="dob"
                      class="form-control"
                      value={profileDetails.dob}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
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
                    <span class="input-group-text">ADDRESS:</span>
                    <input
                      type="text"
                      name="address"
                      class="form-control"
                      value={profileDetails.address}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">CONTACT INFORMATION:</span>
                    <input
                      type="text"
                      name="contact_info"
                      class="form-control"
                      value={profileDetails.contact_info}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
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
                      <span class="input-group-text">SECTION:</span>
                      <input
                        type="text"
                        name="section"
                        class="form-control"
                        value={profileDetails.section}
                        onChange={handleInputChange}
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        required
                      />
                    </div>
                    <div class="input-group">
                      <label
                        class="input-group-text"
                        for="inputGroupSelect01"
                        style={{ height: "45px" }}
                      >
                        DEPARTMENT:
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
                        DESIGNATION:
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
                    <span class="input-group-text">EMAIL:</span>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      value={profileDetails.email}
                      onChange={handleInputChange}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
                    />
                  </div>
                </div>

                {showAlert &&
                  (insertState === 2 ? (
                    <div className="alert alert-success" role="alert">
                      Profile Details Changes Saved Successfully!
                    </div>
                  ) : insertState === 3 ? (
                    <div className="alert alert-danger" role="alert">
                      Error saving Profile Details Changes!
                    </div>
                  ) : (
                    <></>
                  ))}

                {isModalVisible && (
                  <div
                    className="EditProfileDetails-buttonContainer"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="EditProfileDetails-button"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmVolunteer"
                      style={{
                        width: "20%",
                        borderRadius: "10px",
                        background: "#354290",
                        color: "white",
                        fontSize: "18px",
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {isModalVisible && (
          <div
            className="modal fade"
            id="confirmVolunteer"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            // style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Confirm Edit Profile Details
                  </h1>
                </div>
                <div className="modal-body">
                  Are you sure you want to save these changes?
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
                    onClick={handleSubmitProfileDetails}
                    style={{
                      backgroundColor: "#354290",
                      color: "white",
                    }}
                  >
                    Save Changes
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
