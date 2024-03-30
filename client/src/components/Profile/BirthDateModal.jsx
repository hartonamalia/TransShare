import React, { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BirtDateModal = ({
  isEditBirthDateModal,
  handleCloseEditBirthDateModal,
  userBirthday,
}) => {
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleDateChange = (date) => {
    setDateOfBirth(date);
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
              selected={userBirthday || dateOfBirth}
            />
          </div>
          <button className="button w-22 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BirtDateModal;
