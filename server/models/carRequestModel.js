const mongoose = require("mongoose");
const moment = require("moment");
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
  console.log("pickupDate", pickupDate);
  console.log("returnDate", returnDate);
  console.log("carId", carId);
  console.log("requesterId", requesterId);
  console.log("pickupLocation", pickupLocation);
  console.log("dropOffLocation", dropOffLocation);

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

  const car = await carSchema.findById(carId);
  if (!car) {
    throw new Error("Car does not exist");
  }
  if (car.userId === requesterId) {
    throw new Error("You cannot request your own car");
  }

  const existingRequests = await this.find({ carId });
  const existingRequestForRenter = existingRequests.filter(
    (request) =>
      request.requesterId === requesterId &&
      (request.requestStatus === 0 || request.requestStatus === 1)
  );
  console.log("nu megr", existingRequestForRenter);
  if (existingRequestForRenter.length > 0) {
    throw new Error("You have already made a request for this car");
  }
  const newPickupDate = new Date(pickupDate);
  const newReturnDate = new Date(returnDate);

  for (const request of existingRequests) {
    const existingPickupDate = new Date(request.pickupDate);
    const existingReturnDate = new Date(request.returnDate);

    if (request.requestStatus === 1) {
      const overlap =
        (newPickupDate <= existingReturnDate &&
          newPickupDate >= existingPickupDate) ||
        (newReturnDate <= existingReturnDate &&
          newReturnDate >= existingPickupDate) ||
        (newPickupDate <= existingPickupDate &&
          newReturnDate >= existingReturnDate);

      if (overlap) {
        throw new Error(
          "There is already a request for this car within the specified dates"
        );
      }
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

  if (car.userId.toString() !== requesterId.toString()) {
    throw new Error("You are not authorized to update this request");
  }

  const parsedPickupDate = pickupDate
    ? moment(pickupDate).toDate()
    : existingRequest.pickupDate;
  const parsedReturnDate = returnDate
    ? moment(returnDate).toDate()
    : existingRequest.returnDate;

  const updatedCarRequest = await this.findOneAndUpdate(
    { _id: requestId },
    {
      pickupLocation: pickupLocation || existingRequest.pickupLocation,
      dropOffLocation: dropOffLocation || existingRequest.dropOffLocation,
      pickupDate: parsedPickupDate,
      returnDate: parsedReturnDate,
      requestStatus: requestStatus || existingRequest.requestStatus,
    },
    { new: true }
  );

  console.log(
    pickupDate,
    returnDate,
    updatedCarRequest.pickupDate,
    updatedCarRequest.returnDate
  );
  console.log(parsedPickupDate, parsedReturnDate);
  console.log(updatedCarRequest);

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
    const startDate = new Date(request.pickupDate);
    const endDate = new Date(request.returnDate);

    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1;
      } else if (endDate < currentDate) {
        request.requestStatus = 2;
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

  const cars = await carSchema.find({ userId });
  const carIds = cars.map((car) => car._id);

  const carRequests = await this.find({ carId: { $in: carIds } });

  const currentDate = new Date();

  const updatedRequests = carRequests.map((request) => {
    const startDate = new Date(request.pickupDate);
    const endDate = new Date(request.returnDate);

    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1;
        console.log("In progress");
      } else if (endDate < currentDate) {
        request.requestStatus = 2;
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
    const startDate = new Date(request.pickupDate);
    const endDate = new Date(request.returnDate);

    if (request.requestStatus !== 3 && request.requestStatus !== 2) {
      if (startDate <= currentDate && endDate >= currentDate) {
        request.requestStatus = 1;
        console.log("In progress");
      } else if (endDate < currentDate) {
        request.requestStatus = 2;
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

carRequestSchema.statics.acceptCarRequest = async function (requestId, userId) {
  if (!requestId) {
    throw new Error("Request id is required.");
  }

  const request = await this.findOne({ _id: requestId });
  if (!request) {
    throw new Error("Request does not exist");
  }

  const updatedRequest = await this.findOneAndUpdate(
    { _id: requestId },
    { requestStatus: 1 },
    { new: true }
  );

  const carRequests = await this.find({ carId: request.carId });

  for (const req of carRequests) {
    if (req._id.toString() !== requestId) {
      const startDate = new Date(req.pickupDate);
      const endDate = new Date(req.returnDate);
      const acceptedStartDate = new Date(request.pickupDate);
      const acceptedEndDate = new Date(request.returnDate);

      if (
        (acceptedStartDate <= endDate && acceptedStartDate >= startDate) ||
        (acceptedEndDate <= endDate && acceptedEndDate >= startDate) ||
        (acceptedStartDate <= startDate && acceptedEndDate >= endDate)
      ) {
        await this.findOneAndUpdate(
          { _id: req._id },
          { requestStatus: 3 },
          { new: true }
        );
      }
    }
  }

  return updatedRequest;
};

carRequestSchema.statics.getAlreadyRequested = async function (carId, userId) {
  if (!carId) {
    throw new Error("Car id is required.");
  }
  if (!userId) {
    throw new Error("User id is required.");
  }

  const request = await this.find({ carId, requesterId: userId });
  if (request.length > 0) {
    const requestedAlready = request.filter(
      (req) => req.requestStatus === 0 || req.requestStatus === 1
    );
    if (requestedAlready.length > 0) {
      if (requestedAlready[0].requestStatus === 0) {
        return { requested: true, status: 0 };
      }
      return { requested: true, status: 1 };
    }
  }
  return { requested: false };
};

module.exports = mongoose.model("CarRequest", carRequestSchema);
