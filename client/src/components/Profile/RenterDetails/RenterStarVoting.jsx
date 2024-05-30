import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const RenterStarVoting = ({ rating, setRating }) => {
  const handleClick = (value) => {
    setRating(value);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <StarIcon
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleClick(i)}
        />
      );
    } else {
      stars.push(
        <StarBorderIcon
          key={i}
          className="text-gray-300 cursor-pointer"
          onClick={() => handleClick(i)}
        />
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default RenterStarVoting;
