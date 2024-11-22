import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "./EventList";
import StatsPanel from "./StatsPanel";
import FormObjava from "../Forms/FormObjava";
import FormStory from "../Forms/FormStory";
import FormWIR from "../Forms/FormWIR";
import FormPromotorji from "../Forms/FormPromotorji";
import Settings from "../Settings";
import NavbarLogedin from "../NavbarLogedin";
import SubscriptionPlans from "./SubscriptionPlans";
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
import {
  FiGrid,
  FiEdit,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiSettings,
  FiClipboard,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

function UserDashboard({ isSubscribed }) {
  const [posts, setPosts] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(
    isSubscribed === 0 ? "plans" : "dashboard" // Default tab based on subscription
  );
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true); // State to toggle navbar width

  const features = [
    { name: "Dashboard", key: "dashboard", icon: <FiGrid />, restricted: true },
    {
      name: "Naroči Objavo",
      key: "form-objava",
      icon: <FiEdit />,
      restricted: true,
    },
    {
      name: "Naroči Story",
      key: "form-story",
      icon: <FiFileText />,
      restricted: true,
    },
    {
      name: "Naroči Promotorje",
      key: "form-promotorji",
      icon: <FiUsers />,
      restricted: true,
    },
    {
      name: "Naroči Week in Review",
      key: "form-wir",
      icon: <FiCalendar />,
      restricted: true,
    },
    {
      name: "Pregled Planov",
      key: "plans",
      icon: <FiClipboard />,
      restricted: false,
    },
    {
      name: "Nastavitve",
      key: "settings",
      icon: <FiSettings />,
      restricted: false,
    },
  ];

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

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log("Subscribed status " + isSubscribed);
    if (currentUser) {
      setCurrentUserId(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (currentUserId) {
        const userPosts = await fetchUserPosts(currentUserId);
        setPosts(userPosts);

        const grouped = groupPostsByDate(userPosts);
        setGroupedPosts(grouped);
      }
    };

    loadUserPosts();
  }, [currentUserId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1536) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler immediately to set initial state
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavbarLogedin
        onFeatureSelect={setSelectedFeature}
        selectedFeature={selectedFeature}
        features={features}
      />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
        {/* Left Sidebar: Navbar and Forms */}
        <aside
          className={`hidden md:block relative ${
            isExpanded ? "w-1/6" : "w-22"
          } bg-gray-900 p-4 border-r border-gray-700 transition-all duration-300`}
        >
          <div
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 p-1 rounded-full cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <FiChevronLeft className="text-white text-xl" />
            ) : (
              <FiChevronRight className="text-white text-xl" />
            )}
          </div>
          <nav className="flex flex-col space-y-4">
            {/* Top Section */}
            <div>
              <button
                onClick={() => {
                  if (!isSubscribed) return; // Prevent navigation if unsubscribed
                  setSelectedFeature("dashboard");
                  setSelectedEvent(null);
                }}
                className={`w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold ${
                  selectedFeature === "dashboard"
                    ? "bg-gray-700"
                    : "bg-gray-900 hover:bg-gray-700"
                } ${!isSubscribed ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FiGrid />
                {isExpanded && <span>Dashboard</span>}
              </button>
            </div>

            {/* Middle Section: Forms */}
            <div>
              <h3
                className={`${
                  isExpanded ? "text-sm font-bold text-gray-400 px-4" : "hidden"
                }`}
              >
                Objave
              </h3>
              {features
                .filter((feature) =>
                  [
                    "form-objava",
                    "form-story",
                    "form-promotorji",
                    "form-wir",
                  ].includes(feature.key)
                )
                .map((feature) => (
                  <button
                    key={feature.key}
                    onClick={() => {
                      if (!isSubscribed) return; // Prevent navigation if unsubscribed
                      setSelectedFeature(feature.key);
                      setSelectedEvent(null);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold ${
                      selectedFeature === feature.key
                        ? "bg-gray-700"
                        : "bg-gray-900 hover:bg-gray-700"
                    } ${!isSubscribed ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {feature.icon}
                    {isExpanded && <span>{feature.name}</span>}
                  </button>
                ))}
            </div>

            {/* Bottom Section: Plans and Settings */}
            <div>
              <h3
                className={`${
                  isExpanded ? "text-sm font-bold text-gray-400 px-4" : "hidden"
                }`}
              >
                Nastavitve
              </h3>
              {features
                .filter((feature) =>
                  ["plans", "settings"].includes(feature.key)
                )
                .map((feature) => (
                  <button
                    key={feature.key}
                    onClick={() => {
                      setSelectedFeature(feature.key);
                      setSelectedEvent(null);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center space-x-2 rounded-lg font-semibold ${
                      selectedFeature === feature.key
                        ? "bg-gray-700"
                        : "bg-gray-900 hover:bg-gray-700"
                    }`}
                  >
                    {feature.icon}
                    {isExpanded && <span>{feature.name}</span>}
                  </button>
                ))}
            </div>
          </nav>
        </aside>

        {/* Middle Content: Dynamic Content */}
        <main className="flex-1 p-4">
          {selectedFeature === "dashboard" && (
            <EventList
              groupedPosts={groupedPosts}
              onEventSelect={setSelectedEvent}
            />
          )}
          {selectedFeature === "form-objava" && <FormObjava />}
          {selectedFeature === "form-story" && <FormStory />}
          {selectedFeature === "form-promotorji" && <FormPromotorji />}
          {selectedFeature === "form-wir" && <FormWIR />}
          {selectedFeature === "settings" && <Settings />}
          {selectedFeature === "plans" && (
            <SubscriptionPlans isSubscribed={isSubscribed} />
          )}
        </main>

        {/* Right Sidebar: Stats Panel */}
        {selectedEvent && (
          <aside className="hidden lg:block lg:w-1/4 bg-gray-900 p-4">
            <StatsPanel
              selectedEvent={selectedEvent}
              isSubscribed={isSubscribed}
              posts={posts}
            />
          </aside>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
