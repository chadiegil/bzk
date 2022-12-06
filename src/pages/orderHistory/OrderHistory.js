import React from "react";
import styles from "./OrderHistory.module.scss";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../customHooks/useFetchCollection";

const OrderHistory = () => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useFetchCollection("orders");

  // const getCollection = () => {
  //   setIsLoading(true);
  //   try {
  //     const docRef = collection(db, "orders");
  //     const q = query(docRef);

  //     onSnapshot(q, (snapShot) => {
  //       const allData = snapShot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setData(allData);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getCollection();
  // }, []);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };
  console.log(orders);

  console.log(userID);

  const filteredOrders = orders.filter(
    (order) => order.orderConfig.userId === userID
  );

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Order History</h2>
        <p>
          Open an order to leave a <strong>Product Review</strong>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
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
                  {filteredOrders.map((order, index) => {
                    const { orderDate, orderTime, orderAmount, orderStatus } =
                      order.orderConfig;
                    console.log(orderStatus);
                    const { id } = order;
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
    </section>
  );
};

export default OrderHistory;
