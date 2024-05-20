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
  publishDate: { type: Date, default: Date.now },
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
  dailyPrice,
  publishDate
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
    publishDate,
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

carSchema.statics.findTopNewCars = async function () {
  try {
    return await this.find().sort({ publishDate: -1 }).limit(9);
  } catch (error) {
    console.error("Error fetching top new cars:", error);
    throw error;
  }
};

carSchema.statics.findAllCars = async function (page, limit, sort, filters) {
  try {
    const skip = (page - 1) * limit;
    let sortOption = {};
    let filterOption = {};


    console.log("aici",sort);
    // Sortare
    switch (sort) {
      case "price-asc":
        sortOption = { dailyPrice: 1 };
        break;
      case "price-desc":
        sortOption = { dailyPrice: -1 };
        break;
      default:
        sortOption = {};
    }

    // Filtrare
    if (filters.year) {
      filterOption.year = filters.year;
    }
    if (filters.transmission) {
      filterOption.transmission = filters.transmission;
    }
    if (filters.fuelType) {
      filterOption.fuelType = filters.fuelType;
    }
    if (filters.make) {
      filterOption.make = filters.make;
    }
    if (filters.seats) {
      filterOption.seats = filters.seats;
    }

    const cars = await this.find(filterOption)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);
    const totalCars = await this.countDocuments(filterOption);
    const totalPages = Math.ceil(totalCars / limit);
    return {
      cars,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching paginated and filtered cars:", error);
    throw error;
  }
};

module.exports = mongoose.model("Car", carSchema);
