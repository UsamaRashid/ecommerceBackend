const express = require("express");
const router = express.Router();
const reviewController = require("../controller/review");

// GET all reviews
router.get("/", reviewController.getAllReviews);

// POST a new review
router.post("/", reviewController.createReview);

// PUT (Update) a review by ID
router.put("/:id", reviewController.updateReview);

// DELETE a review by ID
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
