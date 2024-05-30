import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewForm = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      toast("You must be logged in to submit a review");
      return;
    }

    const reviewData = {
      userId: user.userId,
      carId: id,
      rating,
      comment,
      dateOfComment: new Date(),
    };

    if (!reviewData.rating || !reviewData.comment) {
      toast("Please provide a rating and comment");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/review/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const result = await response.json();
      toast("Review submitted successfully!");
      handleFetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast(error.message);
    } finally {
      setRating(0);
      setComment("");
    }
  };

  const handleFetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/review/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const result = await response.json();
      setReviews(result);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast(error.message);
    }
  };

  useEffect(() => {
    handleFetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className=" w-2/3 mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">
          Reviews({reviews.length})
        </h2>
        <div
          className=" flex flex-col space-y-4  overflow-auto max-h-[30rem]"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-2/3 flex flex-col items-center"
      >
        <div className="mt-10 w-full">
          <h3 className="text-xl font-semibold mb-4">Leave a Reply</h3>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
        <StarRating selectedStars={rating} onRate={setRating} />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
