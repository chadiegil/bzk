import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Loader from "../../loader/Loader";
import styles from "./Orders.module.scss";

const Orders = () => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data } = useFetchCollection("orders");

  // const orders = useSelector(selectOrderHistory);

  const handleClick = (id) => {
    navigate(`/admin/orders-details/${id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <>
          <h2>Order History</h2>
          <p>
            Open an order to <strong>Change order status</strong>
          </p>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {data.length === 0 ? (
              <p>No Order Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order, index) => {
                    const { orderDate, orderTime, orderAmount, orderStatus } =
                      order.orderConfig;
                    const { id } = order;
                    console.log(orderStatus);
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"₱"}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
