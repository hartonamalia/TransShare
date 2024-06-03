const API_KEY = "sk-proj-lWtvPWoh1eFqpxQBwXOGT3BlbkFJhHzSk7kRBWyHwdrYqThw";
import React, { useState, useEffect, useRef } from "react";
import MessageContainer from "./MessageContainer";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

const initialMessageList = [
  {
    message: "Hello, how can I help you?",
    sender: "ChatGPT",
  },
  {
    message:
      "I want to rent a car. We are a family of 3, and we want to travel something around 500km, recommend me some cars.",
    sender: "User",
  },
  {
    message: "Sure, I can help you with that. Let me recommend you some cars.",
    sender: "ChatGPT",
  },
  {
    message:
      "I would recommend you to rent a sedan car. It is comfortable and spacious for a family of 3.",
    sender: "ChatGPT",
  },
  {
    message: "Thank you for the recommendation. I will look into it.",
    sender: "User",
  },
];

const Assistant = () => {
  const [messageList, setMessageList] = useState(initialMessageList);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  return (
    <div className="flex w-full justify-center mt-10">
      <div className="w-[800px] h-[600px] border-2 border-purple-500 rounded-lg flex flex-col justify-between">
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
      </div>
    </div>
  );
};

export default Assistant;
