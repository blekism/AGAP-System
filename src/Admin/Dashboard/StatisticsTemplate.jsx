import React from "react";
import "./StatisticsTemplate.css";

export default function StatisticsTemplate({
  statsTitle,
  statsNumber,
  statsPercentage,
  statsIncreased,
  styles,
}) {
  return (
    <div className="statistics-template" style={{ height: styles || "25vh" }}>
      <p className="stats-title">{statsTitle}</p>
      <p className="stats-current">{statsNumber}</p>
    </div>
  );
}
