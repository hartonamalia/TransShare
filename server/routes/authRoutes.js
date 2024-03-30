const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  loginUser,
  signupUser,
  updateUserDetails,
  changeUserPassword,
  updateUserDateOfBirth,
} = require("../controllers/userController");
const { getUserDetails } = require("../controllers/userController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// router.get("/", test);
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", getProfile);

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/user-details", getUserDetails);
router.put("/update-details", updateUserDetails);
router.post("/change-password", changeUserPassword);
router.post("/dateOfBirth", updateUserDateOfBirth);

module.exports = router;
