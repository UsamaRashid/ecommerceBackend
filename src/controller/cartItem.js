const CartItem = require("../models/cartItem");
const User = require("../models/user");
const Product = require("../models/product");

exports.getCartItems = async (req, res) => {
  try {
    const emailfromToken = req.currentUser.email;
    console.log("EMail", emailfromToken);
    const cartItems = await CartItem.findOne({ emailfromToken });
    res.json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

exports.createCartItem = async (req, res) => {
  const { user, product, quantity } = req.body;
  const userid = req.currentUser.userID;

  try {
    // Check if the provided user ID is valid
    if (user == userid) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const userExists = await User.exists({ _id: user });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the provided product ID is valid
    const productExists = await Product.exists({ _id: product });
    if (!productExists) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // check if cart item already exists for this user and product ID then add to quantity

    const cartItem = new CartItem({ user, product, quantity });
    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating cart item", error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { user, product, quantity } = req.body;

  try {
    // Check if the provided cart item ID is valid
    const cartItemExists = await CartItem.exists({ _id: id });
    if (!cartItemExists) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Check if the provided user ID is valid
    const userExists = await User.exists({ _id: user });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the provided product ID is valid
    const productExists = await Product.exists({ _id: product });
    if (!productExists) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedCartItem = await CartItem.findByIdAndUpdate(
      id,
      { user, product, quantity },
      { new: true }
    )
      .populate("user")
      .populate("product");

    res.json(updatedCartItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart item", error: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided cart item ID is valid
    const cartItemExists = await CartItem.exists({ _id: id });
    if (!cartItemExists) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await CartItem.findByIdAndDelete(id);
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};
