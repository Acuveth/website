// SubscriptionPlansPage.js
import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import SubscriptionPlans from "./Dashboard/SubscriptionPlans";
import NavbarLogedin from "./NavbarLogedin";

const SubscriptionPlansPage = () => {
  const { isSubscribed } = useContext(UserContext);

  // Default to 'enkratno' billing cycle and initialize available plans
  const [billingCycle, setBillingCycle] = useState("enkratno");
  const oneTimePlans = [
    // Your one-time plans here
  ];
  const monthlyPlans = [
    // Your monthly plans here
  ];
  const selectedPlans =
    billingCycle === "enkratno" ? oneTimePlans : monthlyPlans;

  // Toggle billing cycle
  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "enkratno" ? "mesečno" : "enkratno"));
  };

  // Subscription action
  const handleSubscribeClick = (plan) => {
    if (!isSubscribed) {
      // Logic for handling subscription (e.g., redirect to payment)
      alert(`Subscribing to ${plan.name}`);
    }
  };

  return (
    <>
      <NavbarLogedin />
      <SubscriptionPlans
        selectedPlans={selectedPlans}
        billingCycle={billingCycle}
        onSubscribeClick={handleSubscribeClick}
        isSubscribed={isSubscribed}
        toggleBillingCycle={toggleBillingCycle}
      />
    </>
  );
};

export default SubscriptionPlansPage;
