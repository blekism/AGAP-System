import React from 'react';
import './LogIn.css';
import bgImage from './image/agap_login.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LogIn() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
        `}
      </style>

      <div className="login-container" style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <div className="login-box d-flex">
          <div className="login-form p-4 d-flex flex-column justify-content-between">
            <h1 className="text-center mb-4" style={{ fontSize:"36px", fontWeight: "600"}}>Sign In</h1>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email" style={{background: "#EEE", width: "364.514px", margin: "auto", borderRadius: "10.069px"}}/>
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" style={{background: "#EEE", width: "364.514px", margin: "auto",borderRadius: "10.069px"}}/>
              </div>
              <div className="mb-3">
                <a href="#" className="text-muted:hover" style={{lineHeight: "27.188px", fontFamily: "'Nunito Sans', sans-serif", color:"#6c757d" }}>
                  Forgot Your Password?
                </a>
              </div>
              <button type="submit" className="btn">SIGN IN</button> 
            </form>
            <div className="text-center mt-3">
              <a href="#" className="text-asAdmin">Sign In as Admin.</a>
            </div>
          </div>

          <div className="register-box p-4">
            <h2>Hello!</h2>
            <p>Register with your personal account <br /> to use this app</p>
            <button className="btn2" style={{background:"#354290", border: "3.398px solid #FFF"}}>SIGN UP</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default LogIn;
