import React from "react";
import "./StatisticsTemplate.css";

export default function StatisticsTemplate({
  statsTitle,
  statsNumber,
  statsPercentage,
  statsIncreased,
}) {
  return (
    <div className="statistics-template">
      <p className="stats-title">{statsTitle}</p>
      <p className="stats-current">{statsNumber}</p>

      <div className="stats-new">
        <p className="stats-percent">{statsPercentage}</p>
        <p className="stats-increased">{statsIncreased}</p>
      </div>
    </div>
  );
}
