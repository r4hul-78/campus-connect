const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');
const cartController = require('../controllers/cartController');
const adminController = require('../controllers/adminController');

// Route endpoints
router.get('/routes', routeController.getAllRoutes);
router.get('/routes/:routeId', routeController.getRouteById);

// Cart endpoints
router.get('/carts', cartController.getAllCarts);
router.get('/carts/:cartId', cartController.getCartById);
router.get('/carts/:cartId/location', cartController.getCartLocation);
router.get('/carts/:cartId/eta/:stopId', cartController.getCartETA);

// Admin endpoints
router.get('/admin/data', adminController.getAdminData);
router.post('/admin/cart/start', adminController.startCartMovement);
router.post('/admin/cart/stop', adminController.stopCartMovement);
router.post('/admin/cart/reset', adminController.resetRoute);
router.post('/admin/cart/toggle-status', adminController.toggleStatus);

module.exports = router;

