const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(
  "sk_test_51Nbp2BJHLDPnt1PVLLW3s3dA7PRLv8AAs5ucAcWrstgbvP7K8qEY4RclqMVubCOxJt67LXhF2g70SS6MG56ChXKY00fzroQQUg"
); // Replace with your Stripe secret key

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000, // price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Cancel subscription
exports.cancelSubscription = functions.https.onRequest(async (req, res) => {
  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res.status(400).send({ error: "Subscription ID is required" });
  }

  try {
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
    res.status(200).json({ success: true, canceledSubscription });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res.status(500).send({ error: "Failed to cancel subscription" });
  }
});
