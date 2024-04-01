import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const BirthDateModal = ({
  isEditBirthDateModal,
  handleCloseEditBirthDateModal,
  userBirthday,
  fetchUserDetails,
}) => {
  const [dateOfBirth, setDateOfBirth] = useState(userBirthday);
  const { user } = useAuthContext();

  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };

  useEffect(() => {
    console.log("da, merge", userBirthday);
    setDateOfBirth(userBirthday);
  }, [isEditBirthDateModal]);

  const handleSaveBirthday = async () => {
    if (!dateOfBirth) {
      toast.error("Please select a date.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/dateOfBirth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ dateOfBirth }),
        }
      );

      const json = await response.json();
      if (!response.ok) {
        toast.error(json.error);
        handleCloseEditBirthDateModal();
      } else {
        toast.success("Birthday updated successfully!");
        handleCloseEditBirthDateModal();
        fetchUserDetails();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal open={isEditBirthDateModal} onClose={handleCloseEditBirthDateModal}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-between w-full">
            <p className="text-white font-semibold text-sm md:text-base">
              Edit your birthday
            </p>
            <DatePicker
              className="border rounded p-1 focus:outline-none text-black text-center cursor-pointer"
              placeholderText="Select date"
              onChange={handleDateChange}
              selected={dateOfBirth}
            />
          </div>
          <button
            className="button w-24 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer"
            onClick={handleSaveBirthday}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BirthDateModal;
