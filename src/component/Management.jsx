import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Management/Dashboard';
import Header from './Management/Header';
import Sidebar from './Management/Sidebar';
import '../assets/css/management.css';
import { setupToggleMenu } from '../assets/js/main';


function Management() {
    useEffect(() => {
    setupToggleMenu(); 
  }, []);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content-area">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Management;
