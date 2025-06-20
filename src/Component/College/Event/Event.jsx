import React from 'react'
import Calendar from './Calendar/Calendar';
function Event() {
  return (
    <div className='event'>
     {/* Calendar */}
     <div className="calendar-event">
<Calendar></Calendar>
     </div>
    </div>
  )
}

export default Event;
