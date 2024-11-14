// NavbarLogedin.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../Context/UserContext";

const NavbarLogedin = () => {
  const location = useLocation();
  const { user, isSubscribed } = useContext(UserContext);

  if (!user) return null; // Handle case where user is not loaded yet

  const isOnDashboardPage = location.pathname === "/dashboard";

  return (
    <nav className="bg-gray-900 px-4 py-2 shadow-lg">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center mx-4 space-x-2 font-bold text-2xl text-white">
          <Link to="/dashboard" className="flex items-center">
            <img
              src={logo}
              alt="Študentski Dogodki Logo"
              className="w-72 h-15"
            />
          </Link>
        </div>

        {/* Conditional Links based on Subscription Status and Page */}
        <div className="space-x-4">
          {isSubscribed || isOnDashboardPage ? (
            <Link
              to={isOnDashboardPage ? `/plans` : "/dashboard"}
              className="font-semibold text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-800"
            >
              {isOnDashboardPage ? "Pregled planov" : "Pregled promocij"}
            </Link>
          ) : (
            <Link
              to={`/dashboard`}
              className="font-semibold text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-800"
            >
              Dashboard
            </Link>
          )}
          <Link
            to={`/settings/${user.id}`} // Link to settings page
            className="font-semibold text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-800"
          >
            Nastavitve
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogedin;
