// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./Navbar/Navbar";
import Settings from "./components/Settings";
import { UserProvider } from "./Context/UserContext"; // Only import the provider
import FeaturesScreen from "./LandingPage/FeaturesScreen";
import Footer from "./LandingPage/Footer";
import Features from "./LandingPage/Features";
import Pricing from "./LandingPage/Pricing";
import LandingPage from "./LandingPage/LandingPage";
import Partners from "./LandingPage/Partners";
import ContactForm from "./LandingPage/ContactForm";
import Success from "./components/Dashboard/Success";
import Cancel from "./components/Dashboard/Cancel";
// Import the form components
import FormObjava from "./components/Forms/FormObjava";
import FormStory from "./components/Forms/FormStory";
import FormWIR from "./components/Forms/FormWIR";
import FormPromotorji from "./components/Forms/FormPromotorji";

function App() {
  //Naredi responsive website
  //Dodat vse slike, partnerje in napisat vse do konca - še popravt landing page
  //Setup backend for payment - cancel subscription
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
                    <LandingPage />
                    <Partners />
                    <Features id="onas" />
                    <FeaturesScreen />
                    <Pricing id="narocnine" />
                    <ContactForm id="kontakt" />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Login />
                  </>
                }
              />

              <Route
                path="/register"
                element={
                  <>
                    <Register />
                  </>
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings/:userId" element={<Settings />} />
              {/* New Routes for Each Form Component */}
              <Route path="/form-objava" element={<FormObjava />} />
              <Route path="/form-story" element={<FormStory />} />
              <Route path="/form-wir" element={<FormWIR />} />
              <Route path="/promotorji-objava" element={<FormPromotorji />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
