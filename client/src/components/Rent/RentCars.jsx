import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarRent from "./SidebarRent";
import SearchForm from "./SearchRent";
import RentImage from "../../assets/carRent.png";
import CarCard from "../Home/CarCard";

const RentCars = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isLargeScreen) {
      setIsFilterOpen(true);
    } else {
      setIsFilterOpen(false);
    }
  }, [isLargeScreen]);

  return (
    <div>
      {/* <button
        className="mt-8 px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
        onClick={() => navigate("/see-car")}
      >
        Get started
      </button> */}

      <img src={RentImage} alt="Banner" className="w-full object-fill" />

      <SearchForm />

      <div className="flex flex-col items-center lg:flex-row w-full justify-center lg:items-start mt-[20rem] lg:mt-10">
        {!isLargeScreen && (
          <button
            className="block lg:hidden w-20 h-10 bg-violet-500 rounded mb-4 text-white font-semibold hover:bg-purple-400"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            Filter
          </button>
        )}
        {isFilterOpen && <SidebarRent isFilterOpen={isFilterOpen} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
      </div>
    </div>
  );
};

export default RentCars;
