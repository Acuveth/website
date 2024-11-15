// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-4 shadow-lg">
      <div className="container mx-16 flex justify-between items-center">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center space-x-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Študentski Dogodki Logo"
              className="w-72 h-15 mr-2" // Adjusted size for better fit
            />
          </Link>
          {/* Links */}
          <div className="hidden md:flex space-x-16 mr-6">
            <ScrollLink
              to="onas"
              smooth={true}
              duration={500}
              className="text-gray-200 hover:text-custom-orange font-semibold text-lg cursor-pointer"
            >
              O nas
            </ScrollLink>
            <ScrollLink
              to="narocnine"
              smooth={true}
              duration={500}
              className="text-gray-200 hover:text-custom-orange font-semibold text-lg cursor-pointer"
            >
              Naročnine
            </ScrollLink>
            <ScrollLink
              to="kontakt"
              smooth={true}
              duration={500}
              className="text-gray-200 hover:text-custom-orange font-semibold text-lg cursor-pointer"
            >
              Kontakt
            </ScrollLink>
          </div>
        </div>

        {/* Right Section: Login and Signup */}
        <div className="flex items-center space-x-4 rounded-full bg-gray-800 pl-6">
          <Link to="/login">
            <button className="text-gray-200 hover:text-custom-orange hidden md:block font-semibold">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent border-2 border-custom-orange text-white font-semibold px-4 py-2 rounded-full hover:bg-custom-orange transition duration-300">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
