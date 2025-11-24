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

  // Requesting shopify cart data
  const refreshCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const cart = await getCart(cartId);
      setCartItems(
        cart.lines.edges.map((edge) => ({
          id: edge.node.id,
          title: edge.node.merchandise.product.title,
          image: edge.node.merchandise.product.featuredImage?.url || "/placeholder.png",
          quantity: edge.node.quantity,
        }))
      );
      setCheckoutUrl(cart.checkoutUrl)
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
          onCheckout={() => { if (checkoutUrl) { window.location.href = checkoutUrl; }}}/>
      )}
    </>
  );
}