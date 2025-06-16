import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import '../assets/css/College.css';
import Dashboard from './College/Dashbord/Dashboard.jsx';

// Temporary placeholder components for missing imports
const Administration = () => <div>Administration Component</div>;
const Announcement = () => <div>Announcement Component</div>;
const Event = () => <div>Event Component</div>;
const Communication = () => <div>Communication Component</div>;
const Time_Table = () => <div>Time Table Component</div>;
const StudentTracking = () => <div>Student Tracking Component</div>;
const Transport = () => <div>Transport Component</div>;
const FeeManagement = () => <div>Fee Management Component</div>;
const EmployeeManagement = () => <div>Employee Management Component</div>;

function College() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  useEffect(() => {
    // Load Iconify
    if (!document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.1/iconify.min.js';
      document.head.appendChild(script);
    }

    // Load Ion Icons
    if (!document.querySelector('script[src*="ionicons"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(script);

      const nomoduleScript = document.createElement('script');
      nomoduleScript.noModule = true;
      nomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
      document.head.appendChild(nomoduleScript);
    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsNotificationOpen(false);
        setIsMessageOpen(false);
        setIsLanguageOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle sidebar toggle
  const handleSidebarToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle theme toggle
  const handleThemeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  // Handle dropdown toggles
  const handleNotificationToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
    setIsMessageOpen(false);
    setIsLanguageOpen(false);
    setIsProfileOpen(false);
  };

  const handleMessageToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMessageOpen(!isMessageOpen);
    setIsNotificationOpen(false);
    setIsLanguageOpen(false);
    setIsProfileOpen(false);
  };

  const handleLanguageToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
    setIsNotificationOpen(false);
    setIsMessageOpen(false);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
    setIsMessageOpen(false);
    setIsLanguageOpen(false);
  };

  // Handle language selection
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsLanguageOpen(false);
  };

  const languages = [
    { id: 'english', name: 'English', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag1.png' },
    { id: 'japan', name: 'Japan', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag2.png' },
    { id: 'france', name: 'France', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag3.png' },
    { id: 'germany', name: 'Germany', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag4.png' },
    { id: 'korea', name: 'South Korea', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag5.png' },
    { id: 'bangladesh', name: 'Bangladesh', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag6.png' },
    { id: 'india', name: 'India', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag7.png' },
    { id: 'canada', name: 'Canada', flag: 'https://laravel.wowdash.wowtheme7.com/assets/images/flags/flag8.png' }
  ];

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
              to="/college/dashboard"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
              <span className="title">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/administration"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
              <span className="title">Administration</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/announcement"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="megaphone-outline"></ion-icon></span>
              <span className="title">Announcement</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/event"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="calendar-outline"></ion-icon></span>
              <span className="title">Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/communication"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></span>
              <span className="title">Communication</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/timetable"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="time-outline"></ion-icon></span>
              <span className="title">Timetable</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/student-tracking"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="walk-outline"></ion-icon></span>
              <span className="title">Student Tracking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/transport"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="bus-outline"></ion-icon></span>
              <span className="title">Transport</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/fee-management"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="icon"><ion-icon name="card-outline"></ion-icon></span>
              <span className="title">Fee Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/college/employee"
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
        <div className="navbar-header">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex-auto">
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  type="button" 
                  className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`}
                  onClick={handleSidebarToggle}
                >
                  <iconify-icon icon="heroicons:bars-3-solid" className="text-2xl non-active"></iconify-icon>
                  <iconify-icon icon="iconoir:arrow-right" className="text-2xl active"></iconify-icon>
                </button>
                <button 
                  type="button" 
                  className="sidebar-mobile-toggle"
                  onClick={handleSidebarToggle}
                >
                  <iconify-icon icon="heroicons:bars-3-solid" className="text-2xl"></iconify-icon>
                </button>
                <form className="navbar-search relative">
                  <input 
                    type="text" 
                    name="search" 
                    placeholder="Search" 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                  />
                  <iconify-icon icon="ion:search-outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></iconify-icon>
                </form>
              </div>
            </div>
            <div className="flex-auto">
              <div className="flex flex-wrap items-center gap-3 justify-end">
                {/* Theme Toggle Button */}
                <button 
                  type="button" 
                  className="w-10 h-10 bg-neutral-200 rounded-full flex justify-center items-center"
                  onClick={handleThemeToggle}
                  data-theme-toggle
                  aria-label={isDarkMode ? 'dark' : 'light'}
                ></button>

                {/* Language Dropdown */}
                <div className="relative dropdown hidden sm:inline-block">
                  <button 
                    className={`has-indicator w-10 h-10 bg-neutral-200 rounded-full flex justify-center items-center ${isLanguageOpen ? 'show' : ''}`}
                    type="button" 
                    onClick={handleLanguageToggle}
                  >
                    <img 
                      src={languages.find(l => l.id === selectedLanguage)?.flag || languages[0].flag} 
                      alt="language" 
                      className="w-6 h-6 object-cover rounded-full" 
                    />
                  </button>

                  {isLanguageOpen && (
                    <div className="dropdown-menu to-top dropdown-menu-sm absolute z-50 mt-2">
                      <div className="py-3 px-4 rounded-lg bg-primary-50 mb-4 flex items-center justify-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light font-semibold mb-0">Choose Your Language</h6>
                        </div>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto scroll-sm pe-2">
                        {languages.map((lang) => (
                          <div key={lang.id} className="form-check style-check flex items-center justify-between mb-4">
                            <label 
                              className="form-check-label leading-none font-medium text-secondary-light cursor-pointer"
                              onClick={() => handleLanguageSelect(lang.id)}
                            >
                              <span className="text-black hover:bg-transparent hover:text-primary flex items-center gap-3">
                                <img 
                                  src={lang.flag} 
                                  alt={lang.name} 
                                  className="w-9 h-9 bg-green-100 text-green-600 rounded-full shrink-0" 
                                />
                                <span className="text-md font-semibold mb-0">{lang.name}</span>
                              </span>
                            </label>
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="language" 
                              checked={selectedLanguage === lang.id}
                              onChange={() => handleLanguageSelect(lang.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages Dropdown */}
                <div className="relative dropdown">
                  <button 
                    className={`has-indicator w-[40px] h-[40px] bg-neutral-200 rounded-full flex justify-center items-center ${isMessageOpen ? 'show' : ''}`}
                    type="button" 
                    onClick={handleMessageToggle}
                  >
                    <iconify-icon icon="mage:email" className="text-primary-light text-xl"></iconify-icon>
                  </button>
                  
                  {isMessageOpen && (
                    <div className="dropdown-menu to-top dropdown-menu-lg p-0 absolute z-50 right-0">
                      <div className="m-[16px] py-[12px] px-[16px] rounded-lg bg-primary-50 mb-[16px] flex items-center justify-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light font-semibold mb-0">Message</h6>
                        </div>
                        <span className="text-primary-600 font-semibold text-lg w-[40px] h-[40px] rounded-full bg-base flex justify-center items-center">05</span>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto scroll-sm pe-[16px]">
                        <a href="javascript:void(0)" className="px-[24px] py-[12px] flex items-start gap-3 mb-2 justify-between">
                          <div className="text-black hover:bg-transparent hover:text-primary flex items-center gap-3">
                            <span className="w-[40px] h-[40px] rounded-full flex-shrink-0 relative">
                              <img src="https://laravel.wowdash.wowtheme7.com/assets/images/notification/profile-3.png" alt="" />
                              <span className="w-[8px] h-[8px] bg-success-main rounded-full absolute right-0 bottom-0"></span>
                            </span>
                            <div>
                              <h6 className="text-md font-semibold mb-[4px]">Kathryn Murphy</h6>
                              <p className="mb-0 text-sm text-secondary-light w-[100px]">hey! there i'm...</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">12:30 PM</span>
                            <span className="mt-[4px] text-xs text-base w-[16px] h-[16px] flex justify-center items-center bg-warning-main rounded-full">8</span>
                          </div>
                        </a>
                      </div>

                      <div className="text-center py-[12px] px-[16px]">
                        <a href="javascript:void(0)" className="text-primary-600 font-semibold text-md">See All Message</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Dropdown */}
                <div className="relative dropdown">
                  <button 
                    className={`has-indicator w-[40px] h-[40px] bg-neutral-200 rounded-full flex justify-center items-center ${isNotificationOpen ? 'show' : ''}`}
                    type="button" 
                    onClick={handleNotificationToggle}
                  >
                    <iconify-icon icon="iconoir:bell" className="text-primary-light text-xl"></iconify-icon>
                  </button>
                  
                  {isNotificationOpen && (
                    <div className="dropdown-menu to-top dropdown-menu-lg p-0 absolute right-0 z-50">
                      <div className="m-[16px] py-[12px] px-[16px] radius-8 bg-primary-50 mb-[16px] flex items-center justify-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light font-semibold mb-0">Notifications</h6>
                        </div>
                        <span className="text-primary-600 font-semibold text-lg w-[40px] h-[40px] rounded-full bg-base flex justify-center items-center">05</span>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto scroll-sm pe-4">
                        <a href="javascript:void(0)" className="px-[24px] py-[12px] flex items-start gap-3 mb-2 justify-between">
                          <div className="text-black hover:bg-transparent hover:text-primary flex items-center gap-3">
                            <span className="w-[44px] h-[44px] bg-success-subtle text-success-main rounded-full flex justify-center items-center flex-shrink-0">
                              <iconify-icon icon="bitcoin-icons:verify-outline" className="icon text-xxl"></iconify-icon>
                            </span>
                            <div>
                              <h6 className="text-md font-semibold mb-4">Congratulations</h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">Your profile has been Verified.</p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">23 Mins ago</span>
                        </a>
                      </div>

                      <div className="text-center py-[12px] px-[16px]">
                        <a href="javascript:void(0)" className="text-primary-600 font-semibold text-md">See All Notification</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative dropdown">
                  <button 
                    className="flex justify-center items-center rounded-full" 
                    type="button" 
                    onClick={handleProfileToggle}
                  >
                    <img 
                      src="https://laravel.wowdash.wowtheme7.com/assets/images/user.png" 
                      alt="profile" 
                      className="w-[40px] h-[40px] object-cover rounded-full" 
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="dropdown-menu to-top dropdown-menu-sm absolute right-0 z-50 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="py-3 px-4 bg-primary-50 mb-4 flex items-center justify-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light font-semibold mb-1">Shaidul Islam</h6>
                          <span className="text-sm text-secondary-light font-medium">Admin</span>
                        </div>
                        <button type="button" className="hover:text-danger" onClick={() => setIsProfileOpen(false)}>
                          <iconify-icon icon="radix-icons:cross-1" className="text-xl"></iconify-icon>
                        </button>
                      </div>

                      <ul>
                        <li>
                          <a className="block text-black px-4 py-2 hover:bg-transparent hover:text-primary flex items-center gap-3" href="#profile">
                            <iconify-icon icon="solar:user-linear" className="text-xl"></iconify-icon> My Profile
                          </a>
                        </li>
                        <li>
                          <a className="block text-black px-4 py-2 hover:bg-transparent hover:text-primary flex items-center gap-3" href="#inbox">
                            <iconify-icon icon="tabler:message-check" className="text-xl"></iconify-icon> Inbox
                          </a>
                        </li>
                        <li>
                          <a className="block text-black px-4 py-2 hover:bg-transparent hover:text-primary flex items-center gap-3" href="#settings">
                            <iconify-icon icon="icon-park-outline:setting-two" className="text-xl"></iconify-icon> Setting
                          </a>
                        </li>
                        <li>
                          <a className="block text-black px-4 py-2 hover:bg-transparent hover:text-danger flex items-center gap-3" href="javascript:void(0)">
                            <iconify-icon icon="lucide:power" className="text-xl"></iconify-icon> Log Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area">
        <Routes>
          <Route index element={<Navigate to="/college/dashboard" replace />} />
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
          <Route path="*" element={<Navigate to="/college/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default College;