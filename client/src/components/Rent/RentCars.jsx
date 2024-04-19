import React from "react";
import { useNavigate } from "react-router-dom";

const RentCars = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="mt-8 px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
        onClick={() => navigate("/see-your-car")}
      >
        Get started
      </button>
    </div>
  );
};

export default RentCars;
