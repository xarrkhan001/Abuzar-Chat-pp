import React, { useState } from "react";
import IMG1 from "../assets/img1.jpg";
import IMG2 from "../assets/img2.jpg";
import IMG3 from "../assets/img3.jpg";
import IMG4 from "../assets/img4.jpg";
import IMG5 from "../assets/img5.jfif";
import IMG6 from "../assets/img6.jpg";
import IMG7 from "../assets/img7.jpg";
import IMG8 from "../assets/img8.jpg";
import IMG9 from "../assets/img9.jpg";
import IMG10 from "../assets/img10.jpg";
import IMG11 from "../assets/img11.jpg";
import IMG12 from "../assets/Abu.jpg";
import { useTheme } from "./ThemeContext"; // Import the useTheme hook

const users = [
  {
    id: 1,
    name: "Amin",
    message: "Hey there!",
    img: IMG1,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 2,
    name: "Bilal",
    message: "How are you?",
    img: IMG2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 3,
    name: "Omar",
    message: "Let’s catch up!",
    img: IMG3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
  },
  {
    id: 4,
    name: "Khalid",
    message: "What’s new?",
    img: IMG4,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 5,
    name: "Zaid",
    message: "Long time no see!",
    img: IMG5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 6,
    name: "Farhan",
    message: "Wanna grab coffee?",
    img: IMG6,
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 7,
    name: "Ibrahim",
    message: "Miss you!",
    img: IMG7,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 8,
    name: "Samir",
    message: "Let’s chat!",
    img: IMG8,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 9,
    name: "Yusuf",
    message: "Happy birthday!",
    img: IMG9,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 10,
    name: "Ayaan",
    message: "Good luck!",
    img: IMG10,
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
  },
  {
    id: 11,
    name: "Kareem",
    message: "See you soon!",
    img: IMG11,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
  },
  {
    id: 12,
    name: "Nabil",
    message: "Let's hang out!",
    img: IMG12,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
];

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return timestamp.toLocaleDateString(); // Format as MM/DD/YYYY
};

const MessageUserList = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme(); // Use the theme context

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col w-full max-w-xs sm:max-w-md lg:w-[360px] h-screen border ${
        isDarkMode
          ? "border-gray-600 bg-gray-900 text-white"
          : "border-gray-300 bg-white text-black"
      }`}
    >
      <h2
        className={`text-xl font-bold p-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } text-center sm:text-left`}
      >
        Messages
      </h2>
      <div className="flex justify-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-[80%] p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
      <ul
        className={`list-none p-0 flex-1 overflow-y-auto ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
        style={{ paddingRight: "8px" }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`flex items-center mb-2 py-2 px-4 hover:${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } transition-all w-full justify-between cursor-pointer active:${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
              onClick={() => onUserSelect(user)} // Handle user click
            >
              <div className="flex items-center">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="flex-1">
                  <strong
                    className={`block ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {user.name}
                  </strong>
                  <p
                    className={`m-0 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.message}
                  </p>
                </div>
              </div>
              <span
                className={`text-gray-500 text-sm ml-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatTimestamp(user.timestamp)}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center p-4">No users found</li>
        )}
      </ul>
      <style jsx>{`
        ul {
          scrollbar-width: thin; /* For Firefox */
          scrollbar-color: #e5e7eb ${isDarkMode ? "#1f2937" : "#ffffff"}; /* Scrollbar color */
        }
        ul::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
          background: ${isDarkMode ? "#1f2937" : "#ffffff"}; /* Track color */
        }
        ul::-webkit-scrollbar-thumb {
          background-color: #e5e7eb; /* Color of the scrollbar */
          border-radius: 10px; /* Rounded corners */
          transition: background-color 0.2s ease; /* Smooth transition */
        }
        ul::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db; /* Darker on hover */
        }
        ul::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1f2937" : "#ffffff"}; /* Track color */
        }
        ul::-webkit-scrollbar-button {
          display: none; /* Hides scrollbar buttons (arrows) */
        }
        ul {
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }
        ul:hover {
          scrollbar-width: thin; /* Show scrollbar on hover for Firefox */
        }
      `}</style>
    </div>
  );
};

export default MessageUserList;
