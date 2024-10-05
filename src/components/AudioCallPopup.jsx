import React from "react";
import { FiPhoneOff, FiMic } from "react-icons/fi"; // Import icons for end call and mute
import { useTheme } from "./ThemeContext"; // Import the useTheme hook

const AudioCallPopup = ({ user, onEndCall }) => {
  const { isDarkMode } = useTheme(); // Use the theme context

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`rounded-lg p-4 sm:p-6 shadow-lg max-w-sm w-full mx-4 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-left">Audio Call</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src={user.img}
            alt={user.name}
            className="w-16 h-16 rounded-full mb-2"
          />
          <strong className="block text-lg">{user.name}</strong>
          <span
            className={`text-${isDarkMode ? "green-400" : "green-500"} text-sm`}
          >
            Ringing...
          </span>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition duration-200`}
          >
            <FiMic
              className={`${isDarkMode ? "text-white" : "text-gray-600"}`}
              size={28}
            />
          </button>
          <button
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-200"
            onClick={onEndCall}
          >
            <FiPhoneOff className="text-white" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCallPopup;
