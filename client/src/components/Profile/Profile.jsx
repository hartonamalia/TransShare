import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserDetails } from "../../hooks/useUserDetails";
import { Button } from "@mui/material";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();
  const { user } = useAuthContext();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

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
  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  }
  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  }

  return (
    <div className=" mt-10 max-w-md mx-auto p-6 bg-white rounded shadow">
    {userDetails && (
      <div>
        <p className="text-black">{userDetails.firstName}</p>
        <p className="text-black">{userDetails.lastName}</p>
        <p className="text-black">{userDetails.email}</p>
        <p className="text-black">{userDetails.prefix}   {userDetails.restPhoneNumber}</p>
        </div>
    )}
      <button  className="w-22 h-15 rounded-sm p-2 text-white bg-violet-500 hover:bg-purple-400"
      onClick={() => handleOpenEditProfileModal()}>
        Edit Profile
      </button>
      {userDetails && <EditProfile isEditProfileModalOpen={isEditProfileModalOpen} handleCloseEditProfileModal={handleCloseEditProfileModal} userDetails={userDetails}/>}
    </div>
  );
};

export default Profile;
