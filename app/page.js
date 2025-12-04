"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Home.module.css";

// Components
import ProductGrid from "../components/ProductGrid/ProductGrid.jsx";
import BuyButton from "../components/buyButton/BuyButton.jsx";
import ProductDisplayCarousel from "../components/ProductCarousel/ProductCarousel.jsx";
import BrandPillars from "../components/BrandPillars/BrandPillars.jsx";
import WholesalesButton from "../components/Wholesales_button/Wholesales_button.jsx";
import TestimonialCard, { testimonials } from "../components/Testimonials/Testimonials.jsx";
import Partnerships from "../components/Partnerships/Partnerships.jsx";
import PopupSubscribe from "@/components/mailPOP-UP/popUp";
import MiniCart from "@/components/MiniCart/MiniCart";
import BenefitsSection from "@/components/Benefits/Benefits";

export default function HomePage() {
  const [s, setS] = useState(0);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const productRef = useRef(null);

  // Scroll to products
  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // AOS
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => setS((n) => (n + 1) % testimonials.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <PopupSubscribe />

      <div className={styles.HomeContainer}>
        {/* HERO SECTION */}
        <section className={styles.HeroSection}>
          <Image
            src="/images/luluRemiBlack.PNG"
            alt="Lulu & Remi interactive sticker-coloring book brand logo"
            width={300}
            height={400}
            data-aos="zoom-in"
            className={styles.HeroLogo}
          />
          

          <h1 className={styles.HeroCTA} data-aos="fade-in">
           Color it. Peel it. Stick it.  
            <br />Where imagination comes to life!
          </h1>

          <div className={styles.HeroButtonContainer} data-aos="jello">
            <BuyButton onClick={scrollToProducts}  />
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section className={styles.HeroDescriptionSectionthree} data-aos="fade">
          <Image
            src="/images/bookup.webp"
            alt="Lulu & Remi Sukkot interactive sticker-coloring book for kids"
            width={700}
            height={800}
            data-aos="fade-right"
            className={styles.SukkotCoverImage}
          />

          <div className={styles.SectionThreeTextContainer} data-aos="fade-left">
            <div className={styles.HeroDescriptionSectionThreeText}>
              <h2>More than a coloring book. <br/>  
              It turns every page into a sticker adventure!
            </h2>
            <p>
            Introduce your child to a new kind of creative experience. Each page becomes a peelable sticker they can collect and play with. Perfect for hands-on learning, storytelling, and imaginative play.
            </p>
            </div>
            <div data-aos="zoom-in">
              <BuyButton onClick={scrollToProducts} />
            </div>
          </div>
        </section>
        <BenefitsSection/>
        {/* PRODUCT CAROUSEL */}
        <section className={styles.HeroDescriptionSection} data-aos="fade-in">
          <div className={styles.CarouselBackground} id="products">
            <ProductDisplayCarousel
              onCartUpdate={(items) => {
                setCartItems(items);
                setMiniCartOpen(true);
              }}
            />
          </div>
        </section>

        {/* EXTRA IMAGES SECTION */}
        <section className={styles.HeroDescriptionSectionfour}>
          <div className={styles.howToSection}>
            <div className={styles.howToImagesSection}> 
              <Image
                src="/images/colorit.webp"
                alt="Kids coloring a Lulu & Remi sticker-coloring page"
                width={250}
                height={280}
                data-aos="zoom-in"
                className={styles.Howto}
              />
              <Image
                src="/images/peelit.webp"
                alt="Kids coloring a Lulu & Remi sticker-coloring page"
                width={250}
                height={280}
                data-aos="zoom-in"
                className={styles.Howto}
              />
              <Image
                src="/images/stickit.webp"
                alt="Kids coloring a Lulu & Remi sticker-coloring page"
                width={250}
                height={280}
                data-aos="zoom-in"
                className={styles.Howto}
              />
            </div>
            <div data-aos="zoom-in">
              <BuyButton onClick={scrollToProducts} />
            </div>
          </div>
        </section>
        {/* PRODUCT GRID */}
        <section className={styles.HeroDescriptionSectionfive} ref={productRef}>
          <div className={styles.HeroDescriptionSectionFiveText} data-aos="fade-in">
            <h2 className={styles.CTASectionFive}>
              Shop Our Interactive Sticker-Coloring Book Collections
            </h2>
            <h3 className={styles.CTASectionFive}>
              Fun, peel-and-play stickers on every page.
            </h3>
          </div>
            <div
              
              className={styles.ProductGridContainer}
              data-aos="zoom-in"
            >
            <ProductGrid />
          </div>
          <WholesalesButton />
        </section>
        {/* BRAND PILLARS */}
        <section className={styles.BrandpillarSection}>
          <BrandPillars />
        </section>
        <section className={styles.PartnershipSection}>
          <Partnerships />
          <div className={styles.Texth2} data-aos="fade-in">
              <h2>Each Lulu & Remi book helps your child discover holiday traditions through coloring, creativity, and hands-on play.</h2>
            </div>
             <div className={styles.SukkotCoverImageSectionFour}>
            <Image
              src="/images/polaroids.png"
              alt="Lulu & Remi Sukkot book cover"
              width={2000}
              height={400}
              className={styles.SukkotCoverImageFaceUp}
              data-aos="zoom-in"
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <TestimonialCard testimonial={testimonials[s]} />
      

      {/* Hidden SEO Block */}
      <div className={styles.hiddenSEO}>
        Lulu & Remi creates interactive Jewish sticker-coloring books for children ages 3–10.
        Our bestselling Sukkot edition combines creativity, culture, and hands-on learning
        through peelable sticker pages that kids can color, peel, and play with. 
        These activity books are perfect for early learning, fine-motor development, 
        screen-free entertainment, travel activities, and holiday gifts. 
        Explore sticker-coloring pages, creative play books, and educational 
        activity books designed to spark imagination and joy.
      </div>
</div>
      {/* MINI CART */}
      {miniCartOpen && (
        <MiniCart
          items={cartItems}
          onClose={() => setMiniCartOpen(false)}
          onCheckout={() => (window.location.href = "/cart")}
        />
      )}
    </>
  );
}
