import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarDetails from "./CarDetails";
import ReviewForm from "../Review/ReviewForm";

const DashboardRent = () => {
  const [carOwner, setCarOwner] = useState({}); 
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnTime, setReturnTime] = useState("");

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap -mx-4">
          {/* CarCard Component */}
          <div className="w-full lg:w-2/3 px-4 flex flex-wrap justify-center">
            <CarDetails
            setCarOwner={setCarOwner} />
          </div>
          {/* DashboardRent form and information */}
          <div className=" lg:w-1/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 border-b pb-2">
                Check Availability
              </h4>
              <form className="space-y-4">
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
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Enter DropOff Location"
                  />
                </div>
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
                      src={carOwner.profilePictureURL || "https://via.placeholder.com/150"}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-lg font-semibold">
                    <Link to="#" className="hover:underline">
                      {carOwner.firstName} {carOwner.lastName}
                    </Link>
                  </h5>
                  <div className="text-sm font-medium text-violet-500">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star filled"></i>
                    ))}
                    {/* <span className="ml-1">(5.0)</span> */}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to="#"
                  className="block text-center bg-violet-500 hover:bg-violet-400 text-white font-semibold py-2 px-4 rounded transition-colors  p-6  shadow-md"
                >
                  Send a request to owner
                </Link>
              </div>
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
