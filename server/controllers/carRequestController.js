const CarRequest = require("../models/carRequestModel");
const dotenv = require("dotenv");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createCarRequest = async (req, res) => {
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
    const userId = decoded._id;
    const {
      carId,
      requesterId,
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
    } = req.body;
    const newCarRequest = new CarRequest({
      carId,
      requesterId,
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
      requestStatus:0,
    });
    const savedCarRequest = await newCarRequest.save();
    res.status(201).json({ message: "Car request successful." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCarRequest };
