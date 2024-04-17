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
});

carSchema.statics.createCar = async function (
  address,
  year,
  make,
  model,
  odometer,
  transmission,
  paidTaxesStatus
) {
  if (
    !address ||
    !year ||
    !make ||
    !model ||
    !odometer ||
    !transmission ||
    !paidTaxesStatus
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
