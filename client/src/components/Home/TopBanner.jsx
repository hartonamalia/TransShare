import React from "react";
import bcg2Image from "../../assets/bcg2.png";
import { useNavigate } from "react-router-dom";

const TopBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-96  md:h-128 lg:h-144 xl:h-160 relative">
      <img src={bcg2Image} alt="Banner" className="h-full w-full object-fill" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-4 sm:p-8 md:p-16">
        <div className="space-y-3 md:space-y-5">
          <h1 className="font-bold text-center md:text-left">
            <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-4xl">
              Find Your Best
            </p>
            <p className="text-violet-500 text-lg sm:text-xl md:text-2xl lg:text-4xl">
              Car for Your Next Trip
            </p>
          </h1>
          <button
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
            onClick={() => navigate("/rent")}
          >
            View all Cars
            <span className="inline-block ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
