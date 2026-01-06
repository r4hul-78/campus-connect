const { getAllCarts, getCartById, getCartMovementById, getCartInstance, startCart, stopCart, resetCartRoute, toggleCartStatus } = require('../models/cartModel');

// Start the cart
const startCartMovement = (req, res) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ success: false, error: 'Cart ID is required' });
    }
    
    const success = startCart(cartId);
    if (success) {
      const cart = getCartById(cartId);
      res.json({
        success: true,
        message: 'Cart started successfully',
        cart: cart
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Cart is already moving or not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Stop the cart
const stopCartMovement = (req, res) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ success: false, error: 'Cart ID is required' });
    }
    
    const success = stopCart(cartId);
    if (success) {
      const cart = getCartById(cartId);
      res.json({
        success: true,
        message: 'Cart stopped successfully',
        cart: cart
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Cart is already stopped or not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Reset cart route (reset to first stop)
const resetRoute = (req, res) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ success: false, error: 'Cart ID is required' });
    }
    
    const success = resetCartRoute(cartId);
    if (success) {
      const cart = getCartById(cartId);
      res.json({
        success: true,
        message: 'Cart route reset successfully',
        cart: cart
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Cart not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Toggle cart status
const toggleStatus = (req, res) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ success: false, error: 'Cart ID is required' });
    }
    
    const newStatus = toggleCartStatus(cartId);
    if (newStatus) {
      const cart = getCartById(cartId);
      res.json({
        success: true,
        message: `Cart status changed to ${newStatus}`,
        cart: cart
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Cart not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get admin dashboard data
const getAdminData = (req, res) => {
  try {
    const allCarts = getAllCarts();
    const cartsData = allCarts.map(cart => {
      const movement = getCartMovementById(cart.id);
      return {
        cart: cart,
        movement: movement
      };
    });
    
    res.json({
      carts: cartsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  startCartMovement,
  stopCartMovement,
  resetRoute,
  toggleStatus,
  getAdminData
};

