import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserDetails } from "../../hooks/useUserDetails";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditProfile from "./EditProfile";
import ChangePasswordModal from "./ChangePasswordModal";
// import DriversOnly from "./DriversOnly";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const { user } = useAuthContext();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEditBirthDateModal, setEditBirthDateModal] = useState(false);
  const [isEditIdCopy, setIsEditIdCopy] = useState(false);
  const [isEditIdDetails, setIsEditIdDetails] = useState(false);
  const [isEditCreditCardDetails, setIsEditCreditCardDetails] = useState(false);

  useEffect(() => {
    if (user?.token) {
      (async () => {
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
          if (response.ok) {
            setUserDetails(userResponse.userDetails);
          } else {
            throw new Error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error in getting user details:", error);
        }
      })();
    }
  }, [user]);

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
    setEditBirthDateModal(true);
  };
  const handleCloseEditIdCopy = () => {
    setIsEditIdCopy(false);
  };
  const handleOpenEditIdDetails = () => {
    setIsEditIdDetails(true);
  };
  const handleCloseEditIdDetails = () => {
    setIsEditIdDetails(false);
  };
  const handleOpenEditCreditCardDetails = () => {
    setEditCreditCardDetails(true);
  };
  const handleCloseEditCreditCardDetails = () => {
    setEditCreditCardDetails(false);
  };

  return (
    <>
      <div className="relative mt-10 max-w-xl mx-auto p-16 bg-white  shadow  border-t-8 border-t-yellow-300 rounded-lg">
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
          />
        )}
        <ChangePasswordModal
          isChangePasswordModalOpen={isChangePasswordModalOpen}
          handleCloseChangePasswordModal={handleCloseChangePasswordModal}
        />
      </div>

      {/*Only for drivers*/}

      <div className="relative mt-10 max-w-xl mx-auto p-16 bg-white  shadow  border-t-8 border-t-violet-500 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">
            Driver's Only
          </h2>
        </div>
        {userDetails && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center ">
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

            <div className="flex flex-col md:flex-row justify-between md:items-center ">
              <span className="text-gray-500 text-sm font-bold  tracking-wide">
                ID copy
              </span>
              <div className="flex items-center justify-between">
                <button
                  className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                  onClick={handleOpenEditIdCopy}
                >
                  Add ID copy
                </button>
                <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center ">
              <span className="text-gray-500 text-sm font-bold  tracking-wide">
                Driver license
              </span>
              <div className="flex items-center justify-between">
                <button
                  className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                  onClick={handleOpenEditIdDetails}
                >
                  Add details
                </button>
                <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center ">
              <span className="text-gray-500 text-sm font-bold  tracking-wide">
                Add credit card
              </span>
              <div className="flex items-center justify-between">
                <button
                  className="ml-4 py-1 px-3 rounded-md text-gray bg-white  shadow border-t-1 hover:bg-purple-400 text-xs"
                  onClick={handleOpenEditCreditCardDetails}
                >
                  Add details
                </button>
                <CheckCircleIcon className="w-6 h-6 text-yellow-300 ml-2" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
