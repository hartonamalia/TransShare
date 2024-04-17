import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import ViewStepsModal from "./ViewStepsModal";

const ListYourCar = () => {
  const [isViewStepsOpen, setIsViewStepsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseViewSteps = () => {
    setIsViewStepsOpen(false);
  };
  const handleOpenViewSteps = () => {
    setIsViewStepsOpen(true);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        List your car
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500">
            1 of 5 steps | Next: Car details
          </div>

        </div>
        <button
          className="px-4 py-1 text-sm text-white font-semibold border bg-violet-500 hover:bg-purple-400 rounded-full"
          onClick={handleOpenViewSteps}
        >
          View all steps
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="location"
            className="font-semibold text-gray-700 block pb-2"
          >
            Where is your car located?
          </label>
          <input
            id="location"
            type="text"
            className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
            placeholder="Enter address"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="license"
            className="font-semibold text-gray-700 block pb-2"
          >
            Which car do you have?
          </label>
          {/* <div className="flex justify-between items-center">
            <div className="flex"> */}
          {/* <input
            id="license"
            type="text"
            className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
            placeholder="License plate"
          /> */}
          {/* </div>
          </div> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="year"
              className="font-semibold text-gray-700 block pb-2"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              placeholder="Year"
            />
          </div>
          <div>
            <label
              htmlFor="make"
              className="font-semibold text-gray-700 block pb-2"
            >
              Make
            </label>
            <input
              id="make"
              type="text"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              placeholder="Make"
            />
          </div>
          <div>
            <label
              htmlFor="model"
              className="font-semibold text-gray-700 block pb-2"
            >
              Model
            </label>
            <input
              id="model"
              type="text"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              placeholder="Model"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-gray-700 block pb-2">
            Odometer and transmission
          </label>
          <div className="flex flex-wrap items-center mb-4">
            <select className="border-2 mr-4 p-2 rounded-lg mb-4 sm:mb-0">
              <option value="">Select odometer</option>
              <option value="0-20">0-20k kilometers</option>
              <option value="20-40">20-40k kilometers</option>
              <option value="40-60">40-60k kilometers</option>
              <option value="60-80">60-80k kilometers</option>
              <option value="80-100">80-100k kilometers</option>
              <option value="100-120">100-120k kilometers</option>
              <option value="120-140">120-140k kilometers</option>
              <option value="140-160">140-160k kilometers</option>
              <option value="160-180">160-180k kilometers</option>
              <option value="180-200">180-200k kilometers</option>
              <option value="200-220">200-220k kilometers</option>
              <option value="220-240">220-240k kilometers</option>
              <option value="240-260">240-260k kilometers</option>
              <option value="260-280">260-280k kilometers</option>
              <option value="280-300">280-300k kilometers</option>
              <option value="300+">300k+ kilometers</option>
            </select>
            <div>
              <label className="flex items-center mr-4 font-semibold text-gray-600">
                <input type="radio" name="transmission" className="mr-1" />
                Automatic
              </label>
              <label className="flex items-center font-semibold text-gray-600">
                <input type="radio" name="transmission" className="mr-1" />
                Manual
              </label>
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="taxes"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            I certify I paid applicable sales or related taxes on the purchase
            of this vehicle.
          </label>
          <select
            id="taxes"
            name="taxes"
            className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            To be eligible for coverage under your protection plan, your
            insurance and registration must be up to date, and your vehicle must
            meet your country safety inspection requirements.
          </p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-purple-600 hover:bg-violet-500 text-white rounded-full font-medium"
          onClick={() => navigate("/list-car-details")}
        >
          Next
        </button>
      </div>
      {isViewStepsOpen && (
        <ViewStepsModal
          isViewStepsOpen={isViewStepsOpen}
          handleCloseViewSteps={handleCloseViewSteps}
        />
      )}
    </div>
  );
};

export default ListYourCar;