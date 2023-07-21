import React from 'react';
import './App.css';
import background from './img/mma-background.jpg';
import { Route, Routes, useNavigate } from "react-router-dom";
import Statistics from './Statistics/Statistics';
import Operations from './Operations/Operations';

function OperationButton() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `Operations`; 
    navigate(path, {replace: true});
  }
  
  return (
    <div className='MyButton' onClick={routeChange}>
      <span> 
        Operazioni Amministratore  
      </span>
    </div>
  );
}

function StatisticsButton() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `Statistics`; 
    navigate(path, {replace: true});
  }

  return (
    <div className='MyButton' onClick={routeChange}>
      <span> 
        Statistiche      
      </span>
    </div>
  );
}

function App() {

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Statistics" element={<Statistics />} />
        <Route path="Operations" element={<Operations />} />
      </Routes>
      <div style={{backgroundImage: `url(${background})`, 
      backgroundSize: 'cover',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: '100vh',
      width: '100vw',
      }}>
        <OperationButton />
        <StatisticsButton />
      </div>
    </div>
  );
}

export default App;
