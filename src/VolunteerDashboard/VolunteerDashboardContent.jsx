import React, { useState, useEffect } from "react";
import "./VolunteerDashboardContent.css";
import VolunteerStatistics from "../Admin/Dashboard/StatisticsTemplate.jsx";
import Calendar from "../Admin/Dashboard/DashboardCalendar";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function VolunteerDashboardContent() {
  const [TotalDonationsAccepted, setTotalDonationsAccepted] = useState([]);
  const [TotalCompletedTask, setTotalCompletedTask] = useState([]);
  const [YourTotalDonations, setYourTotalDonations] = useState([]);
  const [TotalHours, setTotalHours] = useState({});
  const [cookies] = useCookies(["donor_token"]);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readTotalDonationsAcceptedByVolunteer.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(
          "this is the total accepted donations ",
          response.data.data
        );
        setTotalDonationsAccepted(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readTotalCompletedTasks.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("this is the total completed task ", response.data.data);
        setTotalCompletedTask(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readYourTotalDonations.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("this is your total donations ", response.data.data);
        setYourTotalDonations(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readVolunteerTotalHours.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("this is your total donations ", response.data.data);
        setTotalHours(response.data.data);
      });

    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        setEvent(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="VolunteerDashboardContent-parentCont">
        <div className="VolunteerDashboardContent-bottomCont">
          <div className="VolunteerDashboardContent-leftCont">
            <div className="VolunteerDashboardContent-leftContHeader">
              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "650",
                  marginTop: "10px",
                }}
              >
                INFORMATION
              </p>
            </div>

            <div className="VolunteerDashboardContent-leftCont-Statistics">
              <VolunteerStatistics
                statsTitle="Total Hours"
                statsNumber={TotalHours.your_total_hours ?? 0}
              />
              <VolunteerStatistics
                statsTitle="Completed Task"
                statsNumber={TotalCompletedTask.total_completed_task}
              />
              <VolunteerStatistics
                statsTitle="Your Donations"
                statsNumber={YourTotalDonations.your_total_donations}
              />
              <VolunteerStatistics
                statsTitle="Accepted Donations"
                statsNumber={TotalDonationsAccepted.total_donations}
              />
            </div>
          </div>
          <div className="VolunteerDashboardContent-rightCont">
            <Calendar events={event} />
          </div>
        </div>
      </div>
    </>
  );
}
