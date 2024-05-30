import React from "react";
import RenterReviewCard from "./RenterReviewCard";

const RenterReviews = ({ reviews }) => {
  return (
    <div
      className="flex flex-col max-h-[300px] md:w-[730px] md:h-[400px] border-2 border-purple-500 rounded-lg shadow-md p-3 gap-5 items-center overflow-auto mb-5"
      style={{ scrollbarWidth: "none" }}
    >
      {reviews &&
        reviews.map((review, index) => (
          <RenterReviewCard key={index} review={review} />
        ))}
    </div>
  );
};

export default RenterReviews;
