import React from "react";
import "./VolunteerLogPhase3Modal.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function VolunteerLogPhase3Modal() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [events, setEvents] = useState([]);
  const [cookies] = useCookies(["donor_token"]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [insertState, setInsertState] = useState(1);
  const phase3LogRef = useRef(null);

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
    // Fetch data from the API
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log("this is the events ", response.data.data);
        setEvents(response.data.data);
      });
  }, []);

  const [selectedEvent, setSelectedEvent] = useState({
    evenet_id: "",
    start_time: "",
    end_time: "",
  });

  // Handle dropdown change
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const event = events.find((event) => event.evenet_id === eventId); // Find the event by id
    setSelectedEvent(event);
    setDropdownValue(eventId);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSelectedEvent((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitPhase3 = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost/agap-backend-main/api/phase2&3/insert/insertPhase3.php",
          selectedEvent,
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
          if (response.data.status === 201) {
            setInsertState(2);
            setSelectedEvent({
              evenet_id: "",
              start_time: "",
              end_time: "",
            });
            setDropdownValue("none");
          } else {
            setInsertState(3);
          }
        });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const confirmAction = (event, action) => {
    let form = null;
    let confirmMessage = "";

    if (action == "submitPhase3Log") {
      confirmMessage = "Are you sure you want to submit your Log?";
      form = phase3LogRef.current;
    }
    if (form.checkValidity()) {
      if (window.confirm(confirmMessage)) {
        if (action == "submitPhase3Log") {
          handleSubmitPhase3(event);
        }
      }
    } else {
      form.reportValidity();
    }
  };

  const resetInsertState = () => {
    setInsertState(1);
  };

  return (
    <>
      <div className="VolunteerLogPhase3Modal-Parent">
        <button
          type="button"
          className="btnLogActivity"
          data-bs-toggle="modal"
          data-bs-target="#volunteerLogPhase3Modal"
          onClick={resetInsertState}
        >
          LOG ACTIVITY
        </button>

        <div className="VolunteerLogPhase3Modal-Phase3Cont">
          <div
            className="modal fade"
            id="volunteerLogPhase3Modal"
            aria-hidden="true"
            aria-labelledby="volunteerLogPhase3ModalLabel"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
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
                    <p style={{ fontSize: "16px", fontWeight: "normal" }}>
                      TURNOVER OF DONATIONS
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={handleSubmitPhase3} ref={phase3LogRef}>
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
                          style={{
                            height: "40px",
                            fontWeight: "bold",
                          }}
                        >
                          EVENT NAME:
                        </label>
                        <select
                          class="form-select"
                          name="event_id"
                          value={dropdownValue}
                          id="inputGroupSelect01"
                          onChange={handleEventChange}
                          style={{ height: "40px" }}
                          required
                        >
                          <option value="">
                            Choose the event you participated in
                          </option>
                          {events
                            .filter(
                              (event) => event.event_status === "finished"
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
                          style={{ height: "40px" }}
                        />
                      </div>
                    </div>

                    <div
                      className="VolunteerAttendance-Detail2"
                      style={{
                        display: "flex",
                        marginBottom: "20px",
                        columnGap: "20px",
                      }}
                    >
                      <div class="input-group">
                        <span
                          class="input-group-text"
                          style={{ fontWeight: "bold" }}
                        >
                          EVENT ID:
                        </span>
                        {/* {filteredEvents.map((event, key) => ( */}
                        <input
                          // key={key}
                          type="text"
                          name="evenet_id"
                          class="form-control"
                          value={selectedEvent ? selectedEvent.evenet_id : ""}
                          onChange={handleChange}
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                          readOnly
                        />
                        {/* ))} */}
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
                        <span
                          class="input-group-text"
                          style={{ fontWeight: "bold" }}
                        >
                          START TIME:
                        </span>
                        {/* {filteredEvents.map((event, key) => ( */}
                        <input
                          // key={key}
                          type="text"
                          name="start_time"
                          class="form-control"
                          value={selectedEvent ? selectedEvent.start_time : ""}
                          onChange={handleChange}
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                          readOnly
                        />
                        {/* ))} */}
                      </div>
                      <div class="input-group">
                        <span
                          class="input-group-text"
                          style={{ fontWeight: "bold" }}
                        >
                          END TIME:
                        </span>
                        {/* {events.map((event, key) => ( */}
                        <input
                          type="text"
                          name="end_time"
                          class="form-control"
                          value={selectedEvent ? selectedEvent.end_time : ""}
                          onChange={handleChange}
                          aria-label="Username"
                          aria-describedby="addon-wrapping"
                          readOnly
                        />
                        {/* ))} */}
                      </div>
                    </div>

                    {insertState === 2 ? (
                      <div className="alert alert-success" role="alert">
                        Phase 2 Log Successfully Submitted!
                      </div>
                    ) : insertState === 3 ? (
                      <div className="alert alert-danger" role="alert">
                        Error Submitting Phase 3 Log!
                      </div>
                    ) : (
                      <></>
                    )}

                    <div
                      className="VolunteerLogModal-buttonContainer"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        type="button"
                        onClick={(event) =>
                          confirmAction(event, "submitPhase3Log")
                        }
                        className="VolunteerLogModal-button"
                        style={{
                          width: "20%",
                          borderRadius: "10px",
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
