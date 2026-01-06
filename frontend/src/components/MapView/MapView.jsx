import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import './MapView.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom cart icons
const createCartIcon = (color) => {
  const cartIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
      <rect x="8" y="12" width="16" height="8" rx="1" fill="white"/>
      <circle cx="12" cy="22" r="2" fill="white"/>
      <circle cx="20" cy="22" r="2" fill="white"/>
    </svg>
  `
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cartIconSvg),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  })
}

const redCartIcon = createCartIcon('#ef4444')
const blueCartIcon = createCartIcon('#3b82f6')

// Custom stop icon
const stopIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="white"/>
  </svg>
`
const stopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(stopIconSvg),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

// Selected stop icon
const selectedStopIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
    <circle cx="14" cy="14" r="12" fill="#10b981" stroke="white" stroke-width="3"/>
    <circle cx="14" cy="14" r="5" fill="white"/>
  </svg>
`
const selectedStopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(selectedStopIconSvg),
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14]
})

function MapView({ route, cartLocation, selectedStop, onStopSelect, carts }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current && route && route.stops && route.stops.length > 0) {
      const bounds = L.latLngBounds(
        route.stops.map(stop => [stop.coordinates.lat, stop.coordinates.lng])
      )
      if (cartLocation) {
        bounds.extend([cartLocation.lat, cartLocation.lng])
      }
      if (carts && carts.length > 0) {
        carts.forEach(cart => {
          if (cart.currentLocation) {
            bounds.extend([cart.currentLocation.lat, cart.currentLocation.lng])
          }
        })
      }
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [route, cartLocation, carts])

  if (!route || !route.stops) {
    return (
      <div className="map-placeholder">
        <p>Loading map...</p>
      </div>
    )
  }

  // Default center falls back to MMDU Mullana campus if route is not yet available
  const center = route.stops[0]?.coordinates || { lat: 30.27241, lng: 77.05043 }
  const routePath = route.stops.map(stop => [stop.coordinates.lat, stop.coordinates.lng])

  return (
    <div className="map-view">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route path */}
        <Polyline
          positions={routePath}
          color="#667eea"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />

        {/* Route stops */}
        {route.stops.map((stop) => {
          const isSelected = selectedStop && selectedStop.id === stop.id
          return (
            <Marker
              key={stop.id}
              position={[stop.coordinates.lat, stop.coordinates.lng]}
              icon={isSelected ? selectedStopIcon : stopIcon}
              eventHandlers={{
                click: () => onStopSelect(stop)
              }}
            >
              <Popup>
                <div className="stop-popup">
                  <strong>{stop.name}</strong>
                  <p>Stop #{stop.order}</p>
                  {isSelected && <span className="selected-badge">Selected</span>}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {/* Cart locations */}
        {carts && carts.map((cart) => {
          if (!cart.currentLocation) return null
          const isRedCart = cart.name.includes('Red')
          const icon = isRedCart ? redCartIcon : blueCartIcon
          const color = isRedCart ? '#ef4444' : '#3b82f6'
          
          return (
            <React.Fragment key={cart.id}>
              <Marker
                position={[cart.currentLocation.lat, cart.currentLocation.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="cart-popup">
                    <strong>{cart.name}</strong>
                    <p>Status: {cart.status}</p>
                    <p>Current Location</p>
                    <p className="coordinates">
                      {cart.currentLocation.lat.toFixed(6)}, {cart.currentLocation.lng.toFixed(6)}
                    </p>
                  </div>
                </Popup>
              </Marker>
              {cart.currentLocation.heading && (
                <CircleMarker
                  key={`circle-${cart.id}`}
                  center={[cart.currentLocation.lat, cart.currentLocation.lng]}
                  radius={8}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.3
                  }}
                />
              )}
            </React.Fragment>
          )
        })}

        {/* Legacy single cart support */}
        {!carts && cartLocation && (
          <>
            <Marker
              position={[cartLocation.lat, cartLocation.lng]}
              icon={redCartIcon}
            >
              <Popup>
                <div className="cart-popup">
                  <strong>Red Cart-1</strong>
                  <p>Current Location</p>
                  <p className="coordinates">
                    {cartLocation.lat.toFixed(6)}, {cartLocation.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
            {cartLocation.heading && (
              <CircleMarker
                center={[cartLocation.lat, cartLocation.lng]}
                radius={8}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.3
                }}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView

