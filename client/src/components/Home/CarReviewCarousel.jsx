import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CarCard from "./CarCard";
import { useAuthContext } from "../../hooks/useAuthContext";

const CarReviewCarousel = () => {
  const { user } = useAuthContext();
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/car/top-new-cars",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCars(data);
      } else {
        throw new Error(
          data.message || "An error occurred while fetching the cars"
        );
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
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
        {cars.map((car) => (
          <SplideSlide key={car._id}>
            <CarCard carId={car._id} car={car} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default CarReviewCarousel;
