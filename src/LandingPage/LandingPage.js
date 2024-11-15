// LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = ({ id }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login"); // Navigate to the login route
  };

  return (
    <>
      <div
        id={id}
        className="flex flex-col md:flex-row items-center min-h-screen bg-gray-900 text-white p-8 md:p-16"
      >
        {/* Left Side: Text and CTA */}
        <div className="ml-8 w-full md:w-1/2 space-y-6">
          {/* Big Text */}
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Študentski Dogodki
          </h1>

          {/* Small Text */}
          <p className="text-lg md:text-xl text-gray-400">
            Prikaži svoje dogodke Sloveniji
          </p>

          {/* Call to Action */}
          <button
            onClick={handleStartClick} // Trigger navigation on click
            className="mt-4 bg-transparent border-2 border-custom-orange text-white text-lg hover:bg-custom-orange hover:text-white font-semibold py-3 px-32 rounded-md transition duration-300"
          >
            Začni
          </button>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <div className="w-full h-64 md:h-96 bg-gray-800 rounded-md flex items-center justify-center">
            {/* Placeholder Text for Image */}
            <span className="text-gray-500">Your Image Here</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
