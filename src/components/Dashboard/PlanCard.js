// PlanCard.js
import React from "react";

function PlanCard({ plan, billingCycle, isSubscribed }) {
  // Conditionally disable the button if the user is already subscribed
  const isDisabled = isSubscribed && billingCycle === "enkratno";

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-8 text-center transform transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
      <p className="text-3xl font-extrabold text-purple-400 mb-4">
        {plan.price} ETH
        <span className="block text-sm text-gray-400 mt-1">
          / {billingCycle === "mesečno" ? "month" : "year"}
        </span>
      </p>
      <ul className="text-left text-gray-300 mb-6 space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => !isDisabled && alert(`Subscribed to ${plan.name}`)}
        className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
        disabled={isDisabled}
      >
        {isDisabled ? "Že naročen" : "Uredi naročnino"}
      </button>
    </div>
  );
}

export default PlanCard;
