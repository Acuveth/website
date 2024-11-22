// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./landing-page/navbar/Navbar";
import Settings from "./components/Settings";
import { UserProvider } from "./context/UserContext"; // Only import the provider
import FeaturesScreen from "./landing-page/FeaturesScreen";
import Footer from "./landing-page/Footer";
import Features from "./landing-page/Features";
import Pricing from "./landing-page/Pricing";
import LandingPage from "./landing-page/LandingPage";
import Partners from "./landing-page/Partners";
import ContactForm from "./landing-page/ContactForm";
import Success from "./components/stripe-payment/Success";
import Cancel from "./components/stripe-payment/Cancel";
// Import the form components
import FormObjava from "./components/forms/FormObjava";
import FormStory from "./components/forms/FormStory";
import FormWIR from "./components/forms/FormWIR";
import FormPromotorji from "./components/forms/FormPromotorji";

function App() {
  //Dodat vse slike, partnerje in napisat vse do konca - še popravt landing page da zgleda nice
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
