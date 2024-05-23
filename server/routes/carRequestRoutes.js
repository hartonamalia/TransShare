const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const { createCarRequest } = require("../controllers/carRequestController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/create-car-request", createCarRequest);


module.exports = router;