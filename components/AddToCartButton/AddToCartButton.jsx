"use client"; // because it handles an onClick event

import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({ onClick }) {
  return (
    <div className={styles.addToCartButton} onClick={onClick}>
      Add to Cart
    </div>
  );
}
