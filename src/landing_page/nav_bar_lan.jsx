import React from 'react';
import './Navbar.css'; 
import logo from '../image/agap_logo1.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="NUD Hub Logo" className="logo-img" /> 
        </a>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/donate-volunteer">Donate/Volunteer</a></li>
        <li><a href="/signin">Sign In</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
