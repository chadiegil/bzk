import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  console.log(order);
  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), { orderConfig });
      toast.success("Order Status Change!");
      setIsLoading(false);
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card cardClass={styles.card}>
        <h4>Update Order Status</h4>
        <form onSubmit={(e) => editOrder(e, id)}>
          <span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" disabled>
                --choose one--
              </option>
              <option value="Order Placed..">Order Placed...</option>
              <option value="Processing">Processing</option>
              <option value="Delivering...">Delivering..</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <button type="submit" className="--btn --btn-primary">
              Update Status
            </button>
          </span>
        </form>
      </Card>
    </>
  );
};

export default ChangeOrderStatus;
