"use client";

import styles from "./SeeDetailButton.module.css";

export default function SeeDetailButton({ onClick }) {
  return (
    <button className={styles.seeDetailButton} onClick={onClick}>
      See Details
    </button>
  );
}
