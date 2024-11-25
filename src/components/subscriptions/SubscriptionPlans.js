import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";

function SubscriptionPlans({ isSubscribed }) {
  const [billingCycle, setBillingCycle] = useState("mesečno");

  const monthlyPlans = [
    {
      id: 1, // Identifier for plan
      name: "Osnovni paket",
      price: 30,
      features: [
        "Neomejeno objav in zgodb",
        "Napredna analitika promocij",
        "Prednostna podpora za stranke",
      ],
      productId: "prod_RDzO4pZbNU2lzK",
      priceId: "price_1QLXPLJHLDPnt1PV3cQTCkVr",
    },
    {
      id: 2,
      name: "Napredni paket",
      price: 40,
      features: [
        "Neomejeno objav in zgodb",
        "Promocija s promotorji",
        "Napredna analitika promocij",
        "Razširjena podpora za stranke",
      ],
      productId: "prod_RDzO0Z1eXjQzcD",
      priceId: "price_1QLXPZJHLDPnt1PVecETfyB9",
    },
    {
      id: 3,
      name: "Premium paket",
      price: 50,
      features: [
        "Neomejeno objav in zgodb",
        "Promocija s promotorji",
        "Promocija dogodkov s content teamom",
        "Dedicirana oseba samo za vas",
        "Napredna analitika promocij",
        "Popolna podpora za stranke",
      ],
      productId: "prod_RDzOrgDbOvGOWy",
      priceId: "price_1QLXPnJHLDPnt1PVJJktNvWi",
    },
  ];

  useEffect(() => {
    console.log(isSubscribed);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Naroči se
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {monthlyPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSubscribed={isSubscribed} // Pass subscription status
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;
