import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList";
import StatsPanel from "./StatsPanel";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

function UserDashboard() {
  const [posts, setPosts] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const fetchUserPosts = async (userId) => {
    const collections = ["objave", "promoters", "stories", "week_in_review"];
    const allPosts = [];

    for (const collectionName of collections) {
      const colRef = collection(db, collectionName);
      const q = query(
        colRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        allPosts.push({ id: doc.id, ...doc.data(), type: collectionName });
      });
    }

    allPosts.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
    return allPosts;
  };

  const groupPostsByDate = (posts) => {
    return posts.reduce((acc, post) => {
      const date = new Date(
        post.createdAt?.seconds * 1000
      ).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(post);
      return acc;
    }, {});
  };

  const fetchSubscriptionStatus = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setIsSubscribed(userData.isSubscribed && userData.isSubscribed !== 0);
      } else {
        console.error("User data not found!");
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setCurrentUserId(currentUser.uid);
      fetchSubscriptionStatus(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (currentUserId) {
        const userPosts = await fetchUserPosts(currentUserId);
        setPosts(userPosts);

        // Group posts by date
        const grouped = groupPostsByDate(userPosts);
        setGroupedPosts(grouped);
      }
    };

    loadUserPosts();
  }, [currentUserId]);

  return (
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
        <EventList
          groupedPosts={groupedPosts}
          onEventSelect={setSelectedEvent}
        />
      </main>
    </div>
  );
}

export default UserDashboard;
