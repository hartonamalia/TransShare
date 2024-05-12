const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  uploadCarImages,
  getCarImages,
} = require("../controllers/carController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.post("/post-car-image/:id", upload.array("images", 5), uploadCarImages);
router.get("/:id", getCarImages);

module.exports = router;
