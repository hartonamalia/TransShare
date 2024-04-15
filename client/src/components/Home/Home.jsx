import React from "react";
import About from "./About";
import SearchBanner from "./SearchBanner";
import TopBanner from "./TopBanner";
import CarCard from "./CarCard";


const Home = () => {
  return (
    <div>
      <TopBanner />
      <SearchBanner />
      <About />
      <CarCard />
    </div>
  );
};

export default Home;
