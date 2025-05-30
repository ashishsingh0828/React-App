// assets/js/main.js
import Chart from "chart.js/auto";

export function initSidebarHover() {
  const list = document.querySelectorAll(".navigation li");

  function activelink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }

  list.forEach((item) => item.addEventListener("mouseover", activelink));
}

// Toggle Menu
export function setupToggleMenu() {
  const navigation = document.querySelector(".navigation");
  const main = document.querySelector(".main");
  const toggle = document.querySelector(".toggle");

  toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };
}

export const notificationToggle = ({
  notificationBtnId = "notificationBtn",
  closeBtnId = "closeDropdown",
  parentClass = "notification",
} = {}) => {
  let notificationBtn = null;
  let closeBtn = null;
  let notificationContainer = null;
  let clickOutsideHandler = null;

  const toggleNotification = () => {
    if (!notificationContainer) return;
    notificationContainer.classList.toggle("show");
  };

  const closeNotification = () => {
    if (!notificationContainer) return;
    notificationContainer.classList.remove("show");
  };

  const handleClickOutside = (event) => {
    if (
      notificationContainer &&
      !notificationContainer.contains(event.target)
    ) {
      closeNotification();
    }
  };

  const init = () => {
    notificationBtn = document.getElementById(notificationBtnId);
    closeBtn = document.getElementById(closeBtnId);

    if (notificationBtn) {
      notificationContainer = notificationBtn.closest(`.${parentClass}`);
    }

    if (notificationBtn) {
      notificationBtn.addEventListener("click", toggleNotification);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeNotification);
    }

    clickOutsideHandler = handleClickOutside;
    document.addEventListener("mousedown", clickOutsideHandler);

    return {
      isInitialized: !!(notificationBtn && closeBtn && notificationContainer),
    };
  };

  const cleanUp = () => {
    if (notificationBtn) {
      notificationBtn.removeEventListener("click", toggleNotification);
    }

    if (closeBtn) {
      closeBtn.removeEventListener("click", closeNotification);
    }

    if (clickOutsideHandler) {
      document.removeEventListener("mousedown", clickOutsideHandler);
    }
  };

  return {
    init,
    cleanUp,
    toggleNotification,
    closeNotification,
  };
};

// Counter
export function runAllCounters(speed = 200) {
  const counters = document.querySelectorAll(".numbers");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / speed;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Chart

export function initCharts() {
  // Make sure DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCharts);
    return {};
  } else {
    return initializeCharts();
  }
}

// Initialize both charts and handle errors
function initializeCharts() {
  try {
    const feeChart = initFeeChart();
    const performanceChart = initPerformanceChart();

    // Handle window resize for responsive charts
    window.addEventListener("resize", () => {
      if (feeChart) feeChart.update();
      if (performanceChart) performanceChart.update();
    });

    return { feeChart, performanceChart };
  } catch (error) {
    console.error("Error initializing charts:", error);
    return {};
  }
}

// Line chart for Fee Management
function initFeeChart() {
  try {
    const canvas = document.getElementById("feeChart");
    if (!canvas) {
      console.error("Canvas element not found for Fee Chart");
      return null;
    }

    const ctx = canvas.getContext("2d");

    const feeData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Collection",
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: "#3182ce",
          backgroundColor: "rgba(49, 130, 206, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Outstanding",
          data: [5000, 4000, 1000, 2500, 0, 0],
          borderColor: "#e53e3e",
          backgroundColor: "rgba(229, 62, 62, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Projected",
          data: [10000, 2000, 3000, 4000, 0, 0],
          borderColor: "#38a169",
          backgroundColor: "rgba(56, 161, 105, 0.1)",
          fill: true,
          tension: 0.4,
          borderDash: [5, 5],
        },
      ],
    };

    const config = {
      type: "line",
      data: feeData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          title: {
            display: true,
            text: "Fee Management Overview",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: (value) => "$" + value,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
        transitions: {
          active: {
            animation: {
              duration: 400,
            },
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
          axis: "x",
        },
      },
    };

    return new Chart(ctx, config);
  } catch (error) {
    console.error("Error creating fee chart:", error);
    return null;
  }
}

