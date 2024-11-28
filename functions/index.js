const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const stripe = require("stripe")(
    "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg",
);

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({error: "Only POST requests are allowed."});
    }

    try {
      const {priceId, userId} = req.body.data;

      console.log("Full request body:", req.body);
      console.log("Received priceId:", req.body?.data?.priceId);
      console.log("Received userId:", req.body?.data?.userId);

      console.log("Received priceId:", priceId);
      console.log("Received userId:", userId);

      if (!priceId || !userId) {
        return res
            .status(400)
            .send({error: "Price ID and User ID are required."});
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
      res.status(200).send({sessionId: session.id});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).send({error: "Failed to create checkout session."});
    }
  });
});
