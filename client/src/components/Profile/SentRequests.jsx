import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const SentRequests = () => {
  const [carList, setCarList] = useState([]);
  const { user } = useAuthContext();

  const fetchCarRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/all-requests/byRenter`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch car requests");
      }

      const data = await response.json();
      const carRequests = data.carRequests;

      const detailedCarRequests = await Promise.all(
        carRequests.map(async (carRequest) => {
          const carDetails = await fetchCarDetails(carRequest.carId);
          const carImages = await fetchCarImages(carRequest.carId);
          return { ...carRequest, carDetails, carImages };
        })
      );
      

      setCarList(detailedCarRequests);
      console.log(detailedCarRequests);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCarDetails = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car/car-details/${carId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchCarImages = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-image/${carId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch car images");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    fetchCarRequests();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] max-w-[1100px] mx-auto mt-5">
        <h2 className="font-bold text-lg mb-5">Your bookings:</h2>
        {carList.length > 0 ? (
          carList.map((car, index) => (
            <div
              key={index}
              className="grid grid-cols-8 items-center p-4 border border-gray-300 rounded-md overflow-hidden"
            >
              <div className="flex justify-center">
                <img
                  src={car.carImages[0]?.imageURL}
                  alt="car"
                  className="w-[70px] h-[70px] rounded-lg"
                />
              </div>
              <h1 className="font-bold text-center">
                {car.carDetails.make} {car.carDetails.model}
              </h1>

              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Price:</p>
                <p className="text-red-600 font-bold">{car.carDetails.dailyPrice}€</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Pickup:</p>
                <p>{car.pickupLocation}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Dropoff:</p>
                <p>{car.dropOffLocation}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Start Date:</p>
                <p>{car.pickupDate.split("T")[0]}</p>
                <p>{car.pickupDate.split("T")[1].split(".")[0]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">End Date:</p>
                <p>{car.returnDate.split("T")[0]}</p>
                <p>{car.returnDate.split("T")[1].split(".")[0]}</p>
                
              </div>
              <div className="flex flex-col items-center justify-center">
                <p
                  className={
                    car.requestStatus === 0
                      ? "text-blue-200 bg-blue-500 py-1 px-2 rounded-full"
                      : car.requestStatus === 1
                      ? "text-yellow-200 bg-yellow-500 py-1 px-2 rounded-full"
                      : car.requestStatus === 2
                      ? "text-green-200 bg-green-500 py-1 px-2 rounded-full"
                      : car.requestStatus === 3
                      ? "text-red-200 bg-red-500 py-1 px-2 rounded-full"
                      : ""
                  }
                >
                  {car.requestStatus === 0
                    ? "Pending"
                    : car.requestStatus === 1
                    ? "In Progress"
                    : car.requestStatus === 2
                    ? "Finished"
                    : car.requestStatus === 3
                    ? "Canceled"
                    : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500 font-semibold">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default SentRequests;
