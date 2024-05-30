const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const renterReviewSchema = new Schema({
  userId: { type: String, required: true },
  reviewerId: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
});

renterReviewSchema.statics.createRenterReview = async function (
  userId,
  reviewerId,
  rating,
  review
) {
  if (!userId || !reviewerId || !rating || !review) {
    throw new Error("Missing required fields");
  }

  const existingReview = await this.findOne({ userId, reviewerId });
  if (existingReview) {
    throw new Error("User already reviewed");
  }
  const renterReview = new this({
    userId,
    reviewerId,
    rating,
    review,
    datePosted: new Date(),
  });

  return renterReview.save();
};

renterReviewSchema.statics.getRenterReviews = async function (userId) {
  if (!userId) {
    throw new Error("Missing required fields");
  }

  return this.find({ userId }).sort({ datePosted: -1 });
};

const RenterReview = mongoose.model("RenterReview", renterReviewSchema);

module.exports = RenterReview;
