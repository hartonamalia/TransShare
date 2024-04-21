import React from "react";

const SidebarRent = () => {
  return (
    <div className="bg-white p-4 space-y-4 w-full sm:w-64">
      <div>
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700"
        >
          Sort by
        </label>
        <select
          id="sort"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 shadow focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
        >
          <option value="">Select</option>
          <option value="increasing price">Increasing price</option>
          <option value="decreasing price">Decreasing price</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-700"
        >
          Make
        </label>
        <select
          id="make"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 shadow focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
        >
          <option value="">Select a make</option>
          <option value="Acura">Acura</option>
          <option value="Alfa Romeo">Alfa Romeo</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Cadillac">Cadillac</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Chrysler">Chrysler</option>
          <option value="Dodge">Dodge</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Fiat">Fiat</option>
          <option value="Ford">Ford</option>
          <option value="Genesis">Genesis</option>
          <option value="GMC">GMC</option>
          <option value="Honda">Honda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Infiniti">Infiniti</option>
          <option value="Jaguar">Jaguar</option>
          <option value="Jeep">Jeep</option>
          <option value="Kia">Kia</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Land Rover">Land Rover</option>
          <option value="Lexus">Lexus</option>
          <option value="Lincoln">Lincoln</option>
          <option value="Maserati">Maserati</option>
          <option value="Mazda">Mazda</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Mini">Mini</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Nissan">Nissan</option>
          <option value="Opel">Opel</option>
          <option value="Peugeot">Peugeot</option>
          <option value="Porsche">Porsche</option>
          <option value="Ram">Ram</option>
          <option value="Renault">Renault</option>
          <option value="Rolls-Royce">Rolls-Royce</option>
          <option value="Saab">Saab</option>
          <option value="Subaru">Subaru</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Tesla">Tesla</option>
          <option value="Toyota">Toyota</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Volvo">Volvo</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Year
        </label>
        <input
          type="range"
          id="year"
          name="year"
          min="2007"
          max="2024"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label
          htmlFor="transmission"
          className="block text-sm font-medium text-gray-700"
        >
          Transmission
        </label>
        <select
          id="transmission"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 shadow focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
        >
          <option value="">Select transmission</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="fueltype"
          className="block text-sm font-medium text-gray-700"
        >
          Fuel Type
        </label>
        <select
          id="fueltype"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 shadow focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
        >
          <option value="">Select fuel type</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="gas">Gas</option>
          <option value="gpl">GPL</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="seats"
          className="block text-sm font-medium text-gray-700"
        >
          Seats
        </label>
        <select
          id="seats"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 shadow focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
        >
          <option value="">Select seats</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>

      <div>
        <button
          className="mt-4 block w-full bg-violet-500 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-violet-300 shadow-lg"
          type="button"
        >
          Filter Results
        </button>
      </div>
    </div>
  );
};

export default SidebarRent;
