import React from 'react'
import './CartInfo.css'

function CartInfo({ cart }) {
  if (!cart) {
    return (
      <div className="cart-info">
        <div className="info-card">
          <p>Loading cart information...</p>
        </div>
      </div>
    )
  }

  const occupancyPercentage = Math.round((cart.currentPassengers / cart.capacity) * 100)
  const availableSeats = cart.capacity - cart.currentPassengers

  return (
    <div className="cart-info">
      <div className="info-card">
        <div className="card-header">
          <h2>Cart Information</h2>
          <span className="status-badge status-moving">{cart.status}</span>
        </div>
        
        <div className="cart-details">
          <div className="detail-item">
            <span className="detail-label">Cart Name</span>
            <span className="detail-value cart-name">{cart.name}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Route</span>
            <span className="detail-value">Route B</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Capacity</span>
            <span className="detail-value">{cart.capacity} seats</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Current Passengers</span>
            <span className="detail-value">{cart.currentPassengers} / {cart.capacity}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Available Seats</span>
            <span className={`detail-value ${availableSeats === 0 ? 'full' : ''}`}>
              {availableSeats} {availableSeats === 1 ? 'seat' : 'seats'}
            </span>
          </div>

          <div className="occupancy-bar-container">
            <div className="occupancy-label">
              <span>Occupancy</span>
              <span className="occupancy-percentage">{occupancyPercentage}%</span>
            </div>
            <div className="occupancy-bar">
              <div 
                className="occupancy-fill"
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Speed</span>
            <span className="detail-value">{cart.speed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartInfo

