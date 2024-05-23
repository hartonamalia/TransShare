import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Conversation from "./Conversation/Conversation";
import ChatBox from "./ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
const Chat = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (sendMessage !== null) {
      console.log("sending message", sendMessage);
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user.userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log("online users", users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("mesaj", data);
      handleReceivedMessage(data);
    });
  }, []);
  const handleReceivedMessage = (data) => {
    console.log("mesaj12234");
    setReceivedMessage(data);
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/chat/${user.userId}`
        );
        const data = await response.json();
        console.log(data);
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, [user.userId]);

  return (
    <div className="flex flex-col items-center md:flex-row justify-center mt-5 gap-3">
      <div className="">
        <div className="flex flex-col gap-1 border-2 border-purple-500 sm:h-[200px] md:h-[600px] w-[350px] sm:w-[500px] md:w-[200px] lg:w-[250px] rounded-lg p-2">
          <h2 className="font-bold">Chats</h2>
          <div
            className="overflow-auto max-h-[10rem] md:max-h-[33rem]"
            style={{ scrollbarWidth: "none" }}
          >
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user.userId} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <ChatBox
          chat={currentChat}
          currentUser={user.userId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;