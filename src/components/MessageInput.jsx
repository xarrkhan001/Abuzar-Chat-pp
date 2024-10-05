import React, { useRef, useState } from "react";
import { FaPaperPlane, FaPaperclip, FaMicrophone } from "react-icons/fa";
import { useTheme } from "./ThemeContext"; // Import the theme context

const MessageInput = ({
  message,
  setMessage,
  onSendMessage,
  handleAttachFile,
  fileInputRef,
}) => {
  const { isDarkMode } = useTheme(); // Use theme context for dark mode
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendMessage(message);
      setMessage(""); // Clear message after sending
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      setAudioBlob(event.data);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSendVoiceMessage = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      onSendMessage(audioURL); // Send the audio URL
      setAudioBlob(null); // Clear audio blob after sending
    }
  };

  // Trigger sending voice message when recording stops
  React.useEffect(() => {
    if (!isRecording && audioBlob) {
      handleSendVoiceMessage();
    }
  }, [isRecording]);

  return (
    <div
      className={`p-4 border-t ${
        isDarkMode ? "border-gray-600" : "border-gray-300"
      } ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={handleAttachFile}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontSize: "1.2rem" }}
        >
          <FaPaperclip style={{ fontSize: "1rem" }} />
        </button>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`flex-1 min-w-0 p-2 border rounded-full focus:outline-none w-full sm:w-3/4 md:w-full ${
            isDarkMode
              ? "border-gray-600 bg-gray-800 text-white" // Light gray border in dark mode
              : "border-gray-300"
          }`}
          style={{ height: "40px", borderRadius: "20px" }}
        />

        <div className="flex space-x-0">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="flex items-center justify-center"
            style={{
              height: "30px",
              width: "30px",
              padding: 0,
              background: "none",
              border: "none",
              color: isRecording ? "red" : "green",
            }}
          >
            <FaMicrophone style={{ fontSize: "1rem" }} />
          </button>
          <button
            onClick={() => {
              if (message.trim()) {
                onSendMessage(message);
                setMessage("");
              }
            }}
            className="flex items-center justify-center"
            style={{
              height: "30px",
              width: "30px",
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <FaPaperPlane style={{ fontSize: "0.8rem", color: "green" }} />
          </button>
        </div>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default MessageInput;
