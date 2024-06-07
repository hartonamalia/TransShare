import React from "react";

const Conversation = ({ conversation, handleCurrentConversation }) => {
  return (
    <div
      className="flex items-center justify-center w-full  border-b border-b-purple-500 text-white   text-sm mt-1 cursor-pointer"
      onClick={() => handleCurrentConversation(conversation)}
    >
      <p className="bg-purple-500 px-2 py-1 rounded-lg mb-2">
        {conversation.name}
      </p>
    </div>
  );
};

export default Conversation;
