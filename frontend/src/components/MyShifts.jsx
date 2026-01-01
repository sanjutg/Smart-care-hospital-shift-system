import './MyShifts.css'

const MyShifts = ({ shifts, user }) => {
  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (!shifts || shifts.length === 0) {
    return (
      <div className="no-data">
        <p>No shifts assigned at this time.</p>
      </div>
    )
  }

  return (
    <div className="my-shifts">
      <h2>My Upcoming Shifts</h2>
      <div className="shifts-list">
        {shifts.map((shift) => (
          <div key={shift._id} className="shift-card">
            <div className="shift-header">
              <div className="shift-date">
                <span className="date-text">{formatDate(shift.date)}</span>
              </div>
              <div className="shift-time">
                <span className="time-badge">{shift.startTime} - {shift.endTime}</span>
              </div>
            </div>
            <div className="shift-details">
              <div className="detail-item">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{shift.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Assigned Staff:</span>
                <div className="staff-list">
                  {shift.assignedUsers?.map((staff, index) => (
                    <span key={staff._id || index} className="staff-tag">
                      {staff.name} ({staff.role})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyShifts


