import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const ChangePasswordModal = ({
  isChangePasswordModalOpen,
  handleCloseChangePasswordModal,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
  }, [isChangePasswordModalOpen]);

  const validatePassword = () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords must be the same.");
      return false;
    }

    return true;
  };

  const handleSaveChanges = async () => {
    if (validatePassword()) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ newPassword: password }),
          }
        );
        const json = await response.json();
        if (!response.ok) {
          toast.error(json.error);
          handleCloseChangePasswordModal();
        }
        toast.success("Password changed succesfully!");
        handleCloseChangePasswordModal();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <Modal
      open={isChangePasswordModalOpen}
      onClose={handleCloseChangePasswordModal}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-5 rounded-lg w-full max-w-md">
        <div className="flex  flex-col items-center gap-3 ">
          {error && (
            <div className="mb-3 text-sm font-medium text-red-500">{error}</div>
          )}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              // id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field rounded w-[10rem] p-1"
            />
          </div>
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              // id="confirmNewPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field rounded w-[10rem] p-1"
            />
          </div>
          <button
            onClick={handleSaveChanges}
            className="button w-22 h-15 rounded p-2 text-white bg-violet-800 hover:bg-purple-400 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
