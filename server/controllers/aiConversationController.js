const jwt = require("jsonwebtoken");
const AiConversation = require("../models/aiConversationModel");

const createAiConversation = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Bearer token not formatted properly" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const aiConversation = await AiConversation.createAiConversation(userId, name);
    return res.status(201).json(aiConversation);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAiConversations = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Bearer token not formatted properly" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const aiConversations = await AiConversation.getAiConversations(userId);
    return res.status(200).json(aiConversations);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createAiConversation, getAiConversations };
