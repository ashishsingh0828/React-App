import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, X, Calendar, MapPin, BookOpen, Users } from 'lucide-react';
import './AdmissionManagement.css';
const AdmissionManagement = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [branchFilter, setBranchFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Dummy data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '9876543210',
      fatherName: 'Suresh Kumar',
      fatherPhone: '9876543211',
      address: 'Sector 15, Faridabad',
      purpose: 'New Admission',
      course: 'B.Tech Computer Science',
      branch: 'Main Campus',
      reference: 'friend',
      other: '',
      type: 'online',
      date: '2024-06-20',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '9876543212',
      fatherName: 'Amit Sharma',
      fatherPhone: '9876543213',
      address: 'NIT Faridabad',
      purpose: 'Course Information',
      course: 'MBA Finance',
      branch: 'Extension Campus',
      reference: 'relative',
      other: '',
      type: 'offline',
      date: '2024-06-21',
      status: 'contacted'
    },
    {
      id: 3,
      name: 'Vikash Singh',
      phone: '9876543214',
      fatherName: 'Ram Singh',
      fatherPhone: '9876543215',
      address: 'Old Faridabad',
      purpose: 'Fee Details',
      course: 'BCA',
      branch: 'Main Campus',
      reference: 'school',
      other: '',
      type: 'online',
      date: '2024-06-22',
      status: 'enrolled'
    },
    {
      id: 4,
      name: 'Anjali Gupta',
      phone: '9876543216',
      fatherName: 'Mohit Gupta',
      fatherPhone: '9876543217',
      address: 'Ballabhgarh',
      purpose: 'Hostel Information',
      course: 'B.Com',
      branch: 'Extension Campus',
      reference: 'other',
      other: 'Social Media',
      type: 'offline',
      date: '2024-06-23',
      status: 'pending'
    },
    {
      id: 5,
      name: 'Rohit Verma',
      phone: '9876543218',
      fatherName: 'Dinesh Verma',
      fatherPhone: '9876543219',
      address: 'Palwal Road',
      purpose: 'Scholarship Details',
      course: 'M.Tech Data Science',
      branch: 'Main Campus',
      reference: 'friend',
      other: '',
      type: 'online',
      date: '2024-06-24',
      status: 'contacted'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fatherName: '',
    fatherPhone: '',
    address: '',
    purpose: '',
    course: '',
    branch: '',
    reference: 'friend',
    other: '',
    type: 'online'
  });

  const courses = ['B.Tech Computer Science', 'MBA Finance', 'BCA', 'B.Com', 'M.Tech Data Science', 'MCA', 'B.Tech Mechanical'];
  const branches = ['Main Campus', 'Extension Campus'];
  const purposes = ['New Admission', 'Course Information', 'Fee Details', 'Hostel Information', 'Scholarship Details'];

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      fatherName: '',
      fatherPhone: '',
      address: '',
      purpose: '',
      course: '',
      branch: '',
      reference: 'friend',
      other: '',
      type: activeTab
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...formData, id: editingStudent.id, date: editingStudent.date, status: editingStudent.status }
          : student
      ));
    } else {
      const newStudent = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
    setEditingStudent(null);
    resetForm();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesTab = student.type === activeTab;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateFrom = !dateFilter.from || student.date >= dateFilter.from;
    const matchesDateTo = !dateFilter.to || student.date <= dateFilter.to;
    const matchesBranch = !branchFilter || student.branch === branchFilter;
    const matchesCourse = !courseFilter || student.course === courseFilter;

    return matchesTab && matchesSearch && matchesDateFrom && matchesDateTo && matchesBranch && matchesCourse;
  });

  const clearFilters = () => {
    setDateFilter({ from: '', to: '' });
    setBranchFilter('');
    setCourseFilter('');
    setSearchTerm('');
  };

  return (
    <div className="admission-management">
      <div className="admission-management__header">
        <h1 className="admission-management__title">
          <Users className="admission-management__title-icon" />
          Admission Management System
        </h1>
        <button 
          className="admission-management__add-btn"
          onClick={() => {
            resetForm();
            setFormData({...formData, type: activeTab});
            setShowModal(true);
          }}
        >
          <Plus size={20} />
          Add New Enquiry
        </button>
      </div>

      {/* Tabs */}
      <div className="admission-management__tabs">
        <button 
          className={`admission-management__tab ${activeTab === 'online' ? 'admission-management__tab--active' : ''}`}
          onClick={() => setActiveTab('online')}
        >
          Online Enquiries
        </button>
        <button 
          className={`admission-management__tab ${activeTab === 'offline' ? 'admission-management__tab--active' : ''}`}
          onClick={() => setActiveTab('offline')}
        >
          Offline Enquiries
        </button>
      </div>

      {/* Search and Filters */}
      <div className="admission-management__controls">
        <div className="admission-management__search">
          <Search className="admission-management__search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by name, phone, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admission-management__search-input"
          />
        </div>
        <button 
          className="admission-management__filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="admission-management__filters">
          <div className="admission-management__filter-group">
            <label className="admission-management__filter-label">
              <Calendar size={16} />
              From Date
            </label>
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) => setDateFilter({...dateFilter, from: e.target.value})}
              className="admission-management__filter-input"
            />
          </div>
          <div className="admission-management__filter-group">
            <label className="admission-management__filter-label">
              <Calendar size={16} />
              To Date
            </label>
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) => setDateFilter({...dateFilter, to: e.target.value})}
              className="admission-management__filter-input"
            />
          </div>
          <div className="admission-management__filter-group">
            <label className="admission-management__filter-label">
              <MapPin size={16} />
              Branch
            </label>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="admission-management__filter-select"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          <div className="admission-management__filter-group">
            <label className="admission-management__filter-label">
              <BookOpen size={16} />
              Course
            </label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="admission-management__filter-select"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <button 
            className="admission-management__clear-btn"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Students Table */}
      <div className="admission-management__table-container">
        {filteredStudents.length === 0 ? (
          <div className="admission-management__empty">
            <Users size={48} />
            <h3>No enquiries found</h3>
            <p>No {activeTab} enquiries match your search criteria</p>
          </div>
        ) : (
          <table className="admission-management__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Father's Name</th>
                <th>Course</th>
                <th>Branch</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.phone}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.course}</td>
                  <td>{student.branch}</td>
                  <td>{student.purpose}</td>
                  <td>{student.date}</td>
                  <td>
                    <span className={`admission-management__status admission-management__status--${student.status}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="admission-management__table-actions">
                      <button 
                        className="admission-management__action-btn admission-management__action-btn--edit"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="admission-management__action-btn admission-management__action-btn--delete"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admission-management__modal-overlay">
          <div className="admission-management__modal">
            <div className="admission-management__modal-header">
              <h2>{editingStudent ? 'Edit Enquiry' : 'Add New Enquiry'}</h2>
              <button 
                className="admission-management__modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingStudent(null);
                  resetForm();
                }}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admission-management__form">
              <div className="admission-management__form-grid">
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="admission-management__form-input"
                  />
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="admission-management__form-input"
                  />
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Father's Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                    className="admission-management__form-input"
                  />
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Father's Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.fatherPhone}
                    onChange={(e) => setFormData({...formData, fatherPhone: e.target.value})}
                    className="admission-management__form-input"
                  />
                </div>
                <div className="admission-management__form-group admission-management__form-group--full">
                  <label className="admission-management__form-label">Address *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="admission-management__form-textarea"
                    rows="3"
                  />
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Purpose *</label>
                  <select
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    className="admission-management__form-select"
                  >
                    <option value="">Select Purpose</option>
                    {purposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Course *</label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="admission-management__form-select"
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="admission-management__form-group">
                  <label className="admission-management__form-label">Branch *</label>
                  <select
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    className="admission-management__form-select"
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                <div className="admission-management__form-group admission-management__form-group--full">
                  <label className="admission-management__form-label">Reference *</label>
                  <div className="admission-management__radio-group">
                    {['friend', 'relative', 'school', 'other'].map(ref => (
                      <label key={ref} className="admission-management__radio-label">
                        <input
                          type="radio"
                          name="reference"
                          value={ref}
                          checked={formData.reference === ref}
                          onChange={(e) => setFormData({...formData, reference: e.target.value})}
                          className="admission-management__radio-input"
                        />
                        <span className="admission-management__radio-text">
                          {ref.charAt(0).toUpperCase() + ref.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.reference === 'other' && (
                  <div className="admission-management__form-group admission-management__form-group--full">
                    <label className="admission-management__form-label">Other Reference</label>
                    <input
                      type="text"
                      value={formData.other}
                      onChange={(e) => setFormData({...formData, other: e.target.value})}
                      className="admission-management__form-input"
                      placeholder="Please specify..."
                    />
                  </div>
                )}
                <div className="admission-management__form-group admission-management__form-group--full">
                  <label className="admission-management__form-label">Enquiry Type *</label>
                  <div className="admission-management__radio-group">
                    {['online', 'offline'].map(type => (
                      <label key={type} className="admission-management__radio-label">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={formData.type === type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="admission-management__radio-input"
                        />
                        <span className="admission-management__radio-text">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admission-management__form-actions">
                <button 
                  type="button" 
                  className="admission-management__btn admission-management__btn--secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStudent(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admission-management__btn admission-management__btn--primary"
                >
                  {editingStudent ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default AdmissionManagement;