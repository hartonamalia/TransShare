const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aiChatSchema = new Schema({
  userId: String,
  aiConversationId: String,
  message: String,
  sender: String,
  date: Date,
});

aiChatSchema.statics.createAiChat = async function (
  userId,
  aiConversationId,
  message,
  sender
) {
  if (!userId || !aiConversationId || !message || !sender) {
    throw new Error("Missing required fields");
  }
  console.log("userId", userId);

  const aiChat = new this({
    userId,
    aiConversationId,
    message,
    sender,
    date: new Date(),
  });

  await aiChat.save();
  return aiChat;
};

aiChatSchema.statics.getAiChats = async function (userId, aiConversationId) {
  if (!userId || !aiConversationId) {
    throw new Error("Missing required fields");
  }

  const aiChats = await this.find({ userId, aiConversationId }).sort({
    date: 1,
  });
  return aiChats;
};


module.exports = mongoose.model("AiChat", aiChatSchema);