// Doughnut chart for Student Performance
function initPerformanceChart() {
  try {
    const canvas = document.getElementById("performanceChart");
    if (!canvas) {
      console.error("Canvas element not found for Performance Chart");
      return null;
    }

    const ctx = canvas.getContext("2d");

    const performanceData = {
      labels: ["Excellent", "Good", "Average", "Below Average", "Poor"],
      datasets: [
        {
          data: [35, 30, 20, 10, 5],
          backgroundColor: [
            "#38a169",
            "#4299e1",
            "#ecc94b",
            "#ed8936",
            "#e53e3e",
          ],
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    };

    // Chart configuration with animations
    const config = {
      type: "doughnut",
      data: performanceData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce(
                  (acc, data) => acc + data,
                  0
                );
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}% (${value} students)`;
              },
            },
          },
        },
        cutout: "65%",
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: "easeOutCirc",
        },
      },
    };

    // Create and return the chart instance
    return new Chart(ctx, config);
  } catch (error) {
    console.error("Error creating performance chart:", error);
    return null;
  }
}


// Initial data
export const initialLeadersData = [
  {
    id: 1,
    name: "Mr. Mohit Lochab",
    employeeId: "SS014R",
    education: "M.tech",
    contact: "+352822541",
    address: "1234, street FBD",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    employeeId: "SS015R",
    education: "Ph.D",
    contact: "+352822542",
    address: "5678, avenue NYC",
  },
  {
    id: 3,
    name: "Prof. Michael Chen",
    employeeId: "SS016R",
    education: "Ph.D",
    contact: "+352822543",
    address: "9012, boulevard LA",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    employeeId: "SS017R",
    education: "Ph.D",
    contact: "+352822544",
    address: "3456, lane Boston",
  },
  {
    id: 5,
    name: "Mr. David Wilson",
    employeeId: "SS018R",
    education: "M.tech",
    contact: "+352822545",
    address: "7890, street Chicago",
  },
  {
    id: 6,
    name: "Dr. Lisa Anderson",
    employeeId: "SS019R",
    education: "Ph.D",
    contact: "+352822546",
    address: "2468, avenue Miami",
  },
  {
    id: 7,
    name: "Prof. James Taylor",
    employeeId: "SS020R",
    education: "Ph.D",
    contact: "+352822547",
    address: "1357, boulevard Seattle",
  },
  {
    id: 8,
    name: "Ms. Jennifer Brown",
    employeeId: "SS021R",
    education: "M.tech",
    contact: "+352822548",
    address: "9753, lane Denver",
  },
];

// Filter and search function
export const filterLeaders = (leaders, searchTerm, filterBy) => {
  return leaders.filter((leader) => {
    const matchesSearch =
      leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.contact.includes(searchTerm) ||
      leader.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      leader.education.toLowerCase() === filterBy.toLowerCase();

    return matchesSearch && matchesFilter;
  });
};

// Validation function
export const validateLeaderData = (formData, leaders, editingLeader = null) => {
  const errors = [];

  // Check required fields
  if (
    !formData.name ||
    !formData.employeeId ||
    !formData.education ||
    !formData.contact ||
    !formData.address
  ) {
    errors.push("Please fill in all fields");
  }

  // Check for duplicate employee ID
  const existingLeader = leaders.find(
    (leader) =>
      leader.employeeId.toLowerCase() === formData.employeeId.toLowerCase() &&
      (!editingLeader || leader.id !== editingLeader.id)
  );

  if (existingLeader) {
    errors.push("Employee ID already exists");
  }

  return errors;
};

// Save leader function
export const saveLeader = (
  formData,
  leaders,
  editingLeader,
  showNotification
) => {
  const errors = validateLeaderData(formData, leaders, editingLeader);

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return { success: false, leaders };
  }

  let updatedLeaders;

  if (editingLeader) {
    // Update existing leader
    updatedLeaders = leaders.map((leader) =>
      leader.id === editingLeader.id ? { ...leader, ...formData } : leader
    );
    showNotification("Leader updated successfully!", "success");
  } else {
    // Add new leader
    const newLeader = {
      id: Math.max(...leaders.map((l) => l.id)) + 1,
      ...formData,
    };
    updatedLeaders = [...leaders, newLeader];
    showNotification("Leader added successfully!", "success");
  }

  return { success: true, leaders: updatedLeaders };
};

// Delete leader function
export const deleteLeader = (leaderId, leaders, showNotification) => {
  const leader = leaders.find((l) => l.id === leaderId);
  if (
    leader &&
    window.confirm(`Are you sure you want to delete ${leader.name}?`)
  ) {
    const updatedLeaders = leaders.filter((l) => l.id !== leaderId);
    showNotification("Leader deleted successfully!", "success");
    return updatedLeaders;
  }
  return leaders;
};

// Pagination functions
export const getTotalPages = (filteredLeaders, itemsPerPage) => {
  return Math.ceil(filteredLeaders.length / itemsPerPage);
};

export const getCurrentLeaders = (
  filteredLeaders,
  currentPage,
  itemsPerPage
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredLeaders.slice(startIndex, startIndex + itemsPerPage);
};

export const getPaginationNumbers = (currentPage, totalPages) => {
  const pages = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 3) {
    for (let i = 1; i <= maxVisible; i++) {
      pages.push(i);
    }
  } else if (currentPage >= totalPages - 2) {
    for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pages.push(i);
    }
  }

  return pages;
};

// Export to CSV function
export const exportToCSV = (filteredLeaders, showNotification) => {
  const headers = ["Name", "Employee ID", "Education", "Contact", "Address"];
  const csvContent = [
    headers.join(","),
    ...filteredLeaders.map((leader) =>
      [
        leader.name,
        leader.employeeId,
        leader.education,
        leader.contact,
        leader.address,
      ]
        .map((field) => `"${field}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `academic_leaders_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  showNotification("Data exported successfully!", "success");
};

// Notification system
export const createNotificationSystem = () => {
  let notificationTimeout;

  const showNotification =
    (setNotification) =>
    (message, type = "success") => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }

      setNotification({ message, type });

      notificationTimeout = setTimeout(() => {
        setNotification(null);
      }, 3000);
    };

  return showNotification;
};

// Form handling functions
export const handleInputChange = (setFormData) => (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const resetFormData = () => ({
  name: "",
  employeeId: "",
  education: "",
  contact: "",
  address: "",
});

// Modal functions
export const openModal =
  (setEditingLeader, setFormData, setIsModalOpen) =>
  (leader = null) => {
    setEditingLeader(leader);
    setFormData(leader ? { ...leader } : resetFormData());
    setIsModalOpen(true);
  };

export const closeModal =
  (setIsModalOpen, setEditingLeader, setFormData) => () => {
    setIsModalOpen(false);
    setEditingLeader(null);
    setFormData(resetFormData());
  };

// Education options
export const educationOptions = [
  { value: "", label: "Select Education" },
  { value: "M.tech", label: "M.tech" },
  { value: "Ph.D", label: "Ph.D" },
  { value: "MBA", label: "MBA" },
  { value: "M.Sc", label: "M.Sc" },
];

export const filterOptions = [
  { value: "all", label: "All Education" },
  { value: "M.tech", label: "M.tech" },
  { value: "Ph.D", label: "Ph.D" },
  { value: "MBA", label: "MBA" },
  { value: "M.Sc", label: "M.Sc" },
];


// Chart  for Fee Management 
let chartInstance = null;

const chartData = {
  Today: {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    revenue: [1200, 1800, 2200, 1900, 2400, 1600],
    expenses: [800, 1200, 1400, 1100, 1300, 900],
    totalRevenue: 11100,
    totalExpenses: 7700,
    avgMonthlyRevenue: 333000,
    netProfitLoss: 3400,
    profitMargin: 30.6
  },
  Weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenue: [8500, 9200, 7800, 10500, 12200, 15600, 11200],
    expenses: [5200, 5800, 4900, 6200, 7100, 8900, 6400],
    totalRevenue: 75000,
    totalExpenses: 44500,
    avgMonthlyRevenue: 300000,
    netProfitLoss: 30500,
    profitMargin: 40.7
  },
  Monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    revenue: [65000, 72000, 68000, 85000],
    expenses: [42000, 45000, 41000, 52000],
    totalRevenue: 290000,
    totalExpenses: 180000,
    avgMonthlyRevenue: 290000,
    netProfitLoss: 110000,
    profitMargin: 37.9
  },
  Yearly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [280000, 320000, 290000, 350000, 380000, 420000, 450000, 410000, 390000, 360000, 340000, 380000],
    expenses: [180000, 200000, 185000, 220000, 240000, 260000, 280000, 250000, 235000, 220000, 210000, 230000],
    totalRevenue: 4370000,
    totalExpenses: 2710000,
    avgMonthlyRevenue: 364167,
    netProfitLoss: 1660000,
    profitMargin: 38.0
  }
};

