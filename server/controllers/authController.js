const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};
//Register endpoint
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, prefix, restPhoneNumber } =
      req.body;
    if (
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      prefix === "" ||
      email === "" ||
      restPhoneNumber === ""
    ) {
      return res.json({
        error: "Please complete all the fields.",
      });
    }
    //check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }
    const hashedPassword = await hashPassword(password);

    //create user in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      prefix,
      restPhoneNumber,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    //check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, firstName: user.firstName },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
