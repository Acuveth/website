// SubscriptionPlans.js
import React, { useState } from "react";
import PlanCard from "./PlanCard";
import BillingCycleToggle from "./BillingCycleToggle";

function SubscriptionPlans({ isSubscribed }) {
  const [billingCycle, setBillingCycle] = useState("mesečno");

  const monthlyPlans = [
    {
      name: "Osnovni paket",
      price: 50,
      features: [
        "Neomejeno objav in zgodb",
        "Napredna analitika promocij",
        "Prednostna podpora za stranke",
      ],
    },
    {
      name: "Napredni paket",
      price: 75,
      features: [
        "Neomejeno objav in zgodb",
        "Promocija s promotorji",
        "Napredna analitika promocij",
        "Razširjena podpora za stranke",
      ],
    },
    {
      name: "Premium paket",
      price: 150,
      features: [
        "Neomejeno objav in zgodb",
        "Promocija s promotorji",
        "Promocija dogodkov s content teamom",
        "Dedicirana oseba samo za vas",
        "Napredna analitika promocij",
        "Popolna podpora za stranke",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-10 text-white">
      <h2 className="text-4xl font-bold text-center mb-8">Naroči se</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {monthlyPlans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            billingCycle={billingCycle}
            isSubscribed={isSubscribed}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;
