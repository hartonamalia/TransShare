const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const {
  loginUser,
  signupUser,
  updateUserDetails,
  changeUserPassword,
  updateUserDateOfBirth,
  updateProfilePicture,
  getUserIdDetails,
} = require("../controllers/userController");
const { getUserDetails } = require("../controllers/userController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user-details", getUserDetails);
router.get("/user-id-details/:id", getUserIdDetails);
router.post(
  "/user-pictures",
  upload.single("image"),
  updateProfilePicture
);
router.put("/update-details", updateUserDetails);
router.post("/change-password", changeUserPassword);
router.post("/dateOfBirth", updateUserDateOfBirth);

module.exports = router;
