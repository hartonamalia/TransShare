import React from "react";
import About from "./About";
import SearchBanner from "./SearchBanner";
import TopBanner from "./TopBanner";
import CarReviewCarousel from "./CarReviewCarousel";
import FeedbackCar from "./FeedbackCar";


const Home = () => {
  return (
    <div>
      <TopBanner />
      <SearchBanner />
      <About />
      <div className="max-w-screen-lg mx-auto px-4">
      <CarReviewCarousel />
      <FeedbackCar />
      </div>
    </div>
  );
};

export default Home;
