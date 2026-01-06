import React from 'react'
import './CartControlPanel.css'

function CartControlPanel({ cart, movement, onStart, onStop, onReset, onToggleStatus, loading }) {
  if (!cart) {
    return (
      <div className="control-panel-card">
        <p>Loading...</p>
      </div>
    )
  }

  const isMoving = cart.status === 'moving'
  const isStopped = cart.status === 'stopped'
  const isIdle = cart.status === 'idle'

  return (
    <div className="control-panel-card">
      <div className="card-header">
        <h2>Cart Controls</h2>
      </div>

      <div className="control-buttons">
        <button
          className={`control-btn start-btn ${isMoving ? 'active' : ''}`}
          onClick={onStart}
          disabled={isMoving || loading}
        >
          <span className="btn-icon">▶</span>
          <span>Start Cart</span>
        </button>

        <button
          className={`control-btn stop-btn ${isStopped ? 'active' : ''}`}
          onClick={onStop}
          disabled={isStopped || loading}
        >
          <span className="btn-icon">⏸</span>
          <span>Stop Cart</span>
        </button>

        <button
          className="control-btn reset-btn"
          onClick={onReset}
          disabled={loading}
        >
          <span className="btn-icon">↺</span>
          <span>Reset Route</span>
        </button>

        <button
          className={`control-btn toggle-btn ${isIdle ? 'active' : ''}`}
          onClick={onToggleStatus}
          disabled={loading}
        >
          <span className="btn-icon">🔄</span>
          <span>Toggle Status</span>
          <span className="status-indicator">({cart.status})</span>
        </button>
      </div>

      <div className="control-info">
        <div className="info-item">
          <span className="info-label">Current Status:</span>
          <span className={`info-value status-${cart.status}`}>
            {cart.status.toUpperCase()}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">At Stop:</span>
          <span className="info-value">
            {movement?.isAtStop ? 'Yes' : 'No'}
          </span>
        </div>
        {movement && (
          <div className="info-item">
            <span className="info-label">Progress:</span>
            <span className="info-value">
              {Math.round(movement.progress * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartControlPanel

