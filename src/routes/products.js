// productRouter.js
const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const protectedRoute = require("../middleware/auth");
// GET all products
router.get("/", productController.getAllProducts);

// GET a specific product by ID
router.get("/:id", productController.getProductById);

// POST a new product
router.post("/", protectedRoute, productController.createProduct);

// PUT (Update) a product by ID
router.put("/:id", protectedRoute, productController.updateProduct);

// DELETE a product by ID
router.delete("/:id", protectedRoute, productController.deleteProduct);

module.exports = router;
