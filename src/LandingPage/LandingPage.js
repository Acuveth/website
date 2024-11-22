import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ id }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login"); // Navigate to the login route
  };

  return (
    <div
      id={id}
      className="flex flex-col md:flex-row items-center min-h-screen bg-gray-900 text-white p-6 md:p-12"
    >
      {/* Left Side: Text and CTA */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 ">
        {/* Big Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Študentski Dogodki
        </h1>

        {/* Small Text */}
        <p className="text-md sm:text-lg md:text-xl text-gray-400">
          Prikaži svoje dogodke Sloveniji
        </p>

        {/* Call to Action */}
        <div className="mt-4 flex justify-center md:justify-start">
          <button
            onClick={handleStartClick}
            className="bg-transparent border-2 border-custom-orange text-white text-sm sm:text-lg hover:bg-custom-orange hover:text-white font-semibold py-2 px-8 sm:py-3 sm:px-16 rounded-md transition duration-300"
          >
            Začni
          </button>
        </div>
      </div>

      {/* Right Side: Image Placeholder */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
        <div className="w-72 sm:w-96 h-72 sm:h-96 bg-gray-800 rounded-md flex items-center justify-center">
          {/* Placeholder Text for Image */}
          <span className="text-gray-500">Your Image Here</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
