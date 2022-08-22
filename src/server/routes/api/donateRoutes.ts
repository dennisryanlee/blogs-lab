import * as express from "express";
import Stripe from "stripe";
import { STRIPE_CONFIG } from "../../config";

const donateRouter = express.Router();

const stripe = new Stripe(STRIPE_CONFIG.stripeSecretKey!, { apiVersion: "2020-08-27" });

// Current route is /api/donate

donateRouter.post("/", async (req, res) => {
  const paymentMethod = req.body.paymentMethod.id;
  const amount = req.body.amount;
  try {
    const fulfilled = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount * 100,
      payment_method: paymentMethod,
      confirm: true,
    });

    console.log(fulfilled);
    res.json(fulfilled);
  } catch (error) {
    console.log(`Stripe Error...\n`);
    console.error(error);
    res.status(500).json({ message: `Payment Error` }); // send status of 500
  }
});

export default donateRouter;
