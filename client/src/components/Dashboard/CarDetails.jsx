import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CarPng from "../../assets/car.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [car, setCar] = useState({});
  const [carSpecs, setCarSpecs] = useState({});
  const fetchCarDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car/car-details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      const specs = [
        data.transsmission,
        data.fuelType,
        data.year,
        data.odometer,
        data.doors,
        data.seats,
      ];
      handleSpecifications(specs);
      setCar(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCarDetails();
  }, []);

  

  const handleSpecifications = (specifications) => {
    for (let key in specifications) {
      setCarSpecs((prev) => {
        return { ...prev, [key]: specifications[key] };
      });
    }
  };

  const specifications = car
    ? [
        { key: "Transmission", value: car.transmission || "N/A" },
        { key: "Fuel Type", value: car.fuelType || "N/A" },
        { key: "Year", value: car.year || "N/A" },
        { key: "Odometer", value: `${car.odometer}k Km` || "N/A" },
        { key: "Doors", value: car.doors || "N/A" },
        { key: "Seats", value: car.seats || "N/A" },
      ]
    : [];

  const featuresTemplate = [
    "All-wheel drive",
    "Spare wheel",
    "Automatic pilot",
    "AUX input",
    "Backup camera",
    "Bike rack",
    "Blind spot warning",
    "Bluetooth",
    "Child seat",
    "Convertible",
    "GPS",
    "Heated seats",
    "Keyless entry",
    "Pet friendly",
    "AC",
    "Snow tires or chains",
    "Sunroof",
    "Smoking allowed",
    "USB charger",
    "Navigation system",
  ];

  const features = featuresTemplate.map((featureName) => ({
    name: featureName,
    available: car?.carFeatures?.includes(featureName) || false,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-4">
      <img
        src={CarPng}
        alt="Car"
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="mt-4">
        <h3 className="text-xl font-semibold">
          {car.make} {car.model}
        </h3>
        <div className="text-gray-600">{car.dailyPrice} EUR/day</div>

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
                className="flex items-center font-semibold text-gray-700"
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
            {car.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
