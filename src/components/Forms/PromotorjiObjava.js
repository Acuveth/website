// DetailedFormPage.js
import React, { useState } from "react";
import NavbarLogedin from "../NavbarLogedin";

const DetailedFormPage = () => {
  const [formData, setFormData] = useState({
    media: null,
    instructions: "",
    shortField1: "",
    shortField2: "",
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
        <div className="w-full max-w-md p-6 bg-gray-900 shadow-md rounded-lg space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload */}
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Naroči Promotorje
            </h1>
            <div>
              <label className="block text-white font-semibold mb-2">
                Naloži Sliko/Video
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

            {/* Long Form for Instructions */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Navodila
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter instructions here..."
                className="w-full h-32 px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 1 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Link do kart
              </label>
              <input
                type="text"
                name="shortField1"
                value={formData.shortField1}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 2 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Koga naj taggajo?
              </label>
              <input
                type="text"
                name="shortField2"
                value={formData.shortField2}
                onChange={handleInputChange}
                placeholder="Enter text"
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

export default DetailedFormPage;
