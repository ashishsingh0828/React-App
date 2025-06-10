import { React, useEffect } from 'react'
import {
  setupModal, initializeTabs
} from '../../assets/js/main.js';
import './management.css'
function Announcement() {
 
  useEffect(() => {
    initializeTabs();
    const modalControls = setupModal();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const handleTabClick = (element) => {
    if (window.selectTab) {
      window.selectTab(element);
    }
  }
  return (
    <div>
      <div className="main-announcement">
        <div className="main-heading flex items-center gap-4 px-4 py-2 animate-fade-in">
          <ion-icon name="megaphone-outline" class="text-yellow-600 text-3xl animate-bounce-slow"></ion-icon>
          <h1 class="heading text-xl font-semibold text-gray-800 relative">
            <span class="heading-underline">Announcement</span>
          </h1>
        </div>

        {/* Icons */}
        <div className="first-part py-16 flex flex-wrap gap-4 items-start  bg-gray-50 justify-between">
          {/* Search Container */}
          <div className="search_container">
            <input type="text" placeholder="Search..." />
            <div className="search"></div>
          </div>

          {/* Open Modal Button */}
          <button
            id="openModalBtn"
            className="btn-secondary flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Notification
          </button>

          {/* Modal Backdrop */}
          <div id="modalBackdrop" className="modal-backdrop">
            {/* Modal Box */}
            <div className="modal-box">
              {/* Close Button */}
              <button
                id="closeModalBtn"
                className="modal-close-btn"
                aria-label="Close modal"
              >
                ×
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Create New Notification
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill in the details below to create a new notification
                </p>
              </div>

              {/* Notification Form */}
              <form id="notificationForm" className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  heading: document.getElementById('heading').value,
                  date: document.getElementById('date').value,
                  name: document.getElementById('name').value,
                  category: document.getElementById('category').value,
                  description: document.getElementById('description').value,
                  file: document.getElementById('fileUpload').files[0]
                };
                console.log('Form submitted:', formData);
                document.getElementById('modalBackdrop').classList.remove('show');
              }}>
                {/* File Upload Section */}
                <div className="form-group">
                  <label className="form-label">
                    Upload Image/Document
                  </label>
                  <div
                    id="fileUploadArea"
                    className="file-upload-area"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="file-upload-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="file-upload-text">
                        Click to upload or drag & drop
                      </p>
                      <p className="file-upload-subtext">
                        SVG, PNG, JPG, or PDF
                      </p>
                    </div>
                    <input
                      id="fileUpload"
                      name="file"
                      type="file"
                      accept=".svg,.png,.jpg,.jpeg,.pdf"
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Heading */}
                <div className="form-group">
                  <label className="form-label" htmlFor="heading">
                    Heading
                  </label>
                  <input
                    id="heading"
                    name="heading"
                    type="text"
                    className="form-input"
                    placeholder="Enter notification heading"
                    required
                  />
                </div>

                {/* Date & Name Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="date">
                      Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="news">📰 News</option>
                    <option value="update">🔄 Update</option>
                    <option value="event">📅 Event</option>
                    <option value="announcement">📢 Announcement</option>
                    <option value="reminder">⏰ Reminder</option>
                  </select>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-textarea"
                    placeholder="Write a detailed description of your notification..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    id="cancelBtn"
                    className="btn-secondary"
                    onClick={() => document.getElementById('modalBackdrop').classList.remove('show')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <svg
                      className="w-4 h-4 mr-2 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Create Notification
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sample Content */}
          <div className="w-full mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 px-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">System Update</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">New Feature Released</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">Maintenance Scheduled</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="manage-notice flex  flex-wrap justify-between py-16 px-8">
          <div className="download-headings">
            <p>
              <span>
                Manage Notice
              </span>
            </p>
          </div>
          <div className="download-icons">
            <ul class="wrapper">
              <li class="icon facebook">
                <span class="tooltip">Facebook</span>
                <span><i class="fab fa-facebook-f"></i></span>
              </li>
              <li class="icon twitter">
                <span class="tooltip">Twitter</span>
                <span><i class="fab fa-twitter"></i></span>
              </li>
              <li class="icon instagram">
                <span class="tooltip">Instagram</span>
                <span><i class="fab fa-instagram"></i></span>
              </li>
              <li class="icon github">
                <span class="tooltip">Github</span>
                <span><i class="fab fa-github"></i></span>
              </li>
              <li class="icon youtube">
                <span class="tooltip">Youtube</span>
                <span><i class="fab fa-youtube"></i></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab-contents */}
        <div className="announcement-tabs">
          <nav className="nav-tabs">
            <div
              className="nav-item"
              data-color="#5b37b7"
              onClick={(e) => handleTabClick(e.currentTarget)}
            >
              <span className="icon-clipboard">
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px'>
                  <path d='M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z' />
                </svg>
              </span>
              <div className="title"> Notice</div>
            </div>

            <div
              className="nav-item"
              data-color="#c9379d"
              onClick={(e) => handleTabClick(e.currentTarget)}
            >
              <span className="icon-news">
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px'>
                  <path d='M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z' />
                </svg>
              </span>
              <div className="title">News</div>
            </div>

            <div
              className="nav-item"
              data-color="#e5a919"
              onClick={(e) => handleTabClick(e.currentTarget)}
            >
              <span className="icon-calendar">
                <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px'>
                  <path d='M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z' />
                </svg>
              </span>
              <div className="title">Holidays</div>
            </div>
          </nav>

          <div className="tab-content">
            <div className="tab-pane active" id="manage-notice">
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                       <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                        <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="news">
                <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                       <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                        <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="holidays">
                <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                       <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                        <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="blog2-single-box">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full lg:w-1/2 aos-init aos-animate" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
                        <div class="relative mr-7 image-anime">
                          <img src="../../../public/Images/blog2-image1.png" alt="JBH" />
                        </div>
                      </div>
                      <div class="w-full lg:w-1/2 aos-init aos-animate mt-8 lg:mt-0" data-aos-offset="-100" data-aos="fade-up" data-aos-duration="400" data-aos-delay="300">
                        <div class="blog2-box-content mt-6 md:mt-8">
                          <div class="author-area2 flex flex-wrap gap-4">
                            <a href="#" class="flex items-center gap-2">
                              <img src="../../../public/Images/date1.svg" alt="JBH" /> Oct 10, 2024
                            </a>
                            <a href="author.html" class="author flex items-center gap-2">
                              <img src="../../../public/Images/author2.svg" alt="JBH" /> Philips Huge
                            </a>

                            <div class="relative inline-block text-left mt-10 ml-10">
                              <button onclick="toggleMenu()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ion-icon name="ellipsis-vertical-outline" class="text-xl"></ion-icon>
                              </button>
                              <div id="miniBt" class="mini-bt absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md hidden z-10">
                                <a href="#" id='openModalBtn'  onclick="openModal()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit
                                  
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
                                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                              </div>
                            </div>
                          </div>

                          <div class="heading2 mt-16">
                            <h4 class="text-xl font-semibold leading-snug">
                              <a href="blog-single.html">
                                The Power of Data: Leveraging Analytics for Business Consult Strategic Decisions
                              </a>
                            </h4>
                            <p class="mt-16 text-gray-700">
                              In today’s fast-paced business environment, change is best inevitable, an how organizations manage that make change.
                            </p>
                            <a href="blog-single.html" class="learn inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                              Read More <span><i class="fas fa-arrow-right"></i></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcement
