import React from "react";
import { useNavigate } from "react-router-dom";
import images1 from "../../assets/images.jpg";

const ListCarSubmit = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-violet text-center py-8">
      <h1 className="text-5xl font-bold font-serif">
        Welcome to the TransShare community!
      </h1>
      <h2 className="text-5xl font-bold font-serif">
        Now people can rent your car.
      </h2>

      <div className="bg-gray-200 flex items-center justify-center mt-10">
        <div className="container mx-auto px-4">
          <div className="w-[70%]  mx-auto my-auto py-3 overflow-hidden rounded">
            <img
              src={images1}
              alt="Imagine"
              className="block w-full  rounded object-fill h-[200px] md:h-[300px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>

      <button
        className=" mt-6 px-14 py-3 bg-violet-500 text-white rounded-full font-medium hover:bg-purple-400 hover:text-white ease-in-out duration-300"
        onClick={() => navigate("/")}
      >
        Get started
      </button>
    </div>
  );
};

export default ListCarSubmit;
