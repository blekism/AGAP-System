import React from "react";
import Template from "./StatisticsTemplate.jsx";
import "./Statistics.css";

export default function Statistics({
  donorValue,
  volunteerValue,
  costValue,
  donationValue,
  eventValue,
  hoursValue,
  donorPercentage,
  hoursPercentage,
  volunteerPercentage,
  costPercentage,
  donationPercentage,
  eventPercentage,
  donorIncreased,
  hoursIncreased,
  volunteerIncreased,
  costIncreased,
  donationIncreased,
  eventIncreased,
}) {
  return (
    <div className="StatisticsParent">
      <Template
        statsTitle="Total Donors"
        statsNumber={donorValue}
        statsPercentage={donorPercentage}
        statsIncreased={donorIncreased}
      />
      <Template
        statsTitle="Total Volunteers"
        statsNumber={volunteerValue}
        statsPercentage={volunteerPercentage}
        statsIncreased={volunteerIncreased}
      />
      <Template
        statsTitle="Total Cost"
        statsNumber={costValue}
        statsPercentage={costPercentage}
        statsIncreased={costIncreased}
      />
      <Template
        statsTitle="Total Donations"
        statsNumber={donationValue}
        statsPercentage={donationPercentage}
        statsIncreased={donationIncreased}
      />
      <Template
        statsTitle="Total Events"
        statsNumber={eventValue}
        statsPercentage={eventPercentage}
        statsIncreased={eventIncreased}
      />
      <Template
        statsTitle="Volunteer Hours"
        statsNumber={hoursValue}
        statsPercentage={hoursPercentage}
        statsIncreased={hoursIncreased}
      />
    </div>
  );
}
