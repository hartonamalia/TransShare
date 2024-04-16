import React from "react";
import { useNavigate } from "react-router-dom";
import images1 from "../../assets/images.jpg";

const ListCarSubmit = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-violet text-center py-20">
      <h1 className="text-5xl font-bold font-serif">
        Welcome to the TransShare community!
      </h1>
      <h2 className="text-5xl font-bold font-serif">
        Now people can rent your car.
      </h2>

      <div className="bg-gray-200 flex items-center justify-center mt-10">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto mt-8 overflow-hidden rounded shadow-lg">
          <img
            src={images1}
            alt="Imagine"
            className="block w-full h-auto rounded object-cover"
          />
        </div>
      </div>
    </div>

      <button
        className="mt-20 px-14 py-3 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
        onClick={() => navigate("/")}
      >
        Get started
      </button>
    </div>
  );
};

export default ListCarSubmit;
