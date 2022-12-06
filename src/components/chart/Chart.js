import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import styles from "./Chart.module.scss";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  const arr = [];
  orders.map((item) => {
    const { orderStatus } = item.orderConfig;
    arr.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing",
    "Delivering...",
    "Delivered",
  ];

  const placed = getOrderCount(arr, q1);
  const processing = getOrderCount(arr, q2);
  const delivering = getOrderCount(arr, q3);
  const delivered = getOrderCount(arr, q4);

  const data = {
    labels: ["Place Orders", "Processing", "Delivering", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, delivering, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />;
      </Card>
    </div>
  );
};

export default Chart;
