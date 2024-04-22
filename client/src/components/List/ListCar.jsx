import React from "react";
import { useNavigate } from "react-router-dom";
import car2Png from "../../assets/car2.png";

const ListCar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-violet text-center py-20 flex flex-col items-center">
      <h1 className="text-5xl font-bold font-serif mb-4">
        Start a car sharing business on TransShare!
      </h1>
      <button
        className="px-10 py-3 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 transition duration-300 ease-in-out mb-4"
        onClick={() => navigate("/list-your-car")}
      >
        Get started
      </button>
      <img src={car2Png} alt="Car" className="w-full max-w-xl mx-auto" />
    </div>
  );
};

export default ListCar;
