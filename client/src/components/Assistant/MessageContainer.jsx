import React from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const MessageContainer = ({ message }) => {
  return (
    <>
      {message.sender === "ChatGPT" && (
        <div className="flex justify-start text-purple-700">
          <SmartToyIcon />
        </div>
      )}
      <div
        className={`flex ${
          message.sender === "ChatGPT" ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`${
            message.sender === "ChatGPT" ? "bg-purple-700" : "bg-purple-500"
          }  p-2 rounded-lg max-w-[25rem] text-white`}
        >
          <p>{message.message}</p>
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