export const initChart = (canvasRef, period = 'Monthly') => {
  if (!canvasRef.current) return;

  const ctx = canvasRef.current.getContext('2d');
  const data = chartData[period];

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy();
  }

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
  gradient1.addColorStop(1, 'rgba(34, 197, 94, 0.02)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
  gradient2.addColorStop(1, 'rgba(239, 68, 68, 0.02)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Revenue',
          data: data.revenue,
          borderColor: '#22c55e',
          backgroundColor: gradient1,
          fill: true,
          tension: 0.4,
          borderWidth: 1,
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Expenses',
          data: data.expenses,
          borderColor: '#ef4444',
          backgroundColor: gradient2,
          fill: true,
          tension: 0.4,
          borderWidth: 1,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
            drawBorder: false
          },
          border: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            },
            callback: (value) => '$' + (value / 1000) + 'k'
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });

  return chartInstance;
};

export const updateChart = (period) => {
  if (!chartInstance) return;

  const data = chartData[period];
  chartInstance.data.labels = data.labels;
  chartInstance.data.datasets[0].data = data.revenue;
  chartInstance.data.datasets[1].data = data.expenses;
  chartInstance.update('active');
};

export const getStats = (period) => {
  return chartData[period];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateGrowthRate = (period) => {
  const data = chartData[period];
  const current = data.revenue[data.revenue.length - 1];
  const previous = data.revenue[data.revenue.length - 2] || current;
  return ((current - previous) / previous * 100).toFixed(1);
};


// Utility function to format numbers in short form
function formatNumberShort(num) {
  if (num >= 10000000) { // 1 crore or more
    return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
  } else if (num >= 100000) { // 1 lakh or more
    return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// Student Charts
const timeBasedData = {
  today: {
    student: { data: [45, 28, 12], labels: ['Paid', 'Unpaid', 'Late Fee'] },
    payment: { data: [18, 22, 15, 30], labels: ['Cheque', 'Cash', 'Card', 'Online'] }
  },
  weekly: {
    student: { data: [180, 120, 50], labels: ['Paid', 'Unpaid', 'Late Fee'] },
    payment: { data: [70, 85, 60, 120], labels: ['Cheque', 'Cash', 'Card', 'Online'] }
  },
  monthly: {
    student: { data: [450, 280, 120], labels: ['Paid', 'Unpaid', 'Late Fee'] },
    payment: { data: [180, 220, 150, 300], labels: ['Cheque', 'Cash', 'Card', 'Online'] }
  },
  yearly: {
    student: { data: [5400, 3360, 1440], labels: ['Paid', 'Unpaid', 'Late Fee'] },
    payment: { data: [2160, 2640, 1800, 3600], labels: ['Cheque', 'Cash', 'Card', 'Online'] }
  }
};

// Current selected time period
let currentTimePeriod = 'monthly';

// Get current data based on time period
function getCurrentData() {
  return timeBasedData[currentTimePeriod];
}

// Student Payment Status Data
  const studentPaymentData = {
  labels: getCurrentData().student.labels,
  datasets: [{
    data: getCurrentData().student.data,
    backgroundColor: [
      'rgba(72, 187, 120, 0.8)',
      'rgba(237, 137, 54, 0.8)',
      'rgba(245, 101, 101, 0.8)'
    ],
    borderColor: [
      'rgba(72, 187, 120, 1)',
      'rgba(237, 137, 54, 1)',
      'rgba(245, 101, 101, 1)'
    ],
    borderWidth: 2,
    hoverOffset: 15
  }]
};

// Payment Methods Data
const paymentMethodsData = {
  labels: getCurrentData().payment.labels,
  datasets: [{
    data: getCurrentData().payment.data,
    backgroundColor: [
      'rgba(66, 153, 225, 0.8)',
      'rgba(56, 178, 172, 0.8)',
      'rgba(159, 122, 234, 0.8)',
      'rgba(237, 137, 54, 0.8)'
    ],
    borderColor: [
      'rgba(66, 153, 225, 1)',
      'rgba(56, 178, 172, 1)',
      'rgba(159, 122, 234, 1)',
      'rgba(237, 137, 54, 1)'
    ],
    borderWidth: 2,
    borderRadius: 8,
    borderSkipped: false
  }]
};

// Donut Chart Configuration
const donutChartConfig = {
  type: 'doughnut',
  data: studentPaymentData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.parsed * 100) / total);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      arc: {
        borderJoinStyle: 'round'
      }
    }
  }
};

