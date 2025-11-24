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
            alt="Lulu & Remi Logo"
            width={300}
            height={400}
            data-aos="fade-right"
            className={styles.HeroLogo}
          />

          <h1 className={styles.HeroCTA}>Where every page turns into a world of sticker!</h1>

          <div className={styles.HeroButtonContainer}>
            <BuyButton onClick={scrollToProducts} />
          </div>
        </section>

        {/* DESCRIPTION SECTION */}
        <section className={styles.HeroDescriptionSectionthree} data-aos="fade">
          <Image
            src="/images/CoverSukkot.png"
            alt="Sukkot Cover"
            width={500}
            height={600}
            data-aos="fade-right"
            className={styles.SukkotCoverImage}
          />

          <h2
            className={styles.HeroDescriptionSectionThreeText}
            data-aos="fade-left"
          >
            It’s more than a coloring book,
            <br />
            it sticks with you!
          </h2>
        </section>

        {/* PRODUCT CAROUSEL */}
        <section className={styles.HeroDescriptionSection} data-aos="fade">
          <h2 className={styles.HeroDescriptiontext}>
            Color it, peel it, stick it! <br /> Creativity that sticks with you!
          </h2>

          <div className={styles.CarouselBackground} id="products">
            <ProductDisplayCarousel
              onCartUpdate={(items) => {
                console.log("🔥 CART UPDATE RECEIVED in HomePage:", items);
                setCartItems(items);
                setMiniCartOpen(true); // OPEN the mini cart immediately
              }}
            />
          </div>
        </section>

        {/* EXTRA IMAGES SECTION */}
        <section className={styles.HeroDescriptionSectionfour}>
          <div className={styles.howToImagesSection}>
            <Image src="/images/Color_it.png" alt="Color It" width={200} height={200} data-aos="zoom-in" className={styles.Color_it} />
            <Image src="/images/Peel_it.png" alt="Peel It" width={200} height={200} data-aos="zoom-in" className={styles.Peel_it} />
            <Image src="/images/Play_it.png" alt="Play It" width={200} height={200} data-aos="zoom-in" className={styles.Play_it} />

            <div data-aos="zoom-in">
              <BuyButton onClick={scrollToProducts} />
            </div>
          </div>

          <div className={styles.SukkotCoverImageSectionFour}>
            <Image src="/images/CoverSukkotfaceup.png" alt="Sukkot Book" width={500} height={500} className={styles.SukkotCoverImageFaceUp} data-aos="zoom-in" />
            <Image src="/images/CoverSukkotfaceup2.png" alt="Sukkot Book 2" width={500} height={500} className={styles.SukkotCoverImageFaceUp} data-aos="zoom-in" />
          </div>
        </section>

        {/* BRAND PILLARS */}
        <section className={styles.BrandpillarSection}>
          <BrandPillars />
        </section>

        {/* FULL PRODUCT GRID */}
        <section className={styles.HeroDescriptionSectionfive}>
          <div className={styles.HeroDescriptionSectionFiveText}>
            <h1 className={styles.CTASectionFive}>Bring stories to life with Lulu & Remi’s coloring books!</h1>
            <h2 className={styles.CTASectionFive}>Check out our collections:</h2>
          </div>

          <div ref={productRef} className={styles.ProductGridContainer} data-aos="zoom-in">
            <ProductGrid />
          </div>

          <div className={styles.WholesalesButtonContainer}>
            <Link href="/contact?form=wholesale">
              <WholesalesButton />
            </Link>
          </div>
        </section>

        <Partnerships />

        {/* TESTIMONIALS */}
        <TestimonialCard testimonial={testimonials[s]} />
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
