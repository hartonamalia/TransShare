import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarRent from "./SidebarRent";
import SearchBanner from "./SearchRent";
import RentImage from "../../assets/carRent.png";
import CarCard from "../Home/CarCard";
import { useAuthContext } from "../../hooks/useAuthContext";
import Pagination from "./Pagination";
import { toast } from "react-toastify";

const RentCars = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const [cars, setCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [searchParams, setSearchParams] = useState({
    city: "",
    auto: "",
    countyName: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({});

  const isInitialMount = useRef(true);
  const [searchInitialized, setSearchInitialized] = useState(false);

  useEffect(() => {
    const storedSearchParams = sessionStorage.getItem("searchParams");
    if (storedSearchParams) {
      setSearchParams(JSON.parse(storedSearchParams));
      setSearchInitialized(true);
    } else if (location.state) {
      const {
        city,
        auto,
        countyName,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
      } = location.state;
      setSearchParams({
        city,
        auto,
        countyName,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
      });
      setSearchInitialized(true);
    } else {
      setSearchParams({
        city: "",
        auto: "",
        countyName: "",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
      });
      setSearchInitialized(true);
    }
  }, [location.state]);

  const fetchCars = async (
    page = 1,
    sortOption = "",
    filterOptions = {},
    searchParams = {}
  ) => {
    const {
      city = "",
      countyName = "",
      pickupDate = "",
      pickupTime = "",
      returnDate = "",
      returnTime = "",
    } = searchParams;

    const query = new URLSearchParams({
      page,
      limit: 6,
      sort: sortOption,
      ...filterOptions,
      city,
      countyName,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    }).toString();

    try {
      const response = await fetch(
        `http://localhost:8000/api/car/all-cars?${query}`,
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
        setCars(data.cars);
        setTotalPages(data.totalPages);
        console.log("data ", Date(), data);
      } else {
        setCars([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsFilterOpen(true);
    } else {
      setIsFilterOpen(false);
    }
  }, [isLargeScreen]);

  useEffect(() => {
    if (searchInitialized) {
      const fetchInitialCars = async () => {
        await fetchCars(currentPage, sort, filters, searchParams);
      };
      fetchInitialCars();
    }
  }, [currentPage, sort, filters, searchParams, searchInitialized]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchCars(1, sort, newFilters, searchParams);
  };

  const handleSetSearchParams = (value) => {
    setSearchParams(value);
    setSearchInitialized(true);
    if (
      value.city !== "" ||
      value.auto !== "" ||
      value.countyName !== "" ||
      value.pickupDate !== "" ||
      value.pickupTime !== "" ||
      value.returnDate !== "" ||
      value.returnTime !== ""
    )
      sessionStorage.setItem("searchParams", JSON.stringify(value));
    fetchCars(1, sort, filters, value);
  };

  const resetSearchParams = () => {
    location.state = null;
    setSearchParams({});
    setSearchInitialized(false);
    sessionStorage.removeItem("searchParams"); 
    setCars([]);
    setCurrentPage(1);
    setTotalPages(1);
  };

  return (
    <div>
      <img src={RentImage} alt="Banner" className="w-full object-fill" />
      <SearchBanner
        searchParams={searchParams}
        handleSetSearchParams={handleSetSearchParams}
        resetSearchParams={resetSearchParams}
      />
      <div className="flex flex-col items-center lg:flex-row w-full justify-center lg:items-start mt-[28rem] lg:mt-10">
        {!isLargeScreen && (
          <button
            className="block lg:hidden w-20 h-10 bg-violet-500 rounded mb-4 text-white font-semibold hover:bg-purple-400"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            Filter
          </button>
        )}
        {isFilterOpen && (
          <SidebarRent
            isFilterOpen={isFilterOpen}
            onFilterChange={handleFilterChange}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          {cars &&
            cars.map((car) => (
              <CarCard carId={car._id} key={car._id} car={car} />
            ))}
          {cars.length === 0 && (
            <div className="flex flex-col w-80 h-[30rem] bg-white rounded-lg mb-6 shadow-md overflow-hidden justify-center ml-8">
              <h3 className="text-center text-xl font-semibold mt-4 text-red-500">
                No cars found
              </h3>
            </div>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RentCars;
