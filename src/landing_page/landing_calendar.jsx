
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./landing_calendar.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function landingCalendar() {
  return (
    <>
    <div className="lan-cal">
        <div className="lan-cal-area">
            <h1 className="lan-cal-title">
                Events in (Month)
            </h1>
        </div>

        <div className="fullCalendar">
            <FullCalendar
                className="fullCalendar"
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={false} /*alisin mga design sa taas ng calendar*/
                fixedWeekCount={false} /*papakita lang kung ilang week meron sa isang buwan*/
                showNonCurrentDates={true} /*show yung days next months*/
            />
        </div>
    </div>

    </>

  );
}

export default landingCalendar;
