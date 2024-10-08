import React from "react";
import "./VolunteerDashboard.css";
import VolunteerDashboardSidebar from "./VolunteerDashboardSidebar";
import VolunteerDashboardContent from "./VolunteerDashboardContent";
import VolunteerNavHeader from "./VolunteerNavHeader";
// import axios from "axios";

export default function VolunteerDashboard() {
  return (
    <>
      {/*parent cont start*/}
      <div className="VolunteerDashboard-parentCont">
        <VolunteerNavHeader />
        <div className="VolunteerDashboard-bodyCont">
          <div className="VolunteerDashboard-leftCont">
            <VolunteerDashboardSidebar />
          </div>
          <div className="VolunteerDashboard-rightCont">
            <VolunteerDashboardContent />
          </div>
        </div>
      </div>
      {/*parent cont end*/}
    </>
  );
}
