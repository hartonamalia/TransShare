const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Car = require("../models/carModel");
const CarImage = require("../models/carImageModel");

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const randomImageName = () => crypto.randomBytes(16).toString("hex");

const getCarDetails = async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.getCarDetails(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const postCarDetails = async (req, res) => {
  console.log(req.body);
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
      address,
      year,
      make,
      model,
      odometer,
      transmission,
      fuelType,
      seats,
      doors,
      licensePlate,
      county,
      city,
      carFeatures,
      description,
      dailyPrice,
    } = req.body;
    if (
      !address ||
      !year ||
      !make ||
      !model ||
      !odometer ||
      !transmission ||
      !fuelType ||
      !seats ||
      !doors ||
      !licensePlate ||
      !county ||
      !city ||
      !carFeatures ||
      !description ||
      !dailyPrice
    ) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const newCar = await Car.createCar(
      userId,
      address,
      year,
      make,
      model,
      odometer,
      transmission,
      fuelType,
      seats,
      doors,
      licensePlate,
      county,
      city,
      carFeatures,
      description,
      dailyPrice
    );
    res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const uploadCarImages = async (req, res) => {
  const carId = req.params.id;
  console.log(carId);

  if (!carId) {
    return res.status(400).json({ error: "Car ID is required" });
  }

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
    // const car = await Car.getDetails(_id);

    // if (!car) {
    //   return res.status(404).json({ error: "Car not found" });
    // }

    const files = req.files;
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: "trans-share",
        Key: `car_${_id}/${randomImageName()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      return s3.send(command).then(() => params.Key);
    });

    const uploadedKeys = await Promise.all(uploadPromises);
    for (const key of uploadedKeys) {
      await CarImage.createCarImage(carId, key);
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      imageKeys: uploadedKeys,
    });
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    res.status(500).json({
      error: "An error occurred while uploading files to S3",
      details: error.message,
    });
  }
};

module.exports = {
  getCarDetails,
  postCarDetails,
  uploadCarImages,
};
