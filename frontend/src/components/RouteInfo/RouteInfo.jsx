import React from 'react'
import './RouteInfo.css'

function RouteInfo({ route, selectedStop, eta, onStopSelect }) {
  if (!route) {
    return (
      <div className="route-info">
        <div className="info-card">
          <p>Loading route information...</p>
        </div>
      </div>
    )
  }

  const getCurrentStopName = (stopId) => {
    const stop = route.stops.find(s => s.id === stopId)
    return stop ? stop.name : 'Unknown'
  }

  return (
    <div className="route-info">
      <div className="info-card">
        <div className="card-header">
          <h2>Route Information</h2>
        </div>

        <div className="route-details">
          <div className="route-name-section">
            <span className="route-label">Route</span>
            <span className="route-name">{route.name}</span>
          </div>

          <div className="eta-section">
            {selectedStop && eta && (
              <>
                <div className="eta-header">
                  <span className="eta-label">ETA to {selectedStop.name}</span>
                </div>
                <div className="eta-display">
                  <span className="eta-time">{eta.eta}</span>
                  <span className="eta-unit">minutes</span>
                </div>
                <div className="eta-details">
                  <span>Distance: {eta.distance} m</span>
                </div>
              </>
            )}
          </div>

          <div className="stops-section">
            <h3 className="stops-title">Route Stops</h3>
            <div className="stops-list">
              {route.stops.map((stop, index) => {
                const isSelected = selectedStop && selectedStop.id === stop.id
                return (
                  <div
                    key={stop.id}
                    className={`stop-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => onStopSelect(stop)}
                  >
                    <div className="stop-number">{stop.order}</div>
                    <div className="stop-content">
                      <div className="stop-name">{stop.name}</div>
                      {isSelected && (
                        <div className="stop-eta">
                          {eta && (
                            <span className="eta-badge">
                              ETA: {eta.eta} min
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <div className="selected-indicator">✓</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouteInfo

