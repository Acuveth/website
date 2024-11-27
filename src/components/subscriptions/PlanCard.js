import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";

function PlanCard({ plan, userId }) {
  const functions = getFunctions(); // Access Firebase Functions
  const db = getFirestore(); // Access Firestore
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [isSubscribed, setIsSubscribed] = useState(0); // Default: not subscribed

  // Fetch subscription status from Firestore
  useEffect(() => {
    console.log();
    if (!userId) return;

    const fetchSubscriptionStatus = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          console.log("Fetched user data:", userData);
          setIsSubscribed(
            userData.subscriptionStatus === "active" ? plan.id : 0
          ); // Adjust based on your subscription logic
        } else {
          console.error("User document not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error.message);
      }
    };

    fetchSubscriptionStatus();
  }, [userId, db, plan.id]);

  const createCheckoutSession = httpsCallable(
    functions,
    "createCheckoutSession"
  ); // Call your function

  const handleSubscription = async () => {
    console.log("Price id frontend:", plan.priceId);
    console.log("User id frontend:", currentUser.uid);
    try {
      // Call Firebase Function with the priceId of the selected plan and userId
      const { data } = await createCheckoutSession({
        priceId: plan.priceId,
        userId: currentUser.uid,
      });
      console.log("Checkout session response:", data);

      if (!data || !data.sessionId) {
        console.error("Invalid response from createCheckoutSession:", data);
        alert("An error occurred while creating the checkout session.");
        return;
      }

      // Initialize Stripe
      const stripe = await loadStripe(
        "pk_test_51Nbp2BJHLDPnt1PV1VsPqfX5BApggvywtQDVFBTh8wuPZG2ZtVN5LQaCjnnf4AvIdtz3jz1IYeApMMutSBsvT51X00a9BLCkYu"
      ); // Replace with your Stripe Publishable Key

      if (!stripe) {
        alert("Stripe initialization failed. Please try again.");
        return;
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error.message);
        alert("An error occurred during Stripe checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error.message);
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
        className={`w-full py-3 rounded-xl font-semibold ${
          isGrayOut()
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-custom-orange hover:bg-custom-orange-dark-20"
        } text-white transition-colors duration-300`}
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
