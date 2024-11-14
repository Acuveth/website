// Features.js
import React from 'react';

const features = [
  {
    title: "Objave na profilu",
    description: "Promocija dogodkov preko naših objav",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL or path
  },
  {
    title: "Storyji",
    description: "Prodaja kart preko naših storijev.",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL or path
  },
  {
    title: "Week in review objave",
    description: "Dodajte vaše dogodke v naš week in review",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL or path
  },
  {
    title: "Promotorji",
    description: "Promocija dogodkov preko promotorjev.",
    image: "https://via.placeholder.com/300x200", // Replace with actual image URL or path
  },

];

const Features = () => {
  return (
    <div className="px-8 space-y-16 bg-gray-900 py-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 === 0 ? '' : 'md:flex-row-reverse'
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 md:px-8 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-400 text-lg">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
