import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import NavbarLogedin from "./NavbarLogedin";

function PromotionForm() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTags, setEventTags] = useState("");
  const [eventPicture, setEventPicture] = useState(null);
  const [eventVideo, setEventVideo] = useState(null);
  const [price, setPrice] = useState(10);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  // Fetch user data to check subscription status
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.id) {
          // Ensure user and user.id are available
          const response = await axios.get(
            `http://localhost:80/bckweb/users/get_user_data.php?user_id=${user.id}`
          );
          setIsSubscribed(response.data.is_subscribed);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]); // Depend on user to refetch if user changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("event_description", eventDescription);
    formData.append("event_location", eventLocation);
    formData.append("event_time", eventTime);
    formData.append("event_tags", eventTags);
    formData.append("event_picture", eventPicture);
    formData.append("event_video", eventVideo);
    formData.append("user_id", user.id); // Add user_id to form data

    if (!isSubscribed) {
      // Redirect to Stripe checkout for unsubscribed users
      try {
        const stripeResponse = await axios.post(
          "http://localhost:80/bckweb/stripe/checkout.php"
        );
        window.location.href = stripeResponse.data.url; // Redirect to Stripe checkout
      } catch (error) {
        console.error("Stripe checkout error:", error);
        alert("Failed to initiate payment.");
      }
    } else {
      // Submit data automatically for subscribed users
      try {
        await axios.post(
          "http://localhost:80/bckweb/posts/post_user_posts.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/dashboard", {
          state: {
            successMessage: "Your event has been successfully submitted",
          },
        });
      } catch (error) {
        console.error("Error creating promotion:", error);
        alert("Failed to create promotion.");
      }
    }
  };

  return (
    <>
      <NavbarLogedin />

      <div className="max-w-4xl my-2 mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Kupi Promocijo
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {/* Promotional Image */}
            <div className="col-span-1">
              <label className="block mb-2 text-white">
                Promotional Slika Dogodka
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEventPicture(e.target.files[0])}
                className="w-full text-white bg-gray-700 p-2 border border-gray-600 rounded"
                required
              />
            </div>

            {/* Promotional Video */}
            <div className="col-span-1">
              <label className="block mb-2 text-white">
                Promotional Video Dogodka
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setEventVideo(e.target.files[0])}
                className="w-full text-white bg-gray-700 p-2 border border-gray-600 rounded"
              />
            </div>

            {/* Event Description */}
            <div className="col-span-1">
              <label className="block mb-2 text-white">Opis Dogodka</label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                placeholder="Opis dogodka"
                required
              ></textarea>
            </div>
          </div>

          {/* Event Name, Tags, Date, and Location */}
          <div className="mb-4">
            <label className="block mb-2 text-white">Ime Dogodka</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Ime dogodka"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">Taggs</label>
            <input
              type="text"
              value={eventTags}
              onChange={(e) => setEventTags(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Vaš @(ime) na Instagramu"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">Datum Dogodka</label>
            <input
              type="date"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-white">Lokacija Dogodka</label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Lokacija dogodka"
              required
            />
          </div>

          {/* Buy Promotion Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-semibold text-white">
              Cena Nakupa: {price}€
            </p>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              {isSubscribed ? "Naroči Promocijo" : "Kupi Promocijo"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PromotionForm;
