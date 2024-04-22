import React from "react";
import CarPng from "../../assets/car.png";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-dark bg-slate-100 md:mt-50  lg:mt-0 mt-60 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 mt-20 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p
                data-aos="fade-up"
                className="leading-8 tracking-wide font-semibold"
              >
                "TransShare" is a web application designed to streamline the
                temporary sharing of private vehicles among users.
              </p>
              <p data-aos="fade-up" className="font-semibold">
                This platform enables car owners to list their vehicles for
                rental, providing an opportunity for those in need of
                transportation to easily access a car for a specified duration.
              </p>
              <button
                className="px-6 py-2 border font-semibold border-gray-500 rounded hover:bg-violet-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => navigate("/about")}
              >
                Find more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
