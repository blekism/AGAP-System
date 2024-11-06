import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TurnoverDocumentation.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function TurnoverDocumentation() {
  const [TurnoverDocumentation, setTurnoverDocumentation] = useState([]); //all images from all events
  const [allTurnoverDocumentation, setAllTurnoverDocumentation] = useState([]); //filtered images???
  const [events, setEvent] = useState([]); //dropdown
  const [TurnoverFilter, setTurnoverFilter] = useState("none"); //initial value of dropdown
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [addImage, setAddImage] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [cookies] = useCookies(["admin_token"]);
  const [adminID, setAdminID] = useState("");
  const [insertState, setInsertState] = useState(1);
  const uploadImagesRef = useRef(null);

  function updateColumns() {
    const width = window.innerWidth;
    let columns;

    // Calculate columns based on width
    if (width > 1300) {
      columns = 4;
    } else if (width > 768) {
      columns = 3;
    } else {
      columns = 2;
    }

    // Set the CSS variable
    document.documentElement.style.setProperty("--columns", columns);
  }

  // Run on load
  updateColumns();

  // Update columns on resize
  window.addEventListener("resize", updateColumns);

  //add another function for limiting uploads to a total of 10 images only

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        const filteredEvents = response.data.data.filter(
          (event) =>
            event.event_status === "finished" || event.event_status === "closed"
        );
        setEvent(filteredEvents);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTurnoverDocumentation.php"
      )
      .then(function (response) {
        console.log(response.data);
        setTurnoverDocumentation(response.data.data);
        setAllTurnoverDocumentation(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (cookies.admin_token) {
      try {
        const decoded = jwtDecode(cookies.admin_token);
        setAdminID(decoded.sub);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location = "/LoginAdmin";
    }
  }, []);

  const filterEvents = (event) => {
    const id = event.target.value;
    setTurnoverFilter(id);

    if (id === "none") {
      setTurnoverDocumentation(allTurnoverDocumentation); // Reset to original data
      setAddImage(false);
    } else {
      const filtered = allTurnoverDocumentation.filter(
        (item) => item.event_id === id
      );
      setTurnoverDocumentation(filtered);

      const selectedEvent = events.find((e) => e.evenet_id === id);

      setAddImage(selectedEvent && selectedEvent.event_status === "finished");
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + selectedFiles.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      event.target.value = null;
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const eventPhotos = {
      files: imageUrl.map((url) => ({
        image: url,
      })),
      account_id: adminID,
      event_id: TurnoverFilter,
    };
    console.log(eventPhotos);

    axios
      .post(
        "http://localhost/agap-backend-main/api/phase_1/create/insertTurnoverDocumentation.php",
        eventPhotos,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 201) {
          setInsertState(2);
          document.getElementById("ImageUpload").value = null;
          document.getElementById("imagePreview").innerHTML = "";
        } else {
          setInsertState(3);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [loadingStatus, setLoadingStatus] = useState(false);
  const handleImageUpload = async () => {
    setLoadingStatus(true);
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("bucketName", "comex-images-bucket");

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

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
      if (!response.data) {
        alert("Error uploading images");
      } else {
        setLoadingStatus(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingStatus(false);
    }
  };

  const confirmAction = (event, action) => {
    let form = uploadImagesRef.current;
    let confirmMessage = "";
    if (action === "uploadImages") {
      confirmMessage = "Are you sure you want to upload this images?";
    }
    if (form.checkValidity()) {
      if (window.confirm(confirmMessage)) {
        if (action === "uploadImages") {
          handleSubmit(event);
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
    <div className="TurnoverDocumentationParent">
      <div className="TurnoverDocumentationFilter">
        <form onSubmit={handleSubmit} ref={uploadImagesRef}>
          <div className="TurnoverDocumentationFilter-header">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={filterEvents}
              name="event_id"
              value={TurnoverFilter}
              style={{ width: "40%" }}
            >
              <option value="none">Choose an event</option>
              {events.map((event, key) => (
                <option key={key} value={event.evenet_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
            {addImage === true && (
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#turnoverDocumentationModal"
                onClick={resetInsertState}
              >
                Upload to event
              </button>
            )}
            {/* </form> */}
          </div>
          {/* modal for adding event announcement start */}
          <div
            className="modal fade"
            id="turnoverDocumentationModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="turnoverDocumentationModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    TURNOVER DOCUMENTATION
                  </h1>
                  {loadingStatus === true && (
                    <div className="alert alert-info" role="alert">
                      Image is uploading, please wait...
                    </div>
                  )}
                </div>
                <div className="modal-body">
                  <input
                    type="file"
                    id="ImageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ marginBottom: "10px" }}
                    required
                  />
                  <div className="ImagePreview" id="imagePreview">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Selected"
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleImageUpload}
                    style={{
                      background: "#354290",
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    Add Images
                  </button>

                  {insertState === 2 ? (
                    <div className="alert alert-success" role="alert">
                      Images Uploaded Successfully!
                    </div>
                  ) : insertState === 3 ? (
                    <div className="alert alert-danger" role="alert">
                      Error uploading Images!
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={(event) => confirmAction(event, "uploadImages")}
                    className="btn btn-primary"
                    style={{
                      background: "#354290",
                      color: "white",
                    }}
                  >
                    Upload Images
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

          <div className="TurnoverDocumentationBody">
            {TurnoverDocumentation.map((photo, key) => {
              const imageUrls = [photo.image].filter((image) => image !== null);

              return (
                <div key={key} className="TurnoverDocumentationCard">
                  {imageUrls.map((url, key) => (
                    <img key={key} src={url} alt="Turnover Documentation" />
                  ))}
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
