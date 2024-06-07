const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const carImageRoutes = require("./routes/carImageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const carRequestRoutes = require("./routes/carRequestRoutes");
const renterReviewRoutes = require("./routes/renterReviewRoutes");
const aiConversationRoutes = require("./routes/aiConversationRoutes");
const aiChatRoutes = require("./routes/aiChatRoutes");
const app = express();

app.use(cors());

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);
app.use("/api/car-image", carImageRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/car-request", carRequestRoutes);
app.use("/api/renter-review", renterReviewRoutes);
app.use("/api/ai-conversation", aiConversationRoutes);
app.use("/api/ai-chat", aiChatRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
