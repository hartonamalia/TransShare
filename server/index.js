const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/authRoutes");
const app = express();

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//moddleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//app.use("/", require("./routes/authRoutes"));
app.use("/api/user", userRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
