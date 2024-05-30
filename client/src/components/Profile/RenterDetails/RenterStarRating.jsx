import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RenterStarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<StarIcon key={i} className="text-yellow-500" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<StarHalfIcon key={i} className="text-yellow-500" />);
    } else {
      stars.push(<StarBorderIcon key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default RenterStarRating;
