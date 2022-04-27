import * as React from "react";
import * as Types from "../types";

const PaymentReceiptPage = (props: Types.PaymentReceiptPage) => {
  console.log(props);
  return (
    <>
      <div>
        <div className="text-center">
          Thanks for donating! This will look prettier once I ask Andrew how to pass over that payment object and get that nice url
        </div>
      </div>
    </>
  );
};

export default PaymentReceiptPage;
