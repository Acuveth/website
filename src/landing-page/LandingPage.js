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
      className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 md:p-12"
    >
      {/* Text Section */}
      <div className="text-center space-y-6 mb-8">
        {/* Big Text */}
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-gradientSlide bg-gradient-size">
          Študentski Dogodki
        </h1>

        {/* Small Text */}
        <p className="text-md sm:text-lg md:text-xl text-gray-400">
          Prikaži svoje dogodke Sloveniji
        </p>

        {/* Call to Action */}
        <div>
          <button
            onClick={handleStartClick}
            className="bg-transparent border-2 border-custom-orange text-white text-sm sm:text-lg hover:bg-custom-orange hover:text-white font-semibold py-2 px-8 sm:py-3 sm:px-16 rounded-md transition duration-300"
          >
            Začni
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center">
        <div className="w-72 sm:w-96 h-72 sm:h-96 bg-gray-800 rounded-md flex items-center justify-center">
          {/* Placeholder Text for Image */}
          <span className="text-gray-500">Your Image Here</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
