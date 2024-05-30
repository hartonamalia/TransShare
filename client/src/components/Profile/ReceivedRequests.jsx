import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({});
  const { user } = useAuthContext();

  const fetchReceivedRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/all-requests/byOwner`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch received requests");
      }

      const data = await response.json();
      const carRequests = data.carRequests;

      const detailedCarRequests = await Promise.all(
        carRequests.map(async (carRequest) => {
          const carDetails = await fetchCarDetails(carRequest.carId);
          const carImages = await fetchCarImages(carRequest.carId);
          const renterDetails = await fetchRenterDetails(carRequest.requesterId);
          console.log("renter details", renterDetails);
          return { ...carRequest, carDetails, carImages, renterDetails };
        })
      );

      setReceivedRequests(detailedCarRequests);
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
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleAction = async (car, action) => {
    try {
      let requestStatus;
      switch (action) {
        case "pending":
          requestStatus = 0;
          break;
        case "in progress":
          requestStatus = 1;
          break;
        case "finish":
          requestStatus = 2;
          break;
        case "cancel":
          requestStatus = 3;
          break;
        default:
          return;
      }

      const response = await fetch(
        `http://localhost:8000/api/car-request/${car._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ requestStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      fetchReceivedRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/accept/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      fetchReceivedRequests();
      toast.success("Request accepted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      make: car.carDetails.make,
      model: car.carDetails.model,
      dailyPrice: car.carDetails.dailyPrice,
      pickupLocation: car.pickupLocation,
      dropOffLocation: car.dropOffLocation,
      pickupDate: formatDateTimeLocal(car.pickupDate),
      returnDate: formatDateTimeLocal(car.returnDate),
    });
    setIsModalOpen(true);
  };

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/${selectedCar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            pickupLocation: formData.pickupLocation,
            dropOffLocation: formData.dropOffLocation,
            pickupDate: formData.pickupDate,
            returnDate: formData.returnDate,
            dailyPrice: formData.dailyPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      setIsModalOpen(false);
      fetchReceivedRequests();
      toast.success("Request updated successfully");
    } catch (error) {
      toast.error("Failed to update request");
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] max-w-[1100px] mx-auto mt-5">
        <h2 className="font-bold text-lg mb-5">Received requests:</h2>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((car, index) => (
            <div
              key={index}
              className="grid grid-cols-10 items-center p-4 border border-gray-300 rounded-md overflow-hidden"
            >
              <div className="flex flex-col items-center">
                <img
                  src={car.carImages[0]?.imageURL}
                  alt="car"
                  className="w-[70px] h-[70px] rounded-lg mb-2"
                />
                {car.requestStatus !== 2 && car.requestStatus !== 3 && (
                  <button
                    className="bg-violet-500 text-white py-1 px-3  hover:bg-purple-400 font-semibold"
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                )}
              </div>
              <h1 className="font-bold text-center">
                {car.carDetails.make} {car.carDetails.model}
              </h1>
              <Link to={`/renter-details/${car.renterDetails?.userDetails._id}`}>
              <div className="flex flex-col items-center justify-center font-semibold cursor-pointer">
                <p className="font-semibold">From:</p>
                <p>
                  {car.renterDetails?.userDetails?.firstName} {car.renterDetails?.userDetails?.lastName}
                </p>
              </div>
              </Link>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Price(per day):</p>
                <p className="text-red-600 font-bold">
                  {car.carDetails.dailyPrice}€
                </p>
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
                <p>{car.pickupDate?.split("T")[0]}</p>
                <p>{car.pickupDate?.split("T")[1].split(".")[0]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">End Date:</p>
                <p>{car.returnDate?.split("T")[0]}</p>
                <p>{car.returnDate?.split("T")[1].split(".")[0]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">Status:</p>
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
              {car.requestStatus === 0 && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <button
                    className="bg-green-500 text-white py-1 px-3 hover:bg-green-400 font-semibold"
                    onClick={() => handleAccept(car._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 hover:bg-red-400 font-semibold"
                    onClick={() => handleAction(car, "cancel")}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-red-500 font-semibold">No requests found.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-violet-500 p-6 rounded-lg max-w-md w-full md:max-w-lg lg:max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Edit Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold">Price (EUR):</label>
                <input
                  type="number"
                  name="dailyPrice"
                  value={formData.dailyPrice}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Pickup Location:</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Dropoff Location:</label>
                <input
                  type="text"
                  name="dropOffLocation"
                  value={formData.dropOffLocation}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Pickup Date:</label>
                <input
                  type="datetime-local"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Return Date:</label>
                <input
                  type="datetime-local"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-400"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedRequests;
