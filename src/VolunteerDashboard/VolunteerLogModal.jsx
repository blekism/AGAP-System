import React from "react";
import "./VolunteerLogModal.css";
import { useState, useEffect } from "react";
import BackArrow from "../assets/images/BackArrow.png";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function VolunteerLogModal() {
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
  // const [phase3Log, setPhase3Log] = useState({});
  // const [filteredEvents, setFilteredEvents] = useState(events);

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
    setSelectedEvent(event); // Update the selected event
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSelectedEvent((values) => ({ ...values, [name]: value }));
  };

  // const [filteredEvents, setFilteredEvents] = useState(events);
  // const [filteredEventsStatus, setfilteredEventsStatus] = useState("none");

  // const filterEvents = (event) => {
  //   const status = event.target.value;
  //   setfilteredEventsStatus(status);

  //   if (status === "none") {
  //     setFilteredEvents(events);
  //   } else {
  //     const filtered = events.filter((event) => event.event_status === status);
  //     setFilteredEvents(filtered);
  //   }
  // };

  // useEffect(() => {
  //   setFilteredEvents(events);
  // }, [events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      account_id: phase2Log.account_id,
    }));
  };

  const handleSubmitPhase2 = (e) => {
    e.preventDefault();
    // Prevent the default form submission behavior
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

  const handleSubmitPhase3 = (e) => {
    e.preventDefault();
    const formDataFinal = {
      ...selectedEvent,
      account_id: phase2Log.account_id,
    };
    // Prevent the default form submission behavior
    try {
      axios
        .post(
          "http://localhost/agap-backend-main/api/phase2&3/insert/insertPhase3.php",
          formDataFinal,
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

  // useEffect(() => {
  //   console.log("Form Data:", formData);
  // }, [formData]);

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         "http://localhost/agap-backend-main/api/phase2&3/read/readPhase3Log.php",
  //         {
  //           headers: {
  //             Authorization: "Bearer " + cookies.donor_token,
  //           },
  //           withCredentials: true,
  //         }
  //       )
  //       .then(function (response) {
  //         console.log(response.data);
  //         setPhase3Log(response.data.data);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

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
                <h5 className="modal-title">LOG ACTIVITY</h5>
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
                      <label class="input-group-text" for="inputGroupSelect01">
                        Event Name:
                      </label>
                      <select
                        class="form-select"
                        name="event_id"
                        value={formData.event_id}
                        id="inputGroupSelect01"
                        onChange={handleInputChange}
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
                      type="submit"
                      style={{
                        width: "20%",
                        borderRadius: "40px",
                        background: "#354290",
                        color: "white",
                        fontSize: "18px",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalToggle"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
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
                    <h5 className="modal-phase3-title">
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
                  <form onSubmit={handleSubmitPhase3}>
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
                        >
                          Event Name:
                        </label>
                        <select
                          class="form-select"
                          name="event_id"
                          // value={filteredEventsStatus}
                          id="inputGroupSelect01"
                          onChange={handleEventChange}
                        >
                          <option value="none">None</option>
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

                    <div
                      className="VolunteerAttendance-Detail2"
                      style={{
                        display: "flex",
                        marginBottom: "20px",
                        columnGap: "20px",
                      }}
                    >
                      <div class="input-group">
                        <span class="input-group-text">EVENT ID:</span>
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
                        <span class="input-group-text">START TIME:</span>
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
                        <span class="input-group-text">END TIME:</span>
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

                    <div
                      className="VolunteerLogModal-buttonContainer"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="VolunteerLogModal-button"
                        style={{
                          width: "20%",
                          borderRadius: "40px",
                          background: "#354290",
                          color: "white",
                          fontSize: "18px",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalToggle"
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
