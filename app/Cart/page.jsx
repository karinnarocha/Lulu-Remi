"use client";
import styles from "./Cart.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCart, cartLinesUpdate, cartLinesRemove } from "../../lib/shopify";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  const refreshCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const newCart = await getCart(cartId);
      setCart(newCart);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  const items = cart.lines.edges;

  const updateQuantity = async (lineId, newQty) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;
    if (newQty < 1) return; // prevent zero
    const updated = await cartLinesUpdate(cartId, lineId, newQty);
    await refreshCart();
  };

  const removeItem = async (lineId) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;
    const updated = await cartLinesRemove(cartId, lineId);
    await refreshCart();
  };

  return (
    <div style={{ padding: "2rem" }} className={styles.CartContainer}>
      <div className={styles.CartBox}>
        <Image
          src="/images/luluRemiBlack.PNG"
          alt="Lulu & Remi Logo"
          className={styles.LogoAboutPage}
          width={300}
          height={100}
        />

        <h1>Your Cart</h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr className={styles.TableHeader}>
                <th align="left">Product</th>
                <th align="center">Quantity</th>
                <th align="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ node }) => (
                <tr key={node.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "1rem 0", display: "flex", alignItems: "center" }}>
                    <img
                      src={node.merchandise.product.featuredImage?.url}
                      alt={node.merchandise.product.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "1rem",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      <p>{node.merchandise.product.title}</p>
                      <p>${node.merchandise.price.amount}</p>
                    </div>
                  </td>

                  <td align="center">
                    <button onClick={() => updateQuantity(node.id, node.quantity - 1)}>−</button>
                    <span style={{ margin: "0 0.5rem" }}>{node.quantity}</span>
                    <button onClick={() => updateQuantity(node.id, node.quantity + 1)}>+</button>
                    <button
                      onClick={() => removeItem(node.id)}
                      style={{ marginLeft: "1rem" }}
                    >
                      🗑
                    </button>
                  </td>

                  <td align="right">
                    ${(node.quantity * node.merchandise.price.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Totals Section */}
        <div style={{ marginTop: "2rem", textAlign: "right" }}>
          <p>Subtotal: <strong>${cart.cost.subtotalAmount.amount}</strong></p>

          {cart.cost.totalTaxAmount && (
            <p>Tax: <strong>${cart.cost.totalTaxAmount.amount}</strong></p>
          )}

          <h2>Total: ${cart.cost.totalAmount.amount}</h2>
        </div>

        <button
          onClick={() => (window.location.href = cart.checkoutUrl)}
          className={styles.CheckoutButton}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
