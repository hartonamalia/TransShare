const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  createCarRequest,
  updateCarRequest,
  getCarRequests,
  getCheckAvailable,
  getCarRequestsByRenter,
  getCarRequestsByOwner,
  acceptCarRequest,
  getAlreadyRequested,  
} = require("../controllers/carRequestController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/:carId", createCarRequest);
router.put("/:requestId", updateCarRequest);
router.get("/all-requests/byCar/:carId", getCarRequests);
router.get("/all-requests/byOwner", getCarRequestsByOwner);
router.get("/check-available", getCheckAvailable);
router.get("/all-requests/byRenter", getCarRequestsByRenter);
router.put("/accept/:requestId", acceptCarRequest);
router.get("/already-requested/:carId", getAlreadyRequested);

module.exports = router;
