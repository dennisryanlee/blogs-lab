import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Validation from "../server/Utils/DataValidation";

const Donate = (props: Types.DonateProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // stop execution if:  stripe failed to load stripe or elements, a negative number was entered for amount, or if there is nothing entered for the name
    if (!stripe || !elements || Number(amount) < 0 || !name) return;

    const cardData = elements.getElement(CardElement); // gets the card Data the user has entered

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardData,
      billing_details: {
        name,
      },
    });

    if (error) {
      console.log("There was an error: ", error);
    } else {
      console.log("Payment method: ", paymentMethod);
      const res = await fetch("/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, paymentMethod }),
      });

      const paymentResults = await res.json();
      console.log("payment results: ", paymentResults);

      // navigate to receipt page here
      props.navToPaymentReceiptPage();
      // send email with confirmation?
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 ">
            <form className="form-group p-3 border rounded-lg">
              <input type="text" placeholder="Donation Recipient" className="form-control my-2" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Donation Amount" className="form-control my-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
