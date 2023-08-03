const Order = require("../models/order");
const User = require("../models/user");
const CartItem = require("../models/cartItem");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate({ path: "items", populate: { path: "product" } });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const {
    user,
    items,
    totalPrice,
    shippingAddress,
    paymentStatus,
    orderStatus,
  } = req.body;

  try {
    // Check if the provided user ID is valid
    const userExists = await User.exists({ _id: user });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the provided cart item IDs are valid
    const cartItemExists = await CartItem.exists({ _id: { $in: items } });
    if (!cartItemExists || items.length === 0) {
      return res.status(400).json({ message: "Invalid cart item IDs" });
    }

    const order = new Order({
      user,
      items,
      totalPrice,
      shippingAddress,
      paymentStatus,
      orderStatus,
    });
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    user,
    items,
    totalPrice,
    shippingAddress,
    paymentStatus,
    orderStatus,
  } = req.body;

  try {
    // Check if the provided order ID is valid
    const orderExists = await Order.exists({ _id: id });
    if (!orderExists) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the provided user ID is valid
    const userExists = await User.exists({ _id: user });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the provided cart item IDs are valid
    const cartItemExists = await CartItem.exists({ _id: { $in: items } });
    if (!cartItemExists || items.length === 0) {
      return res.status(400).json({ message: "Invalid cart item IDs" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        user,
        items,
        totalPrice,
        shippingAddress,
        paymentStatus,
        orderStatus,
      },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided order ID is valid
    const orderExists = await Order.exists({ _id: id });
    if (!orderExists) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided order ID is valid
    const order = await Order.findById(id)
      .populate("user")
      .populate({ path: "items", populate: { path: "product" } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};
