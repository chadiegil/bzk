import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section style={{ marginTop: "100px" }}>
      <div className="container">
        <h2>Checkout Successful</h2>
        <p>Thank you for your purchase</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history" style={{ color: "white" }}>
            View Order Status
          </Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
