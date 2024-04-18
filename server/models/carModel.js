const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const carSchema = new Schema({
  address: String,
  year: String,
  make: String,
  model: String,
  odometer: String,
  transmission: String,
  paidTaxesStatus: String,
  licensePlate: String,
  county: String,
  city: String,
  carFeatures: [String],
  description: String,
  dailyPrice: Number,
});

carSchema.statics.createCar = async function (
  address,
  year,
  make,
  model,
  odometer,
  transmission,
  paidTaxesStatus,
  licensePlate,
  county,
  city,
  carFeatures,
  description,
  dailyPrice
) {
  if (
    !address ||
    !year ||
    !make ||
    !model ||
    !odometer ||
    !transmission ||
    !paidTaxesStatus ||
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
    address,
    year,
    make,
    model,
    odometer,
    transmission,
    paidTaxesStatus,
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

carSchema.statics.updateCarDetails = async function (carId, newData) {
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
