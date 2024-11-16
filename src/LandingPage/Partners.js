// Partners.js
import React from "react";

const Partners = () => {
  // Placeholder array of partner images. Replace these URLs with actual partner logos or images.
  const partners = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div className="px-8 bg-gray-900 py-16 ">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Partnerji
      </h2>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center ">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="w-32 h-32 flex items-center justify-center bg-gray-800 rounded-md shadow-2xl"
          >
            {/* Placeholder image, replace src with actual partner image URL */}
            <img
              src={partner}
              alt={`Partner ${index + 1}`}
              className="object-contain w-full h-full p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
