import React from 'react'
import './Home.css'

function Home({ onNavigate }) {
  return (
    <div className="home-screen">
      <div className="home-container">
        <div className="home-content">
          <div className="logo-section">
            <div className="logo-icon">🚌</div>
            <h1 className="project-title">Campus Connect</h1>
            <p className="project-subtitle">A Campus Electric Cart Tracking System</p>
          </div>

          <div className="college-info">
            <h2 className="college-name">Maharishi Markandeshwar Engineering College</h2>
            <p className="college-location">Mullana, Ambala, Haryana</p>
          </div>

          <div className="dashboard-buttons">
            <button 
              className="dashboard-btn student-btn"
              onClick={() => onNavigate('student')}
            >
              <div className="btn-icon">👨‍🎓</div>
              <div className="btn-content">
                <h3>Student Dashboard</h3>
                <p>Track cart locations and view ETAs</p>
              </div>
              <div className="btn-arrow">→</div>
            </button>

            <button 
              className="dashboard-btn admin-btn"
              onClick={() => onNavigate('admin')}
            >
              <div className="btn-icon">👨‍💼</div>
              <div className="btn-content">
                <h3>Admin Dashboard</h3>
                <p>Control and manage cart operations</p>
              </div>
              <div className="btn-arrow">→</div>
            </button>
          </div>

          <div className="home-footer">
            <p>Real-time cart tracking for efficient campus transportation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

