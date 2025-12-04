"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import SeeDetailButton from "../SeeDetailButton/SeeDetailButton.jsx";

export default function ProductCard({ product }) {
  return (
      <div className={styles.productCardContainer}>
        <Image
          src={product.image}
          alt={`${product.title} — ${product.collection} sticker coloring book by Lulu & Remi`}
          className={styles.productImage}
          width={250}
          height={250}
        />
        <h3>{product.title}</h3>
        <p>${Number(product.price).toFixed(2)}</p>
        <div >
          <Link href={`/product/${product.handle}`}>
            <SeeDetailButton />
          </Link>
        </div>
      </div>
  );
}
