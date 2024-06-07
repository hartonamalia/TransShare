import React, { useState } from "react";
import { Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const ConversationModal = ({ isConversationOpen, handleCloseConversation,fetchConversations }) => {
  const [conversationName, setConversationName] = useState("");
  const { user } = useAuthContext();

  const handleAddConversation = async () => {
    if (conversationName === "") {
      toast.error("Please enter a conversation name");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/ai-conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ name: conversationName }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        fetchConversations();
        handleCloseConversation();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConversationName("");
    }
  };

  return (
    <Modal open={isConversationOpen} onClose={handleCloseConversation}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 shadow-lg p-3 rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-3 items-start">
          <h3 className="text-lg text-white font-bold mb-2 border-b py-2 ">
            Star a new conversation with our AI assistant
          </h3>
          <div className="w-full flex gap-3">
            <input
              type="text"
              placeholder="Conversation name"
              className="w-[70%] p-2 rounded-lg border-2 border-gray-300"
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white p-2 rounded-lg"
              onClick={handleAddConversation}
            >
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConversationModal;
