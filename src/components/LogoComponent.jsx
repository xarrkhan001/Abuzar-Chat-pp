import React from "react";
import { SiLivechat } from "react-icons/si";

const LogoComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen w-[1160px]">
      <div className="flex flex-col items-center">
        <SiLivechat className="w-20 h-20 text-green-400 mb-1" />
        <h1 className="text-4xl font-bold text-center">
          Welcome to <span className="text-green-400">Chat@pp</span>
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Easily send and receive messages in real-time. Stay connected with
          friends and family effortlessly!
        </p>
      </div>
    </div>
  );
};

export default LogoComponent;
