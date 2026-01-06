# Campus Connect - Architecture Documentation

## Overview

Campus Connect is a web-based College Cart Tracking System built with a React frontend and Node.js/Express backend. The application provides real-time tracking of electric carts on campus routes.

## System Architecture

```
┌─────────────────┐
│   React Frontend │
│   (Port 5173)    │
└────────┬─────────┘
         │ HTTP/REST API
         │
┌────────▼─────────┐
│  Express Backend │
│   (Port 3001)    │
└────────┬─────────┘
         │
┌────────▼─────────┐
│   Cart Models    │
│  (In-Memory)     │
└──────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Maps:** Leaflet & React-Leaflet
- **Styling:** CSS with CSS Variables (Theme System)

### Component Structure

```
frontend/src/
├── components/
│   ├── Home/                    # Landing page
│   ├── StudentDashboard/        # Student view
│   ├── AdminDashboard/          # Admin control panel
│   ├── MapView/                 # Interactive map component
│   ├── CartInfo/                # Cart information display
│   └── RouteInfo/               # Route and ETA information
├── styles/
│   ├── theme.css                # CSS variables and theme
│   ├── index.css                # Global styles
│   └── App.css                  # App-level styles
├── App.jsx                       # Main app component
└── main.jsx                      # Entry point
```

### State Management
- React Hooks (`useState`, `useEffect`, `useRef`)
- Component-level state management
- API calls via `fetch`

### Theme System
- Centralized CSS variables in `theme.css`
- Consistent color palette and spacing
- Responsive design with mobile support

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Development:** Nodemon (auto-reload)

### Project Structure

```
backend/src/
├── controllers/          # Request handlers
│   ├── routeController.js
│   ├── cartController.js
│   └── adminController.js
├── models/              # Data models
│   ├── routeModel.js    # Route data
│   ├── Cart.js          # Cart class (OOP)
│   └── cartModel.js     # Cart collection manager
├── routes/              # API route definitions
│   └── index.js
├── utils/               # Utility functions
│   ├── distanceCalculator.js
│   └── etaCalculator.js
└── server.js            # Express server setup
```

### API Endpoints

#### Route Endpoints
- `GET /api/route` - Get route information

#### Cart Endpoints
- `GET /api/carts` - Get all carts
- `GET /api/cart/:cartId` - Get specific cart
- `GET /api/cart/:cartId/location` - Get cart location
- `GET /api/cart/:cartId/eta/:stopId` - Get ETA to stop

#### Admin Endpoints
- `GET /api/admin/data` - Get all carts with movement data
- `POST /api/admin/cart/start` - Start a cart
- `POST /api/admin/cart/stop` - Stop a cart
- `POST /api/admin/cart/reset` - Reset cart route
- `POST /api/admin/cart/toggle-status` - Toggle cart status

### Cart Movement System

#### Cart Class (OOP)
- Each cart is an instance of the `Cart` class
- Manages its own state: location, status, movement
- Simulates movement between stops
- Handles direction reversal at route boundaries
- Implements stop wait times

#### Movement Logic
1. **Progress Tracking:** Tracks progress between stops (0-1)
2. **Direction Management:** Handles forward/backward movement
3. **Stop Handling:** Implements wait times at stops
4. **Boundary Detection:** Reverses direction at route ends
5. **Location Updates:** Updates coordinates based on progress

#### ETA Calculation
- Considers current cart position
- Accounts for direction of travel
- Calculates time to reach target stop
- Handles route reversals
- Returns 0 if cart is already at stop

## Data Models

### Route Model
```javascript
{
  id: 'route-b',
  name: 'Route B',
  stops: [
    {
      id: 'stop-1',
      name: 'Main Gate',
      order: 1,
      coordinates: { lat, lng }
    },
    // ... more stops
  ]
}
```

### Cart Model
```javascript
{
  id: 'red-cart-1',
  name: 'Red Cart-1',
  routeId: 'route-b',
  capacity: 7,
  currentPassengers: 5,
  currentLocation: { lat, lng, heading },
  currentStop: 'stop-1',
  nextStop: 'stop-2',
  status: 'moving' | 'stopped' | 'idle',
  speed: 25 // km/h
}
```

### Cart Movement State
```javascript
{
  currentStopIndex: 0,
  direction: 1 | -1,
  progress: 0.0-1.0,
  isAtStop: true | false,
  stopWaitTime: 5 // seconds
}
```

## Key Features

### Real-time Updates
- Frontend polls backend every 3 seconds
- Cart locations update continuously
- ETA recalculates based on current position

### Multi-Cart Support
- OOP-based cart management
- Each cart operates independently
- Supports multiple carts on same route

### Admin Controls
- Start/Stop cart movement
- Reset cart to initial position
- Toggle cart status
- View detailed cart information

### Student Features
- View all available carts
- Select cart to track
- View ETA to any stop
- Interactive map with markers

## Security Considerations

- CORS enabled for development
- No authentication (MVP stage)
- Input validation needed for production
- Environment variables for sensitive data

## Future Enhancements

- User authentication and authorization
- Database integration (replace in-memory storage)
- WebSocket for real-time updates (replace polling)
- Driver dashboard
- Mobile app support
- Push notifications
# Campus Connect - Architecture Documentation

## Overview

Campus Connect is a web-based College Cart Tracking System built with a React frontend and Node.js/Express backend. The application provides real-time tracking of electric carts on campus routes.

## System Architecture

```
┌─────────────────┐
│   React Frontend │
│   (Port 5173)    │
└────────┬─────────┘
         │ HTTP/REST API
         │
