const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  prefix: String,
  restPhoneNumber: Number,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
