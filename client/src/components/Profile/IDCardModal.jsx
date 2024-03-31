import React, { useState } from "react";
import { Modal } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const IDCardModal = ({
  isEditIdCopy,
  handleCloseEditIdCopy,
  initialExpiryDate,
}) => {
  const [expiryDate, setExpiryDate] = useState(initialExpiryDate || new Date());
  const [file, setFile] = useState(null);
  const { user } = useAuthContext();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleSaveIdCopy = async () => {
    if (!file || !expiryDate) {
      toast.error("Please select a file and a date.");
      return;
    }

    toast.success("ID copy updated successfully!");
    handleCloseEditIdCopy();
  };

  return (
    <Modal open={isEditIdCopy} onClose={handleCloseEditIdCopy}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg text-white font-bold mb-4">Please introduce ID copy</h3>
          <input
            type="file"
            id="idPicture"
            accept="image/*"
            onChange={handleFileChange}
            className="input-field rounded ml-24"
          />
          <button
            className="button w-22 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer"
            onClick={handleSaveIdCopy}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default IDCardModal;
