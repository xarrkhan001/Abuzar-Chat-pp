import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MessageUserList from "./MessageUserList";
import AudioCallUserList from "./AudioCallUserList";
import VideoCallUserList from "./VideoCallUserList";
import SettingsSidebar from "./SettingsSidebar";
import ChatArea from "./ChatArea";
import { useTheme } from "./ThemeContext"; // Import the theme context

const Sidebar02 = () => {
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [currentUser, setCurrentUser] = useState(null); // Track current user
  const [messages, setMessages] = useState({}); // Store messages for each user

  const handleUserSelect = (user) => {
    setCurrentUser(user); // Set the current user
  };

  const handleSendMessage = (message) => {
    if (currentUser) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentUser.id]: [
          ...(prevMessages[currentUser.id] || []),
          { text: message, sender: "me" },
        ],
      }));
    }
  };

  const handleBack = () => {
    setCurrentUser(null); // Deselect the current user
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar with user list */}
      <div
        className={`flex flex-col h-full ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } transition-all duration-300 
        ${currentUser ? "hidden lg:w-[356px] lg:block" : "w-full"}
        ${currentUser ? "w-full" : "w-[360px] lg:block"}`}
      >
        <Routes>
          <Route
            path="/"
            element={<MessageUserList onUserSelect={handleUserSelect} />}
          />
          <Route path="/call" element={<AudioCallUserList />} />
          <Route path="/video" element={<VideoCallUserList />} />
          <Route path="/settings" element={<SettingsSidebar />} />
        </Routes>
      </div>

      {/* ChatArea that appears when a user is selected */}
      {currentUser && (
        <div
          className={`flex-1 h-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <ChatArea
            user={currentUser}
            onSendMessage={handleSendMessage}
            currentUserId={currentUser.id}
            messages={messages}
            onBack={handleBack} // Add back function
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar02;
