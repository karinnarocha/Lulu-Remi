"use client";

import { useState, useEffect } from "react";
import AppNavbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MiniCart from "../components/MiniCart/MiniCart.jsx";
import { getCart } from "../lib/shopify";

export default function ClientLayout({ children }) {
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  const refreshCart = async () => {
    try {
      // Make sure we're in the browser (localStorage exists)
      if (typeof window === "undefined") return;

      const cartId = localStorage.getItem("cartId");

      // No cart in localStorage → clear state and bail
      if (!cartId) {
        setCartItems([]);
        setCheckoutUrl(null);
        return;
      }

      const cart = await getCart(cartId);

      // If Shopify returns null/invalid cart, clear everything and remove bad ID
      if (!cart || !cart.lines || !Array.isArray(cart.lines.edges)) {
        setCartItems([]);
        setCheckoutUrl(null);
        localStorage.removeItem("cartId");
        return;
      }

      // Safe to map now
      const items = cart.lines.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.merchandise.product.title,
        image:
          edge.node.merchandise.product.featuredImage?.url ||
          "/placeholder.png",
        quantity: edge.node.quantity,
      }));

      setCartItems(items);
      setCheckoutUrl(cart.checkoutUrl || null);
    } catch (error) {
      console.error("Error refreshing cart:", error);
      setCartItems([]);
      setCheckoutUrl(null);
    }
  };

  // Fetch once on load (in case cart already exists)
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <>
      <AppNavbar
        onCartClick={async () => {
          await refreshCart();
          setMiniCartOpen(true);
        }}
      />

      <main>{children}</main>

      <Footer />

      {miniCartOpen && (
        <MiniCart
          items={cartItems}
          onClose={() => setMiniCartOpen(false)}
          onCheckout={() => {
            if (checkoutUrl) {
              window.location.href = checkoutUrl;
            }
          }}
        />
      )}
    </>
  );
}