// Bar Chart Configuration
const barChartConfig = {
  type: 'bar',
  data: paymentMethodsData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const baseAmounts = {
              today: 1000,
              weekly: 4000,
              monthly: 10000,
              yearly: 120000
            };
            const multiplier = baseAmounts[currentTimePeriod] || 10000;
            const amount = context.parsed.y * multiplier;
            return `${context.label}: ₹${formatNumberShort(amount)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#718096',
          font: {
            size: 12
          },
          callback: function(value) {
            const baseAmounts = {
              today: 1000,
              weekly: 4000,
              monthly: 10000,
              yearly: 120000
            };
            const multiplier = baseAmounts[currentTimePeriod] || 10000;
            const amount = value * multiplier;
            return '₹' + formatNumberShort(amount);
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#718096',
          font: {
            size: 12,
            weight: '500'
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => {
        return context.dataIndex * 200;
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }
};

// Chart Instance Variables
let studentStatusChartInstance = null;
let paymentMethodChartInstance = null;

// Create Student Status Donut Chart
export function createStudentStatusChart(canvasElement) {
  try {
    // Destroy existing chart if it exists
    if (studentStatusChartInstance) {
      studentStatusChartInstance.destroy();
    }
    
    studentStatusChartInstance = new Chart(canvasElement, donutChartConfig);
    return studentStatusChartInstance;
  } catch (error) {
    console.error('Error creating student status chart:', error);
    return null;
  }
}

// Create Payment Methods Bar Chart
export function createPaymentMethodsChart(canvasElement) {
  try {
    // Destroy existing chart if it exists
    if (paymentMethodChartInstance) {
      paymentMethodChartInstance.destroy();
    }
    
    paymentMethodChartInstance = new Chart(canvasElement, barChartConfig);
    return paymentMethodChartInstance;
  } catch (error) {
    console.error('Error creating payment methods chart:', error);
    return null;
  }
}

// Update Student Status Chart Data
export function updateStudentStatusData(newData) {
  if (studentStatusChartInstance) {
    studentStatusChartInstance.data.datasets[0].data = newData.data;
    if (newData.labels) {
      studentStatusChartInstance.data.labels = newData.labels;
    }
    studentStatusChartInstance.update('active');
  }
}

// Update Payment Methods Chart Data
export function updatePaymentMethodsData(newData) {
  if (paymentMethodChartInstance) {
    paymentMethodChartInstance.data.datasets[0].data = newData.data;
    if (newData.labels) {
      paymentMethodChartInstance.data.labels = newData.labels;
    }
    paymentMethodChartInstance.update('active');
  }
}

// Get Chart Statistics based on current time period
export function getStudentStatusStats() {
  const currentData = getCurrentData();
  const data = currentData.student.data;
  const total = data.reduce((a, b) => a + b, 0);
  
  return {
    paid: data[0],
    unpaid: data[1],
    late: data[2],
    total: total,
    paidPercentage: Math.round((data[0] / total) * 100),
    unpaidPercentage: Math.round((data[1] / total) * 100),
    latePercentage: Math.round((data[2] / total) * 100)
  };
}

export function getPaymentMethodsStats() {
  const currentData = getCurrentData();
  const data = currentData.payment.data;
  const total = data.reduce((a, b) => a + b, 0);
  
  // Base amounts for calculation
  const baseAmounts = {
    today: 1000,
    weekly: 4000,
    monthly: 10000,
    yearly: 120000
  };
  
  const multiplier = baseAmounts[currentTimePeriod] || 10000;
  
  return {
    cheque: formatNumberShort(data[0] * multiplier),
    cash: formatNumberShort(data[1] * multiplier),
    card: formatNumberShort(data[2] * multiplier),
    online: formatNumberShort(data[3] * multiplier),
    total: formatNumberShort(total * multiplier),
    chequePercentage: Math.round((data[0] / total) * 100),
    cashPercentage: Math.round((data[1] / total) * 100),
    cardPercentage: Math.round((data[2] / total) * 100),
    onlinePercentage: Math.round((data[3] / total) * 100)
  };
}

// Cleanup function
export function destroyCharts() {
  if (studentStatusChartInstance) {
    studentStatusChartInstance.destroy();
    studentStatusChartInstance = null;
  }
  if (paymentMethodChartInstance) {
    paymentMethodChartInstance.destroy();
    paymentMethodChartInstance = null;
  }
}

// Change time period and update charts
export function changeTimePeriod(period) {
  if (!timeBasedData[period]) return false;
  
  currentTimePeriod = period;
  const currentData = getCurrentData();
  
  // Update student status chart
  if (studentStatusChartInstance) {
    studentStatusChartInstance.data.datasets[0].data = currentData.student.data;
    studentStatusChartInstance.update('active');
  }
  
  // Update payment methods chart
  if (paymentMethodChartInstance) {
    paymentMethodChartInstance.data.datasets[0].data = currentData.payment.data;
    paymentMethodChartInstance.update('active');
  }
  
  return true;
}

// Get current time period
export function getCurrentTimePeriod() {
  return currentTimePeriod;
}

// Get available time periods
export function getAvailableTimePeriods() {
  return Object.keys(timeBasedData);
}

// Resize handler
export function handleChartResize() {
  if (studentStatusChartInstance) {
    studentStatusChartInstance.resize();
  }
  if (paymentMethodChartInstance) {
    paymentMethodChartInstance.resize();
  }
}

// Export the format function for external use
export { formatNumberShort };


// Sample data generator
export const getSampleData = () => {
  const students = [
    { name: 'John Smith', admissionNo: 'STU001', class: '10th A' },
    { name: 'Emily Johnson', admissionNo: 'STU002', class: '10th B' },
    { name: 'Michael Brown', admissionNo: 'STU003', class: '9th A' },
    { name: 'Sarah Wilson', admissionNo: 'STU004', class: '9th B' },
    { name: 'David Lee', admissionNo: 'STU005', class: '10th A' },
    { name: 'Jessica Davis', admissionNo: 'STU006', class: '10th B' },
    { name: 'Robert Miller', admissionNo: 'STU007', class: '9th A' },
    { name: 'Ashley Garcia', admissionNo: 'STU008', class: '9th B' },
    { name: 'James Rodriguez', admissionNo: 'STU009', class: '10th A' },
    { name: 'Amanda Martinez', admissionNo: 'STU010', class: '10th B' },
    { name: 'Christopher Taylor', admissionNo: 'STU011', class: '9th A' },
    { name: 'Jennifer Anderson', admissionNo: 'STU012', class: '9th B' },
    { name: 'Matthew Thomas', admissionNo: 'STU013', class: '10th A' },
    { name: 'Lauren Jackson', admissionNo: 'STU014', class: '10th B' },
    { name: 'Daniel White', admissionNo: 'STU015', class: '9th A' }
  ];

  const feeTypes = ['Online', 'Cash', 'Cheque'];
  const collectors = ['John Admin', 'Mary Clerk', 'Tom Manager', 'Lisa Staff'];
  const statuses = ['paid', 'unpaid', 'late'];

  return students.map((student, index) => {
    const fee = Math.floor(Math.random() * 5000) + 2000;
    const discount = Math.floor(Math.random() * 500);
    const fine = Math.floor(Math.random() * 200);
    const total = fee - discount + fine;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate dates for the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      paymentId: `PAY${String(index + 1).padStart(4, '0')}`,
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }),
      admissionNo: student.admissionNo,
      name: student.name,
      class: student.class,
      feeType: feeTypes[Math.floor(Math.random() * feeTypes.length)],
      collectedBy: collectors[Math.floor(Math.random() * collectors.length)],
      fee: fee,
      paid: status === 'paid' ? NewCurrency(total) : status === 'unpaid' ? '₹0' : NewCurrency(Math.floor(total * 0.7)),
      status: status,
      discount: discount > 0 ? NewCurrency(discount) : '₹0',
      fine: fine > 0 ? fine : 0,
      total: total
    };
  });
};

// Filter data based on various criteria
export const filterData = (data, filters) => {
  let filtered = [...data];

  // Time Duration Filter
  if (filters.timeDuration !== 'all') {
    const today = new Date();
    const filterDate = new Date();

    switch (filters.timeDuration) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= filterDate;
        });
        break;
      case 'weekly':
        filterDate.setDate(today.getDate() - 7);
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= filterDate;
        });
        break;
      case 'monthly':
        filterDate.setMonth(today.getMonth() - 1);
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= filterDate;
        });
        break;
      case 'yearly':
        filterDate.setFullYear(today.getFullYear() - 1);
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= filterDate;
        });
        break;
    }
  }

  // Class Filter
  if (filters.classFilter !== 'all') {
    filtered = filtered.filter(item => item.class === filters.classFilter);
  }

  // Section Filter
  if (filters.sectionFilter !== 'all') {
    filtered = filtered.filter(item => item.class.includes(filters.sectionFilter));
  }

  // Fee Type Filter
  if (filters.feeTypeFilter !== 'all') {
    filtered = filtered.filter(item => item.feeType === filters.feeTypeFilter);
  }

  // Defaulters Filter
  if (filters.defaultersFilter !== 'all') {
    filtered = filtered.filter(item => item.status === filters.defaultersFilter);
  }

  // Search Filter
  if (filters.searchInput.trim() !== '') {
    const searchTerm = filters.searchInput.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.admissionNo.toLowerCase().includes(searchTerm) ||
      item.paymentId.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
};

// Format currency values
export const NewCurrency = (amount) => {
  if (typeof amount === 'number') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return amount;
};

// Download data as CSV
export const downloadData = (data) => {
  if (!data || data.length === 0) {
    alert('No data available to download');
    return;
  }

  // Define CSV headers
  const headers = [
    'Payment ID',
    'Date',
    'Admission No.',
    'Name',
    'Class',
    'Fee Type',
    'Collected By',
    'Fee',
    'Paid',
    'Discount',
    'Fine',
    'Total'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      row.paymentId,
      row.date,
      row.admissionNo,
      `"${row.name}"`, // Wrap in quotes to handle names with commas
      row.class,
      row.feeType,
      `"${row.collectedBy}"`, // Wrap in quotes to handle names with commas
      row.fee,
      `"${row.paid}"`, // Wrap in quotes to handle currency symbols
      `"${row.discount}"`, // Wrap in quotes to handle currency symbols
      row.fine,
      row.total
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `school_fee_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Your browser does not support file downloads');
  }
};


// ₹ Function


// Pie Chart
export function renderPieChart(ctx, data, isDonut = false, classCount = 10) {
  let labels = [];
  let backgroundColors = [];

  if (isDonut) {
    for (let i = 1; i <= classCount; i++) {
      labels.push(`${i}${getOrdinalSuffix(i)} Class`);
      backgroundColors.push(getClassColor(i));
    }
  } else {
    // Pie chart: fixed 3 labels
    labels = ['Present', 'Late', 'Absent'];
    backgroundColors = ['#28a745', '#fd7e14', '#dc3545'];
    data = data.slice(0, 3); 
  }

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
      }]
    },
    options: {
      cutout: isDonut ? '60%' : '0%', 
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }
  });
}

// Ordinal suffix helper
function getOrdinalSuffix(n) {
  const j = n % 10, k = n % 100;
  if (j == 1 && k != 11) return "st";
  if (j == 2 && k != 12) return "nd";
  if (j == 3 && k != 13) return "rd";
  return "th";
}

// Enough distinct colors for classes
function getClassColor(index) {
  const colors = [
    '#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#fd7e14',
    '#20c997', '#17a2b8', '#ffc107', '#28a745', '#dc3545',
  ];
  return colors[(index - 1) % colors.length];
}
