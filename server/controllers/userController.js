const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const multer = require("multer");
const crypto = require("crypto");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { url } = require("inspector");

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const randomImageName = () => crypto.randomBytes(16).toString("hex");

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

    res.status(200).json({ email, userId: user["_id"], token });
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

const getPicture = async (user, type) => {
  if (user[type]) {
    const getObjectParams = {
      Bucket: "trans-share",
      Key: user[type],
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command);
    return url;
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
    const photoTypes = [
      "profilePictureURL",
      "idPictureURL",
      "driverFrontPictureURL",
      "driverBackPictureURL",
    ];
    for (const type of photoTypes) {
      console.log(type);
      let pictureURL = await getPicture(user, type);
      if (pictureURL) {
        user[type] = pictureURL;
      }
    }
    res.status(200).json({ userDetails: user });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserIdDetails = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No token provided or Bearer token not formatted properly",
    });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = req.params.id;

    const user = await User.getUserIdDetails(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const photoTypes = [
      "profilePictureURL",
      "idPictureURL",
      "driverFrontPictureURL",
      "driverBackPictureURL",
    ];
    for (const type of photoTypes) {
      console.log(type);
      let pictureURL = await getPicture(user, type);
      if (pictureURL) {
        user[type] = pictureURL;
      }
    }
    return res.status(200).json({ userDetails: user });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal server error" });
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

const updateUserDateOfBirth = async (req, res) => {
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

    const { dateOfBirth } = req.body;
    if (!dateOfBirth) {
      return res.status(400).json({ error: "New date of birth is required" });
    }

    if (!Date.parse(dateOfBirth)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const updatedUser = await User.updateDateOfBirth(
      _id,
      new Date(dateOfBirth)
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Date of birth updated successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfilePicture = async (req, res) => {
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
    const pictureType = req.body.pictureType;
    if (user[pictureType]) {
      const params = {
        Bucket: "trans-share",
        Key: user[pictureType],
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }
    const params = {
      Bucket: "trans-share",
      Key: randomImageName(),
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    await User.updateProfilePicture(_id, params.Key, pictureType);

    res.status(200).send();
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res
      .status(500)
      .send("An error occurred while uploading the file to S3" + error.message);
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  changeUserPassword,
  updateUserDateOfBirth,
  updateProfilePicture,
  getUserIdDetails,
};
