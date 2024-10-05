import React from "react";
import { useState, useEffect } from "react";
import "./VolunteerNavHeader.css";
import NavBar from "../Page/NavBar";

export default function VolunteerPageTemplate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
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
          <h1>Hi! Hannah</h1>
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
