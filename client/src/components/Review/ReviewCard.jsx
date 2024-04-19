import React from "react";
import { StarIcon } from "@heroicons/react/solid";

const ReviewCard = ({ review }) => {
  const { name, date, comment, rating } = review;

  // fct pt a afisa stelele in functie de rating
  const renderStars = (num) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < num ? "text-gray-400" : "text-yellow-400"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="path-to-user-avatar cursor-pointer"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>
        <div>{renderStars(rating)}</div>
      </div>
      <p className="mt-3 text-gray-600">{comment}</p>
    </div>
  );
};

export default ReviewCard;
