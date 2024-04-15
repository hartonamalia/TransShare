import React from "react";
import bcg2Image from "../../assets/bcg2.jpg";
import { useNavigate } from "react-router-dom";  

const About = () => {
  const navigate = useNavigate();  

  return (
    <div className="w-full md:h-128 lg:h-144 xl:h-160 h-96 relative">
      <img
        src={bcg2Image}
        alt="Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start pl-8 pr-16">
        <div className="space-y-5 sm:p-16 pb-6">
          <h1 className="font-bold">
            <p className="text-black text-2xl sm:text-4xl lg:text-5xl">
              Find Your Best
            </p>
            <p className="text-violet-500 text-2xl sm:text-4xl lg:text-5xl">
              Car for Your Next Trip
            </p>
          </h1>
           {/* <p data-aos="fade-up" className="leading-8 tracking-wide">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Aspernatur, magnam! Tenetur odio quo et maxime?
          </p>
          <p data-aos="fade-up">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            tempora.
          </p> */}
          <button
            className="px-6 py-2 border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
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

export default About;
