import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const ListCarDetails = () => {
  const navigate = useNavigate();
  const [isFirstDetailsOpen, setIsFirstDetailsOpen] = useState(false);
  const [isSecondDetailsOpen, setIsSecondDetailsOpen] = useState(false);
  const [isThirdDetailsOpen, setIsThirdDetailsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [dailyPrice, setDailyPrice] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState({});
  const [selectedCity, setSelectedCity] = useState({});

  const toggleFirstDetails = () => {
    setIsFirstDetailsOpen(!isFirstDetailsOpen);
  };

  const toggleSecondDetails = () => {
    setIsSecondDetailsOpen(!isSecondDetailsOpen);
  };

  const toggleThirdDetails = () => {
    setIsThirdDetailsOpen(!isThirdDetailsOpen);
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

  const fetchCounties = async () => {
    try {
      const response = await fetch("https://roloca.coldfuse.io/judete");
      const data = await response.json();

      setCounties(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async () => {
    if (!selectedCounty.auto) return;
    try {
      const response = await fetch(
        `https://roloca.coldfuse.io/orase/${selectedCounty.auto}`
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

  useEffect(() => {
    fetchCities();
  }, [selectedCounty]);

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
                htmlFor="county"
                className="font-semibold text-gray-700 block pb-2"
              >
                County
              </label>
              <select
                id="county"
                name="county"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                value={selectedCounty.nume || ""}
                onChange={(e) => {
                  const selected = counties.find(
                    (county) => county.nume === e.target.value
                  );
                  setSelectedCounty(selected);
                  fetchCities();
                }}
              >
                <option value="">Select County</option>
                {counties.map((county, index) => (
                  <option key={index} value={county.nume}>
                    {county.nume}
                  </option>
                ))}
              </select>
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
                placeholder="Select City"
                defaultValue=""
              >
                {cities &&
                  cities.map((city, index) => (
                    <option key={index} value={city.nume}>
                      {city.nume}
                    </option>
                  ))}
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
                      className="form-checkbox  text-violet-500 checked:bg-violet-600 checked:border-transparent focus:outline-none focus:ring-0"
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
      {/* third section*/}

      <div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer border-t-2 border-t-violet-500 py-2"
          onClick={toggleThirdDetails}
        >
          <h1 className="text-3xl font-semibold text-gray-800">Daily price</h1>
          {isThirdDetailsOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </div>
        {isThirdDetailsOpen && (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
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
        )}
      </div>

      {/* submit button*/}
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
