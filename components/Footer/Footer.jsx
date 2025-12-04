import Link from "next/link";
import styles from "./Footer.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Footer() {

  async function handleSubscribe() {
  const email = document.querySelector(`.${styles.NewsletterInput}`).value;

  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();
  if (result.success) {
    alert("Thanks for subscribing! 🎉 Check your email for confirmation.");
  } else {
    alert("Failed to subscribe. Please try again.");
  }
}

  return (
    <footer className={styles.FooterContainer}>
      <div className={styles.SubscribeSection}>
        <h3>Join Lulu&Remi’s newsletter! <br></br>Be first to know about new drops & deals.</h3>
        <input type="email" className={styles.NewsletterInput} />
        <button onClick={handleSubscribe} className={styles.SubscribeButton}>Subscribe</button>
        <p className={styles.TermsText}>
          By subscribing, you acknowledge that you have read & agree to
          Lulu&Remi’s terms of use & privacy policy.
        </p>
      </div>
      <div className={styles.footerSupportLinks}>
        <div className={styles.supportLinks}>
          <h2>Support</h2>
          <Link href="/About" className={styles.TermsText}>
            About Us
          </Link>
          <Link href="/Contact" className={styles.TermsText}>
            Contact Us
          </Link>
        </div>
        <div className={styles.SocialContent}>
          <a href="https://www.instagram.com/lulunremi/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61582515611200" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
