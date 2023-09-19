const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
const stripeController = async (req, res) => {
  const { price } = req.body;
  const calculateOrderAmount = (items) => {
    return price * 100;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  //   console.log(paymentIntent);
  res.send({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
