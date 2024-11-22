import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase"; // Import Firebase auth
import { IoArrowBack } from "react-icons/io5"; // Import a back arrow icon
import googleLogo from "../../assets/google.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // Initialize Google provider

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to context and local storage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google Authentication
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to context and local storage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login failed:", error);
      alert(error.message || "Google Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <button
        className="absolute top-4 left-4 text-white text-4xl hover:text-gray-400"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
      </button>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-orange hover:bg-custom-orange-dark-20 text-white font-semibold py-2 rounded transition duration-300 mb-4"
            >
              Login
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-2 rounded-lg border border-gray-300 hover:shadow-md transition duration-300 mb-4"
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
