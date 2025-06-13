import React, { useState, useEffect } from 'react';
import './Transport.css';

const Transport = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Route 1',
      route: 'Downtown - Airport',
      startTime: '07:15',
      endTime: '07:45',
      capacity: 20,
      busNumber: 'TRN-001',
      driver: 'John Smith',
      driverContact: '+91-9876543210',
      attendant: 'Mary Johnson',
      attendantContact: '+91-9876543211',
      status: 'active'
    },
    {
      id: 2,
      name: 'Route 2',
      route: 'City Center - Mall',
      startTime: '07:30',
      endTime: '08:30',
      capacity: 30,
      busNumber: 'TRN-002',
      driver: 'David Wilson',
      driverContact: '+91-9876543212',
      attendant: 'Sarah Davis',
      attendantContact: '+91-9876543213',
      status: 'active'
    },
    {
      id: 3,
      name: 'Route 3',
      route: 'School District',
      startTime: '16:00',
      endTime: '17:00',
      capacity: 20,
      busNumber: 'TRN-003',
      driver: 'Mike Brown',
      driverContact: '+91-9876543214',
      attendant: 'Lisa Anderson',
      attendantContact: '+91-9876543215',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Field Trip',
      route: 'School - Museum',
      startTime: '07:00',
      endTime: '18:00',
      capacity: 30,
      busNumber: 'TRN-004',
      driver: 'Robert Taylor',
      driverContact: '+91-9876543216',
      attendant: 'Emma Wilson',
      attendantContact: '+91-9876543217',
      status: 'completed'
    },
    {
      id: 5,
      name: 'Route 4',
      route: 'Suburbs - Downtown',
      startTime: '08:00',
      endTime: '09:00',
      capacity: 30,
      busNumber: 'TRN-005',
      driver: 'James Garcia',
      driverContact: '+91-9876543218',
      attendant: 'Anna Martinez',
      attendantContact: '+91-9876543219',
      status: 'active'
    },
    {
      id: 6,
      name: 'Field Trip 2',
      route: 'School - Zoo',
      startTime: '09:00',
      endTime: '13:00',
      capacity: 30,
      busNumber: 'TRN-006',
      driver: 'Christopher Lee',
      driverContact: '+91-9876543220',
      attendant: 'Jessica Thompson',
      attendantContact: '+91-9876543221',
      status: 'pending'
    },
    {
      id: 7,
      name: 'Route 11',
      route: 'Hospital Route',
      startTime: '10:00',
      endTime: '17:00',
      capacity: 20,
      busNumber: 'TRN-007',
      driver: 'Daniel White',
      driverContact: '+91-9876543222',
      attendant: 'Michelle Harris',
      attendantContact: '+91-9876543223',
      status: 'active'
    },
    {
      id: 8,
      name: 'Route 12 Pick up',
      route: 'University Campus',
      startTime: '11:00',
      endTime: '22:00',
      capacity: 30,
      busNumber: 'TRN-008',
      driver: 'Matthew Clark',
      driverContact: '+91-9876543224',
      attendant: 'Amanda Lewis',
      attendantContact: '+91-9876543225',
      status: 'active'
    },
    {
      id: 9,
      name: 'Route 12 Drop',
      route: 'University Campus',
      startTime: '16:00',
      endTime: '17:00',
      capacity: 30,
      busNumber: 'TRN-009',
      driver: 'Andrew Walker',
      driverContact: '+91-9876543226',
      attendant: 'Stephanie Hall',
      attendantContact: '+91-9876543227',
      status: 'pending'
    }
  ]);

  const [filteredTrips, setFilteredTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deletingTripId, setDeletingTripId] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    route: '',
    startTime: '',
    endTime: '',
    capacity: '',
    busNumber: '',
    driver: '',
    driverContact: '',
    attendant: '',
    attendantContact: ''
  });

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, trips]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSearch = () => {
    const filtered = trips.filter(trip =>
      trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.attendant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrips(filtered);
    setCurrentPage(1);
  };

  const handleRunTrips = () => {
    const activeTrips = trips.filter(trip => trip.status === 'active');
    setFilteredTrips(activeTrips);
    setCurrentPage(1);
    showNotification('Running trips view activated!', 'info');
  };

  const handleManageTrips = () => {
    setFilteredTrips(trips);
    setCurrentPage(1);
    showNotification('Manage trips mode activated!', 'info');
  };

  const openModal = (trip = null) => {
    setEditingTrip(trip);
    if (trip) {
      setFormData({
        name: trip.name,
        route: trip.route,
        startTime: trip.startTime,
        endTime: trip.endTime,
        capacity: trip.capacity,
        busNumber: trip.busNumber || '',
        driver: trip.driver,
        driverContact: trip.driverContact,
        attendant: trip.attendant || '',
        attendantContact: trip.attendantContact || ''
      });
    } else {
      setFormData({
        name: '',
        route: '',
        startTime: '',
        endTime: '',
        capacity: '',
        busNumber: '',
        driver: '',
        driverContact: '',
        attendant: '',
        attendantContact: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTrip(null);
  };

  const handleFormSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.route || !formData.startTime || !formData.endTime || 
        !formData.capacity || !formData.driver || !formData.driverContact) {
      showNotification('Please fill in all required fields!', 'error');
      return;
    }
    
    const tripData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      status: 'pending'
    };

    if (editingTrip) {
      const updatedTrips = trips.map(trip =>
        trip.id === editingTrip.id ? { ...trip, ...tripData } : trip
      );
      setTrips(updatedTrips);
      showNotification('Trip updated successfully!', 'success');
    } else {
      const newTrip = {
        id: Date.now(),
        ...tripData
      };
      setTrips([...trips, newTrip]);
      showNotification('Trip added successfully!', 'success');
    }

    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const editTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      openModal(trip);
    }
  };

  const deleteTrip = (tripId) => {
    setDeletingTripId(tripId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedTrips = trips.filter(trip => trip.id !== deletingTripId);
    setTrips(updatedTrips);
    setShowDeleteModal(false);
    setDeletingTripId(null);
    showNotification('Trip deleted successfully!', 'success');
  };

  const getStats = () => {
    const totalTrips = trips.length;
    const totalBuses = new Set(trips.map(trip => trip.busNumber)).size;
    const totalMembers = trips.reduce((sum, trip) => sum + trip.capacity, 0);
    const totalStaff = trips.filter(trip => trip.driver && trip.attendant).length * 2;

    return { totalTrips, totalBuses, totalMembers, totalStaff };
  };

  const getPaginatedTrips = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredTrips.slice(startIndex, endIndex);
  };

  const getTotalPages = () => Math.ceil(filteredTrips.length / recordsPerPage);

  const stats = getStats();
  const paginatedTrips = getPaginatedTrips();
  const totalPages = getTotalPages();

  return (
    <div className="transport-dashboard">
      {/* Notification */}
      {notification && (
        <div className={`transport-notification transport-notification-${notification.type}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="transport-header">
        <h1 className="transport-title">Trip Dashboard</h1>
      </header>

      {/* Stats Cards */}
      <div className="transport-stats">
        <div className="transport-stat-card">
          <div className="transport-stat-icon">
            <i className="fas fa-route"></i>
          </div>
          <div className="transport-stat-info">
            <span className="transport-stat-label">Total Trip</span>
            <span className="transport-stat-value">{stats.totalTrips}</span>
          </div>
        </div>
        <div className="transport-stat-card">
          <div className="transport-stat-icon">
            <i className="fas fa-bus"></i>
          </div>
          <div className="transport-stat-info">
            <span className="transport-stat-label">Total Bus</span>
            <span className="transport-stat-value">{stats.totalBuses}</span>
          </div>
        </div>
        <div className="transport-stat-card">
          <div className="transport-stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="transport-stat-info">
            <span className="transport-stat-label">Trip Members</span>
            <span className="transport-stat-value">{stats.totalMembers}</span>
          </div>
        </div>
        <div className="transport-stat-card">
          <div className="transport-stat-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="transport-stat-info">
            <span className="transport-stat-label">Driver Attendant</span>
            <span className="transport-stat-value">{stats.totalStaff}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="transport-actions">
        <button className="transport-btn transport-btn-primary" onClick={handleRunTrips}>
          <i className="fas fa-play"></i> Running Trips
        </button>
        <button className="transport-btn transport-btn-secondary" onClick={handleManageTrips}>
          <i className="fas fa-cog"></i> Manage Trips
        </button>
        <button className="transport-btn transport-btn-success" onClick={() => openModal()}>
          <i className="fas fa-plus"></i> Add Trip
        </button>
      </div>

      {/* Search and Filter */}
      <div className="transport-controls">
        <div className="transport-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search trips, routes, drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="transport-select"
        >
          <option value="10">10 records per page</option>
          <option value="25">25 records per page</option>
          <option value="50">50 records per page</option>
        </select>
      </div>

      {/* Trip Table */}
      <div className="transport-table-container">
        <table className="transport-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Trip Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Capacity</th>
              <th>Driver</th>
              <th>Attendant</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrips.map((trip, index) => (
              <tr key={trip.id}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>
                  <strong>{trip.name}</strong>
                  <br />
                  <small>{trip.route}</small>
                </td>
                <td>{trip.startTime}</td>
                <td>{trip.endTime}</td>
                <td>{trip.capacity}</td>
                <td>
                  <strong>{trip.driver}</strong>
                  <br />
                  <small>{trip.driverContact}</small>
                </td>
                <td>
                  {trip.attendant ? (
                    <>
                      <strong>{trip.attendant}</strong>
                      <br />
                      <small>{trip.attendantContact}</small>
                    </>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <span className={`transport-status ${trip.status}`}>
                    {trip.status}
                  </span>
                </td>
                <td>
                  <div className="transport-action-btns">
                    <button
                      className="transport-action-btn edit"
                      onClick={() => editTrip(trip.id)}
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="transport-action-btn delete"
                      onClick={() => deleteTrip(trip.id)}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="transport-pagination">
        <span className="transport-pagination-info">
          Showing {(currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, filteredTrips.length)} of {filteredTrips.length} entries
        </span>
        <div className="transport-pagination-controls">
          <button
            className="transport-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="transport-pagination-current">{currentPage}</span>
          <button
            className="transport-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Trip Modal */}
      {showModal && (
        <div className="transport-modal active" onClick={(e) => e.target.classList.contains('transport-modal') && closeModal()}>
          <div className="transport-modal-content">
            <div className="transport-modal-header">
              <h2>{editingTrip ? 'Edit Trip' : 'Add New Trip'}</h2>
              <button className="transport-modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="transport-form">
              <div className="transport-form-grid">
                <div className="transport-form-group">
                  <label htmlFor="name">Trip Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="route">Route *</label>
                  <input
                    type="text"
                    name="route"
                    value={formData.route}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="startTime">Start Time *</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="endTime">End Time *</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="capacity">Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="busNumber">Bus Number</label>
                  <input
                    type="text"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="driver">Driver Name *</label>
                  <input
                    type="text"
                    name="driver"
                    value={formData.driver}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="driverContact">Driver Contact *</label>
                  <input
                    type="tel"
                    name="driverContact"
                    value={formData.driverContact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="attendant">Attendant Name</label>
                  <input
                    type="text"
                    name="attendant"
                    value={formData.attendant}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="transport-form-group">
                  <label htmlFor="attendantContact">Attendant Contact</label>
                  <input
                    type="tel"
                    name="attendantContact"
                    value={formData.attendantContact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="transport-form-actions">
                <button type="button" className="transport-btn transport-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="transport-btn transport-btn-primary" onClick={handleFormSubmit}>
                  Save Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="transport-modal active" onClick={(e) => e.target.classList.contains('transport-modal') && setShowDeleteModal(false)}>
          <div className="transport-modal-content transport-modal-small">
            <div className="transport-modal-header">
              <h2>Confirm Delete</h2>
            </div>
            <div className="transport-modal-body">
              <p>Are you sure you want to delete this trip? This action cannot be undone.</p>
            </div>
            <div className="transport-form-actions">
              <button
                type="button"
                className="transport-btn transport-btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="transport-btn transport-btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transport;