import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        const filteredEvents = response.data.data.filter(
          (event) => event.event_status === "finished"
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
      setAddImage(true);
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImageUpload = async () => {
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
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div className="TurnoverDocumentationParent">
      <div className="TurnoverDocumentationFilter">
        <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary" type="submit">
            upload to event
          </button>
        </form>
        {/* add image input here */}
        {addImage === true && (
          <div className="ImageUploadBody">
            <input
              type="file"
              accept="image/*"
              multiple // Allows selecting multiple images
              onChange={handleFileChange}
            />

            <div className="ImagePreview">
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                />
              ))}
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleImageUpload}
            >
              Upload
            </button>
          </div>
        )}

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
      </div>
    </div>
  );
}
