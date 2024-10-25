import React from "react";
import "./VolunteerLogPhase2Modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function VolunteerLogPhase2Modal() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [phase2Log, setPhase2Log] = useState({});
  const [formData, setFormData] = useState({
    event_id: "",
    account_id: "",
    activity: "",
    time_in: "",
    time_out: "",
  });
  const [cookies] = useCookies(["donor_token"]);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    try {
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
          setPhase2Log(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      account_id: phase2Log.account_id,
    }));
  };

  const handleSubmitPhase2 = (e) => {
    try {
      axios
        .post(
          "http://localhost/agap-backend-main/api/phase2&3/insert/insertPhase2.php",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
        });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log("this is the events ", response.data.data);
        setEvents(response.data.data);
      });
  }, []);

  const confirmAction = (action) => {
    let confirmMessage = "";

    if (action == "submitPhase2Log") {
      confirmMessage = "Are you sure you want to submit your Log?";
    }
    if (window.confirm(confirmMessage)) {
      if (action == "submitPhase2Log") {
        handleSubmitPhase2();
      }
    }
  };

  return (
    <>
      <div className="VolunteerLogPhase2Modal-Parent">
        <button
          type="button"
          className="btnLogActivity"
          data-bs-toggle="modal"
          data-bs-target="#volunteerLogPhase2Modal"
        >
          LOG ACTIVITY
        </button>

        <div className="VolunteerLogPhase2Modal-Phase2Cont">
          <div
            className="modal fade"
            id="volunteerLogPhase2Modal"
            aria-hidden="true"
            aria-labelledby="volunteerLogPhase2ModalLabel"
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
                  <h5 className="modal-title">
                    VOLUNTEER ATTENDANCE MONITORING
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={handleSubmitPhase2}>
                    <div
                      className="VolunteerAttendance-Detail1"
                      style={{
                        display: "flex",
                        marginBottom: "20px",
                        columnGap: "20px",
                      }}
                    >
                      <div class="input-group">
                        <label
                          class="input-group-text"
                          for="inputGroupSelect01"
                          style={{ height: "40px" }}
                        >
                          Event Name:
                        </label>
                        <select
                          class="form-select"
                          name="event_id"
                          value={formData.event_id}
                          id="inputGroupSelect01"
                          onChange={handleInputChange}
                          style={{ height: "40px" }}
                        >
                          <option selected>Choose...</option>
                          {events
                            .filter(
                              (event) =>
                                event.event_status !== "closed" &&
                                event.event_status !== "finished"
                            )
                            .map((event, key) => (
                              <option key={key} value={event.evenet_id}>
                                {event.event_name}
                              </option>
                            ))}
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
                          style={{ height: "40px" }}
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
                        <span class="input-group-text">Activity:</span>
                        <input
                          type="text"
                          name="activity"
                          class="form-control"
                          value={formData.activity}
                          onChange={handleInputChange}
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
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
                          name="time_in"
                          class="form-control"
                          value={formData.time_in}
                          onChange={handleInputChange}
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                        />
                      </div>
                      <div class="input-group">
                        <span class="input-group-text">Time Out:</span>
                        <input
                          type="time"
                          name="time_out"
                          class="form-control"
                          value={formData.time_out}
                          onChange={handleInputChange}
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
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => confirmAction("submitPhase2Log")}
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
