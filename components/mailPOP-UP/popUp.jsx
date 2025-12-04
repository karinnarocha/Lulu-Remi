"use client";

import { useState, useEffect } from "react";
import styles from "./popUp.module.css";

export default function PopupSubscribe() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubscribe() {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Thanks for subscribing! 🎉 Check your email for confirmation.");
        setEmail("");
        setShowPopup(false);
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  if (!showPopup) return <div className={styles.hidden}></div>;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>
          ✖
        </button>

        <h2>Join Lulu & Remi’s Newsletter 💜</h2>
        <p>Get new drops, deals & exclusive goodies!</p>

        <input
          type="email"
          className={styles.input}
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.submitBtn} onClick={handleSubscribe}>
          Subscribe
        </button>

        <p className={styles.terms}>
          By subscribing, you agree to our terms & privacy policy.
        </p>
      </div>
    </div>
  );
}
