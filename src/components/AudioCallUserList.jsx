import React, { useState } from "react";
import { MdCall } from "react-icons/md"; // Importing icons
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
import AudioCallPopup from "./AudioCallPopup"; // Import the popup component
import { useTheme } from "./ThemeContext"; // Importing theme context

// Helper function to format call information
const formatCallInfo = (dateString, isRecent) => {
  const date = new Date(dateString);
  const now = new Date();
  const minutesDiff = Math.floor((now - date) / 60000); // difference in minutes

  if (isRecent && minutesDiff < 5) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString(); // Use for outgoing and older calls
  }
};

const users = [
  {
    id: 1,
    name: "Amin",
    callType: "Incoming",
    img: IMG1,
    callDate: "2024-09-28T12:30:00",
    isMissed: false,
  },
  {
    id: 2,
    name: "Bilal",
    callType: "Outgoing",
    img: IMG2,
    callDate: "2024-09-28T12:32:00",
    isMissed: true,
  },
  {
    id: 3,
    name: "Omar",
    callType: "Recent",
    img: IMG3,
    callDate: "2024-09-27T14:20:00",
    isMissed: false,
  },
  {
    id: 4,
    name: "Khalid",
    callType: "Incoming",
    img: IMG4,
    callDate: "2024-09-27T09:00:00",
    isMissed: false,
  },
  {
    id: 5,
    name: "Zaid",
    callType: "Outgoing",
    img: IMG5,
    callDate: "2024-09-26T16:00:00",
    isMissed: true,
  },
  {
    id: 6,
    name: "Farhan",
    callType: "Recent",
    img: IMG6,
    callDate: "2024-09-26T16:58:00",
    isMissed: false,
  },
  {
    id: 7,
    name: "Ibrahim",
    callType: "Incoming",
    img: IMG7,
    callDate: "2024-09-25T10:30:00",
    isMissed: false,
  },
  {
    id: 8,
    name: "Samir",
    callType: "Outgoing",
    img: IMG8,
    callDate: "2024-09-25T08:00:00",
    isMissed: true,
  },
  {
    id: 9,
    name: "Yusuf",
    callType: "Recent",
    img: IMG9,
    callDate: "2024-09-24T15:00:00",
    isMissed: false,
  },
  {
    id: 10,
    name: "Ayaan",
    callType: "Incoming",
    img: IMG10,
    callDate: "2024-09-24T11:00:00",
    isMissed: false,
  },
  {
    id: 11,
    name: "Kareem",
    callType: "Outgoing",
    img: IMG11,
    callDate: "2024-09-23T17:00:00",
    isMissed: true,
  },
  {
    id: 12,
    name: "Nabil",
    callType: "Recent",
    img: IMG12,
    callDate: "2024-09-23T12:30:00",
    isMissed: false,
  },
];

const AudioCallUserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { isDarkMode } = useTheme();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEndCall = () => {
    setSelectedUser(null);
  };

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
        Audio Calls
      </h2>
      <div className="flex justify-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-[80%] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
      <ul
        className={`list-none p-0 flex-1 overflow-y-auto scrollbar-thin ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
        style={{ paddingRight: "8px" }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isRecent = user.callType === "Recent";
            const callInfo = formatCallInfo(user.callDate, isRecent);

            return (
              <li
                key={user.id}
                className={`flex justify-between items-center mb-2 py-2 px-4 transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-700 active:bg-gray-800"
                    : "hover:bg-gray-200 active:bg-gray-300"
                } w-full`}
                onClick={() => handleUserClick(user)}
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
                      className={`m-0 flex items-center ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user.callType === "Incoming" ? (
                        <MdCall className="text-green-500 mr-1" />
                      ) : (
                        <MdCall className="text-blue-500 mr-1" />
                      )}
                      {user.isMissed && user.callType === "Incoming" ? (
                        <span className="text-red-500">Missed </span>
                      ) : null}
                      {user.callType} call
                    </p>
                  </div>
                </div>
                <div
                  className={`text-gray-500 text-sm text-right ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {callInfo}
                </div>
              </li>
            );
          })
        ) : (
          <li className="text-center p-4">No users found</li>
        )}
      </ul>
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <AudioCallPopup user={selectedUser} onEndCall={handleEndCall} />
        </div>
      )}
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

export default AudioCallUserList;
