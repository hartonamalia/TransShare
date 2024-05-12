const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const reviewController = require("../controllers/reviewController");

router.post("/add", reviewController.addReview);

router.post("/comment", reviewController.postComment);

router.get("/:carId", reviewController.getReviewsByCarId);

module.exports = router;
