"use client";

import Image from "next/image";
import styles from "./Benefits.module.css";

export default function BenefitsSection() {
  return (
    <section className={styles.benefitsSection}>
      <h2 className={styles.sectionTitle}>Why Parents & Kids Love Lulu & Remi</h2>

      <h2 className={styles.HeroDescriptiontext}>
            Where creativity sticks!
            <br />
            Our interactive sticker-coloring books combine coloring, peeling, and playing
            in one magical experience.
          </h2>

      <div className={styles.benefitsGrid}>
        {/* Benefit 1 */}
        <div className={styles.benefitCard}>
          <div className={styles.iconCircle}>
            <Image
              src="/images/kids_coloring.webp"
              alt="Screen-Free Fun"
              width={120}
              height={120}
              className={styles.benefitImage}
            />
          </div>
          <h3>Screen-Free Fun</h3>
          <div className={styles.divider}></div>
          <p>
            Keeps kids engaged and creative without electronics. Perfect for
            focused playtime.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className={styles.benefitCard}>
          <div className={styles.iconCircle}>
            <Image
              src="/images/stickers.webp"
              alt="Interactive Stickers"
              width={200}
              height={200}
              className={styles.benefitImage}
            />
          </div>
          <h3>Interactive Stickers</h3>
          <div className={styles.divider}></div>
          <p>
            Every page becomes a peelable sticker! Kids color, peel, and play to
            boost fine motor skills.
          </p>
        </div>

        {/* Benefit 3 */}
        <div className={styles.benefitCard}>
          <div className={styles.iconCircle}>
            <Image
              src="/images/holiday_learn.webp"
              alt="Learn Traditions"
              width={120}
              height={120}
              className={styles.benefitImage}
            />
          </div>
          <h3>Learn Holiday Traditions</h3>
          <div className={styles.divider}></div>
          <p>
            Fun, simple illustrations help kids learn and celebrate cultural and
            seasonal traditions.
          </p>
        </div>
      </div>
    </section>
  );
}
