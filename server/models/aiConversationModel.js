const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aiConversationSchema = new Schema({
  userId: String,
  name: String,
});

aiConversationSchema.statics.createAiConversation = async function (
  userId,
  name
) {
  console.log(userId, name);
  if (!userId || !name) {
    throw new Error("Missing required fields");
  }

  const aiConversation = new this({
    userId,
    name,
  });

  await aiConversation.save();
  return aiConversation;
};

aiConversationSchema.statics.getAiConversations = async function (userId) {
  if (!userId) {
    throw new Error("Missing required fields");
  }

  const aiConversations = await this.find({ userId });
  return aiConversations;
};

aiConversationSchema.statics.deleteAiConversation = async function (
  userId,
  aiConversationId
) {
  if (!userId || !aiConversationId) {
    throw new Error("Missing required fields");
  }

  const aiConversation = await this.findOneAndDelete({
    userId,
    _id: aiConversationId,
  });
  return aiConversation;
};

const AiConversation = mongoose.model("AiConversation", aiConversationSchema);

module.exports = AiConversation;
