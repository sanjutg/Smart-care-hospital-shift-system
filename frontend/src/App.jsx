import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import DoctorDashboard from './components/DoctorDashboard'
import NurseDashboard from './components/NurseDashboard'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="App">
        <div className="loading-screen">Loading...</div>
      </div>
    )
  }

  const renderDashboard = () => {
    // If user is logged in, show role-based dashboard
    if (user) {
      switch (user.role) {
        case 'admin':
          return <AdminDashboard />
        case 'doctor':
          return <DoctorDashboard />
        case 'nurse':
          return <NurseDashboard />
        default:
          return <Dashboard />
      }
    }
    // If not logged in, show the home dashboard
    return <Dashboard />
  }

  return (
    <div className="App">
      <Navbar />
      {renderDashboard()}
    </div>
  )
}

export default App

