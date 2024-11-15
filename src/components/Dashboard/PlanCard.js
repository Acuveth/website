import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your Stripe publishable key

function PlanCard({ plan }) {
  const handleSubscription = async () => {
    try {
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: plan.priceId, // Use the specific Price ID for the plan
            quantity: 1,
          },
        ],
        mode: "subscription", // Use 'subscription' for recurring payments
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        console.error("Stripe error:", error.message);
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return (
    <div className="py-12 px-4 border hover:border-custom-orange rounded-lg bg-gray-900 text-white text-center transition-transform transform hover:scale-105 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
        <div className="flex justify-center items-baseline mb-4">
          <span className="text-4xl font-bold text-white">{plan.price}€</span>
          <span className="text-lg text-gray-400"> / mesec</span>
        </div>
      </div>
      <ul className="mb-6 space-y-6 text-gray-300 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center justify-center space-x-2">
            <span className="text-green-500">✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscription}
        className="w-full py-3 rounded-md font-semibold bg-custom-orange hover:bg-custom-orange-dark-20 text-white transition-colors duration-300"
      >
        Subscribe Now
      </button>
    </div>
  );
}

export default PlanCard;
