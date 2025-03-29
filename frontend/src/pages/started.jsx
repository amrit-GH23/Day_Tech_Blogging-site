import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Started = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/blog");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Hey there, Blogger! 👋
        </h1>

        <p className="text-lg text-gray-700 max-w-xl">
          Ready to write something awesome? Or just here to explore? Either way,
          we’ve got you covered. Start your journey into the world of ideas and creativity today.
        </p>

        <button
          onClick={handleStartClick}
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-full shadow-md transition duration-300"
        >
          🚀 Start Exploring
        </button>
      </div>
    </div>
  );
};

export default Started;
