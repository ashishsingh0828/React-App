import React, { useEffect, useRef, useState } from 'react';
import {
  runAllCounters, NewChart, DestroyCharts, studentData,
  filterStudents,
  getUniqueClasses,
  getUniqueSections,
  getUniqueStatuses,
  initPopularPlaylistSlider,
  generateReport,
  downloadCSV,
  createStudentChart
} from '../../assets/js/main.js';
import './management.css'
import '../../assets/css/animation.css'

function Studenttracking() {
  const data = null;
  const title = "Student Tracking";
  const subtitle = "Performance Analytics Dashboard";
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    total: 0,
    good: 0,
    average: 0,
    bad: 0
  });

  // Default data if none provided
  const defaultData = {
    labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    bad: [25, 15, 30, 10, 5, 20, 8, 18, 35, 12, 22, 16],
    average: [40, 50, 25, 45, 35, 30, 55, 25, 20, 40, 28, 35],
    good: [35, 35, 45, 45, 60, 50, 37, 57, 45, 48, 50, 49]
  };

  const chartData = data || defaultData;

  // Calculate statistics
  useEffect(() => {
    const calculateStats = () => {
      const badTotal = chartData.bad.reduce((sum, val) => sum + val, 0);
      const averageTotal = chartData.average.reduce((sum, val) => sum + val, 0);
      const goodTotal = chartData.good.reduce((sum, val) => sum + val, 0);
      const total = badTotal + averageTotal + goodTotal;

      setTotalStats({
        total,
        good: goodTotal,
        average: averageTotal,
        bad: badTotal
      });
    };

    calculateStats();
  }, [chartData]);

  useEffect(() => {
    const initializeChart = async () => {
      setIsLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 10000));
      if (canvasRef.current) {
        try {
          chartInstanceRef.current = createStudentChart('stc-student-chart', chartData);
          // setIsLoading(false);
        } catch (error) {
          console.error('Error creating chart:', error);
          // setIsLoading(false);
        }
      }
    };

    initializeChart();

    // Cleanup function
    return () => {
      if (chartInstanceRef.current && chartInstanceRef.current.stopWaterFlow) {
        chartInstanceRef.current.stopWaterFlow();
      }
      if (chartInstanceRef.current && chartInstanceRef.current.chart) {
        chartInstanceRef.current.chart.destroy();
      }
    };
  }, [chartData]);

  const formatPercentage = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  };

  const lowAttendanceRef = useRef(null);
  const totalStudentsRef = useRef(null);
  const chartInstancesRef = useRef({});

  const [filters, setFilters] = useState({
    class: '',
    section: '',
    status: '',
    search: ''
  });

  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [report, setReport] = useState({});
  useEffect(() => {
    const filtered = filterStudents(studentData, filters);
    setFilteredStudents(filtered);
    setReport(generateReport(studentData, filters));
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  const handleDownload = () => {
    const reportData = generateReport(studentData, filters);
    downloadCSV(reportData.students, `student_report_${new Date().toISOString().split('T')[0]}.csv`);
  };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'fee': return 'status-fee';
      default: return 'status-present';
    }
  };

  useEffect(() => {
    if (lowAttendanceRef.current && totalStudentsRef.current) {
      chartInstancesRef.current = NewChart(lowAttendanceRef.current, totalStudentsRef.current);
    }
    initPopularPlaylistSlider();
    runAllCounters(200);
    const timer = setTimeout(() => {
    }, 50);
    return () => {
      clearTimeout(timer);
      if (chartInstancesRef.current) {
        DestroyCharts(chartInstancesRef.current);
      }
    };
  }, []);
  return (
    <div className="student-tracking">
      <div className="cardBox fadeInUp">
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="1504">0</div>
            <div className="cardName"> Total Students</div>
          </div>
          <div className="iconBx"><i className="fas fa-user-graduate"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="40">0</div>
            <div className="cardName">Present Today</div>
          </div>
          <div className="iconBx"><i className="fas fa-user-check"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="70">0</div>
            <div className="cardName">Absent Today</div>
          </div>
          <div className="iconBx"><i className="fas fa-minus-circle"></i></div>
        </div>
        <div className="card fade-in">
          <div>
            <div className="numbers" data-target="70">0</div>
            <div className="cardName">Overall Attendance</div>
          </div>
          <div className="iconBx"><i className="fas fa-calendar-check"></i></div>
        </div>
      </div>

      {/* Double Charts */}
      <div className="student-dashboard">
        <div className="dashboard-container">
          <div className="chart-card low-attendance-card">
            <h3 className="chart-title">Low Attendance</h3>
            <div className="chart-wrapper">
              <canvas ref={lowAttendanceRef} id="lowAttendanceChart" className="chart-canvas"></canvas>
              <div className="chart-center-text">
                <span className="student-count">12 Students</span>
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-dot late-student"></span>
                <span className="legend-text">Late student</span>
                <span className="legend-dot late-student"></span>
                <span className="legend-text">Present Students</span><br />
                <span className="legend-dot late-student"></span>
                <span className="legend-text">Absent student</span>
              </div>
            </div>
          </div>

          <div className="chart-card total-students-card">
            <h3 className="chart-title total-title">Total Students: 300</h3>
            <div className="chart-wrapper">
              <canvas ref={totalStudentsRef} id="totalStudentsChart" x className="chart-canvas"></canvas>
            </div>
            <div className="legend multi-legend">
              <div className="legend-column">
                <div className="legend-item">
                  <span className="legend-dot class-1st"></span>
                  <span className="legend-text">1st Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-2nd"></span>
                  <span className="legend-text">2nd Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-3rd"></span>
                  <span className="legend-text">3rd Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-4th"></span>
                  <span className="legend-text">4th Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-5th"></span>
                  <span className="legend-text">5th Class Student</span>
                </div>
              </div>
              <div className="legend-column">
                <div className="legend-item">
                  <span className="legend-dot class-6th"></span>
                  <span className="legend-text">6th Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-7th"></span>
                  <span className="legend-text">7th Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-8th"></span>
                  <span className="legend-text">8th Class Student</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot class-9th"></span>
                  <span className="legend-text">9th Class Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance */}
      <div className="stc-student-tracking-container">
        <div className="stc-container-content">
          {/* Header Section */}
          <div className="stc-header-section">
            <div className="stc-title-container">
              <div className="stc-status-indicator"></div>
              <div>
                <h2 className="stc-main-title">{title}</h2>
                <p className="stc-subtitle">{subtitle}</p>
              </div>
            </div>
            {isLoading && (
              <div className="stc-loading-spinner"></div>
            )}
          </div>

          {/* Statistics Grid */}
          <div className="stc-stats-grid">
            <div className="stc-stat-card">
              <h3 className="stc-stat-number">{totalStats.total}</h3>
              <p className="stc-stat-label">Total Students</p>
              <p className="stc-stat-percentage">100%</p>
            </div>
            <div className="stc-stat-card">
              <h3 className="stc-stat-number">{totalStats.good}</h3>
              <p className="stc-stat-label">Good Performance</p>
              <p className="stc-stat-percentage">{formatPercentage(totalStats.good, totalStats.total)}%</p>
            </div>
            <div className="stc-stat-card">
              <h3 className="stc-stat-number">{totalStats.average}</h3>
              <p className="stc-stat-label">Average Performance</p>
              <p className="stc-stat-percentage">{formatPercentage(totalStats.average, totalStats.total)}%</p>
            </div>
            <div className="stc-stat-card">
              <h3 className="stc-stat-number">{totalStats.bad}</h3>
              <p className="stc-stat-label">Needs Improvement</p>
              <p className="stc-stat-percentage">{formatPercentage(totalStats.bad, totalStats.total)}%</p>
            </div>
          </div>

          {/* Chart Container */}
          <div className="stc-chart-container">
            <div className="stc-water-overlay"></div>
            <div className="stc-chart-wrapper">
              <canvas
                ref={canvasRef}
                id="stc-student-chart"
                className="stc-chart-canvas"
              ></canvas>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="stc-legend-container">
            <div className="stc-legend-item">
              <div className="stc-legend-color stc-good"></div>
              <span className="stc-legend-text">Good Performance</span>
            </div>
            <div className="stc-legend-item">
              <div className="stc-legend-color stc-average"></div>
              <span className="stc-legend-text">Average Performance</span>
            </div>
            <div className="stc-legend-item">
              <div className="stc-legend-color stc-bad"></div>
              <span className="stc-legend-text">Needs Improvement</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tracking */}
      <div className="track-container">
        <div className="header">
          <h1 className="title">Student Tracking</h1>
        </div>

        {/* Filters Section */}
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Class</label>
            <select
              className="filter-select"
              value={filters.class}
              onChange={(e) => handleFilterChange('class', e.target.value)}
            >
              <option value="">All Classes</option>
              {getUniqueClasses(studentData).map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Section</label>
            <select
              className="filter-select"
              value={filters.section}
              onChange={(e) => handleFilterChange('section', e.target.value)}
            >
              <option value="">All Sections</option>
              {getUniqueSections(studentData).map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Leave Purpose</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Fee">Fee Issues</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Search</label>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, roll no, or remark..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Actions and Summary */}
        <div className="actions-container">
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{report.totalStudents || 0}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Present</div>
              <div className="stat-value">{report.presentCount || 0}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Absent</div>
              <div className="stat-value">{report.absentCount || 0}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Late</div>
              <div className="stat-value">{report.lateCount || 0}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Attendance Rate</div>
              <div className="stat-value">{report.attendanceRate || 0}%</div>
            </div>
          </div>

          <button className="download-btn" onClick={handleDownload}>
            <span>📥</span>
            Download Report
          </button>
        </div>

        {/* Student Table */}
        <div className="table-container">
          <table className="student-table">
            <thead className="table-header">
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll No.</th>
                <th>Status</th>
                <th>Arrival Time</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id} className="table-row" style={{ animationDelay: `${index * 0.1}s` }}>
                    <td className="table-cell">{student.name}</td>
                    <td className="table-cell">{student.class}</td>
                    <td className="table-cell">{student.section}</td>
                    <td className="table-cell">{student.rollNo}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${getStatusClass(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="table-cell">{student.arrivalTime}</td>
                    <td className="table-cell">{student.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    <div className="no-data-icon">📋</div>
                    <div>No students found matching your criteria</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Slider */}
      <div className="pps-slider-container track-container">
        <div class="header"><h1 class="title">Popular Activities</h1></div>
        <div className="pps-swiper swiper">
          <div className="swiper-wrapper">
            {[
              {
                title: "Midnight Moods",
                img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/95b52c32-f5da-4fe6-956d-a5ed118bbdd2",
              },
              {
                title: "Party Starters",
                img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6ddf81f5-2689-4f34-bf80-a1e07f14621c",
              },
              {
                title: "Relaxing Tones",
                img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ab52d9d0-308e-43e0-a577-dce35fedd2a3",
              },
              {
                title: "Smooth Jazz Journey",
                img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/20c8fdd5-9f4a-4917-ae90-0239a52e8334",
              },
              {
                title: "Uplifting Rhythms",
                img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/df461a99-2fb3-4d55-ac16-2e0c6dd783e1",
              },
            ].map((item, idx) => (
              <div className="swiper-slide pps-slide" key={idx}>
                <img src={item.img} alt={item.title} />
                <div className="pps-slide-overlay">
                  <h2>{item.title}</h2>
                  <button>
                    Listen Now <i className="fa-solid fa-circle-play"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default Studenttracking;
