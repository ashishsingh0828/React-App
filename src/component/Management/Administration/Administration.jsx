import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Upload, Check, X, Download, Calendar, DollarSign, User, Users, GraduationCap, FileText, Phone, Mail, MapPin, Camera } from 'lucide-react';
import './Administration.css';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('teachers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Sample data
  const [teachers, setTeachers] = useState([
    {
      id: 'TCH001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      phone: '+1-555-0123',
      subject: 'Mathematics',
      qualification: 'PhD in Mathematics',
      salary: 75000,
      status: 'active',
      joinDate: '2020-08-15',
      address: '123 Main St, City',
      profilePicture: null,
      documents: ['Resume.pdf', 'Certificates.pdf'],
      leaveRequests: [
        { id: 1, type: 'sick', startDate: '2024-06-15', endDate: '2024-06-16', status: 'pending', reason: 'Medical appointment' }
      ]
    },
    {
      id: 'TCH002',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.com',
      phone: '+1-555-0124',
      subject: 'Physics',
      qualification: 'MS in Physics',
      salary: 68000,
      status: 'active',
      joinDate: '2019-09-01',
      address: '456 Oak Ave, City',
      profilePicture: null,
      documents: ['Resume.pdf'],
      leaveRequests: []
    }
  ]);

  const [nonTeachingStaff, setNonTeachingStaff] = useState([
    {
      id: 'NTS001',
      name: 'James Wilson',
      email: 'james.wilson@school.com',
      phone: '+1-555-0125',
      position: 'Administrative Officer',
      department: 'Administration',
      salary: 45000,
      status: 'active',
      joinDate: '2021-03-10',
      address: '789 Pine St, City',
      profilePicture: null,
      documents: ['Resume.pdf'],
      leaveRequests: [
        { id: 1, type: 'vacation', startDate: '2024-07-01', endDate: '2024-07-05', status: 'approved', reason: 'Family vacation' }
      ]
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 'STU001',
      name: 'Emily Davis',
      email: 'emily.davis@student.school.com',
      phone: '+1-555-0126',
      grade: '10th Grade',
      section: 'A',
      rollNumber: '2024001',
      parentName: 'Robert Davis',
      parentPhone: '+1-555-0127',
      status: 'active',
      admissionDate: '2024-04-01',
      address: '321 Elm St, City',
      profilePicture: null,
      documents: ['Birth Certificate.pdf', 'Previous Records.pdf'],
      fees: { total: 15000, paid: 10000, pending: 5000 }
    }
  ]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
    
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setFormData({});
  };

  const generateId = (type) => {
    const prefix = type === 'teachers' ? 'TCH' : type === 'nonTeachingStaff' ? 'NTS' : 'STU';
    const currentData = type === 'teachers' ? teachers : type === 'nonTeachingStaff' ? nonTeachingStaff : students;
    const nextNumber = String(currentData.length + 1).padStart(3, '0');
    return `${prefix}${nextNumber}`;
  };

  const handleSave = () => {
    const newData = {
      ...formData,
      id: selectedItem ? selectedItem.id : generateId(activeTab)
    };

    if (activeTab === 'teachers') {
      if (selectedItem) {
        setTeachers(teachers.map(t => t.id === selectedItem.id ? newData : t));
      } else {
        setTeachers([...teachers, { ...newData, status: 'active', leaveRequests: [] }]);
      }
    } else if (activeTab === 'nonTeachingStaff') {
      if (selectedItem) {
        setNonTeachingStaff(nonTeachingStaff.map(s => s.id === selectedItem.id ? newData : s));
      } else {
        setNonTeachingStaff([...nonTeachingStaff, { ...newData, status: 'active', leaveRequests: [] }]);
      }
    } else {
      if (selectedItem) {
        setStudents(students.map(s => s.id === selectedItem.id ? newData : s));
      } else {
        setStudents([...students, { ...newData, status: 'active' }]);
      }
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      if (activeTab === 'teachers') {
        setTeachers(teachers.filter(t => t.id !== id));
      } else if (activeTab === 'nonTeachingStaff') {
        setNonTeachingStaff(nonTeachingStaff.filter(s => s.id !== id));
      } else {
        setStudents(students.filter(s => s.id !== id));
      }
    }
  };

  const getCurrentData = () => {
    let data = activeTab === 'teachers' ? teachers : 
               activeTab === 'nonTeachingStaff' ? nonTeachingStaff : students;
    
    // Apply search filter
    if (searchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== 'all') {
      data = data.filter(item => item.status === filterBy);
    }

    return data;
  };

  const approveLeave = (personId, leaveId) => {
    const updateLeaveStatus = (dataArray, setDataArray) => {
      setDataArray(dataArray.map(person => {
        if (person.id === personId) {
          return {
            ...person,
            leaveRequests: person.leaveRequests.map(leave => 
              leave.id === leaveId ? { ...leave, status: 'approved' } : leave
            )
          };
        }
        return person;
      }));
    };

    if (activeTab === 'teachers') {
      updateLeaveStatus(teachers, setTeachers);
    } else if (activeTab === 'nonTeachingStaff') {
      updateLeaveStatus(nonTeachingStaff, setNonTeachingStaff);
    }
  };

  const rejectLeave = (personId, leaveId) => {
    const updateLeaveStatus = (dataArray, setDataArray) => {
      setDataArray(dataArray.map(person => {
        if (person.id === personId) {
          return {
            ...person,
            leaveRequests: person.leaveRequests.map(leave => 
              leave.id === leaveId ? { ...leave, status: 'rejected' } : leave
            )
          };
        }
        return person;
      }));
    };

    if (activeTab === 'teachers') {
      updateLeaveStatus(teachers, setTeachers);
    } else if (activeTab === 'nonTeachingStaff') {
      updateLeaveStatus(nonTeachingStaff, setNonTeachingStaff);
    }
  };

  const renderDataTable = () => {
    const data = getCurrentData();
    
    return (
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>{activeTab === 'teachers' ? 'Subject' : activeTab === 'nonTeachingStaff' ? 'Position' : 'Grade'}</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div className="profile-pic">
                    {item.profilePicture ? (
                      <img src={item.profilePicture} alt="Profile" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {activeTab === 'teachers' ? item.subject : 
                   activeTab === 'nonTeachingStaff' ? item.position : item.grade}
                </td>
                <td>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => openModal('view', item)} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openModal('edit', item)} title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} title="Delete" className="delete-btn">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              {modalType === 'view' ? 'View Details' : 
               modalType === 'edit' ? 'Edit Profile' : 
               modalType === 'add' ? `Add New ${activeTab.slice(0, -1)}` :
               modalType === 'leave' ? 'Leave Requests' :
               modalType === 'salary' ? 'Salary Management' : ''}
            </h3>
            <button onClick={closeModal} className="close-btn">
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            {modalType === 'view' && renderViewModal()}
            {(modalType === 'edit' || modalType === 'add') && renderFormModal()}
            {modalType === 'leave' && renderLeaveModal()}
            {modalType === 'salary' && renderSalaryModal()}
          </div>
        </div>
      </div>
    );
  };

  const renderViewModal = () => (
    <div className="view-modal">
      <div className="profile-section">
        <div className="profile-pic-large">
          {selectedItem.profilePicture ? (
            <img src={selectedItem.profilePicture} alt="Profile" />
          ) : (
            <User size={80} />
          )}
        </div>
        <h4>{selectedItem.name}</h4>
        <p className="id-badge">{selectedItem.id}</p>
      </div>
      
      <div className="details-grid">
        <div className="detail-item">
          <Mail size={16} />
          <span>{selectedItem.email}</span>
        </div>
        <div className="detail-item">
          <Phone size={16} />
          <span>{selectedItem.phone}</span>
        </div>
        <div className="detail-item">
          <MapPin size={16} />
          <span>{selectedItem.address}</span>
        </div>
        {selectedItem.subject && (
          <div className="detail-item">
            <GraduationCap size={16} />
            <span>{selectedItem.subject} - {selectedItem.qualification}</span>
          </div>
        )}
        {selectedItem.position && (
          <div className="detail-item">
            <Users size={16} />
            <span>{selectedItem.position} - {selectedItem.department}</span>
          </div>
        )}
        {selectedItem.grade && (
          <div className="detail-item">
            <GraduationCap size={16} />
            <span>{selectedItem.grade} - Section {selectedItem.section}</span>
          </div>
        )}
      </div>

      {selectedItem.documents && selectedItem.documents.length > 0 && (
        <div className="documents-section">
          <h5>Documents</h5>
          <div className="documents-list">
            {selectedItem.documents.map((doc, index) => (
              <div key={index} className="document-item">
                <FileText size={16} />
                <span>{doc}</span>
                <button><Download size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="modal-actions">
        <button onClick={() => openModal('edit', selectedItem)} className="btn-primary">
          <Edit size={16} /> Edit Profile
        </button>
        {(activeTab === 'teachers' || activeTab === 'nonTeachingStaff') && (
          <>
            <button onClick={() => openModal('leave', selectedItem)} className="btn-secondary">
              <Calendar size={16} /> Leave Requests
            </button>
            <button onClick={() => openModal('salary', selectedItem)} className="btn-success">
              <DollarSign size={16} /> Salary
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderFormModal = () => (
    <div className="form-modal">
      <div className="form-grid">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={formData.address || ''}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        {activeTab === 'teachers' && (
          <>
            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                value={formData.subject || ''}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                value={formData.qualification || ''}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                value={formData.salary || ''}
                onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
              />
            </div>
          </>
        )}

        {activeTab === 'nonTeachingStaff' && (
          <>
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                value={formData.salary || ''}
                onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
              />
            </div>
          </>
        )}

        {activeTab === 'students' && (
          <>
            <div className="form-group">
              <label>Grade *</label>
              <select
                value={formData.grade || ''}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                required
              >
                <option value="">Select Grade</option>
                <option value="1st Grade">1st Grade</option>
                <option value="2nd Grade">2nd Grade</option>
                <option value="3rd Grade">3rd Grade</option>
                <option value="4th Grade">4th Grade</option>
                <option value="5th Grade">5th Grade</option>
                <option value="6th Grade">6th Grade</option>
                <option value="7th Grade">7th Grade</option>
                <option value="8th Grade">8th Grade</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
            </div>
            <div className="form-group">
              <label>Section</label>
              <select
                value={formData.section || ''}
                onChange={(e) => setFormData({...formData, section: e.target.value})}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="form-group">
              <label>Parent Name</label>
              <input
                type="text"
                value={formData.parentName || ''}
                onChange={(e) => setFormData({...formData, parentName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Parent Phone</label>
              <input
                type="tel"
                value={formData.parentPhone || ''}
                onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
              />
            </div>
          </>
        )}
      </div>

      <div className="profile-upload">
        <label>Profile Picture</label>
        <div className="upload-area">
          <Camera size={24} />
          <span>Click to upload profile picture</span>
          <input type="file" accept="image/*" />
        </div>
      </div>

      <div className="documents-upload">
        <label>Documents</label>
        <div className="upload-area">
          <Upload size={24} />
          <span>Click to upload documents</span>
          <input type="file" multiple />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={closeModal} className="btn-secondary">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="btn-primary">
          {modalType === 'edit' ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );

  const renderLeaveModal = () => (
    <div className="leave-modal">
      <h4>Leave Requests for {selectedItem.name}</h4>
      {selectedItem.leaveRequests && selectedItem.leaveRequests.length > 0 ? (
        <div className="leave-requests">
          {selectedItem.leaveRequests.map(leave => (
            <div key={leave.id} className="leave-request">
              <div className="leave-info">
                <h5>{leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave</h5>
                <p><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <span className={`leave-status ${leave.status}`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
              {leave.status === 'pending' && (
                <div className="leave-actions">
                  <button 
                    onClick={() => approveLeave(selectedItem.id, leave.id)}
                    className="btn-success"
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button 
                    onClick={() => rejectLeave(selectedItem.id, leave.id)}
                    className="btn-danger"
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No leave requests found.</p>
      )}
    </div>
  );

  const renderSalaryModal = () => (
    <div className="salary-modal">
      <h4>Salary Management for {selectedItem.name}</h4>
      <div className="salary-info">
        <div className="salary-item">
          <label>Current Salary</label>
          <div className="salary-amount">${selectedItem.salary?.toLocaleString() || 'Not set'}</div>
        </div>
        <div className="salary-actions">
          <button className="btn-primary">
            <Check size={16} /> Approve Salary
          </button>
          <button className="btn-warning">
            <Edit size={16} /> Modify Salary
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-system">
      <header className="admin-header">
        <h1>School Administration System</h1>
        <div className="header-stats">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <span className="stat-number">{teachers.length}</span>
              <span className="stat-label">Teachers</span>
            </div>
          </div>
          <div className="stat-card">
            <User size={24} />
            <div>
              <span className="stat-number">{nonTeachingStaff.length}</span>
              <span className="stat-label">Staff</span>
            </div>
          </div>
          <div className="stat-card">
            <GraduationCap size={24} />
            <div>
              <span className="stat-number">{students.length}</span>
              <span className="stat-label">Students</span>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'teachers' ? 'active' : ''}
          onClick={() => setActiveTab('teachers')}
        >
          <Users size={16} /> Teachers
        </button>
        <button 
          className={activeTab === 'nonTeachingStaff' ? 'active' : ''}
          onClick={() => setActiveTab('nonTeachingStaff')}
        >
          <User size={16} /> Non-Teaching Staff
        </button>
        <button 
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          <GraduationCap size={16} /> Students
        </button>
      </div>

      <div className="admin-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button 
            className="btn-primary"
            onClick={() => openModal('add')}
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="admin-content">
        {renderDataTable()}
      </div>

      {renderModal()}
    </div>
  );
};

export default Administration;