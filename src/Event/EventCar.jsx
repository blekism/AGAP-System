import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./EventCar.css";
import { MdDateRange, MdLocationOn } from "react-icons/md";

import need from "../assets/images/need.jpg";
import brigada_eskwela from "../assets/images/brigada_eskwela.jpg";
// import volunteers_comex from "../assets/images/volunteers_comex.png";
import comex1 from "../assets/images/comex1.jpg";
// import brigada_eskwela from "../assets/images/brigada_eskwela.jpg";

function LandingCar() {
  const images = [
    {
      src: need,
      title: "Blood Donation Drive",
      date: "November 5, 2024",
      place: "National University - Dasmarinas",
    },
    {
      src: brigada_eskwela,
      title: "Health Awareness Program",
      date: "November 12, 2024",
      place: "National University - Dasmarinas",
    },
    {
      src: comex1,
      title: "Community Service Day",
      date: "November 19, 2024",
      place: "National University - Dasmarinas",
    },
    {
      src: need,
      title: "Volunteer Recruitment Fair",
      date: "December 3, 2024",
      place: "National University - Dasmarinas",
    },
  ];

  const totalSlides = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="LandingCaro">
      <div className="LanCar">
        <Carousel
          showThumbs={false}
          selectedItem={currentIndex}
          onChange={(index) => setCurrentIndex(index)}
          infiniteLoop={true}
          showStatus={false}
          showIndicators={false}
          transitionTime={currentIndex === totalSlides - 1 ? 0 : 1500}
        >
          {images.map((image, index) => (
            <div key={index} className="slide-container">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="fade-out"
              />
              {/* <div className="slide-info">
                <div className="non">Latest News</div>
                <p className="date">
                  <MdDateRange style={{ marginRight: "5px" }} /> {image.date}
                </p>
                <h2>{image.title}</h2>
                <p className="place">
                  <MdLocationOn style={{ marginRight: "5px" }} /> {image.place}
                </p>
              </div> */}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default LandingCar;
