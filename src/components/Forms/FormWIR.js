// ShortFormPage.js
import React, { useState } from "react";
import NavbarLogedin from "../NavbarLogedin";

const ShortFormPage = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Short Input Field 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Lokacija Dogodka
              </label>
              <input
                type="text"
                name="field1"
                value={formData.field1}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Short Input Field 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Ime Dogodka
              </label>
              <input
                type="text"
                name="field2"
                value={formData.field2}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Short Input Field 3 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Začetek in Konec dogodka
              </label>
              <input
                type="text"
                name="field3"
                value={formData.field3}
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

export default ShortFormPage;
