const Review = require("../models/review");
const User = require("../models/user");
const Product = require("../models/product");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user").populate("product");
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { user, product, rating, comment } = req.body;

  try {
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

    const review = new Review({ user, product, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { user, product, rating, comment } = req.body;

  try {
    // Check if the provided review ID is valid
    const reviewExists = await Review.exists({ _id: id });
    if (!reviewExists) {
      return res.status(404).json({ message: "Review not found" });
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

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { user, product, rating, comment },
      { new: true }
    )
      .populate("user")
      .populate("product");

    res.json(updatedReview);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided review ID is valid
    const reviewExists = await Review.exists({ _id: id });
    if (!reviewExists) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Review.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};
