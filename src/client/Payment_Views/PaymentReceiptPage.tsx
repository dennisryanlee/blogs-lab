import * as React from "react";
import { useLocation } from "react-router-dom";

const PaymentReceiptPage = () => {
  const loc = useLocation();

  const { receipt } = loc.state as ReceiptLocState;
  return (
    <>
      <div>
        <div className="text-center">
          Thanks for donating! Your receipt can be found <a href={receipt}>here</a>.
        </div>
      </div>
    </>
  );
};

interface ReceiptLocState {
  receipt: string;
}

export default PaymentReceiptPage;
