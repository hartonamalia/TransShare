const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  createRenterReview,
  getRenterReviews,
} = require("../controllers/renterReviewController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("", createRenterReview);
router.get("/:userId", getRenterReviews);

module.exports = router;