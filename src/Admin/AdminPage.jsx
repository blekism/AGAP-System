import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header/Header.jsx";
import Statistics from "./Dashboard/Statistics.jsx";
import DashboardCalendar from "./Dashboard/DashboardCalendar.jsx";
import Logo from "../assets/images/agapnew.png";
import Dashboard from "../assets/images/Dashboard.png";
import Donation from "../assets/images/Donation.png";
import Event from "../assets/images/Event.png";
import Member from "../assets/images/Member.png";
import Logout from "../assets/images/logout.png";
import LogRecord from "../assets/images/LogRecord.png";
import Admin from "../assets/images/admin.png";
import DonationContent from "./Donations/DonationContent.jsx";
import VolunteerContent from "./Volunteers/VolunteersManagement.jsx";
import DonorContent from "./Donors/Donors.jsx";
import EventContent from "./Events/Events.jsx";
import ItemManagement from "./ItemManagement/ItemManagement.jsx";
import "./AdminPage.css";
import VolunteerLogs from "./VolunteerLogs/VolunteerLogs.jsx";
import AdminManagement from "./AdminManagement/AdminManagement.jsx";
import DeductionLogs from "./DeductionLogs/DeductionLogs.jsx";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export default function AdminPage() {
  const [event, setEvent] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donorValue, setDonorValue] = useState({});
  const [volunteerValue, setVolunteerValue] = useState({});
  const [costValue, setCostValue] = useState({});
  const [donationValue, setDonationValue] = useState({});
  const [eventValue, setEventValue] = useState({});
  const [hoursValue, setHoursValue] = useState({});
  const [adminValue, setAdminValue] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["admin_token"]);

  useEffect(() => {
    axios
      .get("http://localhost/agap-backend-main/api/phase_1/read/readEvents.php")
      .then(function (response) {
        console.log(response.data); //read events
        setEvent(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/read_donors_acc.php"
      )
      .then(function (response) {
        console.log(response.data); //read donors account
        setDonors(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTotalDonors.php"
      )
      .then(function (response) {
        console.log(response.data);
        setDonorValue(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTotalVolunteers.php"
      )
      .then(function (response) {
        console.log(response.data);
        setVolunteerValue(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTotalCost.php"
      )
      .then(function (response) {
        console.log(response.data);
        setCostValue(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTotalDonation.php"
      )
      .then(function (response) {
        console.log(response.data);
        setDonationValue(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readTotalEvents.php"
      )
      .then(function (response) {
        console.log(response.data);
        setEventValue(response.data.data);
      });

    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readTotalHours.php"
      )
      .then(function (response) {
        console.log(response.data);
        setHoursValue(response.data.data);
      });

    if (cookies.admin_token) {
      try {
        const decoded = jwtDecode(cookies.admin_token);
        axios
          .post(
            "http://localhost/agap-backend-main/api/phase2&3/read/readSingleAdmin.php",
            { account_id: decoded.sub },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response.data);
            setAdminValue(response.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/LoginAdmin";
    }
  }, []);

  const handleLogout = () => {
    removeCookie("admin_token");
    window.location.href = "/LoginAdmin";
  };

  return (
    <>
      <div className="AdminPageParentContainer">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <div className="LogoContainer">
              <img
                src={Logo}
                alt="AGAP Logo"
                style={{ width: "100px", height: "100px" }}
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
              Manage Items
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <img src={Donation} alt="Items Icon" />
            <button
              className="nav-link"
              id="pills-deduction-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-deduction"
              type="button"
              role="tab"
              aria-controls="pills-deduction"
              aria-selected="false"
            >
              Deduction Logs
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <img src={LogRecord} alt="Items Icon" />
            <button
              className="nav-link"
              id="pills-volunteerlogs-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-volunteerlogs"
              type="button"
              role="tab"
              aria-controls="pills-volunteerlogs"
              aria-selected="false"
            >
              Volunteer Logs
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <img src={Admin} alt="Items Icon" />
            <button
              className="nav-link"
              id="pills-adminManagement-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-adminManagement"
              type="button"
              role="tab"
              aria-controls="pills-adminManagement"
              aria-selected="false"
            >
              Admin Management
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <img src={Logout} alt="Logout Icon" />
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            {/* gawing modal for confirming logout */}
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
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <div className="dashContent">
              <Statistics
                donorValue={donorValue.total_donors}
                volunteerValue={volunteerValue.total_volunteers}
                costValue={costValue.total_cost}
                donationValue={donationValue.total_donations}
                eventValue={eventValue.total_events}
                hoursValue={hoursValue.total_hours}
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
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
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
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <VolunteerContent
            // lagay dito volunteer management jsx
            />
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
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <DonorContent donors={donors} />
            {/* donor content here */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-events"
            role="tabpanel"
            aria-labelledby="pills-events-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>

            <EventContent
              events={event}
              addEventsModalID="addEventsModalID"
              addEventsModalTarget="#addEventsModalID"
              addEventAnnouncementModalID="addEventAnnouncementModalID"
              addEventAnnouncementModalTarget="#addEventAnnouncementModalID"
              eventViewModalID="eventViewModalID"
              eventViewModalTarget="#eventViewModalID"
              eventAnnouncementModalID="eventAnnouncementModalID"
              eventAnnouncementModalTarget="#eventAnnouncementModalID"
            />
            {/* event content here */}
          </div>

          <div
            className="tab-pane fade"
            id="pills-items"
            role="tabpanel"
            aria-labelledby="pills-items-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <ItemManagement events={event} />

            {/* item content here */}
          </div>

          {/* deduction logs here */}
          <div
            className="tab-pane fade"
            id="pills-deduction"
            role="tabpanel"
            aria-labelledby="pills-deduction-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <DeductionLogs />
          </div>
          {/* deduction logs here */}

          <div
            className="tab-pane fade"
            id="pills-volunteerlogs"
            role="tabpanel"
            aria-labelledby="pills-volunteerlogs-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <VolunteerLogs />
            {/* phase 2 and phase 3 log here */}
          </div>

          <div
            className="tab-pane fade"
            id="pills-adminManagement"
            role="tabpanel"
            aria-labelledby="pills-adminManagement-tab"
            tabIndex="0"
          >
            <div className="dashHeader">
              <Header
                username={adminValue.first_name + " " + adminValue.last_name}
              />
            </div>
            <AdminManagement />
            {/* admin management here */}
          </div>
        </div>
        {/* END OF MAIN CONTENT */}
      </div>
    </>
  );
}
