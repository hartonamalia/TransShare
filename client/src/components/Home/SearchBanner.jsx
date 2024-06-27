import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [counties, setCounties] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    const countyName = getCountyName(selectedCounty);
    const formattedPickupDate = pickupDate ? formatDate(pickupDate) : "";
    const formattedReturnDate = returnDate ? formatDate(returnDate) : "";

    const searchParams = {
      city: location,
      countyName,
      auto: selectedCounty,
      pickupDate: formattedPickupDate,
      pickupTime,
      returnDate: formattedReturnDate,
      returnTime,
    };

    navigate("/rent", { state: searchParams });
  };

  const getCountyName = (auto) => {
    const county = counties.find((county) => county.auto === auto);
    return county ? county.nume : "";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const fetchCounties = async () => {
    try {
      const response = await fetch("https://roloca.coldfuse.io/judete");
      const data = await response.json();
      setCounties(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async (countyAuto) => {
    if (!countyAuto) return;

    try {
      const response = await fetch(
        `https://roloca.coldfuse.io/orase/${countyAuto}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCounties();
  }, []);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filteredSuggestions = cities.filter((city) =>
        city.nume.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsMenuOpen(true);
    } else {
      setSuggestions([]);
      setIsMenuOpen(false);
    }
  };

  const handleCountyChange = (e) => {
    const value = e.target.value;
    setSelectedCounty(value);
    fetchCities(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.nume);
    setSuggestions([]);
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto absolute left-0 right-0 top-[27rem]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-center justify-around gap-2 md:gap-2"
      >
        <div className="flex flex-col">
          <label
            htmlFor="county"
            className="text-gray-700 font-semibold flex items-center mb-1"
          >
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            Select County
          </label>
          <select
            id="county"
            className="border rounded-lg p-2 focus:border-violet-500 w-full"
            value={selectedCounty}
            onChange={handleCountyChange}
          >
            <option value="">Select County</option>
            {counties.map((county, index) => (
              <option key={index} value={county.auto}>
                {county.nume}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-gray-700 font-semibold flex items-center mb-1"
          >
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            Pickup Location
          </label>
          <input
            id="location"
            type="text"
            className="border rounded-lg p-2 focus:border-violet-500 w-full"
            placeholder="Enter City, Airport, or Address"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => setIsMenuOpen(true)}
          />
          {isMenuOpen && suggestions.length > 0 && (
            <div className="relative z-10">
              <ul className="absolute bg-white border rounded-lg mt-1 w-full max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.nume}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold flex items-center">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            Pickup Date
          </label>
          <div className="flex items-center">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              dateFormat="MM/dd/yyyy"
              className="border rounded-l-lg p-2 focus:border-violet-500 w-28"
              placeholderText="Select date"
              minDate={today}
            />
            <input
              type="time"
              className="border-t border-b border-r rounded-r-lg p-2 focus:border-violet-500"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold flex items-center">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            Return Date
          </label>
          <div className="flex items-center">
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              dateFormat="MM/dd/yyyy"
              className="border rounded-l-lg p-2 focus:border-violet-500 w-28"
              placeholderText="Select date"
              minDate={pickupDate || today}
            />
            <input
              type="time"
              className="border-t border-b border-r rounded-r-lg p-2 focus:border-violet-500"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-400 text-white py-2 px-6 rounded-lg shadow-lg flex items-center justify-center mt-5"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
