import React from "react";
import "./VolunteerDashboardContent.css";
import EventsPagination from "./EventsPagination";

export default function VolunteerDashboardContent({ logTable }) {
  const nuEvents = [
    {
      title: "NU-D Sagip sa Pwet ni yngwie",
      content:
        "The IT Department is offering free coding workshops for students interested in learning programming languages such as JavaScript and HTML. These workshops are designed to prepare students for tech-driven careers.",
      date: "26 Aug 2024",
    },
    {
      title: "NU Manila",
      content: "NU Manila is the best!",
      date: "09/26/2024",
    },
    {
      title: "NU Laguna",
      content: "NU Laguna is the best!",
      date: "09/27/2024",
    },
    {
      title: "NU Cavite",
      content: "NU Cavite is the best!",
      date: "09/28/2024",
    },
  ];

  return (
    <>
      <div className="VolunteerDashboardContent-parentCont">
        <div className="VolunteerDashboardContent-cardCont">
          <div className="VolunteerDashboardContent-card1">
            <p>TOTAL ACCEPTED DONATION:</p>
            <p
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "40%",
                fontSize: "30px",
                padding: "5px",
                textAlign: "center",
                margin: "auto",
                color: "black",
              }}
            >
              100
            </p>
          </div>
          <div className="VolunteerDashboardContent-card2">
            <p>TOTAL EVENT:</p>
            <p
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "40%",
                fontSize: "30px",
                padding: "5px",
                textAlign: "center",
                margin: "auto",
                color: "black",
              }}
            >
              10
            </p>
          </div>
          <div className="VolunteerDashboardContent-card3">
            <p>TOTAL TIME:</p>
            <p
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "40%",
                fontSize: "30px",
                padding: "5px",
                textAlign: "center",
                margin: "auto",
                color: "black",
              }}
            >
              6
            </p>
          </div>
        </div>

        <div className="VolunteerDashboardContent-bottomContent">
          <div className="VolunteerDashboardContent-bottomContent1">
            <EventsPagination events={nuEvents} />
          </div>
          <div className="VolunteerDashboardContent-bottomContent2">
            <h1>Your Event/s List</h1>
            <table className="VolunteerLogTable">
              <thead className="VolunteerLogTable-thead">
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Date Joined</th>
                  <th scope="col">Event Date</th>
                </tr>
              </thead>
              <tbody className="VolunteerLogTable-tbody">
                {/* {logTable.map((logTable, key) => ( */}
                <tr>
                  <td>Call for Donation</td>
                  <td>September 24, 2024</td>
                  <td>September 24, 2024</td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
