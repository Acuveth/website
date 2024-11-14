import React from "react";

function PlanCard({ plan, billingCycle, isSubscribed }) {
  // Conditionally disable the button if the user is already subscribed
  const isDisabled = isSubscribed && billingCycle === "enkratno";

  return (
    <div className="py-12 px-4 border hover:border-custom-orange rounded-lg bg-gray-800 text-white text-center transition-transform transform hover:scale-105 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
        <div className="flex justify-center items-baseline mb-4">
          <span className="text-4xl font-bold text-white">{plan.price}€</span>
          <span className="text-lg text-gray-400"> / mesec</span>
        </div>

        <ul className="mb-6 space-y-6 text-gray-300 text-left">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => !isDisabled && alert(`Subscribed to ${plan.name}`)}
        className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-custom-orange hover:bg-custom-orange-dark-20 text-white"
        }`}
        disabled={isDisabled}
      >
        {isDisabled ? "Že naročen" : "Uredi naročnino"}
      </button>
    </div>
  );
}

export default PlanCard;
