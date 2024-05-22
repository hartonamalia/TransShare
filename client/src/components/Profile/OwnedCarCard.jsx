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

const OwnedCarCard = ({ car }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [carImages, setCarImages] = useState([]);

  const fetchCarImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-image/${car._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      setCarImages(data);
      console.log("aici", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarImages();
  }, []);

  return (
    <div className="flex flex-col w-80 h-[24rem] bg-white rounded-lg mb-6 shadow-md overflow-hidden">
      <div className="relative w-full">
        <img
          src={carImages.length > 0 ? carImages[0].imageURL : CarPng}
          className="w-full h-52 transform-gpu transition duration-2000 ease-in-out"
          alt="Car"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="font-semibold">
          {car.make} {car.model}
        </h3>
      </div>

      <button
        className="px-6 py-2 mt-6 w-36 mx-auto border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
        onClick={() => navigate(`/edit-car-details/${car._id}`)}
      >
        Edit Car
      </button>
    </div>
  );
};

export default OwnedCarCard;
