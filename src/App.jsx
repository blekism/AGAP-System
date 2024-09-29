import { useState } from 'react';
import Landing from './landing_page/landing'; 
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Landing /> 
    </div>
  );
}

export default App;
