const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  prefix: String,
  restPhoneNumber: Number,
  dateOfBirth: Date,
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  prefix,
  restPhoneNumber
) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    prefix,
    restPhoneNumber,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

userSchema.statics.getDetails = async function (_id) {
  if (!_id) {
    throw Error("Invalid user id");
  }

  const user = await this.findOne({ _id });
  if (!user) {
    throw Error("User with this id doesn't exist!");
  }
  return user;
};

userSchema.statics.updateDetails = async function (_id, newData) {
  if (!_id) {
    throw Error("Invalid user id");
  }

  const user = await this.findOneAndUpdate({ _id }, newData, { new: true });

  if (!user) {
    throw Error("User with this id doesn't exist!");
  }

  return user;
};

userSchema.statics.changePassword = async function (_id, newPassword) {
  console.log(newPassword);
  if (!_id || !newPassword) {
    throw Error("User ID and new password must be provided");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const user = await this.findByIdAndUpdate(
    _id,
    { password: hashedPassword },
    { new: true }
  );

  if (!user) {
    throw Error("User not found");
  }

  return user;
};

userSchema.statics.updateDateOfBirth = async function (_id, newDateOfBirth) {
  if (!_id || !newDateOfBirth) {
    throw Error("User ID and new date of birth must be provided");
  }

  if (!validator.isDate(newDateOfBirth)) {
    throw Error("Invalid date format");
  }

  const user = await this.findByIdAndUpdate(
    _id,
    { dateOfBirth: newDateOfBirth },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw Error("User not found");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
