const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
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

      console.log("Full request body:", req.body);
      console.log("Received priceId:", req.body?.data?.priceId);
      console.log("Received userId:", req.body?.data?.userId);

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
      res.status(200).send({ data: { sessionId: session.id } });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res
        .status(500)
        .send({ data: { error: "Failed to create checkout session." } });
    }
  });
});

admin.initializeApp();

exports.handleStripeWebhooks = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "whsec_6uknpsv8kU6uwq9HzfN2wreraTENPEie";

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionChange(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("Webhook received successfully.");
});

const handleCheckoutSessionCompleted = async (session) => {
  const userId = session.client_reference_id; // Firebase UID passed during session creation
  const subscriptionId = session.subscription; // Stripe subscription ID

  // Update user's subscription status in Firestore
  const userRef = admin.firestore().collection("users").doc(userId);
  await userRef.set(
    {
      subscriptionStatus: "active",
      stripeSubscriptionId: subscriptionId,
    },
    { merge: true }
  );
};

const handleSubscriptionChange = async (subscription) => {
  const subscriptionId = subscription.id;
  const status = subscription.status; // e.g., "active", "canceled", "past_due"

  // Query Firestore to find the user by Stripe subscription ID
  const usersRef = admin.firestore().collection("users");
  const query = await usersRef
    .where("stripeSubscriptionId", "==", subscriptionId)
    .get();

  if (!query.empty) {
    query.forEach(async (doc) => {
      // Update subscription status for the user
      await doc.ref.update({ subscriptionStatus: status });
    });
  }
};

exports.createBillingPortalSession = functions.https.onCall(
  async (data, context) => {
    const { stripeCustomerId } = data;

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: "http://localhost:3000/settings",
    });

    return { url: session.url };
  }
);

exports.syncSubscriptions = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const subscriptions = await stripe.subscriptions.list();

    subscriptions.data.forEach(async (subscription) => {
      const subscriptionId = subscription.id;
      const status = subscription.status;

      const usersRef = admin.firestore().collection("users");
      const query = await usersRef
        .where("stripeSubscriptionId", "==", subscriptionId)
        .get();

      if (!query.empty) {
        query.forEach(async (doc) => {
          await doc.ref.update({ subscriptionStatus: status });
        });
      }
    });
  });
