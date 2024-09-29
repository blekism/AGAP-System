import { useState } from 'react';
import './landing.css';
import NavBarLan from './nav_bar_lan'; 
import head from '../image/head.png'; 
import photo from '../image/photo.jpg'; // Ensure this path is correct

function Landing() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBarLan /> 

      <div className='head'>
        <img src={head} alt="Landing Head" className="head-img" /> 
      </div>  

      <div className='head'>
        <div>
            
        </div>
      </div>


    </div>
  );
}

export default Landing;
