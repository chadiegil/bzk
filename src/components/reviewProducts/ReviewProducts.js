import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/config";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import spinnerImg from "../../assets/spinner.gif";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const { document } = useFetchDocument("products", id);

  console.log(products);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), { reviewConfig });
      toast.success("Review Submitted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        {product === null ? (
          <img src={spinnerImg} alt="loading..." width={50} />
        ) : (
          <>
            <p>
              <strong>Product name</strong>: {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "200px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating...</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              cols="30"
              row="10"
              required
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
