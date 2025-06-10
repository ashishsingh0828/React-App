import React, { useState, useEffect } from 'react'
import { CalendarUtils } from '../../assets/js/main.js';
import './management.css'

function Event() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    audience: ''
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = () => {
    setModalType('add');
    setEventForm({
      title: '',
      date: selectedDate ? CalendarUtils.formatDate(selectedDate) : CalendarUtils.formatDate(new Date()),
      time: '',
      audience: ''
    });
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setModalType('edit');
    setSelectedEvent(event);
    setEventForm(event);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (modalType === 'add') {
      setEvents([...events, { ...eventForm, id: Date.now() }]);
    } else {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...eventForm, id: selectedEvent.id } : event
      ));
    }
    setShowModal(false);
    resetForm();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEventForm({ title: '', date: '', time: '', audience: '' });
    setSelectedEvent(null);
  };

  const handleExport = (format) => {
    switch (format) {
      case 'csv':
        CalendarUtils.exportToCSV(events);
        break;
      case 'json':
        CalendarUtils.exportToJSON(events);
        break;
      case 'pdf':
        CalendarUtils.exportToPDF(events);
        break;
    }
    setShowExportMenu(false);
  };

  const renderMonthView = () => {
    const daysInMonth = CalendarUtils.getDaysInMonth(currentYear, currentMonth);
    const firstDay = CalendarUtils.getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = CalendarUtils.getEventsForDate(events, date);
      const isToday = CalendarUtils.isToday(date);

      days.push(
        <div
          key={day}
          className={`day-cell ${isToday ? 'today' : ''}`}
          onClick={() => {
            setSelectedDate(date);
            handleAddEvent();
          }}
        >
          <div className="day-number">{day}</div>
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="event-item"
              onClick={(e) => {
                e.stopPropagation();
                handleEditEvent(event);
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {CalendarUtils.weekDays.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = CalendarUtils.getWeekDates(currentDate);
    const weekEvents = CalendarUtils.getEventsForWeek(events, weekDates);

    return (
      <div className="week-view">
        {weekDates.map((date, index) => {
          const dayEvents = CalendarUtils.getEventsForDate(events, date);
          const isToday = CalendarUtils.isToday(date);

          return (
            <div key={index} className={`week-day-cell ${isToday ? 'today' : ''}`}>
              <div className="week-day-header">
                <div className="week-day-name">{CalendarUtils.weekDays[index]}</div>
                <div className="week-day-number">{date.getDate()}</div>
              </div>
              <div
                className="week-day-content"
                onClick={() => {
                  setSelectedDate(date);
                  handleAddEvent();
                }}
              >
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className="event-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = CalendarUtils.getEventsForDate(events, currentDate);

    return (
      <div className="day-view">
        <div className="day-view-header">
          <div className="day-view-date">{currentDate.getDate()}</div>
          <div className="day-view-name">
            {CalendarUtils.weekDays[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}, {CalendarUtils.months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
        </div>
        <div className="day-view-content">
          <div className="day-view-events">
            {dayEvents.length > 0 ? (
              dayEvents.map(event => (
                <div
                  key={event.id}
                  className="day-event-item"
                  onClick={() => handleEditEvent(event)}
                >
                  <div className="day-event-title">{event.title}</div>
                  <div className="day-event-details">
                    <span>⏰ {event.time}</span>
                    <span>👥 {event.audience}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-events">No events scheduled for this day</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const monthsData = CalendarUtils.getMonthsInYear(currentYear);

    return (
      <div className="year-view">
        {monthsData.map((monthData, index) => {
          const monthEvents = CalendarUtils.getEventsForMonth(events, currentYear, index);
          const isCurrentMonth = CalendarUtils.isThisMonth(currentYear, index);

          return (
            <div
              key={index}
              className={`month-mini ${isCurrentMonth ? 'current' : ''}`}
              onClick={() => {
                setCurrentDate(new Date(currentYear, index, 1));
                setView('month');
              }}
            >
              <div className="month-mini-header">{monthData.name} {currentYear}</div>
              <div className="month-mini-grid">
                {CalendarUtils.weekDaysShort.map(day => (
                  <div key={day} className="month-mini-day-header">{day}</div>
                ))}
                {Array.from({ length: monthData.firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="month-mini-day empty"></div>
                ))}
                {Array.from({ length: monthData.daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const date = new Date(currentYear, index, day);
                  const dayEvents = CalendarUtils.getEventsForDate(events, date);
                  const isToday = CalendarUtils.isToday(date);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={day}
                      className={`month-mini-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                    >
                      {day}
                      {hasEvents && dayEvents.length > 1 && (
                        <div className="month-events-count">{dayEvents.length}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (view) {
      case 'month':
        return renderMonthView();
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
      case 'year':
        return renderYearView();
      default:
        return renderMonthView();
    }
  };

  return (
    <div>
      {/* Main Heading */}
      <div className="manage-notice manage-event flex justify-between flex-wrap py-16 px-16">
        <div className="download-headings">
          <p className='flex gap-4'>
            <ion-icon name="calendar-outline"></ion-icon>
            <span>
              Event
            </span>
          </p>
        </div>
        <div className="history-btn">
          <a className="flex"> <span><ion-icon name="time-outline"></ion-icon> </span>History!</a>
        </div>
      </div>

      {/* Schedule */}
      <div className="new-schedule">
        <div className="download-schedule">
          
        </div>
      </div>

      {/* Calendar Management Component */}
      <div className="calendar-container">
      <div className="calendar-header">
        <div className="download-section">
          <button
            className="download-btn"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            📥 Export
          </button>
          {showExportMenu && (
            <div className="export-menu">
              <div className="export-option" onClick={() => handleExport('csv')}>
                📊 Export CSV
              </div>
              <div className="export-option" onClick={() => handleExport('json')}>
                📄 Export JSON
              </div>
              <div className="export-option" onClick={() => handleExport('pdf')}>
                📋 Export Text
              </div>
            </div>
          )}
        </div>
        <button className="schedule-btn" onClick={handleAddEvent}>
          + Schedule Event
        </button>
      </div>

      <div className="calendar-main">
        <div className="calendar-controls">
          <div className="nav-controls">
            <button className="nav-btn" onClick={() => navigateMonth(-1)}>
              ←
            </button>
            <button className="today-btn" onClick={goToToday}>
              Today
            </button>
            <button className="nav-btn" onClick={() => navigateMonth(1)}>
              →
            </button>
          </div>

          <div className="current-month">
            {CalendarUtils.months[currentMonth]} {currentYear}
          </div>

          <div className="view-controls">
            {['month', 'week', 'day', 'year'].map(viewType => (
              <button
                key={viewType}
                className={`view-btn ${view === viewType ? 'active' : ''}`}
                onClick={() => setView(viewType)}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {renderCurrentView()}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {modalType === 'add' ? '📅 Add Event' : '✏️ Edit Event'}
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={eventForm.date ? CalendarUtils.parseDate(eventForm.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setEventForm({ ...eventForm, date: CalendarUtils.formatDate(date) });
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Audience</label>
              <input
                type="text"
                className="form-input"
                value={eventForm.audience}
                onChange={(e) => setEventForm({ ...eventForm, audience: e.target.value })}
                placeholder="Who is this event for?"
              />
            </div>

            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              {modalType === 'edit' && (
                <button
                  className="btn-danger"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              )}
              <button
                className="btn-primary"
                onClick={handleSaveEvent}
                disabled={!eventForm.title || !eventForm.date}
              >
                {modalType === 'add' ? 'Add Event' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Event;