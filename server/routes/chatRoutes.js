const express = require("express");
const cors = require("cors");
const router = express.Router();

const {
  createChat,
  findChat,
  userChats,
} = require("../controllers/chatController.js");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;