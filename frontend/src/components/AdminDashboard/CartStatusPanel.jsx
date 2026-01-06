import React from 'react'
import './CartStatusPanel.css'

function CartStatusPanel({ cart, movement }) {
  if (!cart) {
    return (
      <div className="status-panel-card">
        <p>Loading...</p>
      </div>
    )
  }

  const getCurrentStopName = () => {
    if (!movement) return 'Unknown'
    const stops = ['Main Gate', 'Library', 'A1 Cafe', 'OBC Cafe', 'Engineering Block 1']
    return stops[movement.currentStopIndex] || 'Unknown'
  }

  const getDirectionText = () => {
    if (!movement) return 'Unknown'
    return movement.direction === 1 ? 'Forward' : 'Backward'
  }

  return (
    <div className="status-panel-card">
      <div className="card-header">
        <h2>Cart Status</h2>
      </div>

      <div className="status-details">
        <div className="status-section">
          <h3>Cart Information</h3>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{cart.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-badge status-${cart.status}`}>
              {cart.status.toUpperCase()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Speed:</span>
            <span className="detail-value">{cart.speed} km/h</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Capacity:</span>
            <span className="detail-value">{cart.currentPassengers} / {cart.capacity}</span>
          </div>
        </div>

        <div className="status-section">
          <h3>Route Information</h3>
          <div className="detail-row">
            <span className="detail-label">Current Stop:</span>
            <span className="detail-value">{getCurrentStopName()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Stop Index:</span>
            <span className="detail-value">{movement?.currentStopIndex ?? 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Direction:</span>
            <span className="detail-value">{getDirectionText()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">At Stop:</span>
            <span className="detail-value">
              {movement?.isAtStop ? 'Yes' : 'No'}
            </span>
          </div>
          {movement && !movement.isAtStop && (
            <div className="detail-row">
              <span className="detail-label">Progress:</span>
              <span className="detail-value">
                {Math.round(movement.progress * 100)}%
              </span>
            </div>
          )}
          {movement?.isAtStop && movement.stopWaitTime > 0 && (
            <div className="detail-row">
              <span className="detail-label">Wait Time:</span>
              <span className="detail-value">
                {movement.stopWaitTime * 3} seconds
              </span>
            </div>
          )}
        </div>

        <div className="status-section">
          <h3>Location</h3>
          <div className="detail-row">
            <span className="detail-label">Latitude:</span>
            <span className="detail-value coordinate">
              {cart.currentLocation.lat.toFixed(6)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Longitude:</span>
            <span className="detail-value coordinate">
              {cart.currentLocation.lng.toFixed(6)}
            </span>
          </div>
          {cart.currentLocation.heading && (
            <div className="detail-row">
              <span className="detail-label">Heading:</span>
              <span className="detail-value">
                {Math.round(cart.currentLocation.heading)}°
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartStatusPanel

