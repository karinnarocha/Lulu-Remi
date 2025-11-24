"use client";
import styles from "./MiniCart.module.css";
import { useRouter } from "next/navigation";
import { getCart } from "../../lib/shopify"; 

export default function MiniCart({ items = [], onClose }) {
  const router = useRouter();

  const groupedItems = items.reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity; 
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  async function handleCheckout() {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        alert("Your cart is empty.");
        return;
      }

      const cart = await getCart(cartId);
      if (cart?.checkoutUrl) {
        // ✅ This will open Shopify's secure checkout (shop.shopify.com)
        window.location.href = cart.checkoutUrl;
      } else {
        alert("Checkout unavailable. Please refresh your cart.");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("There was an issue loading checkout.");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.miniCartContainer}>
          <p className={styles.MiniCartText}>Item added to your cart:</p>

          {groupedItems.length > 0 ? (
            groupedItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <p>
                  {item.title} <strong>x{item.quantity}</strong>
                </p>
              </div>
            ))
          ) : (
            <p className={styles.MiniCartText}>Your cart is empty</p>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.viewBtn}
            onClick={() => { onClose(); router.push("/Cart"); }}
          >
            View cart ({items.reduce((total, item) => total + item.quantity, 0)})
          </button>

          {/* ✅ Updated checkout button */}
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
