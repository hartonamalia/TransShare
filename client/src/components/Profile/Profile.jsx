import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserDetails } from "../../hooks/useUserDetails";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditProfile from "./EditProfile";
import ChangePasswordModal from "./ChangePasswordModal";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import BirthDateModal from "./BirthDateModal";
import IDCardModal from "./IDCardModal";
import DriverLicenseModal from "./DriverLicenseModal";
import bcgImage from "../../assets/bcg.jpg";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEditBirthDateModal, setEditBirthDateModal] = useState(false);
  const [isEditIdCopy, setIsEditIdCopy] = useState(false);
  const [isEditDriverLicenseDetails, setIsEditDriverLicenseDetails] =
    useState(false);

  useEffect(() => {
    if (user?.token) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/user/user-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const userResponse = await response.json();
      console.log(userResponse.userDetails);
      const userDetailsResponse = userResponse.userDetails;
      if (response.ok) {
        setUserDetails(userDetailsResponse);
      } else {
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error in getting user details:", error);
    }
  };

  useEffect(() => {
    console.log(
      `Change Password Modal is ${
        isChangePasswordModalOpen ? "open" : "closed"
      }`
    );
  }, [isChangePasswordModalOpen]);

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleOpenChangePasswordModal = () => {
    console.log("Opening change password modal");
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    console.log("Closing change password modal");
    setIsChangePasswordModalOpen(false);
  };

  const handleOpenEditBirthDateModal = () => {
    console.log("Opening change birthday modal");
    setEditBirthDateModal(true);
  };
  const handleCloseEditBirthDateModal = () => {
    console.log("Closing change birthday modal");
    setEditBirthDateModal(false);
  };
  const handleOpenEditIdCopy = () => {
    setIsEditIdCopy(true);
  };
  const handleCloseEditIdCopy = () => {
    setIsEditIdCopy(false);
  };
  const handleOpenEditDriverLicenseDetails = () => {
    setIsEditDriverLicenseDetails(true);
  };
  const handleCloseEditDriverLicenseDetails = () => {
    setIsEditDriverLicenseDetails(false);
  };
  return (
    <>
      <div
        className="w-full md:h-72 h-48"
        style={{ backgroundImage: "url('../../assets/bcg.jpg')" }}
      >
        <img className="h-full w-full" src={bcgImage} alt="" />
      </div>
      <div className="flex justify-center gap-8">
        <Sidebar />
        <div className="flex flex-col">
          <div className="relative mt-10 max-w-xl mx-auto p-10 bg-white  shadow  border-t-8 border-t-violet-500 rounded-lg w-[23rem] md:w-[32rem]">
            {userDetails && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    Name
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-black">
                      {userDetails.firstName} {userDetails.lastName}
                    </p>
                    {(userDetails.firstName || userDetails.lastName) && (
                      <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    Email
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-black">{userDetails.email}</p>
                    <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    Phone number
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-black">
                      {userDetails.prefix} {userDetails.restPhoneNumber}
                    </p>
                    <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center text-xs md:text-base gap-3 md:gap-8 ">
              <button
                className="mt-12 w-36 rounded-md p-2 text-white bg-violet-500 hover:bg-purple-400"
                onClick={() => handleOpenEditProfileModal()}
              >
                Edit Profile
              </button>
              <button
                className="mt-12 w-36 rounded-md p-2 text-white bg-violet-500 hover:bg-purple-400"
                onClick={handleOpenChangePasswordModal}
              >
                Change Password
              </button>
            </div>
            {userDetails && (
              <EditProfile
                isEditProfileModalOpen={isEditProfileModalOpen}
                handleCloseEditProfileModal={handleCloseEditProfileModal}
                userDetails={userDetails}
                fetchUserDetails={fetchUserDetails}
              />
            )}
            <ChangePasswordModal
              isChangePasswordModalOpen={isChangePasswordModalOpen}
              handleCloseChangePasswordModal={handleCloseChangePasswordModal}
            />
          </div>

          {/* drivers only*/}

          <div className="relative mt-10 max-w-xl mx-auto p-10 bg-white  shadow  border-t-8 border-t-yellow-300 rounded-lg w-[23rem] md:w-[32rem]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-700">
                Driver's Only
              </h2>
            </div>
            {userDetails && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    Date of birth
                  </span>
                  <div className="flex items-center justify-between">
                    <button
                      className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                      onClick={handleOpenEditBirthDateModal}
                    >
                      Edit date of birth
                    </button>
                    <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                  </div>
                </div>

                <div className="flex justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    ID copy
                  </span>
                  <div className="flex items-center ">
                    <button
                      className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                      onClick={handleOpenEditIdCopy}
                    >
                      Add ID copy
                    </button>
                    <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                  </div>
                </div>

                <div className="flex  justify-between md:items-center ">
                  <span className="text-gray-500 text-sm font-bold  tracking-wide">
                    Driver license
                  </span>
                  <div className="flex items-center">
                    <button
                      className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                      onClick={handleOpenEditDriverLicenseDetails}
                    >
                      Add details
                    </button>
                    <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Owners Only */}
          <div className="relative mt-10 max-w-xl mx-auto p-10 bg-white  shadow  border-t-8 border-t-violet-500 rounded-lg w-[23rem] md:w-[32rem]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-700">Owners Only</h2>
            </div>
            {userDetails && (
                <div className="flex items-center justify-center text-xs md:text-base gap-3 md:gap-8 ">
                  <button
                    className="mt-12 w-36 rounded-md p-2 text-white bg-violet-500 hover:bg-purple-400"
                    onClick={() => navigate("/list")}
                  >
                    List your car
                  </button>
                </div>
            )}
          </div>
        </div>
        {userDetails && (
          <BirthDateModal
            isEditBirthDateModal={isEditBirthDateModal}
            handleCloseEditBirthDateModal={handleCloseEditBirthDateModal}
            userBirthday={userDetails.dateOfBirth}
          />
        )}
        <IDCardModal
          isEditIdCopy={isEditIdCopy}
          handleCloseEditIdCopy={handleCloseEditIdCopy}
        />
      </div>
    </>
  );
};

export default Profile;
