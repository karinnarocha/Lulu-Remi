"use client";

import Link from "next/link";
import styles from "./Wholesales_button.module.css";

export default function WholesaleSection() {
  return (
    <section className={styles.WholesalesButtonContainer}>
      <div className={styles.WholesalestextContainer}>
        <h2>
          Our Community Partners
          <br />
          We are proud to partner with schools, community centers, synagogues,
          and small businesses that believe in creative learning.
          <br />
          Want to become a wholesale partner? We’d love to work with you.
        </h2>
      </div>

      <Link href="/contact?form=wholesale">
        <button className={styles.WholesalesButton}>
          Wholesale Applications
        </button>
      </Link>
    </section>
  );
}
