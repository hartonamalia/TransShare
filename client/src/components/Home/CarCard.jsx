import React, { useEffect, useState } from "react";
import CarPng from "../../assets/car.png";
import Auto from "../../assets/icons/car-parts-01.svg";
import Km from "../../assets/icons/car-parts-02.svg";
import Fuel from "../../assets/icons/car-parts-03.svg";
import Door from "../../assets/icons/car-parts-04.svg";
import Year from "../../assets/icons/car-parts-05.svg";
import Seats from "../../assets/icons/car-parts-06.svg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const CarCard = ({ carId = "6626a6e9c745c3a1e5bac9f2" }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [car, setCar] = useState({});
  const fetchCarDetails = async () => {
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

      const data = await response.json();
      const specs = [
        data.transsmission,
        data.fuelType,
        data.year,
        data.odometer,
        data.doors,
        data.seats,
      ];
      setCar(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCarDetails();
  }, []);

  const getValue = (key) => {
    switch (key) {
      case "Transmission":
        return car.transmission || "N/A";
      case "Fuel Type":
        return car.fuelType || "N/A";
      case "Year":
        return car.year || "N/A";
      case "Odometer":
        return `${car.odometer}k` || "N/A";
      case "Doors":
        return car.doors || "N/A";
      case "Seats":
        return car.seats || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <div className="flex flex-col w-80 h-[30rem] bg-white rounded-lg mb-6 shadow-md overflow-hidden">
      <div className="relative w-full">
        <img
          src={CarPng}
          className="w-full transform-gpu transition duration-2000 ease-in-out"
          alt=""
        />
        <div className="absolute bottom-0 right-0 mb-[-1rem]  mr-[1rem] w-28 h-10 bg-violet-500 rounded-md flex items-center justify-center">
          <span className="text-white">{car.dailyPrice} EUR/day</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <div className="flex">
            <p>⭐</p>
            <p>⭐</p>
            <p>⭐</p>
            <p>⭐</p>
            <p>⭐</p>
            <span>(5.0)</span>
          </div>
          <h3 className="font-semibold">
            {car.make} {car.model}
          </h3>
          <h6>
            Listed By : <span>Venis Darren</span>
          </h6>
        </div>
        <div className="flex flex-col gap-2 border-t border-t-gray-500">
          <ul className="flex items-center justify-between">
            <li className="flex items-center gap-1">
              <span>
                <img src={Auto} alt="Auto" />
              </span>
              <p>{getValue("Transmission")}</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Km} alt="10 KM" />
              </span>
              <p>{getValue("Odometer")}</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Fuel} alt="Petrol" />
              </span>
              <p>{getValue("Fuel Type")}</p>
            </li>
          </ul>
          <ul className="flex items-center justify-between">
            <li className="flex items-center gap-1">
              <span>
                <img src={Door} alt="Door" />
              </span>
              <p>{getValue("Doors")} Doors</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Year} alt="" />
              </span>
              <p>{getValue("Year")}</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Seats} alt="Persons" />
              </span>
              <p>{getValue("Seats")} Seats</p>
            </li>
          </ul>
        </div>
        <button
          className="px-6 py-2 border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
          onClick={() => navigate(`/see-car/6626a6e9c745c3a1e5bac9f2`)}
        >
          Rent now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
