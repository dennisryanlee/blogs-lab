import * as React from "react";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Fetcher from "../Client_Utils/Fetch_Service";

//todo - ask for email on payment - use mailgun to send the receipt url

const Donate = () => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const nav = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // stop execution if:  stripe failed to load stripe or elements, a negative number was entered for amount,
    // or if there is nothing entered for the name
    if (!stripe || !elements || Number(amount) < 0 || !name) return;

    const cardData = elements.getElement(CardElement); // gets the card Data the user has entered

    // pass in the cardData, and from the return, destructure the error and paymentMethod for later use
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardData!,
      billing_details: {
        name,
      },
    });

    // if there was an error with createPaymentMethod, log it
    if (error) {
      console.log(`Create Payment Method Error...\n`);
      console.error(error);
    } else {
      // if there was no error, log the paymentMethod
      // console.log("Payment method: ", paymentMethod);

      // fetch '/donate' with a POST req and include amount and paymentMethod in the body

      Fetcher.POST("/donate", { amount, paymentMethod: paymentMethod })
        .then((data) => {
          const receipt = data.charges.data[0].receipt_url;
          nav(`/receipt`, {
            state: {
              receipt,
            },
          });
        })
        .catch((error) => {
          console.log(`Posting Payment Error...\n`);
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 ">
            <form className="form-group p-3 border rounded-lg">
              <input
                type="text"
                placeholder="Donation Recipient"
                className="form-control my-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Donation Amount"
                className="form-control my-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <CardElement className="form-control" />
              <button onClick={handleSubmit} className="btn btn-primary my-2">
                Donate!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
