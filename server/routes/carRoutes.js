const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  getCarDetails,
  postCarDetails,
  updateCarDetails,
  getTopNewCars,
  getAllCars,
  getAllCarsByUserId,
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
router.put("/update-car-details/:carId", updateCarDetails);
router.get("/top-new-cars", getTopNewCars);
router.get("/all-cars", getAllCars);
router.get("/all-cars/:userId", getAllCarsByUserId);


module.exports = router;
