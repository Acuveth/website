// FormPage.js
import React, { useState } from "react";
import NavbarLogedin from "../NavbarLogedin";

const FormPage = () => {
  const [formData, setFormData] = useState({
    media: null,
    randomText: "",
    ticketLink: "",
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <NavbarLogedin />

      <div className="min-h-screen bg-gray-900 flex flex-col items-center">
        {/* Form Container */}
        <div className="w-full max-w-md mt-10 p-6 bg-gray-900 shadow-md rounded-lg space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Naroči Story
            </h1>

            {/* Media Upload */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Naloži sliko/Video
              </label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-yellow-50 file:text-yellow-700
              hover:file:bg-yellow-100 my-4
              "
              />
            </div>

            {/* Random Text Input */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Navodila za objavo
              </label>
              <input
                type="text"
                name="randomText"
                value={formData.randomText}
                onChange={handleInputChange}
                placeholder="Enter some text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Ticket Link Input */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Link do kart
              </label>
              <input
                type="url"
                name="ticketLink"
                value={formData.ticketLink}
                onChange={handleInputChange}
                placeholder="https://"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Taggs
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Add tags separated by commas"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Send Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-custom-orange text-white py-2 px-4 rounded-lg hover:bg-custom-orange-dark-20 transition duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPage;
