const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Review = require("../models/reviewModel"); 

const addReview = async (req, res) => {
  try {
    const { userId, carId, dateOfComment, rating, comment } = req.body;
    const review = await Review.createReview(
      userId,
      carId,
      dateOfComment,
      rating,
      comment
    );
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const postComment = async (req, res) => {
  try {
    const { userId, carId, rating, comment } = req.body;
    const review = await Review.postComment(userId, carId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addReview,
  postComment,
};
