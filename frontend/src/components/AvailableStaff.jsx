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
              <div key={doctor._id} className="staff-card">
                <div className="staff-header">
                  <span className="staff-name">{doctor.name}</span>
                  <span className="availability-dot available"></span>
                </div>
                <div className="staff-details">
                  <div className="staff-detail-item">
                    <span className="detail-label">Department:</span>
                    <span>{doctor.department}</span>
                  </div>
                  {doctor.specialization && (
                    <div className="staff-detail-item">
                      <span className="detail-label">Specialization:</span>
                      <span>{doctor.specialization}</span>
                    </div>
                  )}
                  {doctor.isEmergencyAvailable && (
                    <span className="emergency-badge">Emergency Available</span>
                  )}
                </div>
              </div>
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
              <div key={nurse._id} className="staff-card">
                <div className="staff-header">
                  <span className="staff-name">{nurse.name}</span>
                  <span className="availability-dot available"></span>
                </div>
                <div className="staff-details">
                  <div className="staff-detail-item">
                    <span className="detail-label">Department:</span>
                    <span>{nurse.department}</span>
                  </div>
                  {nurse.isEmergencyAvailable && (
                    <span className="emergency-badge">Emergency Available</span>
                  )}
                </div>
              </div>
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


