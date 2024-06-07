const jwt = require("jsonwebtoken");
const AiChat = require("../models/aiChatModel");

const createAiChat = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token not formatted properly" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;
    const { aiConversationId } = req.params;
    const { message, sender } = req.body;
    if (!aiConversationId || !message || !sender) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const aiChat = await AiChat.createAiChat(
      userId,
      aiConversationId,
      message,
      sender
    );
    console.log(aiChat);
    return res.status(201).json(aiChat);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAiChats = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token not formatted properly" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const { aiConversationId } = req.params;
    if (!aiConversationId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const aiChats = await AiChat.getAiChats(userId, aiConversationId);
    return res.status(200).json(aiChats);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createAiChat, getAiChats };
