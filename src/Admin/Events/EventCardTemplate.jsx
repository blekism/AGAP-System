import React from "react";
import "./EventCardTemplate.css";
import blood from "../../assets/images/blood.jpg";

export default function EventCardTemplate({ image, title, description }) {
  return (
    <div className="EventCardTemplateParent">
      <img src={image} className="EventCardTemplateImage" />
      <h1 className="EventCardTemplateTitle">{title}</h1>
      <p className="EventCardTemplateDescription">{description}</p>
    </div>
  );
}
