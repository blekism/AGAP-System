import React from "react";
import VolunteerDashboardSidebar from "../../VolunteerDashboard/VolunteerDashboardSidebar";
import VolunteerNavHeader from "../../VolunteerDashboard/VolunteerNavHeader";
import "./VolunteerPendingDonations.css";

export default function VolunteerPendingDonations() {
  return (
    <>
      <div className="VolunteerPendingDonations-parentCont">
        <VolunteerNavHeader />
        <div className="VolunteerPendingDonations-bodyCont">
          <div className="VolunteerPendingDonations-leftCont">
            <VolunteerDashboardSidebar />
          </div>
          <div className="VolunteerPendingDonations-rightCont"></div>
        </div>
      </div>
    </>
  );
}
