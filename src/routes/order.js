// routes/orderRouter.js
const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");

router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/:id", orderController.getOrderById);

module.exports = router;
