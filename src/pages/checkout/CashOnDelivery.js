import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CashOnDeliveryCheckoutForm from "../../components/checkoutForm/CashOnDeliveryCheckoutForm";

const CashOnDelivery = () => {
  const [message, setMessage] = useState("initializing checkout...");

  const secret_pk =
    "pk_test_51Lav6mAUMduYiRucrMjHwRFMYAIcdMeV6h7mcWMoVjck0NLuQb0wCrzCBaA2SB3bFLTw28i59s2KSd27RLhI9qBA00XiTDAUYW";

  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  const stripePromise = loadStripe(secret_pk);
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);
  const shippingAddress = useSelector(selectShippingAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL);
    dispatch(CALCULATE_TOTAL_QUANTITY);
  }, [dispatch, cartItems]);

  const description = `Bazak foopark payment: email: ${customerEmail}, amount: ${totalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    // http://localhost:4242/create-payment-intent
    // https://bazak-food-park.herokuapp.com
    fetch("https://bazak-food-park.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialized checkout");
        toast.error("Something went wrong!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div style={{ marginTop: "85px" }}>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CashOnDeliveryCheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default CashOnDelivery;
