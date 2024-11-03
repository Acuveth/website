// Dashboard.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavbarLogedin from "./NavbarLogedin";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import SubscriptionPlans from "./Dashboard/SubscriptionPlans";
import UserDashboard from "./Dashboard/UserDashboard";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsSubscribed(true);
  }, [user, isSubscribed]);

  return (
    <>
      <NavbarLogedin />
      {isSubscribed ? (
        <UserDashboard
          posts={posts}
          onNewPromotionClick={() => navigate("/promotion-form")}
        />
      ) : (
        <SubscriptionPlans isSubscribed={isSubscribed} />
      )}
    </>
  );
}

export default Dashboard;
