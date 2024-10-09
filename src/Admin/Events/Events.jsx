import React, { useState, useEffect } from "react";
import "./Events.css";
import axios from "axios";

export default function Events({
  events,
  addEventsModalID,
  addEventsModalTarget,
  addEventAnnouncementModalID,
  addEventAnnouncementModalTarget,
  eventViewModalID,
  eventViewModalTarget,
}) {
  const [eventItem, setEventItem] = useState([]);

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

  useEffect(() => {
    console.log("eto mga items mo zaddy");
    console.log(eventItem);
  }, [eventItem]);

  return (
    <div className="events" style={{ overflowY: "auto", maxHeight: "750px" }}>
      <div className="EventActions">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={addEventsModalTarget}
        >
          Add Event
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={addEventAnnouncementModalTarget}
        >
          Add Event Announcement
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Event ID</th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Link</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Contribution Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping results from db goes here */}
          {events.map((event, key) => (
            <tr key={key}>
              <td>{event.evenet_id}</td>
              <td>{event.event_name}</td>
              <td>{event.event_link}</td>
              <td>{event.description}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.contrib_amount}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={eventViewModalTarget}
                  onClick={() => handleItemClick(event.evenet_id)}
                >
                  Items
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* modal for editing events start */}
      <div
        className="modal fade"
        id={eventViewModalID}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{eventItem.event_name}</p>
              <p>{eventItem.event_link}</p>
              <p>{eventItem.description}</p>
              <p>{eventItem.start_date}</p>
              <p>{eventItem.end_date}</p>
              <p>{eventItem.contrib_amount}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for editing events end*/}

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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">add events announcement here</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">add events here</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for adding events end */}
    </div>
  );
}
