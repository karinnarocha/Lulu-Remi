"use client";

import styles from "./BuyButton.module.css";

export default function BuyButton({ onClick }) {
  return (
    <button className={styles.BuyNowButton} onClick={onClick}>
      Buy Now
    </button>
  );
}
