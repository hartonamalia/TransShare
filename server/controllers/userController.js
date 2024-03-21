const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { signupUser, loginUser, getUserDetails };
