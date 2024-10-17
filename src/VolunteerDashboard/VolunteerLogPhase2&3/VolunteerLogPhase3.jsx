import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./VolunteerLogPhase2.css";
import VolunteerDashboardSidebar from "../VolunteerDashboardSidebar";
import VolunteerNavHeader from "../VolunteerNavHeader";

export default function VolunteerLogPhase2() {
  const [volunteerPhase3Log, setVolunteerPhase3Log] = useState([]);
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase2&3/read/readVolunteerPhase3Log.php",
        {
          headers: {
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setVolunteerPhase3Log(response.data.data);
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
            <p>PHASE 3 LOG</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">LOG ID</th>
                  <th scope="col">EVENT NAME</th>
                  <th scope="col">LAST NAME</th>
                  <th scope="col">FIRST NAME</th>
                  <th scope="col">TIME IN</th>
                  <th scope="col">TIME OUT</th>
                  <th scope="col">DATE</th>
                </tr>
              </thead>
              <tbody>
                {volunteerPhase3Log.map((phase3Log, key) => (
                  <tr key={key}>
                    <td>{phase3Log.log_id}</td>
                    <td>{phase3Log.event_name}</td>
                    <td>{phase3Log.last_name}</td>
                    <td>{phase3Log.first_name}</td>
                    <td>{phase3Log.time_in}</td>
                    <td>{phase3Log.time_out}</td>
                    <td>{phase3Log.date}</td>
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
