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

      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Form Container */}
        <div className="w-full max-w-md mt-10 p-6 bg-white shadow-md rounded-lg space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
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
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              "
              />
            </div>

            {/* Random Text Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Navodila za objavo
              </label>
              <input
                type="text"
                name="randomText"
                value={formData.randomText}
                onChange={handleInputChange}
                placeholder="Enter some text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Ticket Link Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Link do kart
              </label>
              <input
                type="url"
                name="ticketLink"
                value={formData.ticketLink}
                onChange={handleInputChange}
                placeholder="https://"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Taggs
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Add tags separated by commas"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Send Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md font-bold hover:bg-red-600"
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
