import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>Oppppp, Page not Found</p>
        <button className="--btn --btn-primary">
          <Link to="/" style={{ color: "white" }}>
            &larr; Back to Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
