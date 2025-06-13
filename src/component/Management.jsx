import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Dashboard from './Management/Dashboard';
import FeeManagement from './Management/Fee/Fee-Management';
import StudentTracking from './Management/Tracking/Student-tracking';
import Announcement from './Management/Announcement/Announcement.jsx';
import Event from './Management/Event/Event';
import Communication from './Management/Communication/Communication.jsx';
import Transport from './Management/Transport/Transport.jsx';
import Time_Table from './Management/Time_table/Time_Table.jsx';
import Administration  from './Management/Administration/Administration.jsx';
import EmployeeManagement from './Management/Employee/Employee.jsx';
import '../assets/css/management.css';

function Management() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Initialize external JS functions only once
        let cleanupFunctions = [];
        
        try {
            // Import and setup external functions
            const { setupToggleMenu, initSidebarHover, notificationToggle } = require('../assets/js/main.js');
            
            // Setup toggle menu
            const toggleCleanup = setupToggleMenu();
            if (toggleCleanup) cleanupFunctions.push(toggleCleanup);
            
            // Initialize sidebar hover
            const sidebarCleanup = initSidebarHover();
            if (sidebarCleanup) cleanupFunctions.push(sidebarCleanup);
            
            // Setup notification toggle
            const notificationCleanup = notificationToggle();
            if (notificationCleanup && notificationCleanup.cleanUp) {
                cleanupFunctions.push(notificationCleanup.cleanUp);
            }
            
        } catch (error) {
            console.warn('External JS functions not available:', error);
        }

        // Cleanup function
        return () => {
            cleanupFunctions.forEach(cleanup => {
                if (typeof cleanup === 'function') {
                    cleanup();
                }
            });
        };
    }, []); // Empty dependency array - run only once

    // Handle notification toggle
    const handleNotificationToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsNotificationOpen(!isNotificationOpen);
    };

    // Handle sidebar toggle
    const handleSidebarToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close notification when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isNotificationOpen && !event.target.closest('.notification')) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isNotificationOpen]);

    return (
        <div className="container">
            <div className={`navigation ${isSidebarOpen ? 'active' : ''}`}>
                <ul className="nav-list">
                    <li>
                        <NavLink to="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                            <span className="icon"><ion-icon name="school-outline"></ion-icon></span>
                            <span className="title">School Management</span>  
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/dashboard" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/administration" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                            <span className="title">Administration</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/announcement" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="megaphone-outline"></ion-icon></span>
                            <span className="title">Announcement</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/event" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="calendar-outline"></ion-icon></span>
                            <span className="title">Events</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/communication" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></span>
                            <span className="title">Communication</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/timetable" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="time-outline"></ion-icon></span>
                            <span className="title">Timetable</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/student-tracking" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="walk-outline"></ion-icon></span>
                            <span className="title">Student Tracking</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/transport" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="bus-outline"></ion-icon></span>
                            <span className="title">Transport</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/fee-management" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="card-outline"></ion-icon></span>
                            <span className="title">Fee Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/management/employee" 
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                            <span className="title">Employee Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                            <span className="icon"><ion-icon name="settings-outline"></ion-icon></span>
                            <span className="title">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            
            <div className="main">
                <div className="topbar">
                    <div className="toggle" onClick={handleSidebarToggle}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    
                    <div className="search">
                        <label>
                            <input type="text" placeholder='type here..' />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    <div className="bg-gray flex justify-center items-center">
                        <div className="notification relative">
                            <button 
                                className="notification-btn"
                                onClick={handleNotificationToggle}
                            >
                                <span className="relative">
                                   <ion-icon name="notifications-outline"></ion-icon>
                                    <span className="alarm-notify"></span>
                                </span>
                            </button>
                            
                            {isNotificationOpen && (
                                <div className="notification-dropdown">
                                    <div className="bg-white rounded-xl shadow-lg border-gray-100 overflow-hidden">
                                        <div className="bg-indigo-600 px-24 py-8 flex justify-between items-center">
                                            <h5 className="text-white text-xl font-semibold">Notifications</h5>
                                            <div className="flex items-center gap-3">
                                                <button type="button" className="bg-white rounded-md text-sm px-8 py-2 text-black font-medium hover:text-indigo-500 transition-colors">
                                                    New
                                                </button>
                                                <button 
                                                    onClick={() => setIsNotificationOpen(false)}
                                                    className="text-white hover:text-indigo-100 text-xl transition-transform hover:scale-110"
                                                >
                                                   <ion-icon name="close-outline"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="p-24 max-h-[270px] overflow-y-auto">
                                            <div className="flex items-start gap-3 pb-6 mb-6">
                                                <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>
                                                <div className="border-bottom border-gray-100 mb-24 pb-24">
                                                    <div className="flex items-start gap-1">
                                                        <p className="font-medium text-gray-800 text-[15px] line-clamp-2">
                                                            Ashwin Bose is requesting access to Design File - Final Project.
                                                        </p>
                                                        <div className="dropdown relative flex-shrink-0">
                                                            <button className="text-gray-400 rounded hover:bg-gray-100 p-1" type="button">
                                                              <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-6 mt-8">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-5 h-5"/>
                                                        <div className="flex items-center flex-width gap-8">
                                                            <p className="text-gray-900 text-sm text-line-1">Design brief and ideas txt</p>
                                                            <span className="text-xs text-gray-400 flex-shrink-0">2.2 MB</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mt-16 flex items-center gap-8">
                                                        <button type="button" className="bg-indigo-500 text-white py-8 px-16 rounded-md text-15 font-medium hover:bg-indigo-800 transition-colors">
                                                            Accept
                                                        </button>
                                                        <button type="button" className="border btn-outline-gray text-gray-700 py-8 px-16 rounded-md text-15 font-medium">
                                                            Decline
                                                        </button>
                                                    </div>
                                                    
                                                    <span className="text-gray-400 text-13 mt-8 block">2 mins ago</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>
                                                <div>
                                                    <p className="font-medium text-gray-800 text-[15px] line-clamp-2">
                                                        Patrick added a comment on Design Assets - Smart Tags file.
                                                    </p>
                                                    <span className="text-gray-400 text-xs mt-1 block">4 mins ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <a href="#" className="py-13 px-24 font-bold text-center block text-indigo-600 border-t border-gray-100 hover:bg-indigo-50 transition-colors">
                                            View All
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="user">
                        <img src="../../../public/Images/user.png" alt="" />
                    </div>
                </div>
                
                <div className="content-area">
                    <Routes>
                        <Route index element={<Navigate to="/management/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="administration" element={<Administration />} />
                        <Route path="announcement" element={<Announcement />} />
                        <Route path="event" element={<Event />} />
                        <Route path="communication" element={<Communication />} />
                        <Route path="timetable" element={<Time_Table />} />
                        <Route path="student-tracking" element={<StudentTracking />} />
                        <Route path="transport" element={<Transport />} />
                        <Route path="fee-management" element={<FeeManagement />} />
                        <Route path="employee" element={<EmployeeManagement />} />
                        <Route path="*" element={<Navigate to="/management/dashboard" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Management;