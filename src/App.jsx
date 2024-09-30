import { BrowserRouter as Router, Route, Routes, Link } 
from "react-router-dom";
import './App.css'
import LogIn from './LogIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VolunteerSignUp from "./VolunteerSignUp"

function App() {

  return (

    <div>
      <VolunteerSignUp></VolunteerSignUp>
    </div>
   
  )
}

export default App
