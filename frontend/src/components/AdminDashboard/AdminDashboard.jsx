import React, { useState, useEffect, useRef } from 'react'
import MapView from '../MapView/MapView'
import CartControlPanel from './CartControlPanel'
import CartStatusPanel from './CartStatusPanel'
import './AdminDashboard.css'

const API_BASE_URL = '/api'

function AdminDashboard() {
  const [route, setRoute] = useState(null)
  const [carts, setCarts] = useState([])
  const [selectedCartId, setSelectedCartId] = useState(null)
  const selectedCartIdRef = useRef(null) // Track selected cart ID separately to avoid closure issues
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})

  useEffect(() => {
    fetchRouteData()
    fetchAdminData()
    
    // Update cart location every 3 seconds
    const locationInterval = setInterval(() => {
      fetchAdminData()
    }, 3000)

    return () => clearInterval(locationInterval)
  }, [])

  const fetchRouteData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/routes/route-b`)
      const data = await response.json()
      setRoute(data)
    } catch (error) {
      console.error('Error fetching route:', error)
    }
  }

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/data`)
      const data = await response.json()
      const cartsData = data.carts || []
      setCarts(cartsData)
      
      // Use ref to track selected cart ID (avoids closure issues)
      const currentSelectedId = selectedCartIdRef.current
      
      if (cartsData.length > 0) {
        if (currentSelectedId) {
          // Verify selected cart still exists
          const cartExists = cartsData.find(c => c.cart.id === currentSelectedId)
          if (cartExists) {
            // Update state to match ref
            setSelectedCartId(currentSelectedId)
          } else {
            // Selected cart no longer exists, select first available
            selectedCartIdRef.current = cartsData[0].cart.id
            setSelectedCartId(cartsData[0].cart.id)
          }
        } else {
          // No cart selected yet, select first one and set ref
          selectedCartIdRef.current = cartsData[0].cart.id
          setSelectedCartId(cartsData[0].cart.id)
        }
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching admin data:', error)
      setLoading(false)
    }
  }

  const handleStartCart = async (cartId) => {
    setActionLoading(prev => ({ ...prev, [cartId]: true }))
    try {
      const response = await fetch(`${API_BASE_URL}/admin/cart/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartId })
      })
      const data = await response.json()
      if (data.success) {
        await fetchAdminData()
      }
    } catch (error) {
      console.error('Error starting cart:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [cartId]: false }))
    }
  }

  const handleStopCart = async (cartId) => {
    setActionLoading(prev => ({ ...prev, [cartId]: true }))
    try {
      const response = await fetch(`${API_BASE_URL}/admin/cart/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartId })
      })
      const data = await response.json()
      if (data.success) {
        await fetchAdminData()
      }
    } catch (error) {
      console.error('Error stopping cart:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [cartId]: false }))
    }
  }

  const handleResetRoute = async (cartId) => {
    if (!window.confirm('Are you sure you want to reset the cart route? This will move the cart back to the first stop.')) {
      return
    }
    setActionLoading(prev => ({ ...prev, [cartId]: true }))
    try {
      const response = await fetch(`${API_BASE_URL}/admin/cart/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartId })
      })
      const data = await response.json()
      if (data.success) {
        await fetchAdminData()
        await fetchRouteData()
      }
    } catch (error) {
      console.error('Error resetting route:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [cartId]: false }))
    }
  }

  const handleToggleStatus = async (cartId) => {
    setActionLoading(prev => ({ ...prev, [cartId]: true }))
    try {
      const response = await fetch(`${API_BASE_URL}/admin/cart/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartId })
      })
      const data = await response.json()
      if (data.success) {
        await fetchAdminData()
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    } finally {
      setActionLoading(prev => ({ ...prev, [cartId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="map-container">
            <MapView
              route={route}
              carts={carts.map(c => c.cart)}
              selectedStop={null}
              onStopSelect={() => {}}
            />
          </div>

          <div className="control-panel">
            <div className="cart-selector-section">
              <label className="cart-selector-label">Select Cart to Control:</label>
              <select 
                value={selectedCartId || ''} 
                onChange={(e) => {
                  const newCartId = e.target.value
                  selectedCartIdRef.current = newCartId
                  setSelectedCartId(newCartId)
                }}
                className="cart-selector-dropdown"
              >
                {carts.map(({ cart }) => (
                  <option key={cart.id} value={cart.id}>
                    {cart.name} ({cart.status})
                  </option>
                ))}
              </select>
            </div>

            {selectedCartId && (() => {
              const selectedCartData = carts.find(c => c.cart.id === selectedCartId)
              if (!selectedCartData) return null
              
              const { cart, movement } = selectedCartData
              return (
                <div className="cart-control-group">
                  <h3 className="cart-group-title">{cart.name}</h3>
                  <CartControlPanel
                    cart={cart}
                    movement={movement}
                    onStart={() => handleStartCart(cart.id)}
                    onStop={() => handleStopCart(cart.id)}
                    onReset={() => handleResetRoute(cart.id)}
                    onToggleStatus={() => handleToggleStatus(cart.id)}
                    loading={actionLoading[cart.id] || false}
                  />
                  <CartStatusPanel cart={cart} movement={movement} />
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

