import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.gif";
import { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; back to orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <strong>Order ID</strong>: {order.id}
            </p>
            <p>
              <strong>Order Amount</strong>: {order.orderConfig.orderAmount}
            </p>
            <p>
              <strong>Order Status</strong>: {order.orderConfig.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.orderConfig.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>
                        <p className={styles.product}>
                          <strong>{name}</strong>
                          <br />
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </p>
                      </td>
                      <td>{`₱${price.toLocaleString()}`}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icon}>
                        <button className="--btn --btn-primary">
                          <Link
                            to={`/review-product/${id}`}
                            style={{ color: "white" }}
                          >
                            Review Product
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
