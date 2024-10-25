import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./VolunteerNavHeader.css";
import NavBar from "../Page/NavBar";

export default function VolunteerPageTemplate() {
  const [currentDate, setCurrentDate] = useState("");
  const [fullName, setFullName] = useState({});
  const [cookies, setCookie] = useCookies(["donor_token"]);

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate(); // Set the initial date
    const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/agap-backend-main/api/phase_1/read/readDonorAccount.php",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.donor_token,
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setFullName(response.data.data);
      });
  }, []);

  return (
    <>
      {/*parent cont start*/}
      <div className="VolunteerNavHeader-parentCont">
        {/*nav start*/}
        <NavBar />
        {/*nav end*/}

        {/*header cont start*/}
        <div className="VolunteerNavHeader-headerCont">
          <h1>Hi! {fullName.first_name + " " + fullName.last_name}</h1>
          <div className="VolunteerNavHeader-headerContDate">
            <p>{currentDate}</p>
          </div>
        </div>
        {/*header cont end*/}
      </div>
      {/*parent cont end*/}
    </>
  );
}
