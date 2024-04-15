import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CarCard from "./CarCard";

const CarReviewCarousel = () => {
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
        <SplideSlide>
          <CarCard />
        </SplideSlide>
        <SplideSlide>
          <CarCard />
        </SplideSlide>
        <SplideSlide>
          <CarCard />
        </SplideSlide>
        <SplideSlide>
          <CarCard />
        </SplideSlide>
        <SplideSlide>
          <CarCard />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default CarReviewCarousel;
