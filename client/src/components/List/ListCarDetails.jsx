import React, { useState } from "react";

const ListCarDetails = () => {
  const [features, setFeatures] = useState([]);

//   const handleFeatureChange = (event, feature) => {
//     setFeatures((currentFeatures) =>
//       currentFeatures.includes(feature)
//         ? currentFeatures.filter((f) => f !== feature)
//         : [...currentFeatures, feature]
//     );
//   };

//   e;
  const featureOptions = ["All-wheel drive", "Android Auto", "Apple CarPlay"];

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="licensePlate"
            className="block text-sm font-medium text-gray-700"
          >
            License plate number
          </label>
          <input
            type="text"
            id="licensePlate"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter license plate"
          />
          <p className="mt-1 text-xs text-gray-500">
            Your license plate information won't be publicly visible.
          </p>
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            id="city"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Pennsylvania</option>
            {/* ... alte opțiuni de state ... */}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700">
          Car features
        </legend>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featureOptions.map((feature) => (
            <div key={feature}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Tell guests what makes your car unique and why they'll love driving it."
        ></textarea>
      </div>

    </div>
  );
};

export default ListCarDetails;
