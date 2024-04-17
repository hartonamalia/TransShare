const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  getCarDetails,
  updateCarDetails,
} = require("../controllers/carController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/car-details", getCarDetails);
router.post("/update-car-details/:carId", updateCarDetails);

module.exports = router;
