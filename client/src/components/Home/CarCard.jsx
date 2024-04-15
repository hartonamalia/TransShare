import React from "react";
import CarPng from "../../assets/car.png";
import Auto from "../../assets/icons/car-parts-01.svg";
import Km from "../../assets/icons/car-parts-02.svg";
import Fuel from "../../assets/icons/car-parts-03.svg";
import Power from "../../assets/icons/car-parts-04.svg";
import Year from "../../assets/icons/car-parts-05.svg";
import Seats from "../../assets/icons/car-parts-06.svg";
import { useNavigate } from "react-router-dom";

const CarCard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-80 h-[30rem] bg-white rounded-lg  mb-6 shadow-md gap-3">
      <div className="w-full">
        <img
          src={CarPng}
          className="w-full rounded-lg transform-gpu transition duration-2000 ease-in-out"
          alt="Toyota"
        />
      </div>
      <div className="flex items-center justify-center w-20 h-10 p-1 bg-violet-500 rounded-md">
        <span className="text-white">$400/day</span>
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
          <h3 className="listing-title">Toyota Camry SE 350</h3>
          <h6>
            Listed By : <span>Venis Darren</span>
          </h6>
        </div>
        <div className="flex flex-col gap-2 border-t border-t-gray-700">
          <ul className="flex items-center justify-between">
            <li className="flex items-center gap-1">
              <span>
                <img src={Auto} alt="Auto" />
              </span>
              <p>Auto</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Km} alt="10 KM" />
              </span>
              <p>10 KM</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Fuel} alt="Petrol" />
              </span>
              <p>Petrol</p>
            </li>
          </ul>
          <ul className="flex items-center justify-between">
            <li className="flex items-center gap-1">
              <span>
                <img src={Power} alt="Power" />
              </span>
              <p>Power</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Year} alt="" />
              </span>
              <p>2018</p>
            </li>
            <li className="flex items-center gap-1">
              <span>
                <img src={Seats} alt="Persons" />
              </span>
              <p>5 Seats</p>
            </li>
          </ul>
        </div>
        <button
          className="px-6 py-2 border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
          onClick={() => navigate("/rent")}
        >
          Rent now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
