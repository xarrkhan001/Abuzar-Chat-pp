import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiLivechat } from "react-icons/si";
import {
  FaComments,
  FaPhoneAlt,
  FaVideo,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext"; // Import the custom hook

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("Chat");
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use theme context

  useEffect(() => {
    const path = location.pathname;
    setActive(
      path === "/"
        ? "Chat"
        : path.slice(1).charAt(0).toUpperCase() + path.slice(2)
    );
  }, [location]);

  const handleClick = (icon) => {
    setActive(icon);
  };

  const getIconClass = (icon, smallScreen = false) => `
    flex items-center justify-center ${
      smallScreen ? "h-7 w-7" : "h-10 w-10"
    } rounded-full transition-all duration-200 
    ${
      active === icon
        ? "bg-gradient-to-r from-green-400 to-green-500"
        : isDarkMode
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-gray-200 hover:bg-green-300"
    }
  `;

  const getIconColor = (icon) => `
    ${
      active === icon ||
      (isDarkMode && (icon === "Toggle Mode" || icon === "Settings"))
        ? "text-white"
        : isDarkMode
        ? "text-gray-300"
        : "text-gray-700"
    }
  `;

  return (
    <div>
      {/* Sidebar on Large Screens */}
      <div
        className={`hidden md:flex flex-col h-screen w-16 py-4 shadow-md transition-colors duration-200 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="mb-6 flex items-center justify-center">
          <SiLivechat className="h-8 w-8 text-green-500" />
        </div>

        <div className="flex-grow">
          {[
            { icon: <FaComments />, label: "Chat", path: "/" },
            { icon: <FaPhoneAlt />, label: "Call", path: "/call" },
            { icon: <FaVideo />, label: "Video", path: "/video" },
          ].map(({ icon, label, path }) => (
            <div
              className="mb-6 flex items-center justify-center"
              key={label}
              onClick={() => handleClick(label)}
            >
              <Link to={path}>
                <div className={getIconClass(label)}>
                  {icon && <span className={getIconColor(label)}>{icon}</span>}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div>
          <div
            className="mb-6 flex items-center justify-center"
            onClick={toggleDarkMode}
          >
            <div className={getIconClass("Toggle Mode")}>
              <span className={getIconColor("Toggle Mode")}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </span>
            </div>
          </div>
          <div
            className="mb-6 flex items-center justify-center"
            onClick={() => handleClick("Settings")}
          >
            <Link to="/settings">
              <div className={getIconClass("Settings")}>
                <span className={getIconColor("Settings")}>
                  <FaCog />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar on Small Screens */}
      <div
        className={`md:hidden flex flex-row items-center justify-between p-2 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        } shadow`}
      >
        <SiLivechat className="h-8 w-8 text-green-500" />

        <div className="flex flex-grow justify-evenly">
          {[
            { icon: <FaComments />, label: "Chat", path: "/" },
            { icon: <FaPhoneAlt />, label: "Call", path: "/call" },
            { icon: <FaVideo />, label: "Video", path: "/video" },
            { icon: isDarkMode ? <FaSun /> : <FaMoon />, label: "Toggle Mode" },
            { icon: <FaCog />, label: "Settings", path: "/settings" },
          ].map(({ icon, label, path }) => (
            <div
              key={label}
              className="flex items-center mx-1"
              onClick={() => {
                if (label === "Toggle Mode") toggleDarkMode();
                else handleClick(label);
              }}
            >
              <Link to={path}>
                <div className={getIconClass(label, true)}>
                  <span className={getIconColor(label)}>{icon}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
