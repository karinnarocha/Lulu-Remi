import Image from "next/image";
import styles from "./Testimonials.module.css";

export const testimonials = [
  {
    id: 1,
    Message:
      "My boy absolutely LOVES this coloring book, The moment he opened he was hooked and flipping through pages and sticking his favorite coloring!",
    Name: "- Emma S. mom of 5 years old Jake",
  },
  {
    id: 2,
    Message:
      "My daughter can’t get enough of Lulu & Remi! She colors every page with so much excitement and loves choosing her favorite stickers. It’s now her go-to activity after school.",
    Name: "- Sarah M., mom of 6-year-old Lily",
  },
  {
    id: 3,
    Message:
      "This book is a lifesaver on rainy days! My son sits for hours coloring and decorating the pages. It keeps him happy, creative, and away from screens.",
    Name: "- Daniel R., dad of 7-year-old Noah",
  },
];

export default function TestimonialCard({ testimonial }) {
  const { Message = "", Name = "" } = testimonial;

  return (
    <div className={styles.TestimonialsSection}>
      <div className={styles.TestimonialContainer}>
        <h2 className={styles.TestimonialText} data-aos="fade-in">TESTIMONIALS</h2>
          <p className={styles.paragraphTestimonialText} data-aos="fade-in">{Message}</p>
          <p className={styles.paragraphTestimonialName} data-aos="fade-in">{Name}</p>
      </div>
      <Image
        src="/images/kid_holding_crayons.png"
        alt="Kids playing with stickers from Lulu & Remi book"
        className={styles.TestimonialImage}
        width={400}
        height={400}
        data-aos="slide-up"
      />
    </div>
  );
}
