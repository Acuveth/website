import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../Context/UserContext";
import { auth } from "../firebase"; // Import Firebase auth

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg justify-center items-center">
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
          className="w-full bg-custom-orange hover:bg-custom-orange-dark-20 text-white font-semibold py-2 rounded transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-yellow-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
