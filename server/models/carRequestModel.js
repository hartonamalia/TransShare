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

// carRequestSchema.statics.createCarRequest = async function (
//   carId,
//   requesterId,
//   pickupLocation,
//   dropOffLocation,
//   pickupDate,
//   returnDate
// ) {
//   if (
//     !carId ||
//     !requesterId ||
//     !pickupLocation ||
//     !dropOffLocation ||
//     !pickupDate ||
//     !returnDate
//   ) {
//     throw new Error("All fields are required");
//   }
//   const existingRequest = await this.findOne({ carId, requesterId });
//   if (existingRequest) {
//     throw new Error("You have already made a request for this car");
//   }
//   const carRequest = new this({
//     carId,
//     requesterId,
//     pickupLocation,
//     dropOffLocation,
//     pickupDate,
//     returnDate,
//     requestStatus: 0,
//   });
//   const savedCarRequest = await carRequest.save();
//   return savedCarRequest;
// };


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

  // Check for overlapping requests
  const existingRequests = await this.find({ carId });
  const newPickupDate = new Date(pickupDate);
  const newReturnDate = new Date(returnDate);

  for (const request of existingRequests) {
    const existingPickupDate = new Date(request.pickupDate);
    const existingReturnDate = new Date(request.returnDate);

    const overlap =
      (newPickupDate <= existingReturnDate && newPickupDate >= existingPickupDate) ||
      (newReturnDate <= existingReturnDate && newReturnDate >= existingPickupDate) ||
      (newPickupDate <= existingPickupDate && newReturnDate >= existingReturnDate);

    if (overlap) {
      throw new Error("There is already a request for this car within the specified dates");
    }
  }

  const carRequest = new this({
    carId,
    requesterId,
    pickupLocation,
    dropOffLocation,
    pickupDate: newPickupDate,
    returnDate: newReturnDate,
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
  const car = await carSchema.findById(existingRequest.carId);
  if (!car) {
    throw new Error("Car does not exist");
  }
  if (car.userId !== requesterId) {
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
  const currentDate = new Date();

  const updatedRequests = carRequests.map((request) => {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    // Only update if status is not already canceled or completed
    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1; // In progress
      } else if (endDate < currentDate) {
        request.requestStatus = 2; // Completed
      }
    }

    return request;
  });

  await Promise.all(
    updatedRequests.map((request) =>
      this.findOneAndUpdate({ _id: request._id }, request, { new: true })
    )
  );

  return updatedRequests;
};

carRequestSchema.statics.getCheckAvailable = async function (
  carId,
  start,
  end
) {
  if (!carId) {
    throw new Error("Car id is required.");
  }
  const car = await carSchema.findById({ _id: carId });
  if (!car) {
    throw new Error("Car does not exist");
  }
  const carRequests = await this.find({ carId });
  const unavailableDates = carRequests.filter((request) => {
    return (
      request.requestStatus === 1 &&
      ((start >= request.pickupDate && start <= request.returnDate) ||
        (end >= request.pickupDate && end <= request.returnDate) ||
        (start <= request.pickupDate && end >= request.returnDate))
    );
  });
  return unavailableDates;
};

carRequestSchema.statics.getCarRequestsByOwner = async function (userId) {
  if (!userId) {
    throw new Error("User id is required.");
  }

  // Find cars owned by the user
  const cars = await carSchema.find({ userId });
  const carIds = cars.map((car) => car._id);

  // Find car requests for those cars
  const carRequests = await this.find({ carId: { $in: carIds } });

  const currentDate = new Date();
  console.log("Current Date:", currentDate);

  // Update request status based on dates
  const updatedRequests = carRequests.map((request) => {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    console.log("Request ID:", request._id);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Only update if status is not already canceled or completed
    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1; // In progress
        console.log("In progress");
      } else if (endDate < currentDate) {
        request.requestStatus = 2; // Completed
        console.log("Completed");
      }
    }
    return request;
  });

  // Persist the updated data in the database
  await Promise.all(
    updatedRequests.map((request) =>
      this.findOneAndUpdate({ _id: request._id }, request, { new: true })
    )
  );

  console.log(updatedRequests);
  return updatedRequests;
};

carRequestSchema.statics.getCarRequestsByRenter = async function (userId) {
  if (!userId) {
    throw new Error("User id is required.");
  }

  const carRequests = await this.find({ requesterId: userId });
  const currentDate = new Date();

  const updatedRequests = carRequests.map((request) => {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    // Only update if status is not already canceled or completed
    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1; // In progress
        console.log("In progress");
      } else if (endDate < currentDate) {
        request.requestStatus = 2; // Completed
        console.log("Completed");
      }
    }

    return request;
  });

  await Promise.all(
    updatedRequests.map((request) =>
      this.findOneAndUpdate({ _id: request._id }, request, { new: true })
    )
  );

  return updatedRequests;
};

module.exports = mongoose.model("CarRequest", carRequestSchema);
