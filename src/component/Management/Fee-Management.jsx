import React, { useEffect, useRef, useState } from 'react';
import {
  runAllCounters, initCharts, initChart, updateChart, getStats, formatCurrency, calculateGrowthRate
,  createStudentStatusChart, 
  createPaymentMethodsChart,
  getStudentStatusStats,
  getPaymentMethodsStats,
  handleChartResize,
  destroyCharts,
  changeTimePeriod,
  getCurrentTimePeriod,
  getAvailableTimePeriods,
filterData, 
  downloadData, 
  getSampleData, 
  NewCurrency  } from '../../assets/js/main.js';

import './management.css'
import '../../assets/css/animation.css'

function FeeManagement() {

   const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    timeDuration: 'all',
    classFilter: 'all',
    sectionFilter: 'all',
    feeTypeFilter: 'all',
    defaultersFilter: 'all',
    searchInput: ''
  });

  const rowsPerPage = 10;

  useEffect(() => {
    // Initialize data
    const sampleData = getSampleData();
    setData(sampleData);
    setFilteredData(sampleData);
  }, []);

  useEffect(() => {
    // Apply filters whenever filters change
    const filtered = filterData(data, filters);
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filters, data]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDownload = () => {
    downloadData(filteredData);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredData.length / rowsPerPage);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'paid': return 'status-paid';
      case 'unpaid': return 'status-unpaid';
      case 'late': return 'status-late';
      default: return 'status-paid';
    }
  };
  // Line Chart (Original)
  const [period, setPeriod] = useState('Monthly');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [growthRate, setGrowthRate] = useState(0);
  const [isPositiveGrowth, setIsPositiveGrowth] = useState(true);

  // Payment Dashboard (New)
  const studentChartRef = useRef(null);
  const paymentChartRef = useRef(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [paymentStats, setPaymentStats] = useState({
    student: { paid: 0, unpaid: 0, late: 0 },
    payment: { cheque: 0, cash: 0, card: 0, online: 0 }
  });

  // Original useEffect for main chart
  useEffect(() => {
    if (canvasRef.current) {
      const chartData = getStats(period);
      setStats(chartData);

      const growth = parseFloat(calculateGrowthRate(period));
      setGrowthRate(Math.abs(growth));
      setIsPositiveGrowth(growth >= 0);

      // Initialize chart with animation
      setTimeout(() => {
        initChart(canvasRef, period);
      }, 100);
    }
  }, []);

  // New useEffect for payment charts
  useEffect(() => {
    const initializePaymentCharts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (studentChartRef.current && paymentChartRef.current) {
          createStudentStatusChart(studentChartRef.current);
          
          setTimeout(() => {
            createPaymentMethodsChart(paymentChartRef.current);
            updatePaymentStats();
            setIsPaymentLoading(false);
          }, 300);
        }
      } catch (error) {
        console.error('Chart initialization failed:', error);
        setIsPaymentLoading(false);
      }
    };

    initializePaymentCharts();

    const handleResize = () => handleChartResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroyCharts();
    };
  }, []);

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
  }, []);

  const handlePeriodChange = async (e) => {
    const newPeriod = e.target.value;
    setIsLoading(true);

    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setPeriod(newPeriod);

      const chartData = getStats(newPeriod);
      setStats(chartData);

      const growth = parseFloat(calculateGrowthRate(newPeriod));
      setGrowthRate(Math.abs(growth));
      setIsPositiveGrowth(growth >= 0);

      updateChart(newPeriod);
      setIsLoading(false);
    }, 300);
  };

  const updatePaymentStats = () => {
    const studentStats = getStudentStatusStats();
    const paymentMethodStats = getPaymentMethodsStats();
    
    setPaymentStats({
      student: {
        paid: studentStats.paid,
        unpaid: studentStats.unpaid,
        late: studentStats.late
      },
      payment: {
        cheque: paymentMethodStats.cheque,
        cash: paymentMethodStats.cash,
        card: paymentMethodStats.card,
        online: paymentMethodStats.online
      }
    });
  };

  const handlePaymentPeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    changeTimePeriod(newPeriod);
    updatePaymentStats();
  };

  const LoadingSpinner = () => (
    <div className="loading-spinner"></div>
  );

  return (
    <div>
      <div className="dashboard-main-body">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-5 gap-8 p1-16">
          <div class="bg-gray-100 p-18 rounded ">
            <div class="border shadow-none bg-gradient-start-1 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1 ">Total Students</p>
                    <h6 class="mb-0 numbers" data-target="2000">0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-cyan-500 rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true" role="img"
                      class="text-white text-2xl mb-0 iconify iconify--gridicons" width="1em" height="1em"
                      viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="M24 14.6c0 .6-1.2 1-2.6 1.2c-.9-1.7-2.7-3-4.8-3.9c.2-.3.4-.5.6-.8h.8c3.1-.1 6 1.8 6 3.5M6.8 11H6c-3.1 0-6 1.9-6 3.6c0 .6 1.2 1 2.6 1.2c.9-1.7 2.7-3 4.8-3.9zm5.2 1c2.2 0 4-1.8 4-4s-1.8-4-4-4s-4 1.8-4 4s1.8 4 4 4m0 1c-4.1 0-8 2.6-8 5c0 2 8 2 8 2s8 0 8-2c0-2.4-3.9-5-8-5m5.7-3h.3c1.7 0 3-1.3 3-3s-1.3-3-3-3c-.5 0-.9.1-1.3.3c.8 1 1.3 2.3 1.3 3.7c0 .7-.1 1.4-.3 2M6 10h.3C6.1 9.4 6 8.7 6 8c0-1.4.5-2.7 1.3-3.7C6.9 4.1 6.5 4 6 4C4.3 4 3 5.3 3 7s1.3 3 3 3">
                      </path>
                    </svg>

                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 text-success-main">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true" role="img" class="text-xs iconify iconify--bxs" width="1em"
                      height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19">
                      </path>
                    </svg>
                    "+300"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-18 rounded ">
            <div class="border shadow-none bg-gradient-start-2 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1">Total Revenue</p>
                    <h6 class="mb-0 numbers" data-target="500000">₹0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center">
                    <svg class="text-white text-2xl" width="1em" height="1em" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 17.93c-3.67-.23-6.59-3.15-6.82-6.82H5v-2h.68c.23-3.67 3.15-6.59 6.82-6.82V5h2V3.26c3.67.23 6.59 3.15 6.82 6.82H19v2h.68c-.23 3.67-3.15 6.59-6.82 6.82V19h-2v-.07z" />
                    </svg>
                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 text-success-main">
                    <svg class="text-xs" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3 19h18a1 1 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                    </svg>
                    "+50k"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-100 p-18 rounded">
            <div class="border shadow-none bg-gradient-start-1 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1">Total Revenue</p>
                    <h6 class="mb-0 numbers" data-target="500000">₹0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center">
                    <svg class="text-white text-2xl" width="1em" height="1em" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 17.93c-3.67-.23-6.59-3.15-6.82-6.82H5v-2h.68c.23-3.67 3.15-6.59 6.82-6.82V5h2V3.26c3.67.23 6.59 3.15 6.82 6.82H19v2h.68c-.23 3.67-3.15 6.59-6.82 6.82V19h-2v-.07z" />
                    </svg>
                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 text-success-main">
                    <svg class="text-xs" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3 19h18a1 1 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                    </svg>
                    "+50k"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-18 rounded">
            <div class="border shadow-none bg-gradient-start-1 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1">Total Revenue</p>
                    <h6 class="mb-0 numbers" data-target="500000">₹0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center">
                    <svg class="text-white text-2xl" width="1em" height="1em" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 17.93c-3.67-.23-6.59-3.15-6.82-6.82H5v-2h.68c.23-3.67 3.15-6.59 6.82-6.82V5h2V3.26c3.67.23 6.59 3.15 6.82 6.82H19v2h.68c-.23 3.67-3.15 6.59-6.82 6.82V19h-2v-.07z" />
                    </svg>
                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 text-success-main">
                    <svg class="text-xs" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3 19h18a1 1 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                    </svg>
                    "+50k"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-18 rounded">
            <div class="border shadow-none bg-gradient-start-1 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1">Total Revenue</p>
                    <h6 class="mb-0 numbers" data-target="500000">₹0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center">
                    <svg class="text-white text-2xl" width="1em" height="1em" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 17.93c-3.67-.23-6.59-3.15-6.82-6.82H5v-2h.68c.23-3.67 3.15-6.59 6.82-6.82V5h2V3.26c3.67.23 6.59 3.15 6.82 6.82H19v2h.68c-.23 3.67-3.15 6.59-6.82 6.82V19h-2v-.07z" />
                    </svg>
                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 ">
                    <svg class="text-xs" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3 19h18a1 1 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                    </svg>
                    "+50k"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-18 rounded">
            <div class="border shadow-none bg-gradient-start-1 rounded h-full">
              <div className="card-body p-20">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium mb-1">Unpaid Fee</p>
                    <h6 class="mb-0 numbers" data-target="500000">₹0</h6>
                  </div>
                  <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex justify-center items-center">
                    <svg class="text-white text-2xl" width="1em" height="1em" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 17.93c-3.67-.23-6.59-3.15-6.82-6.82H5v-2h.68c.23-3.67 3.15-6.59 6.82-6.82V5h2V3.26c3.67.23 6.59 3.15 6.82 6.82H19v2h.68c-.23 3.67-3.15 6.59-6.82 6.82V19h-2v-.07z" />
                    </svg>
                  </div>
                </div>
                <p class="font-medium text-sm text-primary-light mt-12 mb-0 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true" role="img" class="text-xs iconify iconify--bxs" width="1em"
                      height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z">
                      </path>
                    </svg>
                    "-50k"
                  </span>
                  Last 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-y-4 mt-1 -mx-2">
          {/* col-xxl-6 col-xl-12 */}
          <div class="w-full xl:w-full 2xl:w-1/2 px-2 mt-16">
            <div className="profit-loss-chart-container">
              <div className="chart-header">
                <h6 className="chart-title">Profit & Loss Analysis</h6>
                <select
                  className="chart-period-selector"
                  value={period}
                  onChange={handlePeriodChange}
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Today">Today</option>
                </select>
              </div>

              <div className="chart-stats">
                <h6 className="chart-main-value">
                  {stats ? formatCurrency(stats.totalRevenue) : '$290,000'}
                </h6>
                <span className={`chart-growth-indicator ${!isPositiveGrowth ? 'negative' : ''}`}>
                  {growthRate}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      transform: isPositiveGrowth ? 'rotate(0deg)' : 'rotate(180deg)'
                    }}
                  >
                    <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                  </svg>
                </span>
                <span className="chart-daily-info">
                  {stats ? `+ ${formatCurrency(Math.round(stats.avgMonthlyRevenue / 30))} Per Day` : '+ $9,667 Per Day'}
                </span>
              </div>

              <div className="chart-canvas-wrapper">
                {isLoading && (
                  <div className="loading-spinner">
                    Loading chart data...
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  id="profitLossChart"
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color revenue"></div>
                  <span className="legend-label">Revenue</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color expenses"></div>
                  <span className="legend-label">Expenses</span>
                </div>
              </div>

              {stats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className={`stat-value ${stats.netProfitLoss >= 0 ? 'profit' : 'loss'}`}>
                      {formatCurrency(Math.abs(stats.netProfitLoss))}
                    </div>
                    <div className="stat-label">
                      Net {stats.netProfitLoss >= 0 ? 'Profit' : 'Loss'}
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">
                      {stats.profitMargin}%
                    </div>
                    <div className="stat-label">Profit Margin</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">
                      {formatCurrency(stats.avgMonthlyRevenue)}
                    </div>
                    <div className="stat-label">Avg Monthly</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">
                      {formatCurrency(stats.totalExpenses)}
                    </div>
                    <div className="stat-label">Total Expenses</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Dashboard Section - NEW */}
          <div class="w-full xl:w-full 2xl:w-1/2 px-2 mt-16">
            <div className="payment-dashboard">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Student Payment Dashboard</h1>
                <p className="dashboard-subtitle">Track payment status and methods in real-time</p>
              </div>

              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-header">
                    <h2 className="chart-title">Student Payment Status</h2>
                    <p className="chart-subtitle">Current payment distribution</p>
                    <div className="time-selector">
                      <select 
                        className="time-select" 
                        value={selectedPeriod} 
                        onChange={handlePaymentPeriodChange}
                      >
                        <option value="today">Today</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-canvas-container">
                    {isPaymentLoading && <LoadingSpinner />}
                    <canvas 
                      ref={studentChartRef}
                      className="chart-canvas"
                      style={{ opacity: isPaymentLoading ? 0 : 1 }}
                    />
                  </div>
                  <div className="chart-stats">
                    <div className="stat-item">
                      <div className="stat-value stat-paid">{paymentStats.student.paid}</div>
                      <div className="stat-label">Paid</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value stat-unpaid">{paymentStats.student.unpaid}</div>
                      <div className="stat-label">Unpaid</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value stat-late">{paymentStats.student.late}</div>
                      <div className="stat-label">Late Fee</div>
                    </div>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h2 className="chart-title">Payment Methods</h2>
                    <p className="chart-subtitle">Preferred payment channels</p>
                    <div className="time-selector">
                      <select 
                        className="time-select" 
                        value={selectedPeriod} 
                        onChange={handlePaymentPeriodChange}
                      >
                        <option value="today">Today</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-canvas-container">
                    {isPaymentLoading && <LoadingSpinner />}
                    <canvas 
                      ref={paymentChartRef}
                      className="chart-canvas"
                      style={{ opacity: isPaymentLoading ? 0 : 1 }}
                    />
                  </div>
                  <div className="chart-stats">
                    <div className="stat-item">
                      <div className="stat-value stat-cheque">₹{paymentStats.payment.cheque.toLocaleString()}</div>
                      <div className="stat-label">Cheque</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value stat-cash">₹{paymentStats.payment.cash.toLocaleString()}</div>
                      <div className="stat-label">Cash</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value ">₹{paymentStats.payment.card.toLocaleString()}</div>
                      <div className="stat-label">Card</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value stat-online">₹{paymentStats.payment.online.toLocaleString()}</div>
                      <div className="stat-label">Online</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
<div className="student-criteria-app">
  <div className="app-container">

    <div className="main-content">
      <div className="header">
        <h1>Student Criteria</h1>
        <div className="header-actions">
          <button className="download-btn" onClick={handleDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-row">
          <div className="filter-group">
            <label>Time Duration</label>
            <select 
              value={filters.timeDuration}
              onChange={(e) => handleFilterChange('timeDuration', e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Class</label>
            <select 
              value={filters.classFilter}
              onChange={(e) => handleFilterChange('classFilter', e.target.value)}
            >
              <option value="all">All Classes</option>
              <option value="10th A">10th A</option>
              <option value="10th B">10th B</option>
              <option value="9th A">9th A</option>
              <option value="9th B">9th B</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Section</label>
            <select 
              value={filters.sectionFilter}
              onChange={(e) => handleFilterChange('sectionFilter', e.target.value)}
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Fee Type</label>
            <select 
              value={filters.feeTypeFilter}
              onChange={(e) => handleFilterChange('feeTypeFilter', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Online">Online</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Defaulters</label>
            <select 
              value={filters.defaultersFilter}
              onChange={(e) => handleFilterChange('defaultersFilter', e.target.value)}
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="late">Late</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label>Search Student</label>
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="Search by ID or Name"
                value={filters.searchInput}
                onChange={(e) => handleFilterChange('searchInput', e.target.value)}
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="21 21L16.65 16.65"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Admission No.</th>
                <th>Name</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Collected By</th>
                <th>Fee</th>
                <th>Paid</th>
                <th>Discount</th>
                <th>Fine</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((item, index) => (
                <tr key={item.paymentId}>
                  <td>{item.paymentId}</td>
                  <td>{item.date}</td>
                  <td>{item.admissionNo}</td>
                  <td>{item.name}</td>
                  <td>{item.class}</td>
                  <td>{item.feeType}</td>
                  <td>{item.collectedBy}</td>
                  <td>{formatCurrency(item.fee)}</td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.paid}
                    </span>
                  </td>
                  <td>{item.discount}</td>
                  <td>{formatCurrency(item.fine)}</td>
                  <td>{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        <button 
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {getTotalPages()}</span>
        <button 
          onClick={goToNextPage}
          disabled={currentPage === getTotalPages() || getTotalPages() === 0}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>

</div>
</div>
</div>
 )
}

export default FeeManagement;
       