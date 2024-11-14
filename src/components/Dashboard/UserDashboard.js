// UserDashboard.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList";
import StatsPanel from "./StatsPanel";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function UserDashboard() {
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchUserEvents = async (userId) => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  };

  useEffect(() => {
    const loadEvents = async () => {
      if (user && user.id) {
        const userEvents = await fetchUserEvents(user.id);
        setPosts(userEvents);
      }
    };

    loadEvents();
  }, [user]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-900 p-4 text-white">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-4 bg-gray-900 rounded-lg">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Four buttons for forms */}
            <button
              onClick={() => navigate("/form-objava")}
              className="bg-custom-orange hover:bg-custom-orange-dark-20 rounded-lg px-3 py-4 font-semibold"
            >
              Naroči objavo
            </button>
            <button
              onClick={() => navigate("/form-story")}
              className="bg-custom-orange hover:bg-custom-orange-dark-20 rounded-lg px-3 py-4 font-semibold"
            >
              Naroči story
            </button>
            <button
              onClick={() => navigate("/promotorji-objava")}
              className="bg-custom-orange hover:bg-custom-orange-dark-20 rounded-lg px-3 py-4 font-semibold"
            >
              Naroči promotorje
            </button>
            <button
              onClick={() => navigate("/form-wir")}
              className="bg-custom-orange hover:bg-custom-orange-dark-20 rounded-lg px-3 py-4 font-semibold"
            >
              Naroči week in review
            </button>
          </div>
          <button
            onClick={() => navigate("/plans")}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-4 rounded-lg mb-4 font-semibold"
          >
            Uredi Naročnino
          </button>
          <StatsPanel
            selectedEvent={selectedEvent}
            isSubscribed={isSubscribed}
            posts={posts} // Pass posts to StatsPanel
          />
        </aside>

        {/* Right Content: Event List */}
        <main className="flex-1 bg-gray-800 rounded-lg p-4 ml-4">
          <EventList posts={posts} onEventSelect={setSelectedEvent} />
        </main>
      </div>
    </>
  );
}

export default UserDashboard;
