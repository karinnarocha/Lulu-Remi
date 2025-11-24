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
            data-aos="fade-right"
            className={styles.HeroLogo}
          />
          

          <h1 className={styles.HeroCTA}>
           Color it. Peel it. Stick it.  
            <br />Where imagination comes to life!
          </h1>

          <div className={styles.HeroButtonContainer}>
            <BuyButton onClick={scrollToProducts} />
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section className={styles.HeroDescriptionSectionthree} data-aos="fade">
          <Image
            src="/images/CoverSukkot.png"
            alt="Lulu & Remi Sukkot interactive sticker-coloring book for kids"
            width={500}
            height={600}
            data-aos="fade-right"
            className={styles.SukkotCoverImage}
          />

          <div className={styles.SectionThreeTextContainer}>
            <h2
              className={styles.HeroDescriptionSectionThreeText}
              data-aos="fade-left"
            >
              More than a coloring book <br/>  
              It turns every page into a sticker adventure!
            </h2>
            <h3>
              Introduce your child to a new kind of creative experience.  
              Each page becomes a peelable sticker they can collect, reuse, and play with, 
              perfect for hands-on learning, storytelling, and imaginative play.
            </h3>
          </div>
        </section>

        {/* PRODUCT CAROUSEL */}
        <section className={styles.HeroDescriptionSection} data-aos="fade">
          <h2 className={styles.HeroDescriptiontext}>
            Where creativity sticks — literally!
            <br />
            Our interactive sticker-coloring books combine coloring, peeling, and playing
            in one magical experience.
          </h2>

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
          <div className={styles.howToImagesSection}>
            <Image
              src="/images/Color_it.png"
              alt="Kids coloring a Lulu & Remi sticker-coloring page"
              width={200}
              height={200}
              data-aos="zoom-in"
              className={styles.Color_it}
            />
            <Image
              src="/images/Peel_it.png"
              alt="Peelable sticker from Lulu & Remi interactive book"
              width={200}
              height={200}
              data-aos="zoom-in"
              className={styles.Peel_it}
            />
            <Image
              src="/images/Play_it.png"
              alt="Kids playing with reusable Lulu & Remi stickers"
              width={200}
              height={200}
              data-aos="zoom-in"
              className={styles.Play_it}
            />

            <div data-aos="zoom-in">
              <BuyButton onClick={scrollToProducts} />
            </div>
          </div>

          <div className={styles.SukkotCoverImageSectionFour}>
            <Image
              src="/images/CoverSukkotfaceup.png"
              alt="Lulu & Remi Sukkot book cover"
              width={500}
              height={500}
              className={styles.SukkotCoverImageFaceUp}
              data-aos="zoom-in"
            />
            <Image
              src="/images/CoverSukkotfaceup2.png"
              alt="Lulu & Remi Sukkot book second cover option"
              width={500}
              height={500}
              className={styles.SukkotCoverImageFaceUp}
              data-aos="zoom-in"
            />
          </div>
        </section>

        {/* BRAND PILLARS */}
        <section className={styles.BrandpillarSection}>
          <BrandPillars />
        </section>

        {/* PRODUCT GRID */}
        <section className={styles.HeroDescriptionSectionfive}>
          <div className={styles.HeroDescriptionSectionFiveText}>
            <h2 className={styles.CTASectionFive}>
              Shop Our Interactive Sticker-Coloring Book Collections
            </h2>
            <h3 className={styles.CTASectionFive}>
              Fun, reusable peel-and-play stickers on every page.
            </h3>
          </div>

          <div
            ref={productRef}
            className={styles.ProductGridContainer}
            data-aos="zoom-in"
          >
            <ProductGrid />
          </div>
        </section>

        <WholesalesButton />
        <Partnerships />

        {/* TESTIMONIALS */}
        <TestimonialCard testimonial={testimonials[s]} />
      </div>

      {/* Hidden SEO Block */}
      <div className={styles.hiddenSEO}>
        Lulu & Remi creates interactive sticker-coloring books for children ages 3–10.
        Our bestselling Sukkot edition combines creativity, culture, and hands-on learning
        through peelable sticker pages that kids can color, peel, and play with. 
        These activity books are perfect for early learning, fine-motor development, 
        screen-free entertainment, travel activities, and holiday gifts. 
        Explore sticker-coloring pages, creative play books, and educational 
        activity books designed to spark imagination and joy.
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
