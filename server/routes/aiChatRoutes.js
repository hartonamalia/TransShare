const express = require("express");
const router = express.Router();
const cors = require("cors");

const { createAiChat, getAiChats } = require("../controllers/aiChatController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/:aiConversationId/", createAiChat);
router.get("/:aiConversationId", getAiChats);

module.exports = router;
