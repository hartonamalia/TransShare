import React, { useState, useEffect, useRef } from "react";
import MessageContainer from "./MessageContainer";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import Conversation from "./Conversation";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Modal } from "@mui/material";
import ConversationModal from "./ConversationModal";
const API_KEY = import.meta.env.VITE_OPENAPI_KEY;
const Assistant = () => {
  const [messageList, setMessageList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const { user } = useAuthContext();
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const processMessageToChatGPT = async () => {
    if (inputMessage === "") {
      toast.error("Please enter a message");
      return;
    }

    const newMessageList = [
      ...messageList,
      { message: inputMessage, sender: "User" },
    ];
    setMessageList(newMessageList);
    setInputMessage("");

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputMessage,
        },
      ],
    };

    handleAddChat(inputMessage, "User");

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        const responseMessage = data.choices[0].message.content;
        handleAddChat(responseMessage, "ChatGPT");
        typeWriterEffect(responseMessage);
      });
  };

  const typeWriterEffect = (text) => {
    setIsTyping(true);
    let index = 0;
    let tempMessage = { message: "", sender: "ChatGPT" };

    const interval = setInterval(() => {
      if (index < text.length) {
        tempMessage.message += text[index];
        setMessageList((prevList) => {
          const lastMessage = prevList[prevList.length - 1];
          if (lastMessage && lastMessage.sender === "ChatGPT") {
            lastMessage.message = tempMessage.message;
            return [...prevList.slice(0, -1), lastMessage];
          } else {
            return [...prevList, tempMessage];
          }
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10);
  };

  const getConversations = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/ai-conversation/${user._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Unauthorized: Invalid token");
        }
      }

      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Network error: ", error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  const handleOpenConversation = () => {
    setIsConversationOpen(true);
  };

  const handleCloseConversation = () => {
    setIsConversationOpen(false);
  };
  const fetchCurrentConversationChats = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/ai-chat/${currentConversation._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Unauthorized: Invalid token");
        }
      }

      const data = await response.json();
      setMessageList(data);
    } catch (error) {
      console.error("Network error: ", error);
    }
  };

  const handleCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleAddChat = async (message, sender) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/ai-chat/${currentConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ message, sender }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Unauthorized: Invalid token");
        }
      }

      const data = await response.json();
    } catch (error) {
      console.error("Network error: ", error);
    }
  };

  useEffect(() => {
    if (currentConversation?._id) {
      fetchCurrentConversationChats();
    }
  }, [currentConversation]);

  return (
    <div className="flex flex-col md:flex-row w-full justify-center mt-10 gap-2">
      <div
        className="flex flex-col items-center justify-start h-[250px] md:w-[250px] md:h-[600px] border-2 border-purple-500 rounded-lg overflow-y-auto gap-3 relative"
        style={{ scrollbarWidth: "none" }}
      >
        <p className="px-1 font-bold">Conversations</p>
        <div
          className="flex flex-col gap-3 flex-grow overflow-y-auto w-full"
          style={{ scrollbarWidth: "none" }}
        >
          {conversations.length > 0 ? (
            conversations.map((conversation, index) => (
              <Conversation
                key={index}
                conversation={conversation}
                handleCurrentConversation={handleCurrentConversation}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No conversations yet</p>
          )}
        </div>
        <div className="absolute bottom-0 w-full p-2 bg-white flex items-center justify-center">
          <button
            className="w-full p-1 bg-purple-700 text-white rounded-lg max-w-[70px]"
            onClick={handleOpenConversation}
          >
            <SmartToyIcon />
          </button>
        </div>
      </div>

      <div className="md:w-[800px] md:h-[600px] min-h-[300px] border-2 border-purple-500 rounded-lg flex flex-col justify-between">
        <div
          className="flex flex-col gap-5 overflow-y-auto p-2"
          style={{ scrollbarWidth: "none" }}
        >
          {messageList &&
            messageList.map((messageObject, index) => (
              <div key={index}>
                <MessageContainer message={messageObject} />
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
        {messageList && currentConversation && (
          <div className="flex items-center justify-center p-4 border-t gap-1">
            <input
              type="text"
              placeholder="Input your question"
              className="w-full border-2 border-gray-300 rounded-lg p-2"
              value={inputMessage}
              onChange={handleInputChange}
              disabled={isTyping}
            />
            <button
              className="bg-purple-500 text-white p-2 rounded-lg"
              onClick={processMessageToChatGPT}
              disabled={isTyping}
            >
              <SendIcon />
            </button>
          </div>
        )}
      </div>
      <ConversationModal
        isConversationOpen={isConversationOpen}
        handleCloseConversation={handleCloseConversation}
        fetchConversations={getConversations}
      />
    </div>
  );
};

export default Assistant;
