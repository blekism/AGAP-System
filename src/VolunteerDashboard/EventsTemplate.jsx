import React from "react";
import "./EventsTemplate.css";
import ImageHolder from "../assets/images/Image_Holder.png";

export default function EventsTemplate({ title, content, date }) {
  return (
    <>
      <div className="EventsTemplate-events">
        <img
          src={ImageHolder}
          alt="NU events"
          className="eventsImage"
          style={{
            width: "90%",
            height: "25vh",
            margin: "auto",
          }}
        />
        <div className="EventsTemplate-eventsContent">
          <h1>{title}</h1>
          <p>{content}</p>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {date}
          </p>
        </div>
      </div>
    </>
  );
}
