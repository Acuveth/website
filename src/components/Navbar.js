// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 font-bold text-2xl text-white">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Študentski Dogodki Logo"
              className="w-72 h-15 mr-2"
            />
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/about"
            className="hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
          >
            Kontakt
          </Link>

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
