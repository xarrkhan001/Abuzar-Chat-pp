import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Sidebar02 from "./components/Sidebar02";
import ChatArea from "./components/ChatArea";
import { useTheme } from "./components/ThemeContext";
import LogoComponent from "./components/LogoComponent";

const App = () => {
  const { isDarkMode } = useTheme();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (message) => {
    console.log(`Message sent to ${selectedUser.name}: ${message}`);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Sidebar className="lg:w-1/3" />

      <div className="flex flex-col lg:flex-row lg:w-2/3 w-full">
        <div className="w-full lg:w-1/3">
          <Sidebar02 onUserSelect={handleUserSelect} />
        </div>

        {/* LogoComponent displayed only on large screens */}
        <div
          className={`w-full flex justify-center items-center ${
            !selectedUser ? "hidden lg:flex" : "flex"
          }`}
        >
          <LogoComponent />
        </div>

        {selectedUser && (
          <div className="w-full lg:w-2/3 flex flex-col">
            <div
              className={`rounded-lg p-4 sm:p-6 shadow-lg max-w-full w-full mx-4 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <ChatArea
                user={selectedUser}
                onSendMessage={handleSendMessage}
                onBack={handleBack}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
