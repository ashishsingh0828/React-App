import React from "react";
import {
  Users, BookOpen, Building, GraduationCap,
  CalendarDays, Star, LineChart, ClipboardList,
  Award, Bell, MessageSquare, Settings,
  Bookmark, Clock, UserCheck, Library, ChevronRight
} from "lucide-react";
import './Dashboard.css'
// Dashboard stats
const cards = [
  { title: "Students", icon: <Users size={24} />, color: "#6366f1", count: 1245, trend: "↑ 5% this month" },
  { title: "Teachers", icon: <GraduationCap size={24} />, color: "#0ea5e9", count: 83, trend: "↑ 2 this term" },
  { title: "Classes", icon: <Building size={24} />, color: "#10b981", count: 42, trend: "No change" },
  { title: "Subjects", icon: <BookOpen size={24} />, color: "#f59e0b", count: 28, trend: "New: Computer Science" },
  { title: "Exams", icon: <CalendarDays size={24} />, color: "#ec4899", count: 15, trend: "Ongoing: Midterms" },
  { title: "Achievements", icon: <Star size={24} />, color: "#8b5cf6", count: 56, trend: "3 new awards" },
  { title: "Attendance", icon: <UserCheck size={24} />, color: "#06b6d4", count: "94%", trend: "↑ 2% from last week" },
  { title: "Library Books", icon: <Library size={24} />, color: "#f97316", count: 5243, trend: "32 checked out" },
];

// Quick actions shortcuts
const quickActions = [
  { title: "Take Attendance", icon: <ClipboardList size={18} />, color: "#3b82f6" },
  { title: "Schedule Exam", icon: <CalendarDays size={18} />, color: "#f59e0b" },
  { title: "Send Notice", icon: <Bell size={18} />, color: "#ef4444" },
  { title: "New Lesson Plan", icon: <Bookmark size={18} />, color: "#10b981" },
];

// Announcements
const announcements = [
  { id: 1, title: "School Annual Day", date: "15 Oct 2023", icon: <Award size={16} />, iconColor: "#8b5cf6" },
  { id: 2, title: "Parent-Teacher Meeting", date: "20 Oct 2023", icon: <MessageSquare size={16} />, iconColor: "#ec4899" },
  { id: 3, title: "Midterm Exams Schedule", date: "25 Oct 2023", icon: <ClipboardList size={16} />, iconColor: "#f59e0b" },
];

// Activity data
const activities = [
  {
    id: 1,
    time: "10:30 AM",
    activity: "Ms. Sharma marked Class 10 attendance",
    icon: <UserCheck size={16} />,
    iconColor: "#0ea5e9",
  },
  {
    id: 2,
    time: "09:45 AM",
    activity: "New assignment posted for Mathematics",
    icon: <BookOpen size={16} />,
    iconColor: "#f59e0b",
  },
  {
    id: 3,
    time: "Yesterday",
    activity: "Parent meeting scheduled for Friday",
    icon: <MessageSquare size={16} />,
    iconColor: "#ec4899",
  },
  {
    id: 4,
    time: "Yesterday",
    activity: "Library books due for return",
    icon: <Clock size={16} />,
    iconColor: "#10b981",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col mb-16 sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">College ERP Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">Welcome back, Admin!</p>
        </div>
        <div className="flex gap-3 mt-24">

          <form className="form">
            <input type="checkbox" id="options-checkbox-btn" />
            <div id="select-btn" class="fx fx-justify-between">
              <div id="selected-value">
                <span>Select a platform</span>
              </div>
              <div id="chevrons">
                <i class="fas fa-chevron-up"></i>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="options">
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="codepen" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="codepen" />
                <i class="fab fa-codepen"></i>
                <span class="option-label">CodePen</span>
                <span class="option-value">CodePen</span>
              </div>
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="dribbble" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="dribbble" />
                <i class="fab fa-dribbble"></i>
                <span class="option-label">Dribbble</span>
                <span class="option-value">Dribbble</span>
              </div>
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="behance" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="behance" />
                <i class="fab fa-behance"></i>
                <span class="option-label">Behance</span>
                <span class="option-value">Behance</span>
              </div>
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="hackerrank" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="hackerrank" />
                <i class="fab fa-hackerrank"></i>
                <span class="option-label">HackerRank</span>
                <span class="option-value">HackerRank</span>
              </div>
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="stackoverflow" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="stackoverflow" />
                <i class="fab fa-stack-overflow"></i>
                <span class="option-label">StackOverflow</span>
                <span class="option-value">StackOverflow</span>
              </div>
              <div class="option">
                <input class="option-radio-btn top" type="radio" name="platform" value="freecodecamp" />
                <input class="option-radio-btn bottom" type="radio" name="platform" value="freecodecamp" />
                <i class="fab fa-free-code-camp"></i>
                <span class="option-label">FreeCodeCamp</span>
                <span class="option-value">FreeCodeCamp</span>
              </div>
              <div id="option-bg"></div>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${card.color}08, ${card.color}03)`,
              borderColor: `${card.color}20`, padding: '1.25rem',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 sm:p-3 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${card.color}26`,
                  padding: '8px',
                  borderRadius: '50%'
                }}
              >
                <div style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{card.title}</h4>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold mt-4 py-6 text-gray-900 mb-2">{card.count}</p>
              <div className="flex items-center gap-1  mt-4 text-xs sm:text-sm" style={{ color: card.color }}>
                <span className="truncate">{card.trend}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Dashboard;