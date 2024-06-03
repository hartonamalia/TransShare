import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarDetails from "./CarDetails";
import ReviewForm from "../Review/ReviewForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import { format } from "date-fns";

const DashboardRent = () => {
  const [carOwner, setCarOwner] = useState({});
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requested, setRequested] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleRequest = () => {
    setRequestSent(true);
  };

  const fetchCurrentUserDetails = async (userId) => {
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
        throw new Error("Failed to fetch current user details");
      }

      const data = await response.json();
      setCurrentUser(data.userDetails);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleCheckRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/already-requested/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRequested(data.alreadyRequested);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactOwner = async () => {
    console.log("sender id", user);
    console.log("receiver id", carOwner);
    try {
      const response = await fetch(`http://localhost:8000/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          senderId: user.userId,
          receiverId: carOwner._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/chat");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const formatTime = (time) => {
    return time;
  };

  const checkAvailability = async () => {
    const startDate = `${formatDate(pickupDate)}T${formatTime(pickupTime)}`;
    const endDate = `${formatDate(returnDate)}T${formatTime(returnTime)}`;

    //console.log('Sending parameters:', { carId: id, startDate, endDate });

    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/check-available?carId=${id}&startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.available) {
          toast.success("Car is available for the selected dates!");
        } else {
          toast.error("Car is not available for the selected dates.");
        }
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const RequestToOwner = async () => {
    console.log("Requesting to owner", currentUser);
    if (currentUser.dateOfBirth === null) {
      toast.error(
        "Please complete your date of birth before sending a request."
      );
      return;
    }
    if (!currentUser.idPictureURL) {
      toast.error("Please upload your ID picture before sending a request.");
      return;
    }
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      toast.error("Please fill in all fields before sending the request.");
      return;
    }

    const startDate = `${formatDate(pickupDate)}T${formatTime(pickupTime)}`;
    const endDate = `${formatDate(returnDate)}T${formatTime(returnTime)}`;

    try {
      const response = await fetch(
        `http://localhost:8000/api/car-request/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            carId: id,
            renterId: user.userId,
            pickupDate: startDate,
            returnDate: endDate,
            pickupLocation,
            dropOffLocation,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRequested(true);
        toast.success("Request sent successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Request failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCheckRequest();
    fetchCurrentUserDetails(user.userId);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap -mx-4">
          {/* CarCard Component */}
          <div className="w-full lg:w-2/3 px-4 flex flex-wrap justify-center">
            <CarDetails setCarOwner={setCarOwner} />
          </div>
          {/* DashboardRent form and information */}
          <div className=" lg:w-1/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 border-b pb-2">
                Check Availability
              </h4>
              <form className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Pickup Date
                    </label>
                    <DatePicker
                      selected={pickupDate}
                      onChange={(date) => setPickupDate(date)}
                      dateFormat="MM/dd/yyyy"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      minDate={new Date()}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Return Date
                    </label>
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      dateFormat="MM/dd/yyyy"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      minDate={pickupDate}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Return Time
                    </label>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={checkAvailability}
                  className="w-full bg-violet-500 text-white font-semibold py-2 rounded-md hover:bg-violet-400 transition-colors"
                >
                  Check Availability
                </button>
              </form>
            </div>

            <div className="mt-8 shadow-md p-4 bg-white">
              <h4 className="text-xl font-semibold mb-4 border-b pb-2">
                Owner Details
              </h4>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <Link to="#">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={
                        carOwner?.profilePictureURL ||
                        "https://via.placeholder.com/150"
                      }
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-lg font-semibold">
                    <Link to="#" className="hover:underline">
                      {carOwner?.firstName} {carOwner?.lastName}
                    </Link>
                  </h5>
                  <div className="text-sm font-medium text-violet-500">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star filled"></i>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Enter City, Airport, or Address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    DropOff Location
                  </label>
                  <input
                    type="text"
                    value={dropOffLocation}
                    onChange={(e) => setDropOffLocation(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Enter DropOff Location"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="#"
                  onClick={(e) => {
                    // handleRequest();
                    e.preventDefault();
                    RequestToOwner();
                  }}
                  className={`block text-center ${
                    requested.requested
                      ? "bg-green-500 hover:bg-green-400"
                      : "bg-violet-500 hover:bg-violet-400"
                  } text-white font-semibold py-2 px-4 rounded transition-colors p-6 shadow-md`}
                >
                  {requested.requested
                    ? "Request Sent"
                    : "Send a request to owner"}
                </Link>
              </div>
              {requested.requested && requested.status === 1 && (
                <div
                  className="mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContactOwner();
                  }}
                >
                  <p
                    className="block text-center bg-violet-500 hover:bg-purple-400
                    text-white font-semibold py-2 px-4 rounded transition-colors p-6 shadow-md"
                  >
                    Contact Owner
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4 flex flex-wrap justify-center">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRent;
