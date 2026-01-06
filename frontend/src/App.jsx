/**
 * Campus Connect - Main Application Component
 * 
 * Root component that handles navigation between Home, Student Dashboard, and Admin Dashboard.
 * 
 * @file App.jsx
 * @author Campus Connect Team
 */

import React, { useState } from 'react'
import Home from './components/Home/Home'
import StudentDashboard from './components/StudentDashboard/StudentDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import './styles/App.css'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'student', or 'admin'

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  return (
    <div className="App">
      {currentView === 'home' && <Home onNavigate={handleNavigate} />}
      {currentView === 'student' && (
        <>
          <button className="back-to-home-btn" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <StudentDashboard />
        </>
      )}
      {currentView === 'admin' && (
        <>
          <button className="back-to-home-btn" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <AdminDashboard />
        </>
      )}
    </div>
  )
}

export default App

