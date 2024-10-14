import React from "react";
import VolunteerLogsTable from "./VolunteerLogsTable.jsx";
import "./VolunteerLogs.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Entered from "../../assets/images/entered.png";
import Stocked from "../../assets/images/stocked.png";

export default function VolunteerLogs() {
  const [phase2LogData, setPhase2LogData] = useState([]);
  const [phase3LogData, setPhase3LogData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readPhase2Log.php"
      )
      .then(function (response) {
        console.log(response.data);
        setPhase2LogData(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readPhase3Log.php"
      )
      .then(function (response) {
        console.log(response.data);
        setPhase3LogData(response.data.data);
      });
  }, []);

  return (
    <div className="volunteerPhaseLogsParent">
      <div
        className="volunteerPhaseLogsChild"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ul
          className="nav nav-pills mb-3 custom"
          id="pills-tab"
          role="tablist"
          style={{
            backgroundColor: "#ededed",
            width: "fit-content",
            overflowY: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <li className="nav-item" role="presentation">
            <img src={Entered} alt="Clothes Icon" />

            <button
              className="nav-link active"
              id="pills-phase2-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-phase2"
              type="button"
              role="tab"
              aria-controls="pills-phase2"
              aria-selected="true"
            >
              Phase 2
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Stocked} alt="Clothes Icon" />

            <button
              className="nav-link"
              id="pills-phase3-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-phase3"
              type="button"
              role="tab"
              aria-controls="pills-phase3"
              aria-selected="false"
            >
              Phase 3
            </button>
          </li>
        </ul>

        {/* start of main content */}
        <div
          className="tab-content"
          id="pills-tabContent"
          style={{
            backgroundColor: "white",
            padding: "20px",
            margin: "0px",
            overflowY: "auto",
          }}
        >
          <div
            className="tab-pane fade show active"
            id="pills-phase2"
            role="tabpanel"
            aria-labelledby="pills-phase2-tab"
            tabIndex="0"
          >
            <VolunteerLogsTable
              phaseLogData={phase2LogData}
              modalID="phase2"
              logsHeader="Phase 2"
            />

            {/* item1 */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-phase3"
            role="tabpanel"
            aria-labelledby="pills-phase3-tab"
            tabIndex="0"
          >
            <VolunteerLogsTable
              phaseLogData={phase3LogData}
              logsHeader="Phase 3"
              modalID="phase3"
            />

            {/* item2 */}
          </div>
        </div>
      </div>
    </div>
  );
}
