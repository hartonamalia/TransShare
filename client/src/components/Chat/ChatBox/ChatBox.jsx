import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import profilePic from "../../../assets/profile_pic.png";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import SendIcon from "@mui/icons-material/Send";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();
  const scroll = useRef();

  useEffect(() => {
    if (chat) {
      const userId = chat.members.find((member) => member !== currentUser);
      const getUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/user/user-data/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          setUserData(data.userDetails);
        } catch (error) {
          console.error(error);
        }
      };
      getUserData();
    }
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat) {
      const getMessages = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/message/${chat._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error(error);
        }
      };
      getMessages();
    }
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (chat) {
      const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
      };
      const receiverId = chat.members.find((member) => member !== currentUser);
      setSendMessage({ ...message, receiverId });
      try {
        const response = await fetch("http://localhost:8000/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(message),
        });
        const data = await response.json();
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex flex-col border-2 border-purple-500 h-[600px] w-[350px] sm:w-[500px] lg:w-[700px] rounded-lg p-2 justify-center items-center">
        <span className="font-semibold text-xl">
          Open a chat to start messaging
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-2 border-purple-500 h-[600px] w-[350px] sm:w-[500px] lg:w-[700px] rounded-lg p-2 justify-between">
      <div className="flex flex-col flex-grow">
        <div className="chat-header">
          <div className="follower">
            <div className="flex items-center gap-2 p-2">
              <img
                src={profilePic}
                alt="Profile"
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
              />
              <div style={{ fontSize: "0.8rem" }}>
                <span className="text-black">{userData?.firstName}</span>
              </div>
            </div>
            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
          </div>
        </div>
        <div
          className="text-surface-light overflow-auto max-h-[28rem] flex flex-col gap-3 p-1"
          style={{ scrollbarWidth: "none" }}
        >
          {messages.map((message, index) => (
            <div
              ref={scroll}
              key={index}
              className={`flex items-center gap-2 ${
                message.senderId === currentUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="flex flex-col p-2 border-1 border-red-500 bg-purple-500 text-white py-1 px-3  rounded-2xl text-balance max-w-[15rem]">
                {message.text}
                <span className="text-xs mt-2 text-gray-300">
                  {format(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          cleanOnEnter
          placeholder="Type a message"
        />
        <button
          className="w-12 mr-1 h-9 bg-purple-500 rounded-lg text-white flex items-center justify-center cursor-pointer"
          onClick={handleSend}
        >
          <SendIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
