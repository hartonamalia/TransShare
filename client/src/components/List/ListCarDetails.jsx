import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const ListCarDetails = () => {
  const navigate = useNavigate();
  const [isFirstDetailsOpen, setIsFirstDetailsOpen] = useState(false);
  const [isSecondDetailsOpen, setIsSecondDetailsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [dailyPrice, setDailyPrice] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleFirstDetails = () => {
    setIsFirstDetailsOpen(!isFirstDetailsOpen);
  };

  const toggleSecondDetails = () => {
    setIsSecondDetailsOpen(!isSecondDetailsOpen);
  };

  const handleFeatureChange = (feature) => {
    setSelectedFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const handlePriceChange = (event) => {
    setDailyPrice(event.target.value);
  };

  const featuresList = [
    "All-wheel drive",
    "Android Auto",
    "Apple CarPlay",
    "AUX input",
    "Backup camera",
    "Bike rack",
    "Blind spot warning",
    "Bluetooth",
    "Child seat",
    "Convertible",
    "GPS",
    "Heated seats",
    "Keyless entry",
    "Pet friendly",
    "Ski rack",
    "Snow tires or chains",
    "Sunroof",
    "Toll pass",
    "USB charger",
    "Wheelchair accessible",
  ];

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFiles[0]);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(imagesArray);
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    event.target.value = "";
  };
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleFirstDetails}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Car details
        </h1>
        {isFirstDetailsOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      {/* first section */}
      {isFirstDetailsOpen && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="License Plate Number"
                className="font-semibold text-gray-700 block pb-2"
              >
                License Plate Number
              </label>
              <input
                id="License Plate Number"
                type="text"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                placeholder="License Plate Number"
              />
              <div className="pt-4">
                <p className="text-sm text-gray-600">
                  Your license plate information won't be shared with guests.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="font-semibold text-gray-700 block pb-2"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Alba Iulia">Alba Iulia</option>
                <option value="Arad">Arad</option>
                <option value="Bacău">Bacău</option>
                <option value="Oradea">Oradea</option>
                <option value="București">București</option>
                <option value="Cluj-Napoca">Cluj-Napoca</option>
                <option value="Constanța">Constanța</option>
                <option value="Craiova">Craiova</option>
                <option value="Iași">Iași</option>
                <option value="Timișoara">Timișoara</option>
                <option value="Sibiu">Sibiu</option>
                {/* ... restul orașelor */}
              </select>
            </div>
            <div>
              <label
                htmlFor="county"
                className="font-semibold text-gray-700 block pb-2"
              >
                County
              </label>
              <select
                id="county"
                name="county"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Select County
                </option>
                <option value="Alba Iulia">Alba Iulia</option>
                <option value="Arad">Arad</option>
                <option value="Bacău">Bacău</option>
                <option value="Oradea">Oradea</option>
                <option value="București">București</option>
                <option value="Cluj-Napoca">Cluj-Napoca</option>
                <option value="Constanța">Constanța</option>
                <option value="Craiova">Craiova</option>
                <option value="Iași">Iași</option>
                <option value="Timișoara">Timișoara</option>
                <option value="Sibiu">Sibiu</option>
                {/* ... restul orașelor */}
              </select>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Car features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
                {featuresList.map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!selectedFeatures[feature]}
                      onChange={() => handleFeatureChange(feature)}
                      className="form-checkbox h-5 w-5 text-violet-500 checked:bg-violet-600 checked:border-transparent focus:outline-none focus:ring-0"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-semibold">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              Tell guests what makes your car unique and why they will love it.
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add some details about your car."
            ></textarea>
          </div>
        </div>
      )}

      {/* second section */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer border-t-2 border-t-violet-500 py-2"
        onClick={toggleSecondDetails}
      >
        <h1 className="text-3xl font-semibold text-gray-800">Car photos</h1>
        {isSecondDetailsOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>

      {isSecondDetailsOpen && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/*"
            />

            {selectedImages.length > 0 && (
              <button
                className="upload-btn"
                onClick={() => {
                  console.log(selectedImages);
                }}
              ></button>
            )}

            <div className="flex flex-wrap gap-10 items-center">
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <div className="relative" key={image}>
                      <img
                        className="w-[200px] h-[200px]"
                        src={image}
                        alt="upload"
                      />
                      <TrashIcon
                        className="absolute top-0 right-0 flex items-center justify-center h-7 w-7   font-semibold text-red-500 cursor-pointer "
                        onClick={() => deleteHandler(image)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 border-t-2 border-t-violet-500">
        <label
          htmlFor="daily-price"
          className="block text-sm font-bold text-gray-700"
        >
          Daily price
        </label>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <span className="pl-1 text-gray-500">RON</span>
          <input
            type="text"
            id="daily-price"
            className="p-3 block w-full focus:ring-0"
            placeholder="Enter your daily price"
            value={dailyPrice}
            onChange={(e) => setDailyPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          className="px-16 py-2 bg-purple-600 hover:bg-violet-500 text-white rounded-full font-medium"
          onClick={() => navigate("/list-car-submit")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ListCarDetails;
