const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  userId: String,
  address: String,
  year: String,
  make: String,
  model: String,
  odometer: String,
  transmission: String,
  fuelType: String,
  seats: String,
  doors: String,
  licensePlate: String,
  county: String,
  city: String,
  carFeatures: [String],
  description: String,
  dailyPrice: Number,
});

carSchema.statics.createCar = async function (
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
) {
  if (
    !userId ||
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
    throw Error("All fields must be filled");
  }
  const car = await this.create({
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
    dailyPrice,
  });
  return car;
};

carSchema.statics.getCarDetails = async function (carId) {
  if (!carId) {
    throw Error("Invalid user carId");
  }
  const car = await this.findById(carId);
  if (!car) {
    throw Error("Car with this id doesn't exist!");
  }
  return car;
};

carSchema.statics.postCarDetails = async function (carId, newData) {
  if (!carId) {
    throw Error("Invalid car id");
  }
  const car = await this.findByIdAndUpdate(carId, newData, { new: true });
  if (!car) {
    throw Error("Car with this id doesn't exist!");
  }
  return car;
};

module.exports = mongoose.model("Car", carSchema);
