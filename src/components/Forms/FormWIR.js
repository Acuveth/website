import React, { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import emailjs from "emailjs-com"; // Import EmailJS

const FormWIR = () => {
  const [formData, setFormData] = useState({
    location: "",
    eventName: "",
    eventDuration: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = async (data) => {
    try {
      await emailjs.send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        data,
        "your_user_id" // Replace with your EmailJS user ID
      );
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("You must be logged in to submit this form.");
        setIsSubmitting(false);
        return;
      }

      // Save form data to Firestore
      await addDoc(collection(db, "week_in_review"), {
        userId: currentUser.uid,
        location: formData.location,
        eventName: formData.eventName,
        eventDuration: formData.eventDuration,
        createdAt: new Date(), // Timestamp
      });

      // Prepare email data
      const emailData = {
        user_email: currentUser.email, // Optional: sender's email
        location: formData.location,
        eventName: formData.eventName,
        eventDuration: formData.eventDuration,
      };

      // Send the email
      await sendEmail(emailData);

      alert("Form submitted successfully!");
      setFormData({ location: "", eventName: "", eventDuration: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center">
        {/* Form Container */}
        <div className="max-w-lg w-full p-6 bg-gray-900 shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Short Input Field 1 */}
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Naroči Week in Review
            </h1>
            <div>
              <label className="block text-white font-semibold mb-1">
                Lokacija Dogodka
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 2 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Ime Dogodka
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 3 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Začetek in Konec dogodka
              </label>
              <input
                type="text"
                name="eventDuration"
                value={formData.eventDuration}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Send Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? "bg-gray-500" : "bg-custom-orange"
                } text-white py-2 px-4 rounded-lg hover:bg-custom-orange-dark-20 transition duration-300`}
              >
                {isSubmitting ? "Submitting..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormWIR;
