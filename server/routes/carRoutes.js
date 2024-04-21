const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  getCarDetails,
  postCarDetails,
} = require("../controllers/carController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/car-details/:id", getCarDetails);
router.post("/post-car-details", postCarDetails);

module.exports = router;
