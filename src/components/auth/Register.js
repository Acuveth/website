import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase"; // Import auth and db from your Firebase config
import { doc, setDoc } from "firebase/firestore"; // Firestore for user data
import { IoArrowBack } from "react-icons/io5"; // Import a back arrow icon
import googleLogo from "../../assets/google.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        isSubscribed: 0, // Default value
        profile_photo: "", // Default empty profile photo
        stripeCustomerId: null, // Default Stripe customer ID
        subscription: {
          status: "inactive", // Default subscription status
          current_period_end: null, // Default subscription period end
          priceId: null, // Default subscription price ID
        },
      });

      alert("Registration successful");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save Google user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        phone: "", // Optional, as Google Auth doesn't provide phone by default
        isSubscribed: 0, // Default value
        profile_photo: user.photoURL || "", // Google profile photo
      });

      alert("Registration successful with Google");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to register with Google");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      {/* Back Arrow */}
      <button
        className="absolute top-4 left-4 text-white text-4xl hover:text-gray-400"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
      </button>

      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-orange hover:bg-custom-orange-dark-20 text-white font-semibold py-2 rounded transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-2 rounded-lg border border-gray-300 hover:shadow-md transition duration-300"
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
