import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link as ScrollLink } from "react-scroll";
import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiMail,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Študentski Dogodki Logo"
            className="w-36 lg:w-72 h-auto"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
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

        {/* Right Section: Login and Signup (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <button className="text-gray-200 hover:text-custom-orange font-semibold">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent border-2 border-custom-orange text-white font-semibold px-4 py-2 rounded-full hover:bg-custom-orange transition duration-300">
              Signup
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-white text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white mt-2 py-2 rounded-lg shadow-lg transition-all duration-300">
          <ScrollLink
            to="onas"
            smooth={true}
            duration={500}
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <FiInfo className="mr-2" />O nas
          </ScrollLink>
          <ScrollLink
            to="narocnine"
            smooth={true}
            duration={500}
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <FiHome className="mr-2" />
            Naročnine
          </ScrollLink>
          <ScrollLink
            to="kontakt"
            smooth={true}
            duration={500}
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <FiMail className="mr-2" />
            Kontakt
          </ScrollLink>
          <div className="border-t border-gray-700 my-2"></div>
          <Link
            to="/login"
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <FiLogIn className="mr-2" />
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <FiUserPlus className="mr-2" />
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
