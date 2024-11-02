import React, { useEffect, useState } from "react";
import "./TurnoverPage.css";
import Navbar from "../Page/Navbar";
import Footer from "../Page/AgapFooter";
import TurnoverTemplate from "./TurnoverTemplate";
import donate_blood from "../assets/images/donate_blood.png";
import SampleProfilePic from "../assets/images/SampleProfilePic.jpg";
import brigada from "../assets/images/brigada_eskwela.jpg";
import need from "../assets/images/need_project.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export default function TurnoverPage() {
  const [TurnoverDocumentation, setTurnoverDocumentation] = useState([]);
  const [allTurnoverDocumentation, setAllTurnoverDocumentation] = useState([]);
  const [TurnoverFilter, setTurnoverFilter] = useState("none");
  const [events, setEvent] = useState([]);
  const [cookies] = useCookies(["donor_token"]);
  const [NotContainsImages, setNotContainsImages] = useState(false);

  useEffect(() => {
    if (cookies.donor_token) {
      try {
        const decoded = jwtDecode(cookies.donor_token);
        console.log(decoded);

        axios
          .post(
            "http://localhost/agap-backend-main/api/phase_1/read/readYourEventsDocumentation.php",
            { account_id: decoded.sub },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response.data); //read events
            setEvent(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        axios
          .post(
            "http://localhost/agap-backend-main/api/phase_1/read/readTurnoverDocumentationUser.php",
            { account_id: decoded.sub },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response.data);
            setTurnoverDocumentation(response.data.data);
            setAllTurnoverDocumentation(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    //read documentation but only for those where you have a donation on
  }, []);

  const filterEvents = (event) => {
    const id = event.target.value;
    setTurnoverFilter(id);

    if (id === "none") {
      setTurnoverDocumentation(allTurnoverDocumentation); // Reset to original data
      setNotContainsImages(false);
    } else {
      const filtered = allTurnoverDocumentation.filter(
        (item) => item.evenet_id === id && item.turnover_id !== null
      );
      if (filtered.length === 0) {
        setNotContainsImages(true);
      } else {
        setNotContainsImages(false);
        setTurnoverDocumentation(filtered);
      }
    }
  };

  return (
    <>
      <div className="TurnoverParentCont">
        <Navbar />
        <div className="TurnoverHeaderCont">
          <h1>Turnover Documentation</h1>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "150px" }}
            name="eventfilter"
            value={TurnoverFilter}
            onChange={filterEvents}
          >
            <option value="none">Choose Event</option>
            {events.map((event, key) => (
              <option key={key} value={event.evenet_id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>
        <div className="TurnoverContentCont">
          {NotContainsImages === false && (
            <div>
              {TurnoverDocumentation.map((documentation, key) => {
                const imageUrls = [documentation.image].filter(
                  (image) => image !== null
                );
                return (
                  <div key={key}>
                    {imageUrls.map((url, key) => (
                      <TurnoverTemplate documentation={url} key={key} />
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {NotContainsImages === true && (
            <div>
              <h1>No images found</h1>
            </div>
          )}
        </div>
        <div className="TurnoverFootertCont">
          <Footer />
        </div>
      </div>
    </>
  );
}
