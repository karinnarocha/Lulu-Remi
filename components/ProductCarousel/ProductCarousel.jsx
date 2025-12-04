"use client";

import { useEffect, useState } from "react";
import { getProducts, createCart, addToCart } from "../../lib/shopify";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCarousel.module.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton.jsx";

export default function ProductCarousel({ onCartUpdate }) {
  const [products, setProducts] = useState([]);

  // 🛍 Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        const formatted = data.map((p) => ({
          id: p.id,
          handle: p.handle,
          title: p.title,
          price: p.variants?.edges?.[0]?.node?.price?.amount || "0.00",
          variantId: p.variants?.edges?.[0]?.node?.id,
          images: p.images?.edges || [],
        }));
        setProducts(formatted);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
    loadProducts();
  }, []);

  // 🛒 Add to cart AND TRIGGER MINICART
  const handleAddToCart = async (variantId) => {
    try {
      let cartId = localStorage.getItem("cartId");

      if (!cartId) {
        const cart = await createCart();
        cartId = cart.id;
        localStorage.setItem("cartId", cartId);
      }

      const updatedCart = await addToCart(cartId, variantId, 1);

      // Format items
      const updatedItems = updatedCart.lines.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.merchandise.product.title,
        price: Number(edge.node.merchandise.price.amount),
        image:
          edge.node.merchandise.product.featuredImage?.url ||
          "/placeholder.png",
        quantity: edge.node.quantity,
      }));

      // 🔥 SEND ITEMS TO HOMEPAGE → open mini cart
      if (onCartUpdate) onCartUpdate(updatedItems);

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // 🎨 Colors & sizes
  const bgColors = ["#47A933", "#FBDB37", "#FB37B9"];
  const cardSizes = [
    { width: 250, height: 420 },
    { width: 300, height: 450 },
    { width: 250, height: 420 },
  ];

  // 🧩 Visible cards
  let visibleCards = [];

  if (products.length === 1) {
    visibleCards = [{ product: products[0], color: bgColors[0], size: cardSizes[0] }];
  } else if (products.length === 2) {
    visibleCards = [
      { product: products[0], color: bgColors[0], size: cardSizes[0] },
      { product: products[1], color: bgColors[2], size: cardSizes[2] },
    ];
  } else if (products.length >= 3) {
    visibleCards = [
      { product: products[0], color: bgColors[0], size: cardSizes[0] },
      { product: products[2], color: bgColors[1], size: cardSizes[1] },
      { product: products[1], color: bgColors[2], size: cardSizes[2] },
    ];
  }

  return (
    <div className={styles.carouselContainer}>
      {visibleCards.map(({ product, color, size }) => (
        <div
          key={product.id}
          className={styles.productCard}
          style={{
            backgroundColor: color,
            width: size.width,
            height: size.height,
          }}
        >
          {/* CLICK → product page */}
          <Link href={`/product/${product.handle}`}>
            <Image
              src={product.images[0]?.node?.url || "/placeholder.png"}
              alt={product.title}
              width={size.width - 40}
              height={size.height - 110}
              className={styles.productImage}
            />
          </Link>

          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>

          <AddToCartButton
            onClick={() => handleAddToCart(product.variantId)}
          />
        </div>
      ))}
    </div>
  );
}
