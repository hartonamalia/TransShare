const mongoose = require("mongoose");
const validator = require("validator");
const carSchema = require("./carModel");

const Schema = mongoose.Schema;

const carRequestSchema = new Schema({
  carId: String,
  requesterId: String,
  pickupLocation: String,
  dropOffLocation: String,
  pickupDate: Date,
  returnDate: Date,
  requestStatus: Number,
});
carRequestSchema.statics.createCarRequest = async function (
  carId,
  requesterId,
  pickupLocation,
  dropOffLocation,
  pickupDate,
  returnDate
) {
  if (
    !carId ||
    !requesterId ||
    !pickupLocation ||
    !dropOffLocation ||
    !pickupDate ||
    !returnDate
  ) {
    throw new Error("All fields are required");
  }
  const existingRequest = await this.findOne({ carId, requesterId });
  if (existingRequest) {
    throw new Error("You have already made a request for this car");
  }
  const carRequest = new this({
    carId,
    requesterId,
    pickupLocation,
    dropOffLocation,
    pickupDate,
    returnDate,
    requestStatus: 0,
  });
  const savedCarRequest = await carRequest.save();
  return savedCarRequest;
};

carRequestSchema.statics.updateCarRequest = async function (
  requestId,
  requesterId,
  pickupLocation,
  dropOffLocation,
  pickupDate,
  returnDate,
  requestStatus
) {
  if (!requestId) {
    throw new Error("Request id is required.");
  }
  const existingRequest = await this.findOne({ _id: requestId });
  if (!existingRequest) {
    throw new Error("Request does not exist");
  }
  if (existingRequest.requesterId !== requesterId) {
    throw new Error("You are not authorized to update this request");
  }
  const updatedCarRequest = await this.findOneAndUpdate(
    { _id: requestId },
    {
      pickupLocation: pickupLocation || existingRequest.pickupLocation,
      dropOffLocation: dropOffLocation || existingRequest.dropOffLocation,
      pickupDate: pickupDate || existingRequest.pickupDate,
      returnDate: returnDate || existingRequest.returnDate,
      requestStatus: requestStatus || existingRequest.requestStatus,
    },
    { new: true }
  );
  return updatedCarRequest;
};

carRequestSchema.statics.getCarRequests = async function (carId, userId) {
  if (!carId) {
    throw new Error("Car id is required.");
  }
  if (!userId) {
    throw new Error("User id is required.");
  }
  const car = await carSchema.findById(carId);
  if (!car) {
    throw new Error("Car does not exist");
  }
  if (car.userId !== userId) {
    throw new Error("You are not authorized to view requests for this car");
  }
  const carRequests = await this.find({ carId });
  return carRequests;
};

module.exports = mongoose.model("CarRequest", carRequestSchema);
