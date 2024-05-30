import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import RenterStarRating from "./RenterStarRating";

const RenterReviewCard = ({ review }) => {
  const [renter, setRenter] = useState(null);
  const { user } = useAuthContext();

  const fetchRenterDetails = async (reviewerId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/user-data/${reviewerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch renter details");
      }

      const data = await response.json();
      setRenter(data.userDetails);
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    if (review && review.reviewerId) {
      fetchRenterDetails(review.reviewerId);
    }
  }, [review]);

  return (
    <>
      {renter && (
        <div className="flex flex-col border p-2 rounded-lg shadow-lg w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 w-full">
              <img
                src={
                  renter.profilePictureURL
                    ? renter.profilePictureURL
                    : "https://via.placeholder.com/150"
                }
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <p className="font-semibold">{renter.firstName}</p>
            </div>
            <RenterStarRating rating={review.rating} />
          </div>
          <p className="p-2">{review.review}</p>
          <p className="ml-auto text-sm">
            {review.datePosted ? review.datePosted.split("T")[0] : "N/A"}
          </p>
        </div>
      )}
    </>
  );
};

export default RenterReviewCard;
