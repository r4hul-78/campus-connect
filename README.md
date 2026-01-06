# Campus Connect 🚌

A web-based College Electric Cart Tracking System for **Maharishi Markandeshwar Engineering College**, Mullana, Ambala, Haryana.

## Features

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Student Dashboard
- 🗺️ **Interactive Map:** Real-time cart location tracking using Leaflet maps
- ⏱️ **ETA Calculation:** Estimated Time of Arrival to any stop
- 📍 **Route Information:** View all stops and select destination
- 🚌 **Multi-Cart Support:** Track multiple carts on the same route
- 📱 **Responsive Design:** Works on desktop and mobile devices

### Admin Dashboard
- 🎮 **Cart Controls:** Start, stop, and reset cart movement
- 🔄 **Status Toggle:** Change cart status (moving/stopped/idle)
- 📊 **Real-time Monitoring:** View cart location, speed, and status
- 🗺️ **Route Management:** Monitor cart progress along route
- 📈 **Detailed Information:** View cart capacity, passengers, and movement data

### Home Screen
- 🏠 **Landing Page:** Beautiful home screen with navigation
- 🎨 **Modern UI:** Gradient design with smooth animations
- 🔀 **Easy Navigation:** Quick access to Student and Admin dashboards

## 📁 Project Structure

```
campus-connect/
├── backend/                          # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── adminController.js   # Admin operations
│   │   │   ├── cartController.js    # Cart data endpoints
│   │   │   └── routeController.js   # Route endpoints
│   │   ├── models/                  # Data models
│   │   │   ├── Cart.js              # Cart class (OOP)
│   │   │   ├── cartModel.js         # Cart collection manager
│   │   │   └── routeModel.js        # Route data
│   │   ├── routes/                  # API route definitions
│   │   │   └── index.js             # Route configuration
│   │   ├── utils/                   # Utility functions
│   │   │   ├── distanceCalculator.js
│   │   │   └── etaCalculator.js
│   │   └── server.js                # Express server entry point
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── AdminDashboard/      # Admin control panel
│   │   │   ├── CartInfo/            # Cart information display
│   │   │   ├── Home/                # Landing page
│   │   │   ├── MapView/             # Interactive map
│   │   │   ├── RouteInfo/           # Route and ETA info
│   │   │   └── StudentDashboard/   # Student view
│   │   ├── styles/                  # CSS stylesheets
│   │   │   ├── theme.css           # Theme variables
│   │   │   ├── index.css           # Global styles
│   │   │   └── App.css             # App styles
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
├── scripts/                          # Helper scripts
│   ├── install-all.bat              # Install all dependencies
│   ├── start-backend.bat            # Start backend server
│   └── start-frontend.bat           # Start frontend server
│
├── .gitignore                        # Git ignore rules
├── LICENSE                           # MIT License
├── CONTRIBUTING.md                   # Contribution guidelines
├── ARCHITECTURE.md                   # Architecture documentation
└── README.md                         # This file
```

## Getting Started

### Prerequisites

**IMPORTANT: You must install Node.js first!**

1. Download and install Node.js from https://nodejs.org/ (LTS version)
2. Make sure to check "Add to PATH" during installation
3. Restart your terminal/PowerShell after installation
4. Verify installation by running:
   ```powershell
   node --version
   npm --version
   ```

### Installation

**Option 1: Using Batch Files (Easiest - No PowerShell Issues)**

1. Double-click `scripts\install-all.bat` to install all dependencies
2. Double-click `scripts\start-backend.bat` to start the backend (keep window open)
3. Double-click `scripts\start-frontend.bat` to start the frontend (keep window open)
4. Open http://localhost:5173 in your browser

**Option 2: Using Command Prompt (CMD)**

1. Open Command Prompt (not PowerShell)
2. Navigate to project directory:
   ```cmd
   cd "C:\Study\BTech 2nd Sem\DevArc\campusConnect\temp1"
   ```
3. Install backend dependencies:
   ```cmd
   cd backend
   npm.cmd install
   ```
4. Install frontend dependencies (in a new CMD window):
   ```cmd
   cd frontend
   npm.cmd install
   ```

**Option 3: Using PowerShell**

If you get PowerShell execution policy errors, use Option 1 or 2 above, or run PowerShell as Administrator and set execution policy.

### Running the Application

**Easiest Method:**
1. Double-click `scripts\start-backend.bat` (keep window open)
2. Double-click `scripts\start-frontend.bat` (keep window open)
3. Open http://localhost:5173 in your browser

**Manual Method (Command Prompt):**
1. Start the backend server:
   ```cmd
   cd backend
   npm.cmd start
   ```
   Backend runs on http://localhost:3001

2. Start the frontend development server (in a new CMD window):
   ```cmd
   cd frontend
   npm.cmd run dev
   ```
   Frontend runs on http://localhost:5173

## 🚀 Getting Started

### Prerequisites

**IMPORTANT: You must install Node.js first!**

1. Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
2. Make sure to check "Add to PATH" during installation
3. Restart your terminal/PowerShell after installation
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Installation

**Option 1: Using Batch Files (Easiest - Recommended for Windows)**

1. Double-click `scripts\install-all.bat` to install all dependencies
2. Double-click `scripts\start-backend.bat` to start the backend (keep window open)
3. Double-click `scripts\start-frontend.bat` to start the frontend (keep window open)
4. Open [http://localhost:5173](http://localhost:5173) in your browser

**Option 2: Manual Installation**

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Start Backend Server:**
```bash
cd backend
npm start          # Production mode
# or
npm run dev        # Development mode with auto-reload
```
Backend runs on [http://localhost:3001](http://localhost:3001)

**Start Frontend Server:**
```bash
cd frontend
npm run dev        # Development server
# or
npm run build      # Production build
npm run preview    # Preview production build
```
Frontend runs on [http://localhost:5173](http://localhost:5173)

## 🗺️ Current Implementation

### Route B
- **Location:** MMDU Campus, Mullana, Ambala, Haryana
- **Stops:**
  1. Main Gate
  2. Library
  3. A1 Cafe
  4. OBC Cafe
  5. Engineering Block 1

### Carts
- **Red Cart-1**
  - Capacity: 7 people
  - Speed: 25 km/h
  - Starting Position: Stop 1 (Main Gate)
  
- **Blue Cart-1**
  - Capacity: 5 people
  - Speed: 20 km/h
  - Starting Position: Stop 5 (Engineering Block 1)

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Maps:** Leaflet & React-Leaflet
- **Styling:** CSS with CSS Variables (Theme System)
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Development:** Nodemon (auto-reload)
- **Architecture:** RESTful API

## 📡 API Documentation

### Route Endpoints
- `GET /api/route` - Get route information

### Cart Endpoints
- `GET /api/carts` - Get all carts
- `GET /api/cart/:cartId` - Get specific cart
- `GET /api/cart/:cartId/location` - Get cart location
- `GET /api/cart/:cartId/eta/:stopId` - Get ETA to stop

### Admin Endpoints
- `GET /api/admin/data` - Get all carts with movement data
- `POST /api/admin/cart/start` - Start a cart
- `POST /api/admin/cart/stop` - Stop a cart
- `POST /api/admin/cart/reset` - Reset cart route
- `POST /api/admin/cart/toggle-status` - Toggle cart status

For detailed API documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Authors

- **Campus Connect Team** - *Initial work*

## 🙏 Acknowledgments

- Maharishi Markandeshwar Engineering College
- Leaflet for the amazing mapping library
- React and Express communities

