import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './LoginModal.css'

const LoginModal = ({ role, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  // Mock login - for when backend is not connected
  const mockLogin = (email, password, selectedRole) => {
    // Mock users for testing
    const mockUsers = {
      'admin@hospital.com': { _id: '1', name: 'Admin Manager', email: 'admin@hospital.com', role: 'admin', department: 'Administration', specialization: 'Hospital Management', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0001' },
      'sarah.johnson@hospital.com': { _id: '2', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', role: 'doctor', department: 'Cardiology', specialization: 'Cardiac Surgery', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0101' },
      'michael.chen@hospital.com': { _id: '3', name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', role: 'doctor', department: 'Emergency', specialization: 'Emergency Medicine', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0102' },
      'patricia.brown@hospital.com': { _id: '7', name: 'Nurse Patricia Brown', email: 'patricia.brown@hospital.com', role: 'nurse', department: 'ICU', specialization: '', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0201' },
      'robert.taylor@hospital.com': { _id: '8', name: 'Nurse Robert Taylor', email: 'robert.taylor@hospital.com', role: 'nurse', department: 'Emergency', specialization: '', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0202' }
    }

    const validPasswords = ['admin123', 'doctor123', 'nurse123']
    
    const user = mockUsers[email]
    if (user && validPasswords.includes(password) && user.role === selectedRole) {
      return user
    }
    return null
  }

  const getDefaultEmail = () => {
    const defaults = {
      admin: 'admin@hospital.com',
      doctor: 'sarah.johnson@hospital.com',
      nurse: 'patricia.brown@hospital.com'
    }
    return defaults[role] || ''
  }

  const getDefaultPassword = () => {
    const defaults = {
      admin: 'admin123',
      doctor: 'doctor123',
      nurse: 'nurse123'
    }
    return defaults[role] || ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Try mock login first (for when backend is not connected)
      const mockUser = mockLogin(email, password, role)
      if (mockUser) {
        login(mockUser)
        onClose()
        return
      }

      // If no mock user found, show error
      setError(`Invalid credentials for ${role}. Please check your email and password.`)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFillDemo = () => {
    setEmail(getDefaultEmail())
    setPassword(getDefaultPassword())
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form-modal">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="button" className="demo-button" onClick={handleFillDemo}>
            Fill Demo Credentials
          </button>

          <button type="submit" className="login-button-modal" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="modal-footer">
          <p>Demo: Click "Fill Demo Credentials" for quick login</p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal


