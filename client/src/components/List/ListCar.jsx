import React from "react";
import { useNavigate } from "react-router-dom";
import car2Png from "../../assets/car2.png";

const ListCar = () => {
  const navigate = useNavigate(); 
  return (
    <div className="bg-violet text-center py-20">
      <h1 className="text-5xl font-bold font-serif">
        Start a car sharing business on TransShare!
      </h1>
      <button
            className="mt-8 px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
            onClick={() => navigate("/list-your-car")}
          >
           Get started
          </button>
      {/* <p className="mt-4">INSURANCE PROVIDER</p> */}
      <img src={car2Png} alt="Banner" className="inline-block mt-14" />
    </div>
  );
};

export default ListCar;
