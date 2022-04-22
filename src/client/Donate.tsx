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

    // stop execution if:  stripe failed to load stripe or elements, a negative number was entered for amount,
    // or if there is nothing entered for the name
    if (!stripe || !elements || Number(amount) < 0 || !name) return;

    const cardData = elements.getElement(CardElement); // gets the card Data the user has entered

    // pass in the cardData, and from the return, destructure the error and paymentMethod for later use
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardData,
      billing_details: {
        name,
      },
    });

    // if there was an error with createPaymentMethod, log it
    if (error) {
      console.log("There was an error: ", error);
    } else {
      // if there was no error, log the paymentMethod
      console.log("Payment method: ", paymentMethod);

      // fetch '/donate' with a POST req and include amount and paymentMethod in the body
      fetch("/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, paymentMethod: paymentMethod }),
      })
        .then((res) => {
          // then with that response
          res.json().then((data) => {
            // parse as JSON data, then with that data
            console.log(data);
            if (res.ok) {
              // if there was an OK response
              // navigate to receipt page here
              props.navToPaymentReceiptPage();
            } else {
              // if there was not an OK response
              throw new Error(data.message); // throw a new error
            }
          });
        })
        .catch((error) => console.log(error));
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
