import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const EditCarDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [car, setCar] = useState({});
  const [carImages, setCarImages] = useState([]);

  const [isFirstDetailsOpen, setIsFirstDetailsOpen] = useState(false);
  const [isSecondDetailsOpen, setIsSecondDetailsOpen] = useState(false);
  const [isThirdDetailsOpen, setIsThirdDetailsOpen] = useState(false);
  const [isFourthDetailsOpen, setIsFourthDetailsOpen] = useState(false);

  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [licensePlate, setLicensePlate] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [counties, setCounties] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState({});
  const [selectedCity, setSelectedCity] = useState({});

  const [formData, setFormData] = useState({
    address: "",
    year: "",
    make: "",
    model: "",
    odometer: "",
    transmission: "",
    fuelType: "",
    seats: "",
    doors: "",
  });

  const toggleFirstDetails = () => {
    setIsFirstDetailsOpen(!isFirstDetailsOpen);
  };

  const toggleSecondDetails = () => {
    setIsSecondDetailsOpen(!isSecondDetailsOpen);
  };

  const toggleThirdDetails = () => {
    setIsThirdDetailsOpen(!isThirdDetailsOpen);
  };

  const toggleFourthDetails = () => {
    setIsFourthDetailsOpen(!isFourthDetailsOpen);
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

  const prepareData = () => {
    const features = Object.entries(selectedFeatures)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    return {
      address: formData.address,
      year: formData.year,
      make: formData.make,
      model: formData.model,
      odometer: formData.odometer,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      seats: formData.seats,
      doors: formData.doors,
      licensePlate: licensePlate,
      county: selectedCounty.nume,
      city: selectedCity.nume,
      carFeatures: features,
      description: description,
      dailyPrice: dailyPrice,
    };
  };

  const handleChange = (event, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    const carData = prepareData();

    try {
      const response = await fetch(
        `http://localhost:8000/api/car/update-car-details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(carData),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.error || "Failed to update car details");
        return;
      }

      if (selectedFiles.length > 0) {
        uploadImages(id);
      }
      toast.success("Car details updated successfully");
      navigate("/my-cars");
    } catch (error) {
      toast.error("Failed to update car details");
    }
  };

  const uploadImages = async (carId) => {
    console.log(selectedImages);
    const formBody = new FormData();
    console.log("carId:", carId);
    selectedFiles.forEach((file) => {
      formBody.append("images", file);
    });

    try {
      const response = await fetch(
        `http://localhost:8000/api/car-image/post-car-image/${carId}`,
        {
          method: "POST",
          body: formBody,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server response:", result);
      setSelectedFiles([]);
      setSelectedImages([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const featuresList = [
    "All-wheel drive",
    "Spare wheel",
    "Automatic pilot",
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
    "AC",
    "Snow tires or chains",
    "Sunroof",
    "Smoking allowed",
    "USB charger",
    "Navigation system",
  ];

  const onSelectFile = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);

    const imagesArray = filesArray.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

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

  const fetchCities = async (countyAuto) => {
    if (!countyAuto) return;
    try {
      const response = await fetch(
        `https://roloca.coldfuse.io/orase/${countyAuto}`
      );
      const data = await response.json();
      console.log("Cities data", data);
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car/car-details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      const features = {};
      data.carFeatures.forEach((feature) => {
        features[feature] = true;
      });

      setCar(data);
      setFormData({
        address: data.address || "",
        year: data.year || "",
        make: data.make || "",
        model: data.model || "",
        odometer: data.odometer || "",
        transmission: data.transmission || "",
        fuelType: data.fuelType || "",
        seats: data.seats || "",
        doors: data.doors || "",
      });
      setLicensePlate(data.licensePlate || "");
      setDailyPrice(data.dailyPrice || "");
      setDescription(data.description || "");
      setSelectedFeatures(features);
      setSelectedCounty({ nume: data.county });
      setSelectedCity({ nume: data.city });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/car-image/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      console.log("poza", data);
      setCarImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
    fetchCarImages();
  }, []);

  useEffect(() => {
    fetchCounties();
  }, []);

  useEffect(() => {
    if (selectedCounty.nume) {
      fetchCities(selectedCounty.auto);
    }
  }, [selectedCounty]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleFirstDetails}
      >
        <h1 className="text-3xl font-semibold text-gray-800">List Your Car</h1>
        {isFirstDetailsOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      {isFirstDetailsOpen && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="location"
              className="font-semibold text-gray-700 block pb-2"
            >
              Where is your car located?
            </label>
            <input
              id="location"
              type="text"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleChange(e, "address")}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="license"
              className="font-semibold text-gray-700 block pb-2"
            >
              Which car do you have?
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="year"
                className="font-semibold text-gray-700 block pb-2"
              >
                Year
              </label>
              <input
                id="year"
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => handleChange(e, "year")}
              />
            </div>
            <div>
              <label
                htmlFor="make"
                className="font-semibold text-gray-700 block pb-2"
              >
                Make
              </label>
              <select
                id="make"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                value={formData.make}
                onChange={(e) => handleChange(e, "make")}
              >
                <option value="">Select a make</option>
                <option value="Acura">Acura</option>
                <option value="Alfa Romeo">Alfa Romeo</option>
                <option value="Audi">Audi</option>
                <option value="BMW">BMW</option>
                <option value="Cadillac">Cadillac</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Chrysler">Chrysler</option>
                <option value="Dacia">Dacia</option>
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
                htmlFor="model"
                className="font-semibold text-gray-700 block pb-2"
              >
                Model
              </label>
              <input
                id="model"
                type="text"
                className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
                placeholder="Model"
                value={formData.model}
                onChange={(e) => handleChange(e, "model")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold text-gray-700 block pb-2">
              Odometer and transmission
            </label>
            <div className="flex flex-wrap items-center mb-4">
              <select
                className="border-2 mr-4 p-2 rounded-lg mb-4 sm:mb-0"
                value={formData.odometer}
                onChange={(e) => handleChange(e, "odometer")}
              >
                <option value="">Select odometer</option>
                <option value="0-20">0-20k kilometers</option>
                <option value="20-40">20-40k kilometers</option>
                <option value="40-60">40-60k kilometers</option>
                <option value="60-80">60-80k kilometers</option>
                <option value="80-100">80-100k kilometers</option>
                <option value="100-120">100-120k kilometers</option>
                <option value="120-140">120-140k kilometers</option>
                <option value="140-160">140-160k kilometers</option>
                <option value="160-180">160-180k kilometers</option>
                <option value="180-200">180-200k kilometers</option>
                <option value="200-220">200-220k kilometers</option>
                <option value="220-240">220-240k kilometers</option>
                <option value="240-260">240-260k kilometers</option>
                <option value="260-280">260-280k kilometers</option>
                <option value="280-300">280-300k kilometers</option>
                <option value="300+">300k+ kilometers</option>
              </select>
              <div>
                <label className="flex items-center mr-4 font-semibold text-gray-600">
                  <input
                    type="radio"
                    name="transmission"
                    value="Automatic"
                    checked={formData.transmission === "Automatic"}
                    onChange={(e) => handleChange(e, "transmission")}
                    className="mr-1"
                  />
                  Automatic
                </label>
                <label className="flex items-center font-semibold text-gray-600">
                  <input
                    type="radio"
                    name="transmission"
                    value="Manual"
                    checked={formData.transmission === "Manual"}
                    onChange={(e) => handleChange(e, "transmission")}
                    className="mr-1"
                  />
                  Manual
                </label>
              </div>
            </div>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="fuel type"
              className="block mb-2   text-gray-700 font-semibold "
            >
              Fuel type
            </label>
            <select
              id="fuel type"
              name="fuel type"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              value={formData.fuelType}
              onChange={(e) => handleChange(e, "fuelType")}
            >
              <option value="">Select fuel type</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="gas">Gas</option>
              <option value="gpl">GPL</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="seats"
              className="block mb-2  text-gray-700 font-semibold "
            >
              Seats
            </label>
            <select
              id="seats"
              name="seats"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              value={formData.seats}
              onChange={(e) => handleChange(e, "seats")}
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
          <div className="relative mb-4">
            <label
              htmlFor="doors"
              className="block mb-2  text-gray-700 font-semibold "
            >
              Doors
            </label>
            <select
              id="doors"
              name="doors"
              className="border-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-2 rounded-lg"
              value={formData.doors}
              onChange={(e) => handleChange(e, "doors")}
            >
              <option value="">Select doors</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              To be eligible for coverage under your protection plan, your
              insurance and registration must be up to date, and your vehicle
              must meet your country safety inspection requirements.
            </p>
          </div>
        </div>
      )}
      {/* second section */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer border-t-2 border-t-violet-500 py-2"
        onClick={toggleSecondDetails}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Car details
        </h1>
        {isSecondDetailsOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      {isSecondDetailsOpen && (
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
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
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
                  setSelectedCity({});
                  fetchCities(selected.auto);
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
                value={selectedCity.nume || ""}
                onChange={(e) => {
                  const selected = cities.find(
                    (city) => city.nume === e.target.value
                  );
                  setSelectedCity(selected);
                }}
              >
                <option value="">Select City</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      )}

      {/* third section */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer border-t-2 border-t-violet-500 py-2"
        onClick={toggleThirdDetails}
      >
        <h1 className="text-3xl font-semibold text-gray-800">
          Car photos (maximum 5 images)
        </h1>
        {isThirdDetailsOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>

      {isThirdDetailsOpen && (
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
              {carImages &&
                carImages.map((image, index) => {
                  return (
                    <div className="relative" key={index}>
                      <img
                        className="w-[200px] h-[200px]"
                        src={image.imageURL}
                        alt="upload"
                      />
                      <TrashIcon
                        className="absolute top-0 right-0 flex items-center justify-center h-7 w-7 font-semibold text-red-500 cursor-pointer "
                        // onClick={() => deleteHandler(image)}
                      />
                    </div>
                  );
                })}
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
      {/* fourth section*/}

      <div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer border-t-2 border-t-violet-500 py-2"
          onClick={toggleFourthDetails}
        >
          <h1 className="text-3xl font-semibold text-gray-800">Daily price</h1>
          {isFourthDetailsOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </div>
        {isFourthDetailsOpen && (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <label
              htmlFor="daily-price"
              className="block text-sm font-bold text-gray-700"
            >
              Daily price
            </label>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <span className="pl-1 text-gray-500">EUR</span>
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

      {/* edit car details button */}
      <div className="text-center mt-6">
        <button
          className="px-16 py-2 bg-purple-600 hover:bg-violet-500 text-white rounded-full font-medium"
          onClick={handleSubmit}
        >
          Edit car details
        </button>
      </div>
    </div>
  );
};

export default EditCarDetails;
