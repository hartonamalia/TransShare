import React from "react";

const StarRating = ({
  totalStars = 5,
  selectedStars = 0,
  onRate = (f) => f,
}) => {
  return (
    <div className="flex font-semibold gap-2">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < selectedStars}
          onSelect={() => onRate(i + 1)}
        />
      ))}
      <p>
        {selectedStars} from {totalStars}
      </p>
    </div>
  );
};

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <div
    className={selected ? "text-yellow-400" : "text-gray-400"}
    onClick={onSelect}
  >
    <svg
      className="w-6 h-6 cursor-pointer"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.396-1.068 1.89-1.068 2.286 0l1.4 3.774a1 1 0 001.17.677l3.914-.696a1 1 0 01.777 1.516l-2.898 2.5a1 1 0 00-.29.884l.558 3.813a1 1 0 01-1.451 1.05L10 14.309l-3.435 1.832a1 1 0 01-1.451-1.05l.558-3.813a1 1 0 00-.29-.884l-2.898-2.5a1 1 0 01.777-1.516l3.914.696a1 1 0 001.17-.677l1.4-3.774z" />
    </svg>
  </div>
);

export default StarRating;
