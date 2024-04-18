const dotenv = require("dotenv");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const Car = require("../models/carModel");

// const getCarDetails = async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: "Bearer token not formatted properly" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const carId = decoded.carId;
//     console.log(carId);

//     const car = await Car.findById(carId);

//     if (!car) {
//       return res.status(404).json({ error: "Car not found" });
//     }

//     res.status(200).json({ carDetails: car });
//   } catch (error) {
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const updateCarDetails = async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: "Bearer token not formatted properly" });
//   }

//   try {
//     jwt.verify(token, process.env.SECRET);

//     const carId = req.params.carId;
//     console.log("aici", carId);

//     const newData = req.body;
//     if (!newData) {
//       return res.status(400).json({ error: "New data is required" });
//     }

//     const updatedCar = await Car.updateCarDetails(carId, newData);
//     if (!updatedCar) {
//       return res.status(404).json({ error: "Car not found" });
//     }

//     res.status(200).json({ message: "Car updated successfully" });
//   } catch (error) {
//     console.error(error);
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     res
//       .status(500)
//       .json({ error: "Internal server error", details: error.message });
//   }
// };

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
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

const updateCarDetails = async (req, res) => {
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
    jwt.verify(token, process.env.SECRET);

    const {
      address,
      year,
      make,
      model,
      odometer,
      transmission,
      paidTaxesStatus,
    } = req.body;
    if (
      !address ||
      !year ||
      !make ||
      !model ||
      !odometer ||
      !transmission ||
      !paidTaxesStatus
    ) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const newCar = await Car.createCar(
      address,
      year,
      make,
      model,
      odometer,
      transmission,
      paidTaxesStatus
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

module.exports = {
  getCarDetails,
  updateCarDetails,
};
