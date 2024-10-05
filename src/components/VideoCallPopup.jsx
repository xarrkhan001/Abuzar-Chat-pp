import React from "react";
import { FiPhoneOff, FiMic } from "react-icons/fi"; // Import icons for end call and mute
import { useTheme } from "./ThemeContext"; // Import the useTheme hook

const VideoCallPopup = ({ user, onEndCall }) => {
  const { isDarkMode } = useTheme(); // Use the theme context

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className={`rounded-lg shadow-lg max-w-sm w-full mx-4 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="relative">
          {/* Remote Video Feed */}
          <div className="w-full h-60 md:h-80 bg-gray-800 rounded-t-lg flex items-center justify-center text-white">
            <span className="text-xl">Remote Video Feed</span>
          </div>
          {/* Local User Video Feed */}
          <div className="absolute right-4 bottom-4 w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <span className="flex items-center justify-center h-full text-white text-sm md:text-base">
              Your Video
            </span>
          </div>
        </div>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold mb-2">Video Call</h2>
          <strong className="block">{user.name}</strong>
          <span
            className={`text-${isDarkMode ? "green-400" : "green-500"} text-sm`}
          >
            Ringing...
          </span>
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
                size={24}
              />
            </button>
            <button
              className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-200"
              onClick={onEndCall}
            >
              <FiPhoneOff className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .max-w-sm {
            max-width: 90%; /* Adjust max width for small screens */
          }
          .h-60 {
            height: 40vh; /* Adjust height for remote video on small screens */
          }
          .md\:h-80 {
            height: 50vh; /* Maintain larger height on medium screens */
          }
          .text-xl {
            font-size: 1.5rem; /* Increase font size for small screens */
          }
          .text-lg {
            font-size: 1.25rem; /* Adjust font size for small screens */
          }
        }
      `}</style>
    </div>
  );
};

export default VideoCallPopup;
