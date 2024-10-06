import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiPhone, FiVideo } from "react-icons/fi";
import MessageInput from "./MessageInput"; // Your existing MessageInput
import AudioCallPopup from "./AudioCallPopup";
import VideoCallPopup from "./VideoCallPopup";
import { useTheme } from "./ThemeContext";

const ChatArea = ({ user, onSendMessage, currentUserId, messages, onBack }) => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isAudioCallActive, setIsAudioCallActive] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
  };

  const handleAudioCall = () => {
    setIsAudioCallActive(true);
  };

  const handleVideoCall = () => {
    setIsVideoCallActive(true);
  };

  const endAudioCall = () => {
    setIsAudioCallActive(false);
  };

  const endVideoCall = () => {
    setIsVideoCallActive(false);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`flex flex-col h-screen w-full lg:w-[1180px] ${
        isDarkMode
          ? "bg-gray-900 text-white border border-gray-600"
          : "bg-white border border-gray-300"
      }  relative`}
    >
      <div
        className={`flex items-center p-4 border-b ${
          isDarkMode
            ? "bg-gray-900 border-gray-600"
            : "bg-white border-gray-200"
        }`}
      >
        <button
          onClick={onBack}
          className={`mr-2 ${
            isDarkMode ? "text-white" : "text-gray-800"
          } hover:text-gray-600 lg:hidden`}
        >
          <FaArrowLeft />
        </button>
        <img
          src={user.img}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="flex-1">
          <strong
            className={`block ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            {user.name}
          </strong>
          <span className="text-green-500 text-sm">Active</span>
        </div>
        <div className="flex space-x-3">
          <button
            className="p-2 rounded-full bg-green-100 hover:bg-green-200"
            onClick={handleAudioCall}
          >
            <FiPhone className="text-green-500" />
          </button>
          <button
            className="p-2 rounded-full bg-green-100 hover:bg-green-200"
            onClick={handleVideoCall}
          >
            <FiVideo className="text-green-500" />
          </button>
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto p-4 relative ${
          isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        <div className="flex flex-col">
          {messages[currentUserId]?.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-green-500 text-white"
                    : isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                }`}
                style={{
                  maxWidth: msg.sender === "me" ? "60%" : "75%",
                  width: "fit-content",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  padding: "10px",
                }}
              >
                {msg.text || "This is a default message for demonstration."}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      <MessageInput
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
        handleAttachFile={handleAttachFile}
        fileInputRef={fileInputRef}
      />
      {isAudioCallActive && (
        <AudioCallPopup user={user} onEndCall={endAudioCall} />
      )}
      {isVideoCallActive && (
        <VideoCallPopup user={user} onEndCall={endVideoCall} />
      )}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4A5568" : "#F7FAFC"};
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .overflow-y-auto:hover::-webkit-scrollbar-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ChatArea;
