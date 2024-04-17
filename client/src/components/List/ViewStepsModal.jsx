import React from "react";
import { Modal } from "@mui/material";

const ViewStepsModal = ({ isViewStepsOpen, handleCloseViewSteps }) => {
  return (
    <Modal open={isViewStepsOpen} onClose={handleCloseViewSteps}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-3 items-start">
          <h3 className="text-lg text-white font-bold mb-2 border-b py-2 ">
            Steps to list your car
          </h3>
          <p className="text-white font-semibold">1. List your car</p>
          <p className="text-white font-semibold">2. Car details</p>
          <p className="text-white font-semibold">3. Car photos </p>
          <p className="text-white font-semibold">4. Daily price</p>
          <p className="text-white font-semibold">5. Submit your listing</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewStepsModal;
