import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  const handleRoleClick = (role) => {
    setSelectedRole(role)
    setShowLoginModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  const getRoleDisplay = (role) => {
    const roles = {
      admin: 'Administrator',
      doctor: 'Doctor',
      nurse: 'Nurse'
    }
    return roles[role] || role
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h2>Hospital Shift Management</h2>
          </div>

          {user ? (
            <div className="navbar-user">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{getRoleDisplay(user.role)}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-login-buttons">
              <button 
                className="role-login-button admin"
                onClick={() => handleRoleClick('admin')}
              >
                Admin Login
              </button>
              <button 
                className="role-login-button doctor"
                onClick={() => handleRoleClick('doctor')}
              >
                Doctor Login
              </button>
              <button 
                className="role-login-button nurse"
                onClick={() => handleRoleClick('nurse')}
              >
                Nurse Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <LoginModal 
          role={selectedRole} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </>
  )
}

export default Navbar

