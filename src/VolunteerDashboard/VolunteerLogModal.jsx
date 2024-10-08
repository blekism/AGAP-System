import React from "react";
import "./VolunteerLogModal.css";
import { useState, useEffect } from "react";
import BackArrow from "../assets/images/BackArrow.png";

export default function VolunteerLogModal() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate(); // Set the initial date
    const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //   const [volunteerData, setVolunteerData] = useState({
  //     eventName: "",
  //     currentDate: "",
  //     currentTime: "",
  //     secDeptOrg: "",
  //     fullName: "",
  //     designation: "",
  //     activity: "",
  //   });

  //   useEffect(() => {
  //     axios
  //       .get("/api/volunteer")
  //       .then((response) => {
  //         setVolunteerData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error fetching the data!", error);
  //       });
  //   }, []);

  return (
    <>
      <div className="VolunteerLogModal">
        <button
          type="button"
          className="btn1"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalToggle"
        >
          LOG ACTIVITY
        </button>

        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">TIME IN</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div
                className="body"
                style={{
                  height: "5vh",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                }}
              >
                <h5
                  style={{
                    fontWeight: "400",
                  }}
                >
                  Log your activity here.
                </h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalToggle2"
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  PHASE 2
                </button>
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalToggle3"
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  PHASE 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="VolunteerLogModal-Phase2Cont">
        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h5 className="modal-title">VOLUNTEER ATTENDANCE MONITORING</h5>

                <button
                  type="button"
                  style={{ background: "transparent", border: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalToggle"
                >
                  <img
                    src={BackArrow}
                    alt="Time In"
                    style={{ width: "25px", height: "25px" }}
                  />
                </button>
              </div>

              <div className="modal-body">
                <div
                  className="VolunteerAttendance-Detail1"
                  style={{
                    display: "flex",
                    marginBottom: "20px",
                    columnGap: "20px",
                  }}
                >
                  <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Event Name:
                    </label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                  <div
                    class="input-group"
                    style={{
                      width: "30%",
                    }}
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder={currentDate}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      width: "19%",
                    }}
                  >
                    <input
                      type="text"
                      class="form-control"
                      placeholder={currentTime}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                </div>

                <div className="VolunteerAttendance-Detail2">
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Sec/Dept/Org:</span>
                    <input
                      type="text"
                      class="form-control"
                      //   value={volunteerData.secDeptOrg}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Full Name:</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Designation:</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                  <div
                    class="input-group"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <span class="input-group-text">Activity:</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      readOnly
                    />
                  </div>
                </div>

                <div
                  className="VolunteerAttendance-Detail3"
                  style={{
                    display: "flex",
                    marginBottom: "20px",
                    columnGap: "20px",
                  }}
                >
                  <div class="input-group">
                    <span class="input-group-text">Time In:</span>
                    <input
                      type="time"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div class="input-group">
                    <span class="input-group-text">Time Out:</span>
                    <input
                      type="time"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>
                <div
                  className="VolunteerLogModal-buttonContainer"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className="VolunteerLogModal-button"
                    // onClick={handleSignInClick}
                    style={{
                      width: "20%",
                      borderRadius: "40px",
                      background: "#354290",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="VolunteerLogModal-Phase3Cont">
          <div
            className="modal fade"
            id="exampleModalToggle3"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "10vh",
                  }}
                >
                  <div
                    className="VolunteerLogModal-Phase3Cont-textHeader"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginBottom: "auto",
                    }}
                  >
                    <h5 className="modal-title">
                      VOLUNTEER ATTENDANCE MONITORING
                    </h5>
                    <p>TURNOVER OF DONATIONS</p>
                  </div>

                  <div className="VolunteerLogModal-Phase3Cont-btnHeader">
                    <button
                      type="button"
                      style={{ background: "transparent", border: "none" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalToggle"
                    >
                      <img
                        src={BackArrow}
                        alt="Time In"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="modal-body">
                  <div
                    className="VolunteerAttendance-Detail1"
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      columnGap: "20px",
                    }}
                  >
                    <div class="input-group">
                      <label class="input-group-text" for="inputGroupSelect01">
                        Event Name:
                      </label>
                      <select class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>

                    <div
                      class="input-group"
                      style={{
                        width: "30%",
                      }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder={currentDate}
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        readOnly
                      />
                    </div>
                    <div
                      class="input-group"
                      style={{
                        width: "19%",
                      }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder={currentTime}
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="VolunteerAttendance-Detail2">
                    <div
                      class="input-group"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <span class="input-group-text">Sec/Dept/Org:</span>
                      <input
                        type="text"
                        class="form-control"
                        //   value={volunteerData.secDeptOrg}
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        readOnly
                      />
                    </div>
                    <div
                      class="input-group"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <span class="input-group-text">Full Name:</span>
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        readOnly
                      />
                    </div>
                    <div
                      class="input-group"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <span class="input-group-text">Designation:</span>
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        readOnly
                      />
                    </div>
                  </div>

                  <div
                    className="VolunteerLogModal-buttonContainer"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="VolunteerLogModal-button"
                      // onClick={handleSignInClick}
                      style={{
                        width: "20%",
                        borderRadius: "40px",
                        background: "#354290",
                        color: "white",
                        fontSize: "18px",
                      }}
                    >
                      ENTER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
