import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnTime, setReturnTime] = useState('');

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, pickupDate, pickupTime, returnDate, returnTime });
  };

  return (
    <div className=" bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto absolute left-0 right-0 top-[27rem]">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-around gap-2 md:gap-2">
        <div className="flex flex-col ">
          <label htmlFor="location" className="text-gray-700 font-semibold flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            Pickup Location
          </label>
          <input
            id="location"
            type="text"
            className="border rounded-lg p-2 focus:border-violet-500"
            placeholder="Enter City, Airport, or Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
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
          <div className="flex  items-center">
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
