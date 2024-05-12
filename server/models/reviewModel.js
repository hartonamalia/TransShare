const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  carId: { type: String, required: true },
  dateOfComment: { type: Date, required: true, default: Date.now }, 
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

reviewSchema.statics.createReview = async function (
  userId,
  carId,
  dateOfComment,
  rating,
  comment
) {
  if (!userId || !carId || !dateOfComment || !rating || !comment) {
    throw new Error("All fields are required");
  }

  const review = new this({
    userId,
    carId,
    dateOfComment,
    rating,
    comment,
  });

  return review.save();
};

reviewSchema.statics.postComment = async function (
  userId,
  carId,
  rating,
  comment
) {
  if (!userId || !carId || !rating || !comment) {
    throw new Error("All fields are required");
  }

  const review = new this({
    userId,
    carId,
    dateOfComment: new Date(),
    rating,
    comment,
  });

  return review.save();
};

reviewSchema.statics.getReviewsByCarId = async function (carId) {
  if (!carId) {
    throw new Error("Car ID is required");
  }

  return this.find({ carId });
};

module.exports = mongoose.model("Review", reviewSchema);
