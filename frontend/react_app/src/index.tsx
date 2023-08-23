import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import "reflect-metadata";
import './index.css';
import App from './App';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Operations from './operations/common/Operations';
import Statistics from './statistics/Statistics';
import Lottatore from './operations/lottatore/Lottatore';
import Team from './operations/team/Team';
import Sponsor from './operations/sponsor/Sponsor';
import Evento from './operations/evento/Evento';
import EditLottatore from './operations/editLottatore/EditLottatore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='Statistics' element={<Statistics />} />
        <Route path='Operations' element={<Operations />} />
        <Route path='Operations/Lottatore' element={<Lottatore />} />
        <Route path='Operations/Team' element={<Team />} />
        <Route path='Operations/Sponsor' element={<Sponsor />} />
        <Route path='Operations/Evento' element={<Evento />} />
        <Route path='Operations/LottatoreEdit' element={<EditLottatore />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
