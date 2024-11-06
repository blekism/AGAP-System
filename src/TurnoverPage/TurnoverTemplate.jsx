import React from "react";
import "./TurnoverTemplate.css";
import { useState } from "react";

export default function TurnoverTemplate({ documentation }) {
  const [imagePopup, setImagePopup] = useState(null);

  return (
    <>
      <div
        className="TurnoverTemplateParentCont"
        onClick={() => {
          console.log("Clickyy meee!", documentation);
          setImagePopup(documentation);
        }}
      >
        <img src={documentation} alt="placeholder" />
      </div>

      {imagePopup && (
        <div className="TurnoverTemplatePopupCont">
          <div className="popup">
            <span className="close" onClick={() => setImagePopup(null)}>
              &times;
            </span>
            <img src={imagePopup} alt="popup" />
          </div>
        </div>
      )}
    </>
  );
}
