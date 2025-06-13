import React, { useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import '../assets/css/management.css';
import Dashboard from './Teacher/Dashboard/Dashboard';
import { setupToggleMenu, initSidebarHover, notificationToggle } from '../assets/js/main.js';


function Teacher() {
    useEffect(() => {
        setupToggleMenu(); 
        initSidebarHover(); 
        notificationToggle();
    }, []);

    useEffect(() => {
        const notification = notificationToggle();
        const { isInitialized } = notification.init();
        
        if (!isInitialized) {
            console.warn('Notification components not found in the DOM');
        }
        
        return () => {
            notification.cleanUp();
        };
    }, []);

    return (
        <div className="container">
            <div className="navigation">
                <ul className="nav-list">
                    <li>
                           <a href="#">
                             <span className="icon"><ion-icon name="school-outline"></ion-icon></span>
                            <span className="title">School Management</span>  
                           </a>
                      
                    </li>
                    <li>
                       <a href="#">
                        
                            <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                            <span className="title">Dashboard</span>
                       </a>
                       
                    </li>
                    <li>
                  <a href="#">
                      <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                            <span className="title">Administration</span>
                  </a>
                          
                     
                    </li>
                    <li>
                       <a href="#">
                            <span className="icon"><ion-icon name="megaphone-outline"></ion-icon></span>
                            <span className="title">Announcement</span>
                       </a>
                       
                    </li>
                    <li>
                           <a href="#">
                             <span className="icon"><ion-icon name="calendar-outline"></ion-icon></span>
                            <span className="title">Events</span>
                           </a>
                    </li>
                    <li>
                      <a href="#">
                        
                            <span className="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></span>
                            <span className="title">Communication</span>
                       
                      </a>
                    </li>
                    <li>
                       
                          <a href="#">
                             <span className="icon"><ion-icon name="time-outline"></ion-icon></span>
                            <span className="title">Timetable</span>
                          </a>
                       
                    </li>
                    <li>
                       
                    <a href="#">
                              <span className="icon"><ion-icon name="walk-outline"></ion-icon></span>
                            <span className="title">Student Tracking</span>
                    </a>
                 
                    </li>
                    <li>
                      
                          <a href="#">
                              <span className="icon"><ion-icon name="bus-outline"></ion-icon></span>
                            <span className="title">Transport</span>
                          </a>
                       
                    </li>
                    <li>
                     <a href="#">
                      <span className="icon"><ion-icon name="card-outline"></ion-icon></span>
                            <span className="title">Fee Management</span>
                     </a>
                     
                    </li>
                    <li>
                     
                           <a href="#">
                             <span className="icon"><ion-icon name="settings-outline"></ion-icon></span>
                            <span className="title">Settings</span>
                           </a>
                  
                    </li>
                </ul>
            </div>
                <div className="main">
                    <div className="topbar">
                        <div className="toggle">
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                        <div className="search" >
                            <label >
                                <input type="text" placeholder='type here..' />
                                <ion-icon name="search-outline"></ion-icon>
                            </label>
                        </div>

                        <div class="bg-gray flex justify-center items-center ">
                            <div class="notification relative">
                                <button id="notificationBtn" class="notification-btn">
                                    <span class="relative">
                                       <ion-icon name="notifications-outline"></ion-icon>
                                        <span class="alarm-notify"></span>
                                    </span>
                                </button>
                                
                                <div id="notificationDropdown" class="notification-dropdown">
                                    <div class="bg-white rounded-xl shadow-lg border-gray-100  overflow-hidden">
                                        <div class="bg-indigo-600 px-24 py-8 flex justify-between items-center">
                                            <h5 class="text-white text-xl font-semibold">Notifications</h5>
                                            <div class="flex items-center gap-3">
                                                <button type="button" class="bg-white rounded-md text-sm px-8 py-2 text-black font-medium hover:text-indigo-500 transition-colors">
                                                    New
                                                </button>
                                                <button id="closeDropdown" class="text-white hover:text-indigo-100 text-xl transition-transform hover:scale-110">
                                                   <ion-icon name="close-outline"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div class="p-24 max-h-[270px] overflow-y-auto">
                                            <div class="flex items-start gap-3 pb-6 mb-6">
                                                <img src="https://i.pravatar.cc/100?img=11" alt="User" class="w-12 h-12 rounded-full object-cover flex-shrink-0"/>
                                                <div class="border-bottom border-gray-100 mb-24 pb-24">
                                                    <div class="flex items-start gap-1">
                                                        <p class="font-medium text-gray-800 text-[15px] line-clamp-2">
                                                            Ashwin Bose is requesting access to Design File - Final Project.
                                                        </p>
                                                        <div class="dropdown relative flex-shrink-0">
                                                            <button class="text-gray-400 rounded hover:bg-gray-100 p-1" type="button">
                                                              <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="flex items-center  gap-6 mt-8">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" class="w-5 h-5"/>
                                                        <div class="flex items-center flex-width gap-8">
                                                            <p class="text-gray-900 text-sm text-line-1">Design brief and ideas txt</p>
                                                            <span class="text-xs text-gray-400 flex-shrink-0">2.2 MB</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="mt-16 flex items-center gap-8">
                                                        <button type="button" class="bg-indigo-500 text-white py-8 px-16 rounded-md text-15 font-medium hover:bg-indigo-800 transition-colors">
                                                            Accept
                                                        </button>
                                                        <button type="button" class="border btn-outline-gray text-gray-700 py-8 px-16 rounded-md text-15 font-medium ">
                                                            Decline
                                                        </button>
                                                    </div>
                                                    
                                                    <span class="text-gray-400 text-13 mt-8 block">2 mins ago</span>
                                                </div>
                                            </div>
                                            
                                            <div class="flex items-start gap-3">
                                                <img src="https://i.pravatar.cc/100?img=33" alt="User" class="w-12 h-12 rounded-full object-cover flex-shrink-0"/>
                                                <div>
                                                    <p class="font-medium text-gray-800 text-[15px] line-clamp-2">
                                                        Patrick added a comment on Design Assets - Smart Tags file.
                                                    </p>
                                                    <span class="text-gray-400 text-xs mt-1 block">4 mins ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <a href="#" class="py-13 px-24 font-bold text-center block text-indigo-600 border-t border-gray-100 hover:bg-indigo-50 transition-colors">
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="user">
                            <img src="../../../public/Images/user.png" alt="" />
                        </div>
                    </div>
                    <div className="content-area">
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                             {/* <Route index element={<FeeManagement />} />
                            <Route path="FeeManagement" element={<FeeManagement />} /> */}
                             {/* <Route index element={<StudentTracking />} />
                            <Route path="StudentTracking" element={<StudentTracking />} /> */}
                             {/* <Route index element={<Announcement />} />
                            <Route path="announcement" element={<Announcement />} /> */}
                                {/* <Route index element={<Event />} />
                            <Route path="Event" element={<Event />} /> */}
                             {/* <Route index element={<Communication />} />
                            <Route path="Communication" element={<Communication />} /> */}
                             {/* <Route index element={<Transport />} />
                            <Route path="Transport" element={<Transport />} /> */}
                             {/* <Route index element={<Time_Table />} />
                            <Route path="Time_Table" element={<Time_Table />} /> */}
                             {/* <Route index element={<Administration />} />
                            <Route path="Administration" element={<Administration />} /> */}
                            {/* <Route index element={<EmployeeManagement />} />
                            <Route path="EmployeeManagement" element={<EmployeeManagement />} /> */}
                            {/* <Route path="school" element={<SchoolManagement />} />
                            <Route path="settings" element={<Settings />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        );
}

export default Teacher;