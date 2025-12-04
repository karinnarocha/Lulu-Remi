"use client";
import Image from "next/image";
import styles from "./Contact_form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function ContactForm() {

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      name: event.target.Name.value,
      email: event.target.Email.value,
      subject: event.target.Subject.value,
      message: event.target.Message.value,
    }
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Message sent successfully!');
      event.target.reset();
    } else {
      alert('Failed to send message. Please try again later.');
    }
  }

  return (
    <>

      <section className={styles.ContactPageContainer}>
        {/* Left Side */}
        <div className={styles.ContatoTextContainer}>
          <Image
            src="/images/luluRemiBlack.PNG"
            alt="Lulu & Remi Logo"
            className={styles.LogoContactPage}
            width={400}
            height={400}
            priority
          />
          <h1 className={styles.ContactPageCTA}>Let's talk!</h1>
          <p className={styles.ContanctPageText}>
            We’d love to hear from you! Whether it’s a question, an idea, or
            just to say hello. <br />
            Let’s grow this community together!
          </p>
        </div>

        {/* Right Side Form */}
        <form className={`${styles.ContactForm} container my-4`} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              className={`form-control ${styles.InputContainer}`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input
              type="email"
              id="Email"
              className={`form-control ${styles.InputContainer}`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Subject">Subject</label>
            <input
              type="text"
              id="Subject"
              className={`form-control ${styles.InputContainer}`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Message">Message</label>
            <textarea
              id="Message"
              rows="3"
              className={`form-control ${styles.InputContainer}`}
            ></textarea>
          </div>

          <div className={styles.ButtonContainer}>
            <button type="submit" className={styles.SendButton}>
              Send!
            </button>
          </div>
        </form>
      </section>

    </>
  );
}
