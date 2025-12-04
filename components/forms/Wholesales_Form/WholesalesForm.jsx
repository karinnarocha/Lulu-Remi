"use client";
import Image from "next/image";
import styles from "./Wholesales.module.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default function WholesalesForm() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      businessName: event.target.businessName.value,
      contactName: event.target.contactName.value,
      email: event.target.email.value,
      websiteOrInstagram: event.target.websiteOrInstagram.value,
      businessType: event.target.businessType.value,
      resaleCertificate: event.target.resaleCertificate.value,
      message: event.target.message.value,
      agreeTerms: event.target.agreeTerms.checked,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Wholesale form sent successfully!");
      event.target.reset();
    } else {
      alert("Failed to send form. Please try again later.");
    }
  }

  return (
    <section className={styles.ContactPageContainer}>
      <div className={styles.ContatoTextContainer}>
        <Image
          src="/images/luluRemiBlack.PNG"
          alt="Lulu & Remi Logo"
          className={styles.LogoContactPage}
          width={400}
          height={400}
          priority
        />
        <h1 className={styles.ContactPageCTA}>WHOLESALES</h1>
        <p className={styles.ContanctPageText}>
          Let’s build this sticker community together! <br />
          If you own a retail store, online shop, or are a distributor interested in carrying Lulu & Remi products, we'd love to hear from you! <br />
          Please fill out the form below with your business details and resale information, and our team will get back to you promptly. <br />
          Let's make the world stickier, one sticker at a time!
        </p>
      </div>

      {/* Right Side Form */}
      <form className={`${styles.ContactForm} container my-4`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input type="text" id="businessName" className={`form-control ${styles.InputContainer}`} required />
        </div>

        <div className="form-group">
          <label htmlFor="contactName">Contact Name</label>
          <input type="text" id="contactName" className={`form-control ${styles.InputContainer}`} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={`form-control ${styles.InputContainer}`} required />
        </div>

        <div className="form-group">
          <label htmlFor="websiteOrInstagram">Website or Instagram (proof of business)</label>
          <input type="text" id="websiteOrInstagram" className={`form-control ${styles.InputContainer}`} />
        </div>

        <div className="form-group">
          <label htmlFor="businessType">Business Type</label>
          <select id="businessType" className={`form-control ${styles.InputContainer}`} required>
            <option value="">Select one</option>
            <option value="Retail Store">Retail Store</option>
            <option value="Online Shop">Online Shop</option>
            <option value="Distributor">Distributor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="resaleCertificate">Resale Certificate or Tax ID</label>
          <input type="text" id="resaleCertificate" className={`form-control ${styles.InputContainer}`} />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / How Did You Hear About Us?</label>
          <textarea id="message" rows="3" className={`form-control ${styles.InputContainer}`}></textarea>
        </div>

        <div className="form-group form-check my-3">
          <input type="checkbox" id="agreeTerms" className="form-check-input" required />
          <label htmlFor="agreeTerms" className="form-check-label">
            I agree to Lulu & Remi’s wholesale terms & policies.
          </label>
        </div>

        <div className={styles.ButtonContainer}>
          <button type="submit" className={styles.SendButton}>
            Send!
          </button>
        </div>
      </form>
    </section>
  );
}
