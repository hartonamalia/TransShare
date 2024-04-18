const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carImageSchema = new Schema({
  carId: String,
  imageURL: String,
});

carImageSchema.statics.createCarImage = async function (carId, imageURL) {
  if (!carId || !imageURL) {
    throw Error("All fields must be filled");
  }
  const carExists = await this.findOne({ carId });
    if (!carExists) {
        throw Error("Car does not exist");
    }
  const carImage = await this.create({
    carId,
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
