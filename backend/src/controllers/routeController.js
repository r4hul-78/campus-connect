const { getRouteB } = require('../models/routeModel');

const getAllRoutes = (req, res) => {
  res.json([getRouteB()]);
};

const getRouteById = (req, res) => {
  const { routeId } = req.params;
  if (routeId === 'route-b') {
    res.json(getRouteB());
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById
};

