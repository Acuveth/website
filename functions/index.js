const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret); // Add your Stripe secret key in Firebase environment config

exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    const { priceId } = data;
    const uid = context.auth?.uid; // Ensure the user is authenticated

    if (!uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${functions.config().frontend.url}/success`,
        cancel_url: `${functions.config().frontend.url}/cancel`,
        metadata: { uid },
      });

      return { sessionId: session.id };
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError(
        "unknown",
        "Failed to create checkout session"
      );
    }
  }
);
