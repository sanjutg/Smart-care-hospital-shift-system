import AnimatedStaffCard from './AnimatedStaffCard'
import './AvailableStaff.css'

const AvailableStaff = ({ staff }) => {
  const { doctors = [], nurses = [] } = staff

  return (
    <div className="staff-container">
      <div className="staff-section">
        <h3 className="staff-section-title">
          Available Doctors
          <span className="staff-count">{doctors.length}</span>
        </h3>
        {doctors.length > 0 ? (
          <div className="staff-list">
            {doctors.map((doctor) => (
              <AnimatedStaffCard key={doctor._id} staff={doctor} />
            ))}
          </div>
        ) : (
          <div className="no-staff-message">No available doctors at this time.</div>
        )}
      </div>

      <div className="staff-section">
        <h3 className="staff-section-title">
          Available Nurses
          <span className="staff-count">{nurses.length}</span>
        </h3>
        {nurses.length > 0 ? (
          <div className="staff-list">
            {nurses.map((nurse) => (
              <AnimatedStaffCard key={nurse._id} staff={nurse} />
            ))}
          </div>
        ) : (
          <div className="no-staff-message">No available nurses at this time.</div>
        )}
      </div>
    </div>
  )
}

export default AvailableStaff



