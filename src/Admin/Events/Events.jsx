import React, { useState, useEffect } from "react";
import "./Events.css";
import axios from "axios";
import InputTemplate from "../InputTemplateAdmin.jsx";
import EventCardTemplate from "./EventCardTemplate.jsx";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

export default function Events({
  events,
  addEventsModalID,
  addEventsModalTarget,
  addEventAnnouncementModalID,
  addEventAnnouncementModalTarget,
  eventViewModalID,
  eventViewModalTarget,
  eventAnnouncementModalID,
  eventAnnouncementModalTarget,
}) {
  // filter for events start
  const [StatusFilter, setStatusFilter] = useState("none");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filterEvents = (event) => {
    const status = event.target.value;
    setStatusFilter(status);

    if (status === "none") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.event_status === status);
      setFilteredEvents(filtered);
    }
  };

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);
  // filter for events end

  // image upload start
  const [ImageUrl, setImageUrl] = useState("");
  const [SelectedFile, setSelectedFile] = useState(null);

  const handleSelectImage = (event) => {
    //for input ito
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const handleImageUpload = async () => {
    //for button add image ito
    const formData = new FormData();

    formData.append("file", SelectedFile);
    formData.append("fileName", generateRandomString(10));
    formData.append("bucketName", "comex-images-bucket");

    try {
      const response = await axios.post(
        "http://localhost/agap-backend-main/api/phase_1/create/generateSignedUrl.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("signed url is", response.data);
      setImageUrl(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // image upload end

  // add event announcement start
  const [eventAnnouncement, setEventAnnouncement] = useState({
    title: "",
    description: "",
  });

  const addEventAnnouncementChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEventAnnouncement((values) => ({ ...values, [name]: value }));
  };

  const handleAddEventAnnouncementSubmit = (event) => {
    event.preventDefault();

    const eventAnnouncementFinal = {
      ...eventAnnouncement,
      image: ImageUrl,
    };
    console.log(eventAnnouncementFinal);

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase2&3/insert/insertEventAnnouncementAdmin.php",
        eventAnnouncementFinal,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 201) {
          console.log("Insert successful!");
        } else {
          console.log("Insert failed!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // add event announcement end

  //enter new event start
  const [addEvent, setAddEvent] = useState({
    event_name: "",
    event_link: "",
    description: "",
    start_date: "",
    end_date: "",
    contrib_amount: "",
  });

  const addEventChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAddEvent((values) => ({ ...values, [name]: value }));
  };

  const handleAddEventSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase2&3/insert/insertEventAdmin.php",
        addEvent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 201) {
          console.log("Insert successful!");
        } else {
          console.log("Insert failed!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //enter new event end

  // view event announcement start
  const [ViewEventAnnouncement, setViewEventAnnouncement] = useState([]);

  const handleReadAnnouncement = async () => {
    const response = await axios.get(
      "http://localhost/agap-backend-main/api/phase2&3/read/readEventAnnouncement.php"
    );
    console.log(response.data.data);
    setViewEventAnnouncement(response.data.data);
  };

  // view event announcement end

  //modal edited event start
  const [eventItem, setEventItem] = useState({
    evenet_id: "",
    event_name: "",
    event_link: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    contrib_amount: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "http://localhost/agap-backend-main/api/phase2&3/Update/update_events.php",
        eventItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log("Update successful!");
        } else {
          console.log("Update failed!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //modal edited event end

  // modal item click start
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEventItem((values) => ({ ...values, [name]: value }));
  };

  const handleItemClick = async (id) => {
    console.log({ event_id: id });

    try {
      const response = await axios.post(
        "http://localhost/agap-backend-main/api/phase_1/read/singleRead_event.php",
        { event_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      setEventItem(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  // modal item click end

  //pagination for event announcement preview start
  const [currentPage, setCurrentPage] = useState(0);
  const CardPerPage = 2;
  const totalPages = Math.ceil(ViewEventAnnouncement.length / CardPerPage);

  const startIndex = currentPage * CardPerPage;
  const selectedPages = ViewEventAnnouncement.slice(
    startIndex,
    startIndex + CardPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const confirmAction = (event, action) => {
    let confirmMessage = "";

    if (action === "viewEvent") {
      confirmMessage = "Are you sure you want to accept these changes?";
    } else if (action === "addAnnouncement") {
      confirmMessage = "Are you sure you want to add this anouncement?";
    } else if (action === "AddEvents") {
      confirmMessage = "Are you sure you want to add this event?";
    }
    if (window.confirm(confirmMessage)) {
      if (action === "viewEvent") {
        handleSubmit(event);
      } else if (action === "addAnnouncement") {
        handleAddEventAnnouncementSubmit(event);
      } else if (action === "AddEvents") {
        handleAddEventSubmit(event);
      }
    }
  };

  //pagination for event announcement preview end

  return (
    <div className="events" style={{ overflowY: "auto", maxHeight: "600px" }}>
      <div className="EventActions">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={addEventsModalTarget}
          style={{ backgroundColor: "#354290", color: "#ffffff" }}
        >
          Add Event
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={addEventAnnouncementModalTarget}
          style={{ backgroundColor: "#354290", color: "#ffffff" }}
        >
          Add Event Announcement
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={eventAnnouncementModalTarget}
          onClick={() => handleReadAnnouncement()}
          style={{ backgroundColor: "#354290", color: "#ffffff" }}
        >
          View Event Announcement
        </button>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ width: "200px" }}
          name="statusfilter"
          value={StatusFilter}
          onChange={filterEvents}
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
          <option value="closed">Closed</option>
          <option value="none">None</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr
            style={{
              fontSize: "15px",
              fontFamily: "Poppins",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            <th scope="col" style={{ width: "20%" }}>
              Event ID
            </th>
            <th scope="col" style={{ width: "15%" }}>
              Event Name
            </th>
            <th scope="col" style={{ width: "10%" }}>
              Event Status
            </th>
            <th scope="col" style={{ width: "15%" }}>
              Event Link
            </th>
            {/* <th scope="col">Description</th> */}
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col" style={{ width: "15%" }}>
              Contribution Amount
            </th>
            <th scope="col" style={{ width: "7%" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, key) => (
            <tr
              key={key}
              style={{
                fontSize: "14px",
                fontFamily: "Poppins",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              <td>{event.evenet_id}</td>
              <td>{event.event_name}</td>
              <td>{event.event_status}</td>
              <td>{event.event_link}</td>
              {/* <td>{event.description}</td> */}
              <td>{event.start_date}</td>
              <td>
                {event.end_date === "0000-00-00" ? "TBA" : event.end_date}
              </td>
              <td>{event.contrib_amount}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={eventViewModalTarget}
                  onClick={() => handleItemClick(event.evenet_id)}
                  style={{ backgroundColor: "#354290", color: "#ffffff" }}
                >
                  Items
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id={eventViewModalID}
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
                EVENT DETAILS
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{ fontWeight: "bold" }}
                  >
                    EVENT ID
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Event Id"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    readOnly
                    value={eventItem.evenet_id}
                    name="account_id"
                    onChange={handleChange}
                  />
                </div>

                <InputTemplate
                  value={eventItem.event_name}
                  name="event_name"
                  onChange={handleChange}
                  title="Event Name"
                  placeholder="EVENT NAME"
                />
                <InputTemplate
                  value={eventItem.event_link}
                  name="event_link"
                  onChange={handleChange}
                  title="Event Link"
                  placeholder="EVENT LINK"
                />
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    style={{ fontWeight: "bold" }}
                  >
                    DESCRIPTION
                  </span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={eventItem.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                  />
                </div>
                <InputTemplate
                  value={eventItem.start_date}
                  name="start_date"
                  onChange={handleChange}
                  title="START DATE"
                  placeholder="YYYY-MM-DD"
                />
                <InputTemplate
                  value={eventItem.end_date}
                  name="end_date"
                  onChange={handleChange}
                  title="END DATE"
                  placeholder="YYYY-MM-DD"
                />
                <InputTemplate
                  value={eventItem.start_time}
                  name="start_time"
                  onChange={handleChange}
                  title="START TIME"
                  placeholder="Start Time"
                />
                <InputTemplate
                  value={eventItem.end_time}
                  name="end_time"
                  onChange={handleChange}
                  title="END TIME"
                  placeholder="End Time"
                />

                <InputTemplate
                  value={eventItem.contrib_amount}
                  name="contrib_amount"
                  onChange={handleChange}
                  title="CONTRIBUTION AMOUNT"
                  placeholder="Contribution Amount"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={(event) => confirmAction(event, "viewEvent")}
                  className="btn btn-primary"
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  Understood
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* modal for editing events end*/}

      {/* modal for viewing event announcement start */}
      <div
        className="modal fade"
        id={eventAnnouncementModalID}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                EVENT ANNOUNCEMENT PREVIEW
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="PreviewParent">
                {selectedPages.map((eventAnn, key) => (
                  <EventCardTemplate
                    key={key}
                    image={eventAnn.image}
                    title={eventAnn.title}
                    description={eventAnn.description}
                  />
                ))}
              </div>
              <div className="buttonFooterEventPreview">
                <img
                  src={Left}
                  alt="left-arrow"
                  onClick={handlePrevious}
                  style={{
                    cursor: currentPage === 0 ? "not-allowed" : "pointer",
                    opacity: currentPage === 0 ? 0.5 : 1,
                    height: "30px",
                    marginTop: "-10px",
                  }}
                />
                <img
                  src={Right}
                  alt="right-arrow"
                  onClick={handleNext}
                  style={{
                    cursor:
                      currentPage === totalPages - 1
                        ? "not-allowed"
                        : "pointer",
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                    height: "30px",
                    marginTop: "-10px",
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  background: "#354290",
                  color: "white",
                }}
              >
                Understood
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for viewing event announcement end */}

      {/* modal for adding event announcement start */}
      <div
        className="modal fade"
        id={addEventAnnouncementModalID}
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
                EVENT ANNOUNCEMENTS
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddEventAnnouncementSubmit}>
              <div className="modal-body">
                <InputTemplate
                  value={eventAnnouncement.title}
                  name="title"
                  onChange={addEventAnnouncementChange}
                  title="EVENT TITLE"
                  placeholder="Event Title"
                />
                <InputTemplate
                  value={eventAnnouncement.description}
                  name="description"
                  onChange={addEventAnnouncementChange}
                  title="DESCRIPTION"
                  placeholder="Description"
                />
                <input
                  type="file"
                  name="imageUpload"
                  onChange={handleSelectImage}
                  style={{ marginBottom: "10px" }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleImageUpload}
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  Add Image
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={(event) => confirmAction(event, "addAnnouncement")}
                  className="btn btn-primary"
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  Add Announcement
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* modal for adding event announcement end */}

      {/* modal for adding events start */}
      <div
        className="modal fade"
        id={addEventsModalID}
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
                ADD EVENT
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddEventSubmit}>
              <div className="modal-body">
                <InputTemplate
                  value={addEvent.event_name}
                  name="event_name"
                  onChange={addEventChange}
                  title="EVENT NAME"
                  placeholder="Event Name"
                />
                <InputTemplate
                  value={addEvent.event_link}
                  name="event_link"
                  onChange={addEventChange}
                  title="EVENT LINK"
                  placeholder="Event Link"
                />
                <InputTemplate
                  value={addEvent.description}
                  name="description"
                  onChange={addEventChange}
                  title="DESCRIPTION"
                  placeholder="Description"
                />
                <InputTemplate
                  value={addEvent.start_date}
                  name="start_date"
                  onChange={addEventChange}
                  title="START DATE"
                  placeholder="YYYY-MM-DD"
                />
                <InputTemplate
                  value={addEvent.end_date}
                  name="end_date"
                  onChange={addEventChange}
                  title="END DATE"
                  placeholder="YYYY-MM-DD"
                />
                <InputTemplate
                  value={addEvent.contrib_amount}
                  name="contrib_amount"
                  onChange={addEventChange}
                  title="CONTRIBUTION AMOUNT"
                  placeholder="Contribution Amount"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  onClick={(event) => confirmAction(event, "AddEvents")}
                  className="btn btn-primary"
                  style={{
                    background: "#354290",
                    color: "white",
                  }}
                >
                  Understood
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* modal for adding events end */}
    </div>
  );
}
