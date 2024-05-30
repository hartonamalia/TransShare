const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const RenterReview = require("../models/renterReviewModel");

const createRenterReview = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token not formatted properly" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { userId, reviewerId, rating, review } = req.body;

    if (!userId || !reviewerId || !rating || !review) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingReview = await RenterReview.findOne({ userId, reviewerId });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already posted a review for this renter" });
    }
    const renterReview = await RenterReview.createRenterReview(
      userId,
      reviewerId,
      rating,
      review
    );

    res.status(201).json(renterReview);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const getRenterReviews = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token not formatted properly" });
  }

  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const renterReviews = await RenterReview.getRenterReviews(userId);

    res.status(200).json(renterReviews);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports = { createRenterReview, getRenterReviews };
