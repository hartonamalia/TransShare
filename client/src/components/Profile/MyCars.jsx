import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import OwnedCarCard from "./OwnedCarCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const MyCars = () => {
  const { user } = useAuthContext();
  const [userCars, setUserCars] = useState([]);

  const fetchUserCars = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car/all-cars/${user.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      setUserCars(data.cars);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <h1>My Cars</h1>
      <p>Here you can see all the cars you have listed.</p>
      <div className="mx-auto w-full">
        <Splide
          options={{
            perPage: 1,
            arrow: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
            width: "100%",
            autoWidth: true,
            mediaQuery: "min",
            breakpoints: {
              1024: {
                perPage: 3,
                gap: "1rem",
              },
              768: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
          }}
        >
          {userCars.map((car) => (
            <SplideSlide key={car._id}>
              <OwnedCarCard car={car} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default MyCars;
