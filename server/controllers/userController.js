const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, prefix, restPhoneNumber } =
    req.body;
  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      prefix,
      restPhoneNumber
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
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
    const _id = decoded._id;

    const user = await User.getDetails(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ userDetails: user });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserDetails = async (req, res) => {
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
    const _id = decoded._id;

    let { firstName, lastName, prefix, restPhoneNumber } = req.body;
    const currentUserData = await User.getDetails(_id);
    firstName = firstName ? firstName : currentUserData.firstName;
    lastName = lastName ? lastName : currentUserData.lastName;
    prefix = prefix ? prefix : currentUserData.prefix;
    restPhoneNumber = restPhoneNumber
      ? restPhoneNumber
      : currentUserData.restPhoneNumber;
    const userDataToUpdate = { firstName, lastName, prefix, restPhoneNumber };
    const updatedUser = await User.updateDetails(_id, userDataToUpdate);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const changeUserPassword = async (req, res) => {
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
    const _id = decoded._id;

    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }
    const updatedUser = await User.changePassword(_id, newPassword);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  changeUserPassword,
};
