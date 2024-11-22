import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../Context/UserContext";
import { getAuth, signOut } from "firebase/auth";
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiGrid,
  FiEdit,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiClipboard,
  FiSettings,
} from "react-icons/fi"; // Import icons

const NavbarLogedin = ({ onFeatureSelect, selectedFeature, features }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null; // Handle case where user is not loaded yet

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Clear user context
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 px-4 py-2 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center">
          <img
            src={logo}
            alt="Študentski Dogodki Logo"
            className="w-36 lg:w-72 h-auto"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logout Button */}
        <div className="hidden md:flex items-center relative group px-4">
          <button
            onClick={handleLogout}
            className="text-white text-xl hover:text-gray-400 transition duration-300"
          >
            <FiLogOut />
          </button>
          {/* Tooltip */}
          <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white mt-2 rounded-lg shadow-lg">
          {/* Sidebar Features */}
          {features.map((feature) => (
            <button
              key={feature.key}
              onClick={() => {
                onFeatureSelect(feature.key);
                toggleMenu();
              }}
              className={`block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold ${
                selectedFeature === feature.key
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              {feature.icon}
              <span>{feature.name}</span>
            </button>
          ))}
          <div className="border-t border-gray-700 my-2"></div>
          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarLogedin;
