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
    const { carId } = req.params;
    const {
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
      requestStatus,
    } = req.body;
    const requesterId = userId;
    const carRequest = await CarRequest.createCarRequest(
      carId,
      requesterId,
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
      requestStatus
    );
    res.status(201).json({ carRequest });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

const updateCarRequest = async (req, res) => {
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
    const { requestId } = req.params;
    const {
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
      requestStatus,
    } = req.body;
    const carRequest = await CarRequest.updateCarRequest(
      requestId,
      userId,
      pickupLocation,
      dropOffLocation,
      pickupDate,
      returnDate,
      requestStatus
    );
    res.status(200).json({ carRequest });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

const getCarRequests = async (req, res) => {
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
    const { carId } = req.params;
    const carRequests = await CarRequest.getCarRequests(carId, userId);
    res.status(200).json({ carRequests });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCarRequest, updateCarRequest, getCarRequests };
