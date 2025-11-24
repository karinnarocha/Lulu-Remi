"use client";
import Image from "next/image";
import styles from "./BrandPillars.module.css";

const PILLARS = [
  {
    icon: "/images/Safety_Matters_Icon.png",
    Title: "Safety Matters",
    text: "Safety is our top priority. Every product we offer meets or exceeds all regulatory and safety standards.",
    color: "#85f45a", // soft green
  },
  {
    icon: "/images/craftmanship_Icon.png",
    Title: "Craftsmanship",
    text: "We are dedicated to exceptional craftsmanship, setting a higher standard in both quality and design.",
    color: "#f78c45", // soft orange
  },
  {
    icon: "/images/Women_Owned_Icon.png",
    Title: "Woman-Owned",
    text: "Proudly Women-Owned: Empowering creativity, leadership, and innovation. Every product supports a dream in motion.",
    color: "#f55df0", // soft pink
  },
  {
    icon: "/images/create_Experience_Icon.png",
    Title: "Create Experiences",
    text: "We design playful yet practical products that encourage creativity, self-expression, and joy for dreamers of every age.",
    color: "#5ad3f4", // soft blue
  },
  {
    icon: "/images/Designed_NY_Icon.png",
    Title: "Designed in NY",
    text: "Our products are designed in New York, the place known for creativity, innovation, and technology.",
    color: "#9c61ed", // soft purple
  },
];

export default function BrandPillars() {
  // Duplicate list for smooth infinite scroll
  const allPillars = [...PILLARS, ...PILLARS];

  return (
    <section className={styles.Pilars_Container}>
      <div className={styles.Inner_Pilar}>
        {allPillars.map((p, i) => (
          <article
            key={i}
            className={styles.Pillar_Item}
            style={{ backgroundColor: p.color }}
          >
            <Image src={p.icon} alt={p.Title} width={80} height={80} />
            <h3 className={styles.Pillar_Icon_Title}>{p.Title}</h3>
            <p className={styles.Pillar_Icon_Text}>{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
