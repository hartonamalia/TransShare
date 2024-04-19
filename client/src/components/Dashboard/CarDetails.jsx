import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CarPng from "../../assets/car.png";

const CarDetails = () => {
  const specifications = [
    { key: "Transmission", value: "daaaaa" },
    { key: "Fuel Type", value: "?" },
    { key: "Year", value: "?" },
    { key: "Odometer", value: "?" },
    { key: "Doors", value: "?" },
    { key: "Seats", value: "?" },
  ];

  const features = [
    { name: "All-wheel drive", available: true },
    { name: "Spare wheel", available: true },
    { name: "Automatic pilot", available: false },
    { name: "AUX input", available: true },
    { name: "Backup camera", available: true },
    { name: "Bike rack", available: true },
    { name: "Blind spot warning", available: true },
    { name: "Bluetooth", available: false },
    { name: "Child seat", available: true },
    { name: "Convertible", available: true },
    { name: "GPS", available: true },
    { name: "Heated seats", available: true },
    { name: "Keyless entry", available: true },
    { name: "Pet friendly", available: true },
    { name: "AC", available: true },
    { name: "Snow tires or chains", available: true },
    { name: "Sunroof", available: true },
    { name: "Smoking allowed", available: true },
    { name: "USB charger", available: true },
    { name: "Navigation system", available: true },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-4">
      <img
        src={CarPng}
        alt="Car"
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Audi R8 </h3>
        <div className="text-gray-600"> 80 RON / per day</div>

        {/* Specifications */}
        <div className="mt-4">
          <h5 className="font-semibold text-lg border-b-2">Specifications</h5>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center">
                <p className="text-gray-700 font-semibold">
                  {spec.key}: <span>{spec.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-4">
          <h5 className="font-semibold text-lg border-b-2">Car features</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 mt-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center font-semibold text-gray-700 "
              >
                {feature.available ? (
                  <CheckCircleIcon className="text-green-500" />
                ) : (
                  <CancelIcon className="text-red-500" />
                )}
                <p className="ml-2">{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Description */}
        <div className="mt-4">
          <h5 className="font-semibold text-lg border-b-2">Description</h5>
          <p className="text-gray-700 mt-2">
            masina ffffffffffff buna!!!!!!!!!!!!! vr si eu una
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
