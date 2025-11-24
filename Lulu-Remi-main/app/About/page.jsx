
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

import ContactUsButton from "../../components/ContactUsButton/ContactUsButton.jsx";

export const metadata = {
  title: "About Us | Lulu & Remi",
  description:
    "Learn about Lulu & Remi, a woman-owned brand creating playful sticker coloring books that spark creativity, joy, and connection for families.",
};

export default function AboutPage() {
  return (
    <section className={styles.AboutContainer}>
      <h1 className={styles.AboutTitle}>About Us!</h1>
      <div className={styles.AboutText}>
        <p>
          Founded in Brooklyn by a passionate artist and devoted mother of two,
          our brand was created with a simple mission: to inspire creativity,
          spark connection, and offer families meaningful screen-free play.
        </p>
        <p>
          As a mother to Lucie and Remi, I’ve always cherished hands-on,
          imaginative activities that encourage curiosity and joy. With my own
          lifelong love of painting and coloring, and daughters who can never
          get enough of stickers, I envisioned a way to combine both worlds. The
          result? A thoughtfully designed coloring book where every illustration
          transforms into a sticker.
        </p>
        <p>
          What began as a personal project, keeping my children creatively
          engaged during travel and creating thoughtful birthday gifts, quickly
          grew into something larger. It became a mission to give families
          everywhere a creative alternative to screens: playful tools that
          entertain, educate, and encourage expression through art. Our books
          are designed not only to delight children but also to nurture
          imagination, encourage focus, and help create lasting memories.
        </p>
        <p>
          By launching this brand, I hope to share the joy and simplicity of
          artistic play with families everywhere.
        </p>
        <p>Thank you for being part of our creative journey!</p>
      </div>
      <div>
        <Image
          src="/images/luluRemiBlack.PNG"
          alt="Lulu & Remi Logo"
          className={styles.LogoAboutPage}
          width={400}
          height={600}
        />
      </div>
      <div className={styles.ContactUsButtonContainer}>
        <Link href="/contact?form=contact">
          <ContactUsButton />
        </Link>
      </div>
    </section>
  );
}
