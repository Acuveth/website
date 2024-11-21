import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../Context/UserContext";
import { getAuth, signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi"; // Import logout icon

const NavbarLogedin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isSubscribed, setUser } = useContext(UserContext);

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

  return (
    <nav className="bg-gray-900 px-4 py-2 shadow-lg">
      <div className="mx-auto flex justify-between items-center">
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

        {/* Logout Icon */}
        <div className="flex items-center mr-10 relative group">
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
    </nav>
  );
};

export default NavbarLogedin;
