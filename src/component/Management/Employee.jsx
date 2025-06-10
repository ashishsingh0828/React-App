import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Bell, 
  Search, 
  Download, 
  Eye, 
  Check, 
  X, 
  Edit,
  Filter,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './management.css'
const EmployeeManagement = () => {
  const [staffData, setStaffData] = useState({
    totalStaff: 156,
    teachingStaff: 89,
    nonTeachingStaff: 67,
    onLeave: 8
  });

  const [attendanceData] = useState([
    { date: '2024-06-03', present: 145, absent: 11 },
    { date: '2024-06-04', present: 142, absent: 14 },
    { date: '2024-06-05', present: 148, absent: 8 },
    { date: '2024-06-06', present: 151, absent: 5 },
    { date: '2024-06-07', present: 149, absent: 7 },
    { date: '2024-06-08', present: 147, absent: 9 },
    { date: '2024-06-09', present: 153, absent: 3 }
  ]);

  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      type: 'Teaching',
      leaveType: 'Sick Leave',
      startDate: '2024-06-10',
      endDate: '2024-06-12',
      days: 3,
      reason: 'Medical treatment required',
      status: 'pending',
      appliedDate: '2024-06-05'
    },
    {
      id: 2,
      name: 'Michael Chen',
      type: 'Non-Teaching',
      leaveType: 'Personal Leave',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      days: 3,
      reason: 'Family emergency',
      status: 'pending',
      appliedDate: '2024-06-06'
    },
    {
      id: 3,
      name: 'Emily Davis',
      type: 'Teaching',
      leaveType: 'Vacation',
      startDate: '2024-06-20',
      endDate: '2024-06-25',
      days: 6,
      reason: 'Annual vacation',
      status: 'approved',
      appliedDate: '2024-06-04'
    }
  ]);

  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Sarah Johnson', type: 'Teaching', department: 'Mathematics', status: 'Present', lastWeekAttendance: '5/5', rating: 4.8 },
    { id: 2, name: 'Michael Chen', type: 'Non-Teaching', department: 'Administration', status: 'Present', lastWeekAttendance: '4/5', rating: 4.6 },
    { id: 3, name: 'Emily Davis', type: 'Teaching', department: 'English', status: 'On Leave', lastWeekAttendance: '3/5', rating: 4.9 },
    { id: 4, name: 'David Wilson', type: 'Teaching', department: 'Science', status: 'Present', lastWeekAttendance: '5/5', rating: 4.7 },
    { id: 5, name: 'Lisa Anderson', type: 'Non-Teaching', department: 'Library', status: 'Absent', lastWeekAttendance: '4/5', rating: 4.5 },
    { id: 6, name: 'Robert Taylor', type: 'Teaching', department: 'History', status: 'Present', lastWeekAttendance: '5/5', rating: 4.8 },
    { id: 7, name: 'Jennifer Brown', type: 'Non-Teaching', department: 'Accounts', status: 'Present', lastWeekAttendance: '5/5', rating: 4.9 },
    { id: 8, name: 'James Miller', type: 'Teaching', department: 'Physics', status: 'Present', lastWeekAttendance: '4/5', rating: 4.4 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Filter staff based on search and type
  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || staff.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleLeaveAction = (leaveId, action) => {
    setLeaveApplications(prev => 
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: action } 
          : leave
      )
    );
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const openLeaveModal = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const downloadReport = (type) => {
    // Simulate download
    alert(`Downloading ${type} report...`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'emp-status-present';
      case 'Absent': return 'emp-status-absent';
      case 'On Leave': return 'emp-status-leave';
      default: return 'emp-status-default';
    }
  };

  return (
    <div className="emp-management-container">
      <div className="emp-management-wrapper">
        
        {/* Header */}
        <div className="emp-header">
          <div className="emp-header-content">
            <div className="emp-header-text">
              <h1 className="emp-title">Employee Management System</h1>
              <p className="emp-subtitle">Comprehensive staff management with real-time analytics</p>
            </div>
            <div className="emp-header-actions">
              <div className="emp-notification-badge">
                <Bell className="emp-bell-icon" />
                {notifications > 0 && <span className="emp-notification-count">{notifications}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="emp-stats-grid">
          <div className="emp-stat-card emp-stat-total">
            <div className="emp-stat-content">
              <div className="emp-stat-info">
                <p className="emp-stat-label">Total Staff</p>
                <p className="emp-stat-value">{staffData.totalStaff}</p>
                <div className="emp-stat-trend">
                  <TrendingUp className="emp-trend-icon" />
                  <span>+5% this month</span>
                </div>
              </div>
              <div className="emp-stat-icon emp-icon-total">
                <Users className="emp-icon" />
              </div>
            </div>
          </div>

          <div className="emp-stat-card emp-stat-teaching">
            <div className="emp-stat-content">
              <div className="emp-stat-info">
                <p className="emp-stat-label">Teaching Staff</p>
                <p className="emp-stat-value emp-value-teaching">{staffData.teachingStaff}</p>
                <div className="emp-stat-trend">
                  <Award className="emp-trend-icon" />
                  <span>Avg: 4.7★</span>
                </div>
              </div>
              <div className="emp-stat-icon emp-icon-teaching">
                <GraduationCap className="emp-icon" />
              </div>
            </div>
          </div>

          <div className="emp-stat-card emp-stat-nonteaching">
            <div className="emp-stat-content">
              <div className="emp-stat-info">
                <p className="emp-stat-label">Non-Teaching Staff</p>
                <p className="emp-stat-value emp-value-nonteaching">{staffData.nonTeachingStaff}</p>
                <div className="emp-stat-trend">
                  <TrendingUp className="emp-trend-icon" />
                  <span>+2% this month</span>
                </div>
              </div>
              <div className="emp-stat-icon emp-icon-nonteaching">
                <Briefcase className="emp-icon" />
              </div>
            </div>
          </div>

          <div className="emp-stat-card emp-stat-leave">
            <div className="emp-stat-content">
              <div className="emp-stat-info">
                <p className="emp-stat-label">On Leave</p>
                <p className="emp-stat-value emp-value-leave">{staffData.onLeave}</p>
                <div className="emp-stat-trend">
                  <Clock className="emp-trend-icon" />
                  <span>Normal range</span>
                </div>
              </div>
              <div className="emp-stat-icon emp-icon-leave">
                <Calendar className="emp-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Notifications */}
        <div className="emp-charts-section">
          
          {/* Attendance Chart */}
          <div className="emp-chart-container">
            <div className="emp-chart-header">
              <h2 className="emp-chart-title">Weekly Attendance Analytics</h2>
              <div className="emp-chart-legend">
                <div className="emp-legend-item emp-legend-present">
                  <div className="emp-legend-dot"></div>
                  <span>Present</span>
                </div>
                <div className="emp-legend-item emp-legend-absent">
                  <div className="emp-legend-dot"></div>
                  <span>Absent</span>
                </div>
              </div>
            </div>
            <div className="emp-chart-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="present" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    name="Present"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="absent" 
                    stroke="#ef4444" 
                    strokeWidth={4}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    name="Absent"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leave Applications */}
          <div className="emp-leave-container">
            <div className="emp-leave-header">
              <h2 className="emp-leave-title">Pending Leave Applications</h2>
              <div className="emp-leave-count">{leaveApplications.filter(leave => leave.status === 'pending').length}</div>
            </div>
            <div className="emp-leave-list">
              {leaveApplications.filter(leave => leave.status === 'pending').map((leave) => (
                <div key={leave.id} className="emp-leave-item">
                  <div className="emp-leave-content">
                    <div className="emp-leave-info">
                      <h3 className="emp-leave-name">{leave.name}</h3>
                      <div className="emp-leave-details">
                        <span className="emp-leave-type">{leave.leaveType}</span>
                        <span className="emp-leave-duration">{leave.days} days</span>
                      </div>
                      <p className="emp-leave-dates">{leave.startDate} to {leave.endDate}</p>
                    </div>
                    <div className="emp-leave-actions">
                      <button
                        onClick={() => openLeaveModal(leave)}
                        className="emp-action-btn emp-view-btn"
                      >
                        <Eye className="emp-action-icon" />
                      </button>
                      <button
                        onClick={() => handleLeaveAction(leave.id, 'approved')}
                        className="emp-action-btn emp-approve-btn"
                      >
                        <Check className="emp-action-icon" />
                      </button>
                      <button
                        onClick={() => handleLeaveAction(leave.id, 'rejected')}
                        className="emp-action-btn emp-reject-btn"
                      >
                        <X className="emp-action-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="emp-staff-container">
          <div className="emp-staff-header">
            <h2 className="emp-staff-title">Staff Directory</h2>
            
            <div className="emp-staff-controls">
              {/* Search Bar */}
              <div className="emp-search-container">
                <Search className="emp-search-icon" />
                <input
                  type="text"
                  placeholder="Search staff members..."
                  className="emp-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Selector */}
              <select
                className="emp-filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Staff</option>
                <option value="Teaching">Teaching Staff</option>
                <option value="Non-Teaching">Non-Teaching Staff</option>
              </select>
              
              {/* Download Buttons */}
              <div className="emp-download-group">
                <button
                  onClick={() => downloadReport('Present')}
                  className="emp-download-btn emp-download-present"
                >
                  <Download className="emp-download-icon" />
                  Present
                </button>
                <button
                  onClick={() => downloadReport('Absent')}
                  className="emp-download-btn emp-download-absent"
                >
                  <Download className="emp-download-icon" />
                  Absent
                </button>
                <button
                  onClick={() => downloadReport('Weekly')}
                  className="emp-download-btn emp-download-weekly"
                >
                  <Download className="emp-download-icon" />
                  Weekly
                </button>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="emp-table-container">
            <table className="emp-staff-table">
              <thead className="emp-table-header">
                <tr>
                  <th className="emp-table-th">Name</th>
                  <th className="emp-table-th">Type</th>
                  <th className="emp-table-th">Department</th>
                  <th className="emp-table-th">Status</th>
                  <th className="emp-table-th">Attendance</th>
                  <th className="emp-table-th">Rating</th>
                  <th className="emp-table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="emp-table-body">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="emp-table-row">
                    <td className="emp-table-td emp-staff-name">{staff.name}</td>
                    <td className="emp-table-td">
                      <span className={`emp-type-badge ${staff.type === 'Teaching' ? 'emp-type-teaching' : 'emp-type-nonteaching'}`}>
                        {staff.type}
                      </span>
                    </td>
                    <td className="emp-table-td emp-department">{staff.department}</td>
                    <td className="emp-table-td">
                      <span className={`emp-status-badge ${getStatusColor(staff.status)}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="emp-table-td emp-attendance">{staff.lastWeekAttendance}</td>
                    <td className="emp-table-td">
                      <div className="emp-rating">
                        <span className="emp-rating-value">{staff.rating}</span>
                        <span className="emp-rating-star">★</span>
                      </div>
                    </td>
                    <td className="emp-table-td">
                      <button className="emp-edit-btn">
                        <Edit className="emp-edit-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {isModalOpen && selectedLeave && (
        <div className="emp-modal-overlay">
          <div className="emp-modal-container">
            <div className="emp-modal-header">
              <h3 className="emp-modal-title">Leave Application Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="emp-modal-close"
              >
                <X className="emp-close-icon" />
              </button>
            </div>
            
            <div className="emp-modal-content">
              <div className="emp-modal-field">
                <label className="emp-modal-label">Employee Name</label>
                <p className="emp-modal-value">{selectedLeave.name}</p>
              </div>
              
              <div className="emp-modal-row">
                <div className="emp-modal-field">
                  <label className="emp-modal-label">Staff Type</label>
                  <p className="emp-modal-value">{selectedLeave.type}</p>
                </div>
                <div className="emp-modal-field">
                  <label className="emp-modal-label">Leave Type</label>
                  <p className="emp-modal-value">{selectedLeave.leaveType}</p>
                </div>
              </div>
              
              <div className="emp-modal-row">
                <div className="emp-modal-field">
                  <label className="emp-modal-label">Start Date</label>
                  <p className="emp-modal-value">{selectedLeave.startDate}</p>
                </div>
                <div className="emp-modal-field">
                  <label className="emp-modal-label">End Date</label>
                  <p className="emp-modal-value">{selectedLeave.endDate}</p>
                </div>
              </div>
              
              <div className="emp-modal-field">
                <label className="emp-modal-label">Duration</label>
                <p className="emp-modal-value">{selectedLeave.days} days</p>
              </div>
              
              <div className="emp-modal-field">
                <label className="emp-modal-label">Reason</label>
                <p className="emp-modal-value">{selectedLeave.reason}</p>
              </div>
              
              <div className="emp-modal-field">
                <label className="emp-modal-label">Applied Date</label>
                <p className="emp-modal-value">{selectedLeave.appliedDate}</p>
              </div>
            </div>
            
            {selectedLeave.status === 'pending' && (
              <div className="emp-modal-actions">
                <button
                  onClick={() => {
                    handleLeaveAction(selectedLeave.id, 'approved');
                    setIsModalOpen(false);
                  }}
                  className="emp-modal-btn emp-modal-approve"
                >
                  <Check className="emp-modal-btn-icon" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleLeaveAction(selectedLeave.id, 'rejected');
                    setIsModalOpen(false);
                  }}
                  className="emp-modal-btn emp-modal-reject"
                >
                  <X className="emp-modal-btn-icon" />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;