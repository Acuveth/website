import React from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { loadStripe } from "@stripe/stripe-js";

function PlanCard({ plan, isSubscribed }) {
  const functions = getFunctions(); // Access Firebase Functions
  const createCheckoutSession = httpsCallable(
    functions,
    "createCheckoutSession"
  ); // Call your function

  const handleSubscription = async () => {
    try {
      // Call Firebase Function with the priceId of the selected plan
      const { data } = await createCheckoutSession({ priceId: plan.priceId });

      // Initialize Stripe
      const stripe = await loadStripe(
        "pk_test_51Nbp2BJHLDPnt1PV1VsPqfX5BApggvywtQDVFBTh8wuPZG2ZtVN5LQaCjnnf4AvIdtz3jz1IYeApMMutSBsvT51X00a9BLCkYu"
      ); // Replace with your Stripe Publishable Key

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Error during checkout session creation:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  const isGrayOut = () => {
    if (isSubscribed === 0) return false; // No subscription yet
    if (isSubscribed && plan.id === isSubscribed) return true; // Current plan is grayed out
    return false;
  };

  const isUpgrade = () => {
    if (isSubscribed && plan.id > isSubscribed) return true; // Determine if this is an upgrade
    return false;
  };

  const grayOutClass = isGrayOut() ? "opacity-50 pointer-events-none" : "";

  return (
    <div
      className={`py-12 px-4 border hover:border-custom-orange rounded-3xl bg-gray-900 text-white text-center transition-transform transform hover:scale-105 flex flex-col justify-between ${grayOutClass}`}
    >
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
        className="w-full py-3 rounded-xl font-semibold bg-custom-orange hover:bg-custom-orange-dark-20 text-white transition-colors duration-300"
        disabled={isGrayOut()} // Disable the button for grayed-out plans
      >
        {isGrayOut()
          ? "Current Plan"
          : isUpgrade()
          ? "Upgrade Plan"
          : "Subscribe Now"}
      </button>
    </div>
  );
}

export default PlanCard;
