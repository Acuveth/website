import React, { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import emailjs from "emailjs-com"; // Import EmailJS

const FormPromotorji = () => {
  const [formData, setFormData] = useState({
    media: null,
    description: "",
    ticketLink: "",
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
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

      let mediaURL = null;

      // Upload media to Firebase Storage if a file is selected
      if (formData.media) {
        const storage = getStorage();
        const mediaRef = ref(
          storage,
          `uploads/${Date.now()}_${formData.media.name}`
        );
        await uploadBytes(mediaRef, formData.media);
        mediaURL = await getDownloadURL(mediaRef);
      }

      // Save form data to Firestore
      await addDoc(collection(db, "promoters"), {
        userId: currentUser.uid,
        description: formData.description,
        ticketLink: formData.ticketLink,
        tags: formData.tags,
        media: mediaURL,
        createdAt: new Date(),
      });

      // Prepare email data
      const emailData = {
        user_email: currentUser.email, // Optional: sender's email
        description: formData.description,
        ticketLink: formData.ticketLink,
        tags: formData.tags,
        media: mediaURL || "No media uploaded", // Include media URL if available
      };

      // Send the email
      await sendEmail(emailData);

      alert("Form submitted successfully!");
      setFormData({
        media: null,
        description: "",
        ticketLink: "",
        tags: "",
      });
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
        <div className="max-w-lg w-full p-6 bg-gray-900 shadow-md rounded-lg space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Media Upload */}
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Naroči Promotorje
            </h1>
            <div>
              <label className="block text-white font-semibold mb-2">
                Naloži Sliko/Video
              </label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-yellow-50 file:text-yellow-700
                  hover:file:bg-yellow-100 my-4
                "
              />
            </div>

            {/* Long Form for description */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Navodila
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description here..."
                className="w-full h-32 px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 1 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Link do kart
              </label>
              <input
                type="url"
                name="ticketLink"
                value={formData.ticketLink}
                onChange={handleInputChange}
                placeholder="https://"
                className="w-full px-4 py-2 border border-gray-300 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-custom-orange"
              />
            </div>

            {/* Short Input Field 2 */}
            <div>
              <label className="block text-white font-semibold mb-1">
                Koga naj taggajo?
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
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

export default FormPromotorji;
