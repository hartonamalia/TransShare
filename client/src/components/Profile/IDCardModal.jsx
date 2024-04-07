import React, { useState } from "react";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const IDCardModal = ({
  isEditIdCopy,
  handleCloseEditIdCopy,
  fetchUserDetails,
}) => {
  const [picture, setPicture] = useState(null);
  const { user } = useAuthContext();

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleSavePicture = async () => {
    if (!picture) {
      toast.error("Please select a picture!");
      return;
    }

    const formData = new FormData();
    formData.append("image", picture);
    formData.append("pictureType", "idPictureURL");

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
        handleCloseEditIdCopy();
        return;
      }

      toast.success("ID copy updated successfully!");
      handleCloseEditIdCopy();
      fetchUserDetails();
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <Modal open={isEditIdCopy} onClose={handleCloseEditIdCopy}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg text-white font-semibold mb-4">
            Please introduce ID copy
          </h3>
          <input
            type="file"
            id="idPicture"
            accept="image/*"
            onChange={handlePictureChange}
            className="input-field rounded ml-24"
          />
          <button
            className="button w-24 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer"
            onClick={handleSavePicture}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default IDCardModal;
