// routes/cartItemRouter.js
const express = require("express");
const router = express.Router();
const cartItemController = require("../controller/cartItem");
const protectedRoute = require("../middleware/auth");

// GET all cart items
router.get("/", protectedRoute, cartItemController.getCartItems);

// POST a new cart item
router.post("/", protectedRoute, cartItemController.createCartItem);

// PUT (Update) a cart item by ID
router.put("/:id", protectedRoute, cartItemController.updateCartItem);

// DELETE a cart item by ID
router.delete("/:id", protectedRoute, cartItemController.deleteCartItem);

// Add other routes for CartItem as needed (createCartItem, updateCartItem, deleteCartItem, etc.)

module.exports = router;
