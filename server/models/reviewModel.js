const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  carId: { type: String, required: true },
  dateOfComment: { type: Date, required: true, default: Date.now }, // Set default date here if needed
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
  // Check all fields are provided
  if (!userId || !carId || !dateOfComment || !rating || !comment) {
    throw new Error("All fields are required");
  }

  // Use 'this' to create a new document based on the schema
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

  // Also use 'this' to ensure you are creating an instance of this model
  const review = new this({
    userId,
    carId,
    dateOfComment: new Date(),
    rating,
    comment,
  });

  return review.save();
};

module.exports = mongoose.model("Review", reviewSchema);
