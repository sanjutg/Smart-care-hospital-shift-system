import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import MyShifts from './MyShifts'
import ShiftRequests from './ShiftRequests'
import './RoleDashboard.css'

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('shifts')

  // Mock shifts data
  const mockShifts = [
    {
      _id: '1',
      date: new Date(),
      startTime: '08:00',
      endTime: '16:00',
      department: user?.department || 'Cardiology',
      assignedUsers: [{ _id: user?._id, name: user?.name, role: 'doctor', department: user?.department }]
    },
    {
      _id: '2',
      date: new Date(Date.now() + 86400000),
      startTime: '16:00',
      endTime: '00:00',
      department: user?.department || 'Cardiology',
      assignedUsers: [{ _id: user?._id, name: user?.name, role: 'doctor', department: user?.department }]
    }
  ]

  // Mock requests data
  const mockRequests = [
    {
      _id: '1',
      shift: mockShifts[0],
      requestType: 'change',
      requestedDate: new Date(Date.now() + 86400000 * 2),
      reason: 'Family emergency',
      status: 'pending',
      createdAt: new Date()
    }
  ]

  return (
    <div className="role-dashboard">
      <div className="dashboard-header-section">
        <h1>Doctor Dashboard</h1>
        <p className="welcome-text">Welcome, {user?.name}</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'shifts' ? 'active' : ''}`}
          onClick={() => setActiveTab('shifts')}
        >
          My Shifts
        </button>
        <button
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Shift Requests
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'shifts' && <MyShifts shifts={mockShifts} user={user} />}
        {activeTab === 'requests' && <ShiftRequests requests={mockRequests} user={user} />}
      </div>
    </div>
  )
}

export default DoctorDashboard


