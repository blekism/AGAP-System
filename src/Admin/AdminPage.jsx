import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header/Header.jsx";
import Statistics from "./Dashboard/Statistics.jsx";
import DashboardCalendar from "./Dashboard/DashboardCalendar.jsx";
import Logo from "../assets/images/agap_logo1.png";
import Calendar from "../assets/images/calendar.png";
import Dashboard from "../assets/images/Dashboard.png";
import Donation from "../assets/images/Donation.png";
import Event from "../assets/images/Event.png";
import Member from "../assets/images/Member.png";
import Logout from "../assets/images/logout.png";
import DonationContent from "./Donations/DonationContent.jsx";
import VolunteerContent from "./Volunteers/Volunteers.jsx";
import DonorContent from "./Donors/Donors.jsx";
import "./AdminPage.css";

export default function AdminPage() {
  const donorValue = 100;
  const volunteerValue = 50;
  const costValue = 2000;
  const donationValue = 1500;
  const eventValue = 10;

  const donorPercentage = 10;
  const volunteerPercentage = 5;
  const costPercentage = 20;
  const donationPercentage = 15;
  const eventPercentage = 2;

  const donorIncreased = 100;
  const volunteerIncreased = 200;
  const costIncreased = 300;
  const donationIncreased = 4121254;
  const eventIncreased = 45254;

  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data);
        setEvent(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="AdminPageParentContainer">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <div className="LogoContainer">
              <img
                src={Logo}
                alt="AGAP Logo"
                style={{ width: "40%", height: "40%", margin: "auto" }}
                className="logo"
              />
            </div>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Dashboard} alt="Dashboard Icon" />
            <button
              className="nav-link active"
              id="pills-dashboard-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-dashboard"
              type="button"
              role="tab"
              aria-controls="pills-dashboard"
              aria-selected="true"
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Donation} alt="Donations Icon" />
            <button
              className="nav-link"
              id="pills-donations-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-donations"
              type="button"
              role="tab"
              aria-controls="pills-donations"
              aria-selected="false"
            >
              Manage Donations
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Member} alt="Volunteers Icon" />
            <button
              className="nav-link"
              id="pills-volunteers-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-volunteers"
              type="button"
              role="tab"
              aria-controls="pills-volunteers"
              aria-selected="false"
            >
              Manage Volunteers
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Member} alt="Donors Icon" />
            <button
              className="nav-link"
              id="pills-donors-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-donors"
              type="button"
              role="tab"
              aria-controls="pills-donors"
              aria-selected="false"
            >
              Manage Donors
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Event} alt="Events Icon" />
            <button
              className="nav-link"
              id="pills-events-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-events"
              type="button"
              role="tab"
              aria-controls="pills-events"
              aria-selected="false"
            >
              Manage Events
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Calendar} alt="Calendar Icon" />
            <button
              className="nav-link"
              id="pills-calendar-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-calendar"
              type="button"
              role="tab"
              aria-controls="pills-calendar"
              aria-selected="false"
            >
              View Calendar
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Donation} alt="Items Icon" />
            <button
              className="nav-link"
              id="pills-items-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-items"
              type="button"
              role="tab"
              aria-controls="pills-items"
              aria-selected="false"
            >
              Manage Items & Stock
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <img src={Logout} alt="Logout Icon" />
            <button className="logout-button">Logout</button>
          </li>
        </ul>

        {/* START OF MAIN CONTENT */}
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-dashboard"
            role="tabpanel"
            aria-labelledby="pills-dashboard-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header username="Admin" />
            </div>
            <div className="dashContent">
              <Statistics
                donorValue={donorValue}
                volunteerValue={volunteerValue}
                costValue={costValue}
                donationValue={donationValue}
                eventValue={eventValue}
                donorPercentage={donorPercentage}
                volunteerPercentage={volunteerPercentage}
                costPercentage={costPercentage}
                donationPercentage={donationPercentage}
                eventPercentage={eventPercentage}
                donorIncreased={donorIncreased}
                volunteerIncreased={volunteerIncreased}
                costIncreased={costIncreased}
                donationIncreased={donationIncreased}
                eventIncreased={eventIncreased}
              />

              <DashboardCalendar events={event} />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-donations"
            role="tabpanel"
            aria-labelledby="pills-donations-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header username="Admin" />
            </div>
            {/* donation content here */}
            <DonationContent />
          </div>
          <div
            className="tab-pane fade"
            id="pills-volunteers"
            role="tabpanel"
            aria-labelledby="pills-volunteers-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header username="Admin" />
            </div>
            <VolunteerContent />
            {/* volunteer content here */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-donors"
            role="tabpanel"
            aria-labelledby="pills-donors-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header username="Admin" />
            </div>
            <DonorContent />
            {/* donor content here */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-events"
            role="tabpanel"
            aria-labelledby="pills-events-tab"
            tabIndex="0"
          >
            events
            {/* event content here */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-calendar"
            role="tabpanel"
            aria-labelledby="pills-calendar-tab"
            tabIndex="0"
          >
            calendar
            {/* calendar content here */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-items"
            role="tabpanel"
            aria-labelledby="pills-items-tab"
            tabIndex="0"
          >
            items
            {/* item content here */}
          </div>
        </div>
        {/* END OF MAIN CONTENT */}
      </div>
    </>
  );
}
