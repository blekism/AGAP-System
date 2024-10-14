import React from "react";

export default function VolunteerLogsTable({
  phaseLogData,
  modalID,
  logsHeader,
}) {
  return (
    <div className="volunteerlogstbl" style={{ paddingRight: "10px" }}>
      <div
        className="volunteerlogsphase"
        style={{
          maxHeight: "600px",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <p
          className="logsHeader"
          style={{
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
            marginBottom: "10px",
          }}
        >
          {logsHeader}
        </p>
        <table className="table table-striped">
          <thead>
            <tr
              style={{
                fontSize: "17px",
                fontFamily: "Poppins",
                fontWeight: "500",
              }}
            >
              <th scope="col" style={{ width: "11%" }}>
                Log ID
              </th>
              <th scope="col" style={{ width: "11%" }}>
                Event Name
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Volunteer Name
              </th>
              {modalID === "phase2" && (
                <th scope="col" style={{ width: "10%" }}>
                  Activity
                </th>
              )}
              <th scope="col" style={{ width: "8%" }}>
                Time in
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Time out
              </th>
              <th scope="col" style={{ width: "8%" }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {/* mapping results from db goes here */}
            {phaseLogData.map((log, key) => (
              <tr
                key={key}
                style={{
                  fontSize: "15px",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
                <td>{log.log_id}</td>
                <td>{log.event_name}</td>
                <td>{log.last_name + " " + log.first_name}</td>
                {modalID === "phase2" && <td>{log.activity}</td>}
                <td>{log.time_in}</td>
                <td>{log.time_out}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
