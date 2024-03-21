import { useState } from "react";
import { toast } from "react-toastify";

export const useUserDetails = () => {
    const fetchUserDetails = async (token) => {
      try {
        const response = await fetch("http://localhost:8000/api/user/user-details", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const userDetails = await response.json();
        if (response.ok) {
          return userDetails;
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        toast.error("Error in getting user details");
        throw error;
      }
    };
  
    return fetchUserDetails;
  };
  
