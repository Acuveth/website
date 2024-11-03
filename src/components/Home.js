import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Študentski dogodki</h1>
      <p className="text-lg mb-6">Promocije</p>
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300"
      >
        Naroči se
      </Link>
    </div>
  );
}

export default Home;
