const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  addMessage,
  getMessages,
} = require("../controllers/messageController.js");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/", addMessage);

router.get("/:chatId", getMessages);

module.exports = router;