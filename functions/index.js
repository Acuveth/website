const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(
  "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg" // Replace with your secret key
);

admin.initializeApp();
const db = admin.firestore();

/**
 * Creates a Stripe checkout session for subscription management.
 * @param {Object} data - Data sent from the frontend.
 * @param {string} data.priceId - Stripe Price ID for the subscription.
 * @param {string} data.successUrl - URL to redirect to on successful checkout.
 * @param {string} data.cancelUrl - URL to redirect to if the user cancels.
 * @param {Object} context - Firebase context object.
 * @returns {Object} - The session ID for Stripe checkout.
 */
exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    const { priceId, successUrl, cancelUrl } = data;

    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required."
      );
    }

    const userId = context.auth.uid; // Authenticated user's ID
    const customerId = await getOrCreateCustomer(userId); // Fetch or create Stripe customer

    try {
      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        customer: customerId,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return { sessionId: session.id }; // Return sessionId to the frontend
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to create session."
      );
    }
  }
);

/**
 * Helper function to get or create a Stripe customer.
 * @param {string} userId - Firebase user ID.
 * @returns {string} - Stripe customer ID.
 */
async function getOrCreateCustomer(userId) {
  const userDoc = await db.collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (userData && userData.stripeCustomerId) {
    return userData.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    metadata: { firebaseUID: userId },
  });

  await db
    .collection("users")
    .doc(userId)
    .set({ stripeCustomerId: customer.id }, { merge: true });

  return customer.id;
}

const endpointSecret = "whsec_your_webhook_secret"; // Replace with your secret

/**
 * Handles Stripe webhook events to update subscription data.
 */
exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      endpointSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return res.status(400).send("Webhook Error");
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object;
    const customerId = subscription.customer;

    const userSnapshot = await db
      .collection("users")
      .where("stripeCustomerId", "==", customerId)
      .limit(1)
      .get();

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const subscriptionData = {
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        priceId: subscription.items.data[0].price.id,
      };

      if (event.type === "customer.subscription.deleted") {
        subscriptionData.status = "canceled";
      }

      await userDoc.ref.set(
        { subscription: subscriptionData },
        { merge: true }
      );
    }
  }

  res.status(200).send("Webhook received.");
});

/**
 * Cancels a Stripe subscription for the authenticated user.
 * @param {Object} data - Data sent from the frontend.
 * @param {string} data.subscriptionId - Stripe subscription ID to cancel.
 * @param {Object} context - Firebase context object.
 * @returns {Object} - Confirmation of the cancellation.
 */
exports.cancelSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Authentication required."
    );
  }

  const { subscriptionId } = data;

  if (!subscriptionId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Subscription ID is required."
    );
  }

  try {
    const deletedSubscription = await stripe.subscriptions.del(subscriptionId);

    const userId = context.auth.uid;
    await db
      .collection("users")
      .doc(userId)
      .set(
        {
          subscription: {
            status: "canceled",
          },
        },
        { merge: true }
      );

    return { success: true, deletedSubscription };
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to cancel subscription"
    );
  }
});
