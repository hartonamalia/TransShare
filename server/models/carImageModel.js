const mongoose = require("mongoose");
const Car = require("./carModel");

const Schema = mongoose.Schema;

const carImageSchema = new Schema({
  carId: String,
  imageURL: String,
});

carImageSchema.statics.createCarImage = async function (_id, imageURL) {
  console.log(_id);
  if (!_id || !imageURL) {
    throw Error("All fields must be filled");
  }
  const carExists = await Car.findById(_id);
  if (!carExists) {
      throw Error("Car does not exist");
  }
  const carImage = await this.create({
    carId: _id,
    imageURL,
  });
  return carImage;
};
carImageSchema.statics.getCarImages = async function (carId) {
  if (!carId) {
    throw Error("All fields must be filled");
  }
  const carImages = await this.find({ carId });

  return carImages;
};

module.exports = mongoose.model("CarImage", carImageSchema);
