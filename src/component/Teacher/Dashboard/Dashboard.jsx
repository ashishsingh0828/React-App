import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Calendar, MessageCircle, Eye, MoreVertical, Trash2, Check, X, FileText, User, CheckCircle, AlertCircle, Play } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(8);
    const [workingHours, setWorkingHours] = useState({
        total: { hours: 36, minutes: 45 },
        online: { hours: 12, minutes: 30 },
        offline: { hours: 14, minutes: 15 }
    });
    
    // Student Tests State
    const [tests, setTests] = useState([
    {
      id: 1,
      testName: "Composition in web design",
      deadline: "June 09, 2022",
      student: {
        name: "Marie Stephens",
        avatar: "👩‍💼"
      },
      status: "Active",
      statusColor: "blue"
    },
    {
      id: 2,
      testName: "Responsive vs. Adaptive Design",
      deadline: "June 10, 2022",
      student: {
        name: "Barbara Carter",
        avatar: "👩‍🎓"
      },
      status: "Active",
      statusColor: "blue"
    },
    {
      id: 3,
      testName: "Responsive vs. Adaptive Design",
      deadline: "June 10, 2022",
      student: {
        name: "Daniel Evans",
        avatar: "👨‍💻"
      },
      status: "Reviewed",
      statusColor: "green"
    },
    {
      id: 4,
      testName: "8 point grid system in UX",
      deadline: "June 11, 2022",
      student: {
        name: "Paul Robinson",
        avatar: "👨‍🎨"
      },
      status: "Not viewed",
      statusColor: "orange"
    }
  ]);

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [viewingTest, setViewingTest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setWorkingHours(prev => {
                const newMinutes = prev.online.minutes + 1;
                const newTotalMinutes = prev.total.minutes + 1;

                return {
                    total: {
                        hours: prev.total.hours + (newTotalMinutes >= 60 ? 1 : 0),
                        minutes: newTotalMinutes >= 60 ? 0 : newTotalMinutes
                    },
                    online: {
                        hours: prev.online.hours + (newMinutes >= 60 ? 1 : 0),
                        minutes: newMinutes >= 60 ? 0 : newMinutes
                    },
                    offline: prev.offline
                };
            });
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    const groupChats = [
        {
            id: 1,
            name: "Teacher's Group",
            lastMessage: "Donna Clapton: Who can replace me on We...",
            unread: 14,
            avatar: "👩‍🏫",
            color: "bg-purple-600"
        },
        {
            id: 2,
            name: "Class 3A",
            lastMessage: "📎 Composition-task.pdf",
            unread: 0,
            avatar: "📚",
            color: "bg-blue-600"
        },
        {
            id: 3,
            name: "Class 3B",
            lastMessage: "Cody Dadson: Where can I read the info for...",
            unread: 2,
            avatar: "📖",
            color: "bg-green-600"
        }
    ];

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const prevMonthDay = new Date(year, month, -i);
            days.push({
                day: prevMonthDay.getDate(),
                isCurrentMonth: false,
                date: prevMonthDay
            });
        }
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                date: new Date(year, month, day)
            });
        }

        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            const nextMonthDay = new Date(year, month + 1, day);
            days.push({
                day: nextMonthDay.getDate(),
                isCurrentMonth: false,
                date: nextMonthDay
            });
        }

        return days;
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const chartData = [
        { day: 'M', value: 4, color: 'bg-green-400' },
        { day: 'T', value: 3, color: 'bg-green-400' },
        { day: 'W', value: 6, color: 'bg-blue-500' },
        { day: 'T', value: 5, color: 'bg-blue-500' },
        { day: 'F', value: 4, color: 'bg-green-400' },
        { day: 'S', value: 3, color: 'bg-green-400' },
        { day: 'S', value: 2, color: 'bg-green-400' }
    ];

  const toggleDropdown = (testId) => {
    setActiveDropdown(activeDropdown === testId ? null : testId);
  };

  const handleView = (test) => {
    setViewingTest(test);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = (testId) => {
    setTests(tests.filter(test => test.id !== testId));
    setActiveDropdown(null);
  };

  const handleApprove = (testId) => {
    setTests(tests.map(test => 
      test.id === testId 
        ? { ...test, status: "Approved", statusColor: "green" }
        : test
    ));
    setIsModalOpen(false);
    setActiveDropdown(null);
  };

  const handleReject = (testId) => {
    setTests(tests.map(test => 
      test.id === testId 
        ? { ...test, status: "Rejected", statusColor: "red" }
        : test
    ));
    setIsModalOpen(false);
    setActiveDropdown(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <Play size={16} />;
      case "Reviewed":
      case "Approved":
        return <CheckCircle size={16} />;
      case "Not viewed":
        return <AlertCircle size={16} />;
      case "Rejected":
        return <X size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="top-section">
        {/* Header */}
        <div className="header">
          <h1 className="welcome-title">Welcome back, Shruti</h1>
          <p className="date-text">
            June <span className="date-highlight">08</span>, Wednesday
          </p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image-container">
            <img
              src="../../../../public/Images/video-09.png"
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-ring"></div>
          </div>
          <div className="profile-content">
            <div className="profile-name-section">
              <h2 className="profile-name">Shruti Hassan</h2>
              <p className="profile-email">ShrutiHassan@email.com</p>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Rank:</span>
                <span className="stat-value">14</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Classes:</span>
                <span className="stat-value">7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="banner-container">
        <div className="banner">
          <div className="banner-img">
            <img
              src="../../../../public/Images/instuctor-blog-02.png"
              alt="Instructor"
              className="banner-image"
            />
          </div>
          <div className="banner-content">
            <p className="progress-text">
              Your students average progress is{' '}
              <span className="progress-highlight">73%</span>.
            </p>
            <p className="motivation-text">
              Level up your students to improve your teacher rank!
            </p>
          </div>
        </div>
      </div>

      {/* Mid Section */}
      <div className="mid-section">
        <div className="teacher-dashboard-grid">
          {/* Working Hours Card */}
          <div className="dashboard-card working-hours-card">
            <div className="card-header">
              <h2 className="card-title">
                <Clock className="card-icon" />
                Working Hours
              </h2>
            </div>

            <div className="hours-navigation">
              <span className="date-range">01 - 08 June 2022</span>
              <div className="nav-buttons">
                <button onClick={() => navigateMonth(-1)} className="nav-btn">
                  <ChevronLeft className="nav-icon" />
                </button>
                <button onClick={() => navigateMonth(1)} className="nav-btn">
                  <ChevronRight className="nav-icon" />
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="chart-container">
              <div className="chart-bars">
                {chartData.map((item, index) => (
                  <div key={index} className="chart-bar-wrapper">
                    <div
                      className={`chart-bar ${item.color}`}
                      style={{
                        height: `${(item.value / 6) * 100}px`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    ></div>
                    <span className="chart-label">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="chart-scale">
                <span>0</span>
                <span>2h</span>
                <span>4h</span>
                <span>6h</span>
                <span>8h</span>
              </div>
            </div>

            {/* Stats */}
            <div className="hours-stats">
              <div className="stat-box">
                <div className="stat-number">
                  {workingHours.total.hours}h {workingHours.total.minutes}m
                </div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-box">
                <div className="stat-number online-hours">
                  {workingHours.online.hours}h {workingHours.online.minutes}m
                </div>
                <div className="stat-label">Online</div>
              </div>
              <div className="stat-box">
                <div className="stat-number offline-hours">
                  {workingHours.offline.hours}h {workingHours.offline.minutes}m
                </div>
                <div className="stat-label">Offline</div>
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="dashboard-card calendar-card span-2-rows">
            <div className="card-header">
              <h2 className="card-title">
                <Calendar className="card-icon" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="nav-buttons">
                <button onClick={() => navigateMonth(-1)} className="nav-btn">
                  <ChevronLeft className="nav-icon" />
                </button>
                <button onClick={() => navigateMonth(1)} className="nav-btn">
                  <ChevronRight className="nav-icon" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {weekDays.map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>

              <div className="calendar-days">
                {getDaysInMonth(currentDate).map((dateObj, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(dateObj.day)}
                    className={`calendar-day ${!dateObj.isCurrentMonth ? 'other-month' : ''
                      } ${selectedDate === dateObj.day && dateObj.isCurrentMonth ? 'selected' : ''
                      } ${dateObj.day === 8 && dateObj.isCurrentMonth ? 'highlighted' : ''
                      }`}
                    style={{
                      animationDelay: `${Math.floor(index / 7) * 0.05}s`
                    }}
                  >
                    {dateObj.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="upcoming-classes">
              <h3 className="upcoming-title">
                <Users className="upcoming-icon" />
                Upcoming Classes
              </h3>
              <div className="upcoming-class">
                <div className="class-info">
                  <div className="class-time">10:30</div>
                  <div className="class-subject">Composition | Class 3A</div>
                  <div className="class-date">June 08, Offline</div>
                </div>
                <button className="class-view-btn">
                  <Eye className="view-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Group Chats Card */}
          <div className="dashboard-card group-chats-card">
            <div className="card-header">
              <h2 className="card-title">
                <MessageCircle className="card-icon" />
                Group chats
              </h2>
              <button className="view-all-btn">
                <Eye className="view-icon" />
                View all
              </button>
            </div>

            <div className="chats-list">
              {groupChats.map((chat, index) => (
                <div
                  key={chat.id}
                  className="chat-item"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`chat-avatar ${chat.color}`}>
                    {chat.avatar}
                  </div>
                  <div className="chat-content">
                    <h3 className="chat-name">{chat.name}</h3>
                    <p className="chat-message">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="unread-badge">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Student Tests */}
      <div className="bottom-section">
        <div className="student-tests-container">
          {/* Header Stats */}
          <div className="stats-header">
            <div className="stat-item">
              <div className="stat-value">{workingHours.total.hours}h {workingHours.total.minutes}m</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{workingHours.online.hours}h {workingHours.online.minutes}m</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{workingHours.offline.hours}h {workingHours.offline.minutes}m</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="tests-section">
            <div className="section-header">
              <h2 className="section-title">Student tests</h2>
              <button className="all-tests-btn">All tests</button>
            </div>

            <div className="tests-table">
              <div className="table-header">
                <div className="header-cell test-name-header">
                  <FileText size={16} />
                  Test name
                </div>
                <div className="header-cell">
                  <Clock size={16} />
                  Deadline
                </div>
                <div className="header-cell">
                  <User size={16} />
                  Student
                </div>
                <div className="header-cell">Status</div>
                <div className="header-cell"></div>
              </div>

              <div className="table-body">
                {tests.map((test) => (
                  <div key={test.id} className="table-row" data-status={test.statusColor}>
                    <div className="table-cell test-name-cell">
                      <div className="test-icon">
                        <FileText size={20} />
                      </div>
                      <span className="test-name">{test.testName}</span>
                    </div>
                    
                    <div className="table-cell deadline-cell">
                      {test.deadline}
                    </div>
                    
                    <div className="table-cell student-cell">
                      <div className="student-info">
                        <div className="student-avatar">
                          {test.student.avatar}
                        </div>
                        <span className="student-name">{test.student.name}</span>
                      </div>
                    </div>
                    
                    <div className="table-cell status-cell">
                      <div className={`status-badge status-${test.statusColor}`}>
                        {getStatusIcon(test.status)}
                        <span>{test.status}</span>
                      </div>
                    </div>
                    
                    <div className="table-cell actions-cell">
                      <div className="dropdown-container">
                        <button 
                          className="more-btn"
                          onClick={() => toggleDropdown(test.id)}
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {activeDropdown === test.id && (
                          <div className="dropdown-menu">
                            <button 
                              className="dropdown-item view-item"
                              onClick={() => handleView(test)}
                            >
                              <Eye size={16} />
                              View
                            </button>
                            <button 
                              className="dropdown-item delete-item"
                              onClick={() => handleDelete(test.id)}
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing test */}
      {isModalOpen && viewingTest && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Review Assignment</h3>
              <button 
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="assignment-details">
                <div className="detail-row">
                  <span className="detail-label">Test:</span>
                  <span className="detail-value">{viewingTest.testName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Student:</span>
                  <span className="detail-value">{viewingTest.student.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Deadline:</span>
                  <span className="detail-value">{viewingTest.deadline}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Current Status:</span>
                  <div className={`status-badge status-${viewingTest.statusColor}`}>
                    {getStatusIcon(viewingTest.status)}
                    <span>{viewingTest.status}</span>
                  </div>
                </div>
              </div>

              <div className="assignment-content">
                <h4>Assignment Content</h4>
                <div className="content-preview">
                  <p>This is a sample assignment submission for {viewingTest.testName}. The student has completed the work according to the requirements...</p>
                  <div className="file-attachments">
                    <div className="attachment">
                      <FileText size={16} />
                      <span>assignment_submission.pdf</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-reject"
                onClick={() => handleReject(viewingTest.id)}
              >
                <X size={16} />
                Reject
              </button>
              <button 
                className="btn-approve"
                onClick={() => handleApprove(viewingTest.id)}
              >
                <Check size={16} />
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;