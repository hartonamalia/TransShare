import React, { useState } from "react";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const DriverLicenseModal = ({
  isEditDriverLicenseDetails,
  handleCloseEditDriverLicenseDetails,
  fetchUserDetails,
}) => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const { user } = useAuthContext();

  const handleFrontFileChange = (event) => {
    setFrontFile(event.target.files[0]);
  };

  const handleBackFileChange = (event) => {
    setBackFile(event.target.files[0]);
  };

  const handleSaveDriverLicense = async () => {
    if (!frontFile && !backFile) {
      toast.error("Please select at least one picture of your driver license!");
      return;
    }
    if(frontFile){
      postDriverPictures(frontFile, "driverFrontPictureURL");
    }
    if(backFile){
      postDriverPictures(backFile, "driverBackPictureURL");
    }
  
    toast.success("Driver license copy updated successfully!");
    handleCloseEditDriverLicenseDetails();
  };
  
  const postDriverPictures = async (picture, type) =>{
    const formData = new FormData();
    formData.append("image", picture);
    formData.append("pictureType", type);

    try {
      const response = await fetch(
        `http://localhost:8000/api/user/user-pictures`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const json = await response.json();
        toast.error(json.error);
        return;
      }

      fetchUserDetails();
    } catch (error) {
      toast.error(error.toString());
    }

  }

  return (
    <Modal
      open={isEditDriverLicenseDetails}
      onClose={handleCloseEditDriverLicenseDetails}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg text-white font-semibold mb-4">
            Please provide a copy of your driver's license
          </h3>
          <div>
            <label
              htmlFor="DriverLicensePicture"
              className="block text-gray-200 text-sm font-bold mb-2 ml-[7.2rem]"
            >
              Front picture
            </label>
            <input
              type="file"
              id="DriverLicensePicture"
              accept="image/*"
              onChange={handleFrontFileChange}
              className="input-field rounded ml-24"
            />
          </div>
          <div>
            <label
              htmlFor="DriverLicensePicture"
              className="block text-gray-200 text-sm font-bold mb-2 ml-[7.2rem]"
            >
              Back picture
            </label>
            <input
              type="file"
              id="DriverLicensePicture"
              accept="image/*"
              onChange={handleBackFileChange}
              className="input-field rounded ml-24"
            />
          </div>
          <button
            className="button w-24 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer"
            onClick={handleSaveDriverLicense}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DriverLicenseModal;
