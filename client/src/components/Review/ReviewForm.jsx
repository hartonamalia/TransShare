import React, { useState } from "react";
import StarRating from "./StarRating";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Ai dat un rating de: ${rating} stele.`);
    // Aici poți adăuga logica pentru trimiterea ratingului la server
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StarRating selectedStars={rating} onRate={setRating} />
      <button
        type="submit"
        className="bg-violet-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
