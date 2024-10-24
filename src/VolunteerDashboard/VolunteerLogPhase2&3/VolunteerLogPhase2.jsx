import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./VolunteerLogPhase2.css";
import VolunteerDashboardSidebar from "../VolunteerDashboardSidebar";
import VolunteerNavHeader from "../VolunteerNavHeader";

export default function VolunteerLogPhase2() {
  const [volunteerPhase2Log, setVolunteerPhase2Log] = useState([]);
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readVolunteerPhase2Log.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setVolunteerPhase2Log(response.data.data);
      });
  }, []);

  return (
    <>
      <div className="VolunteerLogPhase2-parentCont">
        <VolunteerNavHeader />
        <div className="VolunteerLogPhase2-bodyCont">
          <div className="VolunteerLogPhase2-leftCont">
            <VolunteerDashboardSidebar />
          </div>
          <div className="VolunteerLogPhase2-rightCont">
            <p>PHASE 2 LOG</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">LOG ID</th>
                  <th scope="col">EVENT NAME</th>
                  <th scope="col">LAST NAME</th>
                  <th scope="col">FIRST NAME</th>
                  <th scope="col">ACTIVITY</th>
                  <th scope="col">TIME IN</th>
                  <th scope="col">TIME OUT</th>
                  <th scope="col">DATE</th>
                </tr>
              </thead>
              <tbody>
                {volunteerPhase2Log.map((phase2Log, key) => (
                  <tr key={key}>
                    <td>{phase2Log.log_id}</td>
                    <td>{phase2Log.event_name}</td>
                    <td>{phase2Log.last_name}</td>
                    <td>{phase2Log.first_name}</td>
                    <td>{phase2Log.activity}</td>
                    <td>{phase2Log.time_in}</td>
                    <td>{phase2Log.time_out}</td>
                    <td>{phase2Log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
