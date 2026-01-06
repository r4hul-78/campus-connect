/**
 * Campus Connect - Backend Server
 * 
 * Express server for the Campus Connect application.
 * Handles API requests for cart tracking, route information, and admin controls.
 * 
 * @file server.js
 * @author Campus Connect Team
 */

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Campus Connect Backend Server running on http://localhost:${PORT}`);
});

