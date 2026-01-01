import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ApprovalRequests from './ApprovalRequests'
import AllShifts from './AllShifts'
import './RoleDashboard.css'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('approvals')

  // Mock requests for approval
  const mockApprovalRequests = [
    {
      _id: '1',
      requestedBy: { _id: '2', name: 'Dr. Sarah Johnson', role: 'doctor', department: 'Cardiology', contactNumber: '555-0101' },
      shift: {
        _id: '1',
        date: new Date(),
        startTime: '08:00',
        endTime: '16:00',
        department: 'Cardiology'
      },
      requestType: 'change',
      requestedDate: new Date(Date.now() + 86400000 * 2),
      reason: 'Family emergency',
      status: 'pending',
      createdAt: new Date()
    },
    {
      _id: '2',
      requestedBy: { _id: '7', name: 'Nurse Patricia Brown', role: 'nurse', department: 'ICU', contactNumber: '555-0201' },
      shift: {
        _id: '2',
        date: new Date(),
        startTime: '16:00',
        endTime: '00:00',
        department: 'ICU'
      },
      requestType: 'swap',
      requestedDate: new Date(Date.now() + 86400000 * 3),
      reason: 'Personal appointment',
      status: 'pending',
      createdAt: new Date()
    }
  ]

  return (
    <div className="role-dashboard">
      <div className="dashboard-header-section">
        <h1>Administrator Dashboard</h1>
        <p className="welcome-text">Welcome, {user?.name}</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'approvals' ? 'active' : ''}`}
          onClick={() => setActiveTab('approvals')}
        >
          Pending Approvals
        </button>
        <button
          className={`tab ${activeTab === 'shifts' ? 'active' : ''}`}
          onClick={() => setActiveTab('shifts')}
        >
          All Shifts
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'approvals' && <ApprovalRequests requests={mockApprovalRequests} />}
        {activeTab === 'shifts' && <AllShifts />}
      </div>
    </div>
  )
}

export default AdminDashboard


