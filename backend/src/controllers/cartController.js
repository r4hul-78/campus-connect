const { getAllCarts, getCartById, getCartMovementById } = require('../models/cartModel');
const { calculateETAWithDirection } = require('../utils/etaCalculator');
const { getRouteB } = require('../models/routeModel');

                              const getAllCartsHandler = (req, res) => {
  res.json(getAllCarts());
};

const getCartByIdHandler = (req, res) => {
  const { cartId } = req.params;
  const cart = getCartById(cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
};

const getCartLocation = (req, res) => {
  const { cartId } = req.params;
  const cart = getCartById(cartId);
  if (cart) {
    res.json({
      cartId: cart.id,
      location: cart.currentLocation,
      currentStop: cart.currentStop,
      nextStop: cart.nextStop,
      status: cart.status,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
};

const getCartETA = (req, res) => {
  const { cartId, stopId } = req.params;
  
  const cart = getCartById(cartId);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  
  const routeB = getRouteB();
  const targetStop = routeB.stops.find(s => s.id === stopId);
  if (!targetStop) {
    return res.status(404).json({ error: 'Stop not found' });
  }
  
  const targetStopIndex = routeB.stops.findIndex(s => s.id === stopId);
  const cartMovement = getCartMovementById(cartId);
  
  // Calculate ETA considering cart direction and route
  const etaResult = calculateETAWithDirection(
    cartMovement.currentStopIndex,
    targetStopIndex,
    cartMovement.direction,
    cartMovement.progress,
    cartMovement.isAtStop,
    cartMovement.stopWaitTime,
    cart
  );
  
  res.json({
    stopId,
    stopName: targetStop.name,
    distance: Math.round(etaResult.distance),
    eta: etaResult.etaMinutes,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getAllCarts: getAllCartsHandler,
  getCartById: getCartByIdHandler,
  getCartLocation,
  getCartETA
};

