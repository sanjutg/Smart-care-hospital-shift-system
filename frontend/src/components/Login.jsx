import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  // Mock login - for when backend is not connected
  const mockLogin = (email, password) => {
    // Mock users for testing
    const mockUsers = {
      'admin@hospital.com': { _id: '1', name: 'Admin Manager', email: 'admin@hospital.com', role: 'admin', department: 'Administration', specialization: 'Hospital Management', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0001' },
      'sarah.johnson@hospital.com': { _id: '2', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', role: 'doctor', department: 'Cardiology', specialization: 'Cardiac Surgery', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0101' },
      'michael.chen@hospital.com': { _id: '3', name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', role: 'doctor', department: 'Emergency', specialization: 'Emergency Medicine', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0102' },
      'patricia.brown@hospital.com': { _id: '7', name: 'Nurse Patricia Brown', email: 'patricia.brown@hospital.com', role: 'nurse', department: 'ICU', specialization: '', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0201' },
      'robert.taylor@hospital.com': { _id: '8', name: 'Nurse Robert Taylor', email: 'robert.taylor@hospital.com', role: 'nurse', department: 'Emergency', specialization: '', isAvailable: true, isEmergencyAvailable: true, contactNumber: '555-0202' }
    }

    const validPasswords = ['admin123', 'doctor123', 'nurse123']
    
    if (mockUsers[email] && validPasswords.includes(password)) {
      return mockUsers[email]
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Try mock login first (for when backend is not connected)
      const mockUser = mockLogin(email, password)
      if (mockUser) {
        login(mockUser)
        return
      }

      // If backend is connected, use this instead:
      // const response = await axios.post('/api/auth/login', { email, password })
      // login(response.data.user)

      // If no mock user found, show error
      setError('Invalid email or password')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Hospital Shift Management</h1>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-help">
          <p><strong>Demo Credentials:</strong></p>
          <p>Admin: admin@hospital.com / admin123</p>
          <p>Doctor: sarah.johnson@hospital.com / doctor123</p>
          <p>Nurse: patricia.brown@hospital.com / nurse123</p>
        </div>
      </div>
    </div>
  )
}

export default Login



