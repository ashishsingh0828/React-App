import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {
  runAllCounters, initCharts, initialLeadersData,
  filterLeaders,
  saveLeader,
  deleteLeader,
  getTotalPages,
  getCurrentLeaders,
  getPaginationNumbers,
  exportToCSV,
  createNotificationSystem,
  handleInputChange,
  resetFormData,
  openModal,
  closeModal,
  educationOptions,
  filterOptions
} from '../../assets/js/main.js';
import './management.css'
import '../../assets/css/animation.css'

function Dashboard() {

  const [leaders, setLeaders] = useState(initialLeadersData);
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState(resetFormData());

  const itemsPerPage = 5;

  const showNotification = createNotificationSystem()(setNotification);

  const handleFormInputChange = handleInputChange(setFormData);
  const handleOpenModal = openModal(setEditingLeader, setFormData, setIsModalOpen);
  const handleCloseModal = closeModal(setIsModalOpen, setEditingLeader, setFormData);
  useEffect(() => {
    const filtered = filterLeaders(leaders, searchTerm, filterBy);
    setFilteredLeaders(filtered);
    setCurrentPage(1);
  }, [leaders, searchTerm, filterBy]);

  const handleSaveLeader = () => {
    const result = saveLeader(formData, leaders, editingLeader, showNotification);
    if (result.success) {
      setLeaders(result.leaders);
      handleCloseModal();
    }
  };

  const handleDeleteLeader = (leaderId) => {
    const updatedLeaders = deleteLeader(leaderId, leaders, showNotification);
    setLeaders(updatedLeaders);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredLeaders, showNotification);
  };

  const totalPages = getTotalPages(filteredLeaders, itemsPerPage);
  const currentLeaders = getCurrentLeaders(filteredLeaders, currentPage, itemsPerPage);
  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);


  const chartsRef = useRef({});
  useEffect(() => {
    runAllCounters(200);
    const timer = setTimeout(() => {
      chartsRef.current = initCharts();
    }, 50);

    return () => {
      clearTimeout(timer);

      if (chartsRef.current.feeChart) {
        chartsRef.current.feeChart.destroy();
      }

      if (chartsRef.current.performanceChart) {
        chartsRef.current.performanceChart.destroy();
      }
    };
    const initializeAcademicLeaders = async () => {
      if (window.AcademicLeadersManager) {
        new window.AcademicLeadersManager();
      }
    };

    initializeAcademicLeaders();
  }, []);


  return (
    <div className="dashboard fadeInUp">
      {/* Cards */}
      <div className="cardBox fadeInUp">
        <div className="card fade-in">
          <div>
            <div class="numbers" data-target="1504">0</div>
            <div className="cardName">Students</div>
          </div>
          <div className="iconBx">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
        <div className="card fade-in">
          <div>
            <div class="numbers" data-target="40">0</div>
            <div className="cardName">Teachers</div>
          </div>
          <div className="iconBx">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
        </div>
        <div className="card fade-in">
          <div>
            <div class="numbers" data-target="70">0</div>
            <div className="cardName">Employees</div>
          </div>
          <div className="iconBx">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <div className="card fade-in">
          <div>
            <div class="numbers" data-target="70">0</div>
            <div className="cardName">Daily View</div>
          </div>
          <div className="iconBx">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="charts">
        <div className="chart fee-chart">
          <h2>Fee Management</h2>
          <div className="canvas-container">
            <canvas id="feeChart"></canvas>
          </div>
        </div>

        <div className="chart performance-chart">
          <h2>Student Performance</h2>
          <div className="canvas-container">
            <canvas id="performanceChart"></canvas>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick  ">
        <h2>Quick Links</h2>
        <ul className="links fade-in">
          <li className='fade-in'><a className='btn_one' href="#">Add Students</a></li>
          <li className='fade-in'><a href="#">Add Teachers</a></li>
          <li className='fade-in'><a href="#">Add Employees</a></li>
          <li className='fade-in'><a href="#">View Reports</a></li>
        </ul>
      </div>

      {/* Academic Leaders */}
      <div className="academic-leaders-container">
        {notification && (
          <div className={`notification notification-${notification.type}`}>
            <div className="notification-content">
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="notification-close"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="main-container">
          {/* Header */}
          <div className="header-section">
            <h1 className="main-title">
              Academic Leaders Management
            </h1>
            <p className="subtitle">
              Manage your academic leadership team efficiently
            </p>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            <div className="controls-flex">
              {/* Search Box */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search leaders by name, ID, education, contact, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>

              {/* Filter Select */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="filter-select"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  onClick={() => handleOpenModal()}
                  className="btn btn-add"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  Add Leader
                </button>

                <button
                  onClick={handleExportCSV}
                  className="btn btn-export"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Education</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {currentLeaders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No academic leaders found
                      </td>
                    </tr>
                  ) : (
                    currentLeaders.map((leader) => (
                      <tr key={leader.id}>
                        <td className="name-cell">{leader.name}</td>
                        <td>
                          <span className="employee-id-badge">
                            {leader.employeeId}
                          </span>
                        </td>
                        <td>
                          <span className="education-badge">
                            {leader.education}
                          </span>
                        </td>
                        <td className="contact-cell">{leader.contact}</td>
                        <td className="address-cell">{leader.address}</td>
                        <td>
                          <div className="action-cell">
                            <button
                              onClick={() => handleOpenModal(leader)}
                              className="action-btn btn-edit"
                              title="Edit Leader"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteLeader(leader.id)}
                              className="action-btn btn-delete"
                              title="Delete Leader"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-flex">
                <div className="pagination-info">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredLeaders.length)} of {filteredLeaders.length} results
                </div>
                <div className="pagination-buttons">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ‹ Previous
                  </button>

                  {paginationNumbers.map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingLeader ? 'Edit' : 'Add'} Academic Leader
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="modal-close"
                >
                  ×
                </button>
              </div>

              <div className="form-container">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleFormInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Education</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleFormInputChange}
                    className="form-input"
                  >
                    {educationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleFormInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormInputChange}
                    rows="3"
                    className="form-input form-textarea"
                  />
                </div>

                <div className="form-buttons">
                  <button
                    onClick={handleCloseModal}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveLeader}
                    className="btn-save"
                  >
                    {editingLeader ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News and Activities */}
      <div className="new-activities container mx-auto px-24">
        <div class="left-content">
          <div class="activities">
            <h1>Popular Activities</h1>
            <div class="activity-container">
              <div class="image-container img-one">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/467cf682-03fb-4fae-b129-5d4f5db304dd" alt="tennis" />
                <div class="overlay">
                  <h3>Tennis</h3>
                </div>
              </div>

              <div class="image-container img-two">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/3bab6a71-c842-4a50-9fed-b4ce650cb478" alt="hiking" />
                <div class="overlay">
                  <h3>Hiking</h3>
                </div>
              </div>

              <div class="image-container img-three">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c8e88356-8df5-4ac5-9e1f-5b9e99685021" alt="running" />
                <div class="overlay">
                  <h3>Running</h3>
                </div>
              </div>

              <div class="image-container img-four">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/69437d08-f203-4905-8cf5-05411cc28c19" alt="cycling" />
                <div class="overlay">
                  <h3>Cycling</h3>
                </div>
              </div>

              <div class="image-container img-five">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e1a66078-1927-4828-b793-15c403d06411" alt="yoga" />
                <div class="overlay">
                  <h3>Yoga</h3>
                </div>
              </div>

              <div class="image-container img-six">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7568e0ff-edb5-43dd-bff5-aed405fc32d9" alt="swimming" />
                <div class="overlay">
                  <h3>Swimming</h3>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="latest-news ">
          <div class="weekly-schedule ">
            <h1>Weekly Schedule</h1>
            <div class="calendar">
              <div class="day-and-activity activity-one">
                <div class="day">
                  <h1>13</h1>
                  <p>mon</p>
                </div>
                <div class="activity">
                  <h2>Swimming</h2>
                  <div class="participants">
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e082b965-bb88-4192-bce6-0eb8b0bf8e68" alt="" />
                  </div>
                </div>
                <button class="activity-btn">View</button>
              </div>

              <div class="day-and-activity activity-two">
                <div class="day">
                  <h1>15</h1>
                  <p>wed</p>
                </div>
                <div class="activity">
                  <h2>Yoga</h2>
                  <div class="participants">
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" alt="" />
                  </div>
                </div>
                <button class="activity-btn">View</button>
              </div>

              <div class="day-and-activity activity-three">
                <div class="day">
                  <h1>17</h1>
                  <p>fri</p>
                </div>
                <div class="activity">
                  <h2>Tennis</h2>
                  <div class="participants">
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e082b965-bb88-4192-bce6-0eb8b0bf8e68" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" alt="" />
                  </div>
                </div>
                <button class="activity-btn">View</button>
              </div>

              <div class="day-and-activity activity-four">
                <div class="day">
                  <h1>18</h1>
                  <p>sat</p>
                </div>
                <div class="activity">
                  <h2>Hiking</h2>
                  <div class="participants">
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" alt="" />
                    <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/90affa88-8da0-40c8-abe7-f77ea355a9de" alt="" />
                  </div>
                </div>
                <button class="activity-btn">View</button>
              </div>
            </div>
          </div>
          <div class="personal-bests">
            <h1>Personal Bests</h1>
            <div class="personal-bests-container">
              <div class="best-item box-one">
                <p>Fastest 5K Run: 22min</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/242bbd8c-aaf8-4aee-a3e4-e0df62d1ab27" alt="" />
              </div>
              <div class="best-item box-two">
                <p>Longest Distance Cycling: 4 miles</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/a3b3cb3a-5127-498b-91cc-a1d39499164a" alt="" />
              </div>
              <div class="best-item box-three">
                <p>Longest Roller-Skating: 2 hours</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e0ee8ffb-faa8-462a-b44d-0a18c1d9604c" alt="" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
