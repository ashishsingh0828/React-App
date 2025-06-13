import React, { useState, useEffect } from 'react';
import { Plus, Printer, Download, Edit, Trash2, X, Save, Calendar, Clock, User, BookOpen } from 'lucide-react';
import './Time.css';

const Time_Table = () => {
  const [viewMode, setViewMode] = useState('teacher');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('generate');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Modal form state
  const [modalForm, setModalForm] = useState({
    teacher: '',
    subject: '',
    class: '',
    day: '',
    timeSlot: ''
  });

  // Sample data
  const [teachers] = useState([
    'Mohit Lochab',
    'Ashish Singh',
    'Priya Sharma',
    'Rajesh Kumar',
    'Sunita Verma'
  ]);

  const [sections] = useState([
    '7th A', '7th B', '8th A', '8th B', '9th A', '9th B',
    '10th A', '10th B', '11th A', '11th B'
  ]);

  const [subjects] = useState([
    'English', 'Math', 'Science', 'Hindi', 'Computer',
    'Physics', 'Chemistry', 'Biology', 'Sports', 'Music', 'Library', 'Free Period'
  ]);

  const timeSlots = [
    '8:00-9:00',
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-1:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Enhanced timetable data structure with day-wise and time-wise mapping
  const [timetableData, setTimetableData] = useState({
    'Mohit Lochab': {
      'Monday': {
        '8:00-9:00': '10th Maths',
        '9:00-10:00': '8th Maths',
        '10:00-11:00': 'Free Period',
        '11:00-12:00': '',
        '12:00-1:00': ''
      },
      'Tuesday': {
        '8:00-9:00': '9th Science',
        '9:00-10:00': 'Free Period',
        '10:00-11:00': '7th Maths',
        '11:00-12:00': '',
        '12:00-1:00': ''
      }
    },
    'Ashish Singh': {
      'Monday': {
        '8:00-9:00': '8th Science',
        '9:00-10:00': '7th Computer',
        '10:00-11:00': '9th English',
        '11:00-12:00': '10th Science',
        '12:00-1:00': '11th Physics'
      },
      'Tuesday': {
        '8:00-9:00': 'Free Period',
        '9:00-10:00': '8th Hindi',
        '10:00-11:00': '9th Science',
        '11:00-12:00': '10th English',
        '12:00-1:00': '11th Chemistry'
      }
    }
  });

  // Generate random colors for subjects
  const getSubjectColor = (subject) => {
    const colors = {
      'English': 'bg-blue-500',
      'Math': 'bg-red-500',
      'Science': 'bg-green-500',
      'Hindi': 'bg-pink-500',
      'Computer': 'bg-purple-500',
      'Physics': 'bg-teal-500',
      'Chemistry': 'bg-yellow-500',
      'Biology': 'bg-indigo-500',
      'Sports': 'bg-orange-500',
      'Music': 'bg-cyan-500',
      'Library': 'bg-amber-500',
      'Free Period': 'bg-gray-400'
    };
    
    // Extract subject name from entries like "10th Maths" or "Free Period"
    const subjectName = subject === 'Free Period' ? 'Free Period' : subject.split(' ').pop();
    return colors[subjectName] || 'bg-gray-500';
  };

  const generateTimeTable = () => {
    setShowModal(true);
    setModalMode('generate');
    resetModalForm();
  };

  const addPeriod = () => {
    setShowModal(true);
    setModalMode('add');
    resetModalForm();
  };

  const resetModalForm = () => {
    setModalForm({
      teacher: '',
      subject: '',
      class: '',
      day: '',
      timeSlot: ''
    });
  };

  const handleModalInputChange = (field, value) => {
    setModalForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (teacher, day, timeSlot) => {
    setEditingCell({ teacher, day, timeSlot });
    const currentValue = timetableData[teacher]?.[day]?.[timeSlot] || '';
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingCell) {
      setTimetableData(prev => ({
        ...prev,
        [editingCell.teacher]: {
          ...prev[editingCell.teacher],
          [editingCell.day]: {
            ...prev[editingCell.teacher]?.[editingCell.day],
            [editingCell.timeSlot]: editValue
          }
        }
      }));
      setEditingCell(null);
      setEditValue('');
    }
  };

  const deleteCell = (teacher, day, timeSlot) => {
    setTimetableData(prev => ({
      ...prev,
      [teacher]: {
        ...prev[teacher],
        [day]: {
          ...prev[teacher]?.[day],
          [timeSlot]: ''
        }
      }
    }));
  };

  const handleModalSubmit = () => {
    if (modalForm.teacher && modalForm.day && modalForm.timeSlot) {
      const subjectText = modalForm.subject === 'Free Period' 
        ? 'Free Period' 
        : modalForm.class && modalForm.subject 
        ? `${modalForm.class} ${modalForm.subject}`
        : modalForm.subject || 'Free Period';

      setTimetableData(prev => ({
        ...prev,
        [modalForm.teacher]: {
          ...prev[modalForm.teacher],
          [modalForm.day]: {
            ...prev[modalForm.teacher]?.[modalForm.day],
            [modalForm.timeSlot]: subjectText
          }
        }
      }));
    }
    setShowModal(false);
    resetModalForm();
  };

  const printTimeTable = () => {
    window.print();
  };

  const exportTimeTable = () => {
    const dataStr = JSON.stringify(timetableData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timetable.json';
    link.click();
  };

  const resetTimeTable = () => {
    setTimetableData({});
    setSelectedTeacher('');
    setSelectedSection('');
  };

  return (
    <div className="timetable-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header-section">
          <div className="header-content">
            <h1 className="page-title">
              <Calendar className="title-icon" />
              School Timetable Management
            </h1>
            <p className="page-subtitle">Manage and organize class schedules efficiently</p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-content">
            <div className="filter-controls">
              <div className="select-group">
                <User className="select-icon" />
                <select 
                  className="custom-select"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div className="select-group">
                <BookOpen className="select-icon" />
                <select 
                  className="custom-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={generateTimeTable}
                className="generate-btn"
              >
                <Calendar size={18} />
                GENERATE TIME TABLE
              </button>
            </div>

            <div className="view-toggle">
              <span className="toggle-label">
                {viewMode === 'teacher' ? 'Teacher-wise View' : 'Class-wise View'}
              </span>
              <button
                onClick={() => setViewMode(viewMode === 'teacher' ? 'class' : 'teacher')}
                className={`toggle-switch ${viewMode === 'teacher' ? 'active' : ''}`}
              >
                <div className="toggle-slider" />
              </button>
            </div>
          </div>
        </div>

        {/* Timetable Display */}
        <div className="timetable-section">
          {viewMode === 'teacher' ? (
            /* Teacher-wise View */
            <div className="table-container">
              <div className="table-scroll">
                <table className="timetable-table">
                  <thead>
                    <tr>
                      <th className="time-header">
                        <Clock size={16} />
                        Time/Day
                      </th>
                      {days.map(day => (
                        <th key={day} className="day-header">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot} className="time-row">
                        <td className="time-cell">{timeSlot}</td>
                        {days.map((day) => {
                          const teacher = selectedTeacher || Object.keys(timetableData)[0];
                          const subject = timetableData[teacher]?.[day]?.[timeSlot] || '';
                          
                          return (
                            <td key={day} className="schedule-cell">
                              {editingCell?.teacher === teacher && editingCell?.day === day && editingCell?.timeSlot === timeSlot ? (
                                <div className="edit-container">
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="edit-input"
                                    autoFocus
                                    placeholder="Enter subject or 'Free Period'"
                                  />
                                  <button
                                    onClick={saveEdit}
                                    className="save-btn"
                                  >
                                    <Save size={14} />
                                  </button>
                                </div>
                              ) : (
                                <div className="lecture-container">
                                  <div 
                                    className={`subject-card ${subject ? getSubjectColor(subject) : 'bg-gray-200'} ${subject ? 'text-white' : 'text-gray-500'}`}
                                    onClick={() => teacher && handleEdit(teacher, day, timeSlot)}
                                    style={{ cursor: 'pointer', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    {subject || 'Click to add'}
                                  </div>
                                  {subject && (
                                    <div className="action-buttons" style={{ marginTop: '4px' }}>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEdit(teacher, day, timeSlot);
                                        }}
                                        className="edit-btn"
                                      >
                                        <Edit size={12} />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteCell(teacher, day, timeSlot);
                                        }}
                                        className="delete-btn"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Class-wise View - keeping original structure for compatibility */
            <div className="table-container">
              <div className="table-scroll">
                <table className="timetable-table">
                  <thead>
                    <tr>
                      <th className="teacher-header">Teacher Name</th>
                      <th className="lecture-header">Monday</th>
                      <th className="lecture-header">Tuesday</th>
                      <th className="lecture-header">Wednesday</th>
                      <th className="lecture-header">Thursday</th>
                      <th className="lecture-header">Friday</th>
                      <th className="actions-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(timetableData).map(([teacher, schedule]) => (
                      <tr key={teacher} className="teacher-row">
                        <td className="teacher-cell">{teacher}</td>
                        {days.slice(0, 5).map(day => (
                          <td key={day} className="lecture-cell">
                            <div className="day-schedule">
                              {timeSlots.map(timeSlot => {
                                const subject = schedule[day]?.[timeSlot];
                                return subject ? (
                                  <div key={timeSlot} className={`mini-card ${getSubjectColor(subject)} text-white`} style={{ margin: '2px', padding: '2px 4px', fontSize: '10px', borderRadius: '3px' }}>
                                    {timeSlot.split('-')[0]} - {subject}
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </td>
                        ))}
                        <td className="actions-cell">
                          <button
                            onClick={() => {
                              setModalForm(prev => ({ ...prev, teacher }));
                              addPeriod();
                            }}
                            className="action-btn"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <button 
            onClick={addPeriod}
            className="action-button primary"
          >
            <Plus size={18} />
            ADD PERIOD
          </button>

          <button 
            onClick={printTimeTable}
            className="action-button secondary"
          >
            <Printer size={18} />
            PRINT TIME TABLE
          </button>

          <button 
            onClick={exportTimeTable}
            className="action-button success"
          >
            <Download size={18} />
            EXPORT
          </button>

          <button 
            onClick={resetTimeTable}
            className="action-button danger"
          >
            <Edit size={18} />
            RESET TIME TABLE
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">
                {modalMode === 'generate' ? 'Generate Timetable' : 'Add/Edit Period'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Teacher *</label>
                <select 
                  className="form-select"
                  value={modalForm.teacher}
                  onChange={(e) => handleModalInputChange('teacher', e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Day *</label>
                <select 
                  className="form-select"
                  value={modalForm.day}
                  onChange={(e) => handleModalInputChange('day', e.target.value)}
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Time Slot *</label>
                <select 
                  className="form-select"
                  value={modalForm.timeSlot}
                  onChange={(e) => handleModalInputChange('timeSlot', e.target.value)}
                >
                  <option value="">Select Time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="form-select"
                  value={modalForm.subject}
                  onChange={(e) => handleModalInputChange('subject', e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {modalForm.subject && modalForm.subject !== 'Free Period' && (
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <select 
                    className="form-select"
                    value={modalForm.class}
                    onChange={(e) => handleModalInputChange('class', e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="modal-btn cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="modal-btn confirm"
                disabled={!modalForm.teacher || !modalForm.day || !modalForm.timeSlot}
              >
                {modalMode === 'generate' ? 'Generate' : 'Add Period'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Time_Table;