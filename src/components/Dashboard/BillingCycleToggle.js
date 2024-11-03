// BillingCycleToggle.js
import React from "react";

function BillingCycleToggle({ billingCycle, onToggle }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="font-semibold text-white">Obdobje:</span>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg ${
          billingCycle === "enkratno"
            ? "bg-green-600 text-white"
            : "bg-gray-800"
        }`}
      >
        Enkratno
      </button>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg ${
          billingCycle === "mesečno" ? "bg-green-600 text-white" : "bg-gray-700"
        }`}
      >
        Mesečno
      </button>
    </div>
  );
}

export default BillingCycleToggle;
