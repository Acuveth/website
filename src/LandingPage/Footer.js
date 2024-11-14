// Footer.js
import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="text-white text-2xl font-bold">
            Študentski Dogodki
          </Link>
          <p className="mt-4 text-gray-500">
            Prikaži svoje dogodke Sloveniji. Naš cilj je povezati mlade in dogodke, ki jih zanimajo.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigacija</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/#onas" className="hover:text-white transition">O nas</Link>
            </li>
            <li>
              <Link to="/#narocnine" className="hover:text-white transition">Naročnine</Link>
            </li>
            <li>
              <Link to="/#kontakt" className="hover:text-white transition">Kontakt</Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Kontakt</h3>
          <p className="text-gray-500 mb-2">Email: info@studentski-dogodki.com</p>
          <p className="text-gray-500 mb-4">Telefon: +386 123 4567</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Študentski Dogodki. Vse pravice pridržane.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
