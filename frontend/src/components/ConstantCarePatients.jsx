import './ConstantCarePatients.css'

const ConstantCarePatients = ({ patients }) => {
  if (!patients || patients.length === 0) {
    return (
      <div className="no-data">
        No patients requiring constant care at this time.
      </div>
    )
  }

  return (
    <div className="patients-container">
      {patients.map((patient) => (
        <div key={patient._id} className="patient-card">
          <div className="patient-header">
            <h3 className="patient-name">{patient.name}</h3>
            <span className="patient-id">ID: {patient.patientId}</span>
          </div>
          
          <div className="patient-details">
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{patient.department}</span>
            </div>
            
            {patient.assignedStaff && patient.assignedStaff.length > 0 ? (
              <div className="assigned-staff">
                <span className="detail-label">Assigned Staff:</span>
                <div className="staff-list">
                  {patient.assignedStaff.map((staff, index) => (
                    <span key={staff._id || index} className="staff-badge">
                      {staff.name} ({staff.role})
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-assignment">
                <span className="detail-label">Assigned Staff:</span>
                <span className="detail-value no-staff">Not assigned</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConstantCarePatients


