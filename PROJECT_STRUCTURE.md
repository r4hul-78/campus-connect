# Campus Connect - Project Structure

This document provides an overview of the complete project structure organized for GitHub.

## 📁 Directory Structure

```
campus-connect/
│
├── 📄 Documentation Files
│   ├── README.md                    # Main project documentation
│   ├── LICENSE                     # MIT License
│   ├── CONTRIBUTING.md             # Contribution guidelines
│   ├── ARCHITECTURE.md             # Architecture documentation
│   ├── CHANGELOG.md                # Version history
│   └── PROJECT_STRUCTURE.md         # This file
│
├── 📦 Root Configuration
│   ├── package.json                 # Root package.json with scripts
│   └── .gitignore                   # Git ignore rules
│
├── 🔧 Backend (Node.js/Express)
│   └── backend/
│       ├── package.json
│       ├── package-lock.json
│       └── src/
│           ├── server.js            # Express server entry point
│           ├── controllers/        # Request handlers
│           │   ├── adminController.js
│           │   ├── cartController.js
│           │   └── routeController.js
│           ├── models/             # Data models
│           │   ├── Cart.js         # Cart class (OOP)
│           │   ├── cartModel.js    # Cart collection manager
│           │   └── routeModel.js   # Route data
│           ├── routes/             # API routes
│           │   └── index.js
│           └── utils/              # Utility functions
│               ├── distanceCalculator.js
│               └── etaCalculator.js
│
├── 🎨 Frontend (React/Vite)
│   └── frontend/
│       ├── package.json
│       ├── package-lock.json
│       ├── index.html
│       ├── vite.config.js
│       └── src/
│           ├── main.jsx            # React entry point
│           ├── App.jsx             # Main app component
│           ├── components/         # React components
│           │   ├── Home/           # Landing page
│           │   ├── StudentDashboard/
│           │   ├── AdminDashboard/
│           │   ├── MapView/
│           │   ├── CartInfo/
│           │   └── RouteInfo/
│           └── styles/             # CSS stylesheets
│               ├── theme.css       # Theme variables
│               ├── index.css       # Global styles
│               └── App.css         # App styles
│
├── 🚀 Scripts
│   └── scripts/
│       ├── install-all.bat         # Install all dependencies
│       ├── start-backend.bat       # Start backend server
│       └── start-frontend.bat      # Start frontend server
│
└── 📋 GitHub Templates
    └── .github/
        ├── ISSUE_TEMPLATE/
        │   ├── bug_report.md
        │   └── feature_request.md
        └── pull_request_template.md
```

## 📝 File Organization Standards

### Documentation Files
- **README.md**: Comprehensive project documentation with setup instructions
- **LICENSE**: MIT License file
- **CONTRIBUTING.md**: Guidelines for contributors
- **ARCHITECTURE.md**: Technical architecture documentation
- **CHANGELOG.md**: Version history and changes

### Code Organization
- **Backend**: Organized by MVC pattern (controllers, models, routes, utils)
- **Frontend**: Component-based structure with shared styles
- **Scripts**: Helper batch files for Windows users

### GitHub Integration
- **Issue Templates**: Standardized bug reports and feature requests
- **PR Template**: Consistent pull request format
- **.gitignore**: Comprehensive ignore rules for Node.js projects

## 🎯 Best Practices Implemented

1. ✅ **Clear Directory Structure**: Logical separation of concerns
2. ✅ **Comprehensive Documentation**: README, Architecture, Contributing guides
3. ✅ **Code Comments**: File headers in key files
4. ✅ **Version Control**: Proper .gitignore and GitHub templates
5. ✅ **Package Management**: Separate package.json for frontend and backend
6. ✅ **Consistent Naming**: kebab-case for files, PascalCase for components
7. ✅ **License File**: MIT License included
8. ✅ **Changelog**: Version history tracking

## 📦 Dependencies

### Backend Dependencies
- express: Web framework
- cors: Cross-origin resource sharing
- nodemon: Development auto-reload (dev dependency)

### Frontend Dependencies
- react: UI framework
- react-dom: React DOM bindings
- leaflet: Map library
- react-leaflet: React bindings for Leaflet
- vite: Build tool and dev server

## 🚀 Quick Start

1. Install dependencies: `npm run install:all` or use `scripts/install-all.bat`
2. Start backend: `npm run start:backend` or `scripts/start-backend.bat`
3. Start frontend: `npm run start:frontend` or `scripts/start-frontend.bat`

## 📚 Additional Resources

- See [README.md](./README.md) for detailed setup instructions
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
