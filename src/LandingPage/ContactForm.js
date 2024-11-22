// ContactForm.js
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaInstagram } from "react-icons/fa";

const ContactForm = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      emailjs
        .send(
          "service_8icf76c", // Replace with your EmailJS service ID
          "template_1h52nyq", // Replace with your EmailJS template ID
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          "czEJnd0GyLqybqwWS" // Replace with your EmailJS user ID
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setSuccessMessage("Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            setFormErrors({});
          },
          (error) => {
            console.error("FAILED...", error);
            setSuccessMessage(
              "Failed to send your message. Please try again later."
            );
          }
        );
    } else {
      setFormErrors(errors);
      setSuccessMessage("");
    }
  };

  return (
    <div id={id} className="max-w-6xl mx-auto p-6 text-white mb-10">
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Information Column */}
        <div className="flex flex-col items-center text-center w-full lg:w-1/3 space-y-4">
          <h2 className="text-3xl font-bold">Kontaktirajte nas</h2>
          <p className="text-lg">
            Email:{" "}
            <a
              href="mailto:info@studentski-dogodki.com"
              className="text-custom-orange hover:underline"
            >
              info@studentski-dogodki.com
            </a>
          </p>
          <p className="text-lg flex items-center justify-center">
            <FaInstagram className="text-white mr-2" size={30} />
            <a
              href="https://www.instagram.com/studentski_dogodki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-orange hover:underline"
            >
              @studentski_dogodki
            </a>
          </p>
        </div>

        {/* Contact Form Column */}
        <div className="w-full lg:w-2/3 px-8 py-6 rounded-xl shadow-2xl bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Vaše Ime
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Vaš Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Sporočilo
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              ></textarea>
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-custom-orange text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 transition w-full md:w-auto"
              >
                Pošlji
              </button>
            </div>

            {successMessage && (
              <p className="text-green-500 text-sm mt-4 text-center">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
