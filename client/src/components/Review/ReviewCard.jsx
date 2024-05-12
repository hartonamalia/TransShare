import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReviewCard = ({ review }) => {
  const {user} = useAuthContext();
  const { name, userId, date, comment, rating } = review;
  const [carOwner, setCarOwner] = useState({});
  console.log(rating);

  const fetchCarOwner = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/user-id-details/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      
      const data = await response.json();
      console.log(data);
      setCarOwner(data.userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  // fct pt a afisa stelele in functie de rating
  const renderStars = (num) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < num ?  "text-yellow-400"  : "text-gray-400"
        }`}
      />
    ));
  };

  useEffect(() => {
    fetchCarOwner();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={carOwner.profilePictureURL || "https://via.placeholder.com/150"}
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