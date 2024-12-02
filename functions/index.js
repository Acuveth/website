const functions = require("firebase-functions"); // Gen 1 Firebase Functions import
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const stripe = require("stripe")(
    "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg",
);

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();
const endpointSecret = "whsec_6uknpsv8kU6uwq9HzfN2wreraTENPEie";

// Helper: Create Stripe Customer ID
const createStripeCustomer = async (userId, email) => {
  const customer = await stripe.customers.create({
    email,
    metadata: {firebaseUID: userId},
  });
  await db
      .collection("users")
      .doc(userId)
      .update({stripeCustomerId: customer.id});
  return customer.id;
};

// Cloud Function to Create Checkout Session
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({error: "Only POST requests are allowed."});
    }

    try {
      const {priceId, userId} = req.body.data;

      const userRef = await db.collection("users").doc(userId).get();
      if (!userRef.exists) {
        return res.status(404).send({error: "User not found."});
      }

      let customerId = userRef.data().stripeCustomerId;
      if (!customerId) {
        customerId = await createStripeCustomer(userId, userRef.data().email);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{price: priceId, quantity: 1}],
        customer: customerId,
        client_reference_id: userId,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });

      res.status(200).send({data: {sessionId: session.id}});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({error: "Failed to create checkout session."});
    }
  });
});

// Stripe Webhook for Events
exports.handleStripeWebhooks = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await handleSubscriptionChange(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("Webhook received successfully.");
});

// Handle Checkout Session Completion
const handleCheckoutSessionCompleted = async (session) => {
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription;

  const userRef = db.collection("users").doc(userId);
  await userRef.set(
      {
        subscriptionStatus: "active",
        stripeSubscriptionId: subscriptionId,
      },
      {merge: true},
  );
};

// Handle Subscription Updates
const handleSubscriptionChange = async (subscription) => {
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const usersRef = db.collection("users");
  const query = await usersRef
      .where("stripeSubscriptionId", "==", subscriptionId)
      .get();

  if (!query.empty) {
    query.forEach(async (doc) => {
      await doc.ref.update({subscriptionStatus: status});
    });
  }
};

// Sync Subscriptions (HTTPS Trigger Instead of Schedule)
exports.syncSubscriptions = functions.https.onRequest(async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list();
    for (const subscription of subscriptions.data) {
      const subscriptionId = subscription.id;
      const status = subscription.status;

      const usersRef = db.collection("users");
      const query = await usersRef
          .where("stripeSubscriptionId", "==", subscriptionId)
          .get();

      if (!query.empty) {
        query.forEach(async (doc) => {
          await doc.ref.update({subscriptionStatus: status});
        });
      }
    }

    res.status(200).send("Subscriptions synced successfully.");
  } catch (error) {
    console.error("Error syncing subscriptions:", error);
    res.status(500).send("Failed to sync subscriptions.");
  }
});

// On User Creation: Add Stripe Customer
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    console.log("Creating Stripe Customer for new user:", user.uid);
    const stripeCustomerId = await createStripeCustomer(user.uid, user.email);
    await db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          stripeCustomerId,
          subscriptionStatus: "none",
        },
        {merge: true},
    );
  } catch (error) {
    console.error("Error in onUserCreate:", error);
  }
});
