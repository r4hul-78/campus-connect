import React, { useState, useEffect, useRef } from 'react'
import MapView from '../MapView/MapView'
import RouteInfo from '../RouteInfo/RouteInfo'
import CartInfo from '../CartInfo/CartInfo'
import './StudentDashboard.css'

const API_BASE_URL = '/api'

function StudentDashboard() {
  const [route, setRoute] = useState(null)
  const [carts, setCarts] = useState([])
  const [selectedCart, setSelectedCart] = useState(null)
  const selectedCartIdRef = useRef(null) // Track selected cart ID separately
  const [selectedStop, setSelectedStop] = useState(null)
  const [eta, setEta] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRouteData()
    fetchCartsData()
    
    // Update cart locations every 3 seconds
    const locationInterval = setInterval(() => {
      fetchCartsData()
    }, 3000)

    return () => clearInterval(locationInterval)
  }, [])

  useEffect(() => {
    if (selectedStop && selectedCart) {
      fetchETA(selectedCart.id, selectedStop.id)
      const etaInterval = setInterval(() => {
        fetchETA(selectedCart.id, selectedStop.id)
      }, 5000)
      return () => clearInterval(etaInterval)
    }
  }, [selectedStop, selectedCart])

  const fetchRouteData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/route-b`)
      const data = await response.json()
      setRoute(data)
      if (data.stops && data.stops.length > 0) {
        setSelectedStop(data.stops[0])
      }
    } catch (error) {
      console.error('Error fetching route:', error)
    }
  }

  const fetchCartsData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/carts`)
      const data = await response.json()
      setCarts(data)
      
      // Use ref to track selected cart ID (avoids closure issues)
      const currentSelectedId = selectedCartIdRef.current
      
      if (data.length > 0) {
        if (currentSelectedId) {
          // Update selected cart data without changing selection
          const updatedCart = data.find(c => c.id === currentSelectedId)
          if (updatedCart) {
            setSelectedCart(updatedCart)
          } else {
            // Selected cart no longer exists, select first available
            selectedCartIdRef.current = data[0].id
            setSelectedCart(data[0])
          }
        } else {
          // No cart selected yet, select first one and set ref
          selectedCartIdRef.current = data[0].id
          setSelectedCart(data[0])
        }
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching carts:', error)
      setLoading(false)
    }
  }

  const fetchETA = async (cartId, stopId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/${cartId}/eta/${stopId}`)
      const data = await response.json()
      setEta(data)
    } catch (error) {
      console.error('Error fetching ETA:', error)
    }
  }

  const handleStopSelect = (stop) => {
    setSelectedStop(stop)
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading campus cart information...</p>
      </div>
    )
  }

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="map-container">
            <MapView
              route={route}
              carts={carts}
              selectedStop={selectedStop}
              onStopSelect={handleStopSelect}
            />
          </div>

          <div className="info-panel">
            <div className="cart-selector">
              <label>Select Cart:</label>
              <select 
                value={selectedCart?.id || ''} 
                onChange={(e) => {
                  const cart = carts.find(c => c.id === e.target.value)
                  if (cart) {
                    selectedCartIdRef.current = cart.id
                    setSelectedCart(cart)
                  }
                }}
              >
                {carts.map(cart => (
                  <option key={cart.id} value={cart.id}>
                    {cart.name} ({cart.status})
                  </option>
                ))}
              </select>
            </div>
            <CartInfo cart={selectedCart} />
            <RouteInfo
              route={route}
              selectedStop={selectedStop}
              eta={eta}
              onStopSelect={handleStopSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

