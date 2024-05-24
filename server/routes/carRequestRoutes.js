const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  createCarRequest,
  updateCarRequest,
  getCarRequests,
} = require("../controllers/carRequestController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/:carId", createCarRequest);
router.put("/:requestId", updateCarRequest);
router.get("/:carId", getCarRequests);

module.exports = router;
