import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import photo from "../../../assets/car.png";
import RenterReviewForm from "./RenterReviewForm";
import RenterReviews from "./RenterReviews";
import RenterStarRating from "./RenterStarRating";

const RenterDetails = () => {
  const { id } = useParams();
  const [renter, setRenter] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const { user } = useAuthContext();

  const fetchRenterDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/user-data/${userId}`,
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
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const fetchRenterReviews = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/renter-review/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch renter reviews");
      }

      const data = await response.json();
      let totalRating = 0;
      data.forEach((review) => {
        totalRating += review.rating;
      });
      const averageRating = totalRating / data.length;
      setAverageRating(averageRating);
      setReviews(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetchRenterDetails(id);
    fetchRenterReviews(id);
  }, [id]);

  return (
    <div className="flex w-full justify-center mt-16">
      {renter && reviews && (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col md:flex-row w-full justify-center items-center gap-8">
            {/* Renter details */}
            <div className="flex flex-col w-[300px] h-[300px] border-2 border-purple-500 rounded-lg shadow-md">
              <div className="w-full border-b-2 border-purple-500 p-2 bg-purple-500">
                <img
                  src={
                    renter.profilePictureURL ? renter.profilePictureURL : photo
                  }
                  alt="renter"
                  className="w-24 h-24 rounded-full object-cover mx-auto mt-4 border"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2 ml-2">
                <p>
                  👤
                  <span className="font-semibold">Firstname: </span>
                  {renter.firstName}
                </p>
                <p>
                  👤
                  <span className="font-semibold">LastName:</span>{" "}
                  {renter.lastName}
                </p>
                <p>
                  📧
                  <span className="font-semibold">Email:</span> {renter.email}
                </p>
                <p>
                  ☎️
                  <span className="font-semibold">Phone number:</span>
                  {renter.prefix} {renter.restPhoneNumber}
                </p>
                <div className="flex gap-2">
                  <span className="font-semibold">Rating:</span>
                  <RenterStarRating rating={averageRating} />
                </div>
              </div>
            </div>
            {/* Renter reviews */}
            <RenterReviewForm
              renterId={renter._id}
              fetchRenterReviews={fetchRenterReviews}
            />
          </div>
          <RenterReviews reviews={reviews} />
        </div>
      )}
    </div>
  );
};

export default RenterDetails;
