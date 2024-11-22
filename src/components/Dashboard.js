import React, { useState, useEffect, useContext } from "react";
import NavbarLogedin from "./NavbarLogedin";
import { UserContext } from "../context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./dashboard/UserDashboard";

function Dashboard() {
  const [isSubscribed, setIsSubscribed] = useState(null); // Set to null initially
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsSubscribed(userData.isSubscribed || 0);
        } else {
          console.error("User data not found!");
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  // Redirect to the "Pregled Planov" tab if the user is not subscribed
  useEffect(() => {
    if (isSubscribed === 0) {
      navigate("/dashboard?tab=plans");
    }
  }, [isSubscribed, navigate]);

  return (
    <>
      {isSubscribed === null ? ( // Show a loading state while fetching the subscription status
        <div className="text-white text-center mt-10">Loading...</div>
      ) : (
        <UserDashboard isSubscribed={isSubscribed} />
      )}
    </>
  );
}

export default Dashboard;
