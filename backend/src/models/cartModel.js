const Cart = require('./Cart');

// Create cart instances
const carts = new Map();

// Red Cart-1: starts at stop 1 (Main Gate)
const redCart = new Cart('red-cart-1', 'Red Cart-1', 'route-b', 7, 0, 25);
carts.set('red-cart-1', redCart);

// Blue Cart-1: starts at stop 5 (Engineering Block 1)
const blueCart = new Cart('blue-cart-1', 'Blue Cart-1', 'route-b', 5, 4, 20);
carts.set('blue-cart-1', blueCart);

// Get all carts
const getAllCarts = () => {
  return Array.from(carts.values()).map(cart => cart.getData());
};

// Get cart by ID
const getCartById = (cartId) => {
  const cart = carts.get(cartId);
  return cart ? cart.getData() : null;
};

// Get cart movement by ID
const getCartMovementById = (cartId) => {
  const cart = carts.get(cartId);
  return cart ? cart.getMovement() : null;
};

// Get cart instance by ID (for admin operations)
const getCartInstance = (cartId) => {
  return carts.get(cartId);
};

// Start cart
const startCart = (cartId) => {
  const cart = carts.get(cartId);
  if (!cart) return false;
  return cart.start();
};

// Stop cart
const stopCart = (cartId) => {
  const cart = carts.get(cartId);
  if (!cart) return false;
  return cart.stop();
};

// Reset cart route
const resetCartRoute = (cartId) => {
  const cart = carts.get(cartId);
  if (!cart) return false;
  return cart.resetRoute();
};

// Toggle cart status
const toggleCartStatus = (cartId) => {
  const cart = carts.get(cartId);
  if (!cart) return null;
  return cart.toggleStatus();
};

module.exports = {
  getAllCarts,
  getCartById,
  getCartMovementById,
  getCartInstance,
  startCart,
  stopCart,
  resetCartRoute,
  toggleCartStatus
};
