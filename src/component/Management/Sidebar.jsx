import React, { useEffect } from 'react';
import { initSidebarHover } from '../../assets/js/main.js'; 
import './management.css'

function Sidebar({ currentPage, setCurrentPage }) {

  useEffect(() => {
    initSidebarHover(); 
  }, []);

  return (
    <div className="container">
      <div className="navigation">
        <ul className="nav-list">
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="school-outline"></ion-icon>
              </span>
              <span className="title">School Management</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Administration</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="megaphone-outline"></ion-icon>
              </span>
              <span className="title">Announcement</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="calendar-outline"></ion-icon>
              </span>
              <span className="title">Events</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="chatbox-ellipses-outline"></ion-icon>
              </span>
              <span className="title">Communication</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="time-outline"></ion-icon>
              </span>
              <span className="title">Timetable</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="walk-outline"></ion-icon>
              </span>
              <span className="title">Student Tracking</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="bus-outline"></ion-icon>
              </span>
              <span className="title">Transport</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="card-outline"></ion-icon>
              </span>
              <span className="title">Fee Management</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
