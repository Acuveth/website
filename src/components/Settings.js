import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"; // Import the context
import NavbarLogedin from "./NavbarLogedin";

const Settings = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const { logout } = useContext(UserContext); // Access the logout method from UserContext

  const handleLogout = () => {
    logout(); // Clear user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <NavbarLogedin />
      <div className="flex min-h-screen bg-gray-800 text-white">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Settings</h2>
          <ul>
            <li className="text-blue-400 font-medium p-2 rounded-lg bg-blue-900">
              Account
            </li>
          </ul>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-500 mr-6"></div>
              <button className="border border-gray-500 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600">
                Upload
              </button>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Name</h3>
                  <p className="text-lg text-white">Alex Jackson</p>
                </div>
                <button className="text-blue-400 hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Contacts</h3>
                  <p className="text-lg text-white">Phone: +123123217923</p>
                  <p className="text-lg text-white">Email: alex@example.com</p>
                </div>
                <button className="text-blue-400 hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Social Media</h3>
                  <p className="text-lg text-white">
                    linkedin.com/company/finalui
                  </p>
                  <p className="text-lg text-white">dribbble.com/final-ui</p>
                </div>
                <button className="text-blue-400 hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Language & Currency</h3>
                  <p className="text-lg text-white">English, USD</p>
                </div>
                <button className="text-blue-400 hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Theme</h3>
                  <p className="text-lg text-white">Light Mode</p>
                </div>
                <button className="text-blue-400 hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-400">Integration</h3>
                  <p className="text-lg text-white">
                    Google • examplemail@gmail.com
                  </p>
                </div>
                <button className="text-green-400 font-medium">
                  Connected
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
