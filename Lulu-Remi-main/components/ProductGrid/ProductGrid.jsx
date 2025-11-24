"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../lib/shopify";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const shopifyProducts = await getProducts();

        const formatted = shopifyProducts.map((p) => ({
          id: p.id,
          handle: p.handle,
          title: p.title,
          description: p.description,
          image: p.images.edges[0]?.node.url || "/placeholder.png",
          alt: p.images.edges[0]?.node.altText || p.title,
          price: p.variants.edges[0]?.node.price.amount || "0.00",
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    loadProducts();
  }, []);

  return (
      <div className={styles.gridContainer}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
  );
}
