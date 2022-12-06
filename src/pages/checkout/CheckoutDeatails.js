import { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./CheckoutDetails.module.scss";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDeatails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        {/* <h2 style={{ textAlign: "center" }}>Checkout Details</h2> */}
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Delivery Address</h3>
              <label>Recipient name: </label>
              <input
                type="text"
                placeholder="Recipient name"
                name="name"
                required
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address</label>
              <input
                type="text"
                placeholder="Address line 1"
                name="line1"
                required
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                required
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
              <div className={styles.checkoutBtn}>
                <button type="submit" className="--btn --btn-primary">
                  Pay with Card
                </button>
                <button type="submit" className="--btn --btn-primary">
                  <Link to="/cash-on-delivery" style={{ color: "white" }}>
                    Cash oh Delivery
                  </Link>
                </button>
              </div>
            </Card>
          </div>
          <Card cardClass={styles.card}>
            <CheckoutSummary />
          </Card>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDeatails;
