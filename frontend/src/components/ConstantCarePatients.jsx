import AnimatedPatientCard from './AnimatedPatientCard'
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
        <AnimatedPatientCard key={patient._id} patient={patient} />
      ))}
    </div>
  )
}

export default ConstantCarePatients



