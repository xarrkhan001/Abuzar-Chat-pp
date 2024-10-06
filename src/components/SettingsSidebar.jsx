import React from "react";
import {
  FaCog,
  FaUser,
  FaComments,
  FaVideo,
  FaBell,
  FaHdd,
  FaQuestionCircle,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const settingsOptions = [
  {
    id: 1,
    name: "General",
    icon: <FaCog />,
    alertMessage: "General settings clicked!",
  },
  {
    id: 2,
    name: "Account",
    icon: <FaUser />,
    alertMessage: "Account settings clicked!",
  },
  {
    id: 3,
    name: "Chats",
    icon: <FaComments />,
    alertMessage: "Chat settings clicked!",
  },
  {
    id: 4,
    name: "Video and Voice",
    icon: <FaVideo />,
    alertMessage: "Video and voice settings clicked!",
  },
  {
    id: 5,
    name: "Notifications",
    icon: <FaBell />,
    alertMessage: "Notification settings clicked!",
  },
  {
    id: 6,
    name: "Storage",
    icon: <FaHdd />,
    alertMessage: "Storage settings clicked!",
  },
  {
    id: 7,
    name: "Help",
    icon: <FaQuestionCircle />,
    alertMessage: "Help section clicked!",
  },
];

const SettingsSidebar = () => {
  const { isDarkMode } = useTheme();

  const handleClick = (alertMessage) => {
    alert(alertMessage);
  };

  return (
    <div
      className={`flex flex-col w-full sm:w-[356px] h-screen border ${
        isDarkMode ? "border-gray-600" : "border-gray-200"
      } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <h2
        className={`text-2xl font-semibold p-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        } text-center sm:text-left`}
      >
        Settings
      </h2>
      <ul
        className={`list-none p-0 flex-1 overflow-y-auto ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {settingsOptions.map((option) => (
          <li
            key={option.id}
            className={`flex items-center mb-2 py-3 px-4 hover:${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } transition-colors duration-200 rounded-lg cursor-pointer`}
            onClick={() => handleClick(option.alertMessage)}
          >
            <span
              className={`mr-3 text-lg transition-colors duration-200 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {React.cloneElement(option.icon, { className: "text-inherit" })}
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {option.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsSidebar;
