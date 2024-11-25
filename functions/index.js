const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const stripe = require("stripe")(
    "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg",
);

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send(""); // No content
    return;
  }

  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send({error: "Only POST requests are allowed."});
      return;
    }

    try {
      const {priceId} = req.body;

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{price: priceId, quantity: 1}],
        success_url: "http://localhost:3000/success", // Replace with your success URL
        cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
      });

      res.set("Access-Control-Allow-Origin", "*"); // Set CORS header
      res.status(200).send({sessionId: session.id});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({error: "Failed to create checkout session."});
    }
  });
});
