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

const getCarRequestsByOwner = async (req, res) => {
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
    const carRequests = await CarRequest.getCarRequestsByOwner(userId);
    res.status(200).json({ carRequests });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};


const getCheckAvailable = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.query;

    if (!carId || !startDate || !endDate) {
      return res
        .status(400)
        .send({ error: "Car id, start date, and end date are required." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).send({ error: "Invalid date format." });
    }
    const unavailableDates = await CarRequest.getCheckAvailable(
      carId,
      start,
      end
    );

    if (unavailableDates.length > 0) {
      return res.status(200).send({
        available: false,
        message: "Car is not available in the given date range.",
      });
    }

    res.status(200).send({
      available: true,
      message: "Car is available in the given date range.",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCarRequestsByRenter = async (req, res) => {
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
    const carRequests = await CarRequest.getCarRequestsByRenter(userId);
    res.status(200).json({ carRequests });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

const acceptCarRequest = async (req, res) => {
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
    const carRequest = await CarRequest.acceptCarRequest(requestId, userId);
    res.status(200).json({ carRequest });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

const getAlreadyRequested = async (req, res) => {
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
    const request = await CarRequest.getAlreadyRequested(carId, userId);
    console.log("request", request);  
    res.status(200).json({ alreadyRequested: request });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCarRequest,
  updateCarRequest,
  getCarRequests,
  getCheckAvailable,
  getCarRequestsByRenter,
  getCarRequestsByOwner,
  acceptCarRequest,
  getAlreadyRequested,
};
