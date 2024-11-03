// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import SubscriptionPlansPage from "./components/SubscriptionPlansPage";
import Settings from "./components/Settings";
import { UserProvider } from "./Context/UserContext"; // Only import the provider
import PromotionForm from "./components/PromotionForm"; // Import PromotionForm

// Import the form components
import FormObjava from "./components/Forms/FormObjava";
import FormStory from "./components/Forms/FormStory";
import FormWIR from "./components/Forms/FormWIR";
import PromotorjiObjava from "./components/Forms/PromotorjiObjava";

function App() {
  return (
    <UserProvider>
      {/* Ensure UserProvider wraps everything */}
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
          {/* Main content should fill available space */}
          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                    <Login />
                  </>
                }
              />
              <Route path="/plans" element={<SubscriptionPlansPage />} />
              <Route
                path="/register"
                element={
                  <>
                    <Navbar />
                    <Register />
                  </>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/promotion-form" element={<PromotionForm />} />{" "}
              <Route path="/settings/:userId" element={<Settings />} />
              {/* New Routes for Each Form Component */}
              <Route path="/form-objava" element={<FormObjava />} />
              <Route path="/form-story" element={<FormStory />} />
              <Route path="/form-wir" element={<FormWIR />} />
              <Route path="/promotorji-objava" element={<PromotorjiObjava />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
