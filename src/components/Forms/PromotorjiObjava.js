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

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Form Container */}
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
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
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              "
              />
            </div>

            {/* Long Form for Instructions */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Navodila
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter instructions here..."
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Short Input Field 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Link do kart
              </label>
              <input
                type="text"
                name="shortField1"
                value={formData.shortField1}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Short Input Field 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Koga naj taggajo?
              </label>
              <input
                type="text"
                name="shortField2"
                value={formData.shortField2}
                onChange={handleInputChange}
                placeholder="Enter text"
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

export default DetailedFormPage;
