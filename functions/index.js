const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(
  "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg"
);

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Only POST requests are allowed." });
    }

    try {
      const { priceId, userId } = req.body.data;

      console.log("Received priceId:", priceId);
      console.log("Received userId:", userId);

      if (!priceId || !userId) {
        return res
          .status(400)
          .send({ error: "Price ID and User ID are required." });
      }

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        client_reference_id: userId, // Pass the user's Firebase UID here
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });

      console.log("Checkout session created successfully:", session);
      res.status(200).send({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({ error: "Failed to create checkout session." });
    }
  });
});

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_..."); // Use your secret key

exports.stripeWebhook = functions.https.onRequest((req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      "whsec_your_webhook_secret" // Replace with your webhook secret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Retrieve the client_reference_id (userId) and subscriptionId
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription;

    console.log(`Checkout session completed for userId: ${userId}`);

    if (!userId || !subscriptionId) {
      console.error("Missing userId or subscriptionId in session");
      return res.status(400).send("Invalid session data");
    }

    // Update Firestore
    admin
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        subscriptionStatus: "active",
        subscriptionId: subscriptionId,
        checkoutSessionId: session.id,
      })
      .then(() => {
        console.log(`User ${userId} updated successfully.`);
        res.status(200).send("Webhook processed");
      })
      .catch((err) => {
        console.error(`Failed to update user ${userId}:`, err);
        res.status(500).send("Error updating user");
      });
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    res.status(400).send("Unhandled event type");
  }
});
