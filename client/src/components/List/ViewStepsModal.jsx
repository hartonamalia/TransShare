import React from "react";
import { Modal } from "@mui/material";

const ViewStepsModal = ({ isViewStepsOpen, handleCloseViewSteps }) => {
  return (
    <Modal open={isViewStepsOpen} onClose={handleCloseViewSteps}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-lg text-white font-semibold mb-4">
            Steps to list your car
          </h3>
          <p className="text-white">1. Create an account on TransShare</p>
          <p className="text-white">2. Click on the "List your car" button</p>
          <p className="text-white">3. Fill in the details of your car</p>
          <p className="text-white">4. Upload pictures of your car</p>
          <p className="text-white">5. Wait for approval from TransShare</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewStepsModal;