┌────────▼─────────┐
│  Express Backend │
│   (Port 3001)    │
└────────┬─────────┘
         │
┌────────▼─────────┐
│   Cart Models    │
│  (In-Memory)     │
└──────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Maps:** Leaflet & React-Leaflet
- **Styling:** CSS with CSS Variables (Theme System)

### Component Structure

```
frontend/src/
├── components/
│   ├── Home/                    # Landing page
│   ├── StudentDashboard/        # Student view
│   ├── AdminDashboard/          # Admin control panel
│   ├── MapView/                 # Interactive map component
│   ├── CartInfo/                # Cart information display
│   └── RouteInfo/               # Route and ETA information
├── styles/
│   ├── theme.css                # CSS variables and theme
│   ├── index.css                # Global styles
│   └── App.css                  # App-level styles
├── App.jsx                       # Main app component
└── main.jsx                      # Entry point
```

### State Management
- React Hooks (`useState`, `useEffect`, `useRef`)
- Component-level state management
- API calls via `fetch`

### Theme System
- Centralized CSS variables in `theme.css`
- Consistent color palette and spacing
- Responsive design with mobile support

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Development:** Nodemon (auto-reload)

### Project Structure

```
backend/src/
├── controllers/          # Request handlers
│   ├── routeController.js
│   ├── cartController.js
│   └── adminController.js
├── models/              # Data models
│   ├── routeModel.js    # Route data
│   ├── Cart.js          # Cart class (OOP)
│   └── cartModel.js     # Cart collection manager
├── routes/              # API route definitions
│   └── index.js
├── utils/               # Utility functions
│   ├── distanceCalculator.js
│   └── etaCalculator.js
└── server.js            # Express server setup
```

### API Endpoints

#### Route Endpoints
- `GET /api/route` - Get route information

#### Cart Endpoints
- `GET /api/carts` - Get all carts
- `GET /api/cart/:cartId` - Get specific cart
- `GET /api/cart/:cartId/location` - Get cart location
- `GET /api/cart/:cartId/eta/:stopId` - Get ETA to stop

#### Admin Endpoints
- `GET /api/admin/data` - Get all carts with movement data
- `POST /api/admin/cart/start` - Start a cart
- `POST /api/admin/cart/stop` - Stop a cart
- `POST /api/admin/cart/reset` - Reset cart route
- `POST /api/admin/cart/toggle-status` - Toggle cart status

### Cart Movement System

#### Cart Class (OOP)
- Each cart is an instance of the `Cart` class
- Manages its own state: location, status, movement
- Simulates movement between stops
- Handles direction reversal at route boundaries
- Implements stop wait times

#### Movement Logic
1. **Progress Tracking:** Tracks progress between stops (0-1)
2. **Direction Management:** Handles forward/backward movement
3. **Stop Handling:** Implements wait times at stops
4. **Boundary Detection:** Reverses direction at route ends
5. **Location Updates:** Updates coordinates based on progress

#### ETA Calculation
- Considers current cart position
- Accounts for direction of travel
- Calculates time to reach target stop
- Handles route reversals
- Returns 0 if cart is already at stop

## Data Models

### Route Model
```javascript
{
  id: 'route-b',
  name: 'Route B',
  stops: [
    {
      id: 'stop-1',
      name: 'Main Gate',
      order: 1,
      coordinates: { lat, lng }
    },
    // ... more stops
  ]
}
```

### Cart Model
```javascript
{
  id: 'red-cart-1',
  name: 'Red Cart-1',
  routeId: 'route-b',
  capacity: 7,
  currentPassengers: 5,
  currentLocation: { lat, lng, heading },
  currentStop: 'stop-1',
  nextStop: 'stop-2',
  status: 'moving' | 'stopped' | 'idle',
  speed: 25 // km/h
}
```

### Cart Movement State
```javascript
{
  currentStopIndex: 0,
  direction: 1 | -1,
  progress: 0.0-1.0,
  isAtStop: true | false,
  stopWaitTime: 5 // seconds
}
```

## Key Features

### Real-time Updates
- Frontend polls backend every 3 seconds
- Cart locations update continuously
- ETA recalculates based on current position

### Multi-Cart Support
- OOP-based cart management
- Each cart operates independently
- Supports multiple carts on same route

### Admin Controls
- Start/Stop cart movement
- Reset cart to initial position
- Toggle cart status
- View detailed cart information

### Student Features
- View all available carts
- Select cart to track
- View ETA to any stop
- Interactive map with markers

## Security Considerations

- CORS enabled for development
- No authentication (MVP stage)
- Input validation needed for production
- Environment variables for sensitive data

## Future Enhancements

- User authentication and authorization
- Database integration (replace in-memory storage)
- WebSocket for real-time updates (replace polling)
- Driver dashboard
- Mobile app support
- Push notifications
- Route optimization
- Historical data tracking
