import React, { useState } from "react";
import RenterStarVoting from "./RenterStarVoting";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../hooks/useAuthContext";

const RenterReviewForm = ({ renterId, fetchRenterReviews }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuthContext();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async () => {
    if (review.length < 1) {
      toast.error("Review cannot be empty");
      return;
    }
    if (rating < 1) {
      toast.error("Rating cannot be empty");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/renter-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: renterId,
          reviewerId: user.userId,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      fetchRenterReviews(renterId);
      toast.success("Review posted successfully!");
    } catch (err) {
      toast.error(err.message);
      return;
    } finally {
      handleCancel();
    }
  };
  const handleCancel = () => {
    setReview("");
    setRating(0);
  };

  return (
    <div className="flex flex-col w-[300px] h-[300px] md:w-[400px] md:h-[300px] border-2 border-purple-500 rounded-lg shadow-md p-3 items-center gap-4">
      <textarea
        className="w-full h-[200px] p-2 border-2 rounded-lg"
        placeholder="Write your review here..."
        value={review}
        onChange={handleReviewChange}
      ></textarea>
      <RenterStarVoting rating={rating} setRating={setRating} />
      <div className="flex gap-1">
        <button
          className="p-2 flex justify-center items-center text-white font-semibold bg-purple-500 w-24 h-10 rounded-lg"
          onClick={handleSubmit}
        >
          Post
        </button>
        <button
          className="p-2 flex justify-center items-center text-white font-semibold bg-purple-500 w-24 h-10 rounded-lg"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenterReviewForm;
