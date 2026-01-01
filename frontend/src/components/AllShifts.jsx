import './AllShifts.css'

const AllShifts = () => {
  // Mock shifts data
  const mockShifts = [
    {
      _id: '1',
      date: new Date(),
      startTime: '08:00',
      endTime: '16:00',
      department: 'ICU',
      assignedUsers: [
        { _id: '1', name: 'Dr. James Wilson', role: 'doctor', department: 'ICU' },
        { _id: '2', name: 'Nurse Patricia Brown', role: 'nurse', department: 'ICU' }
      ]
    },
    {
      _id: '2',
      date: new Date(Date.now() + 86400000),
      startTime: '16:00',
      endTime: '00:00',
      department: 'Emergency',
      assignedUsers: [
        { _id: '3', name: 'Dr. Michael Chen', role: 'doctor', department: 'Emergency' },
        { _id: '4', name: 'Nurse Robert Taylor', role: 'nurse', department: 'Emergency' }
      ]
    },
    {
      _id: '3',
      date: new Date(Date.now() + 86400000 * 2),
      startTime: '00:00',
      endTime: '08:00',
      department: 'Cardiology',
      assignedUsers: [
        { _id: '5', name: 'Dr. Sarah Johnson', role: 'doctor', department: 'Cardiology' },
        { _id: '6', name: 'Dr. Lisa Anderson', role: 'doctor', department: 'Cardiology' }
      ]
    }
  ]

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="all-shifts">
      <h2>All Scheduled Shifts</h2>
      <div className="shifts-list">
        {mockShifts.map((shift) => (
          <div key={shift._id} className="shift-card">
            <div className="shift-header">
              <div>
                <h3>{formatDate(shift.date)}</h3>
                <p className="shift-time">{shift.startTime} - {shift.endTime}</p>
              </div>
              <span className="department-badge">{shift.department}</span>
            </div>
            <div className="shift-staff">
              <h4>Assigned Staff:</h4>
              <div className="staff-list">
                {shift.assignedUsers.map((staff, index) => (
                  <div key={staff._id || index} className="staff-item">
                    <span className="staff-name">{staff.name}</span>
                    <span className="staff-role">{staff.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllShifts


