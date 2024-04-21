import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarRent from "./SidebarRent";
import SearchBanner from "../Home/SearchBanner";
import RentImage from "../../assets/carRent.png";
import CarCard from "../Home/CarCard";

const RentCars = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <button
        className="mt-8 px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
        onClick={() => navigate("/see-car")}
      >
        Get started
      </button> */}
      <img src={RentImage} alt="Banner" className="h-full w-full object-fill" />
      <SearchBanner />
      <SidebarRent />
      <CarCard />
    </div>
  );
};

export default RentCars;
