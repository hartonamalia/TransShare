const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  createAiConversation,
  getAiConversations,
} = require("../controllers/aiConversationController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/", createAiConversation);
router.get("/:userId", getAiConversations);

module.exports = router;
