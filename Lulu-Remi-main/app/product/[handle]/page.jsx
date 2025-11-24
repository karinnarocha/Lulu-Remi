"use client";

import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductByHandle, createCart, addToCart, getCart } from "../../../lib/shopify";

import AddToCartButton from "../../../components/AddToCartButton/AddToCartButton.jsx";
import FAQSection from "../../../components/FAQ/FAQ.jsx";
import MiniCart from "../../../components/MiniCart/MiniCart.jsx";


import styles from "./ProductDisplay.module.css";

// Static tab info (can be reused for all products)
const CatalogDetails = {
  Details: {
    title: "Product Details",
    content: `
✨ **Crafted with Care**
- Premium-quality, durable sticker paper  
- Exclusive Lulu & Remi illustrations  
- Non-toxic, safe for kids  


💡 **Perfect For**


- Creative play & learning activities  
- Gifts & party favors  
- Decorating notebooks, crafts, and more  
    `,
  },
  Shipping: {
    title: "Shipping Information",
    content: `
🚚 **Fast Processing**  
- Orders ship within **1–2 business days**  

🌎 **Estimated Delivery Times**  
- **U.S. Orders:** 3–5 business days  
    `,
  },
  Return: {
    title: "Return Policy",
    content: `
🔄 **Returns & Exchanges**  
- We accept returns **only for items that arrive damaged or defective**  
- Please contact us within **7 days of delivery** with photos of the issue  
- A replacement or refund will be arranged promptly
    `,
  },
};

export default function ProductPage() {
  const { handle } = useParams(); // dynamic route param
  const [product, setProduct] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("Details");
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductByHandle(handle);
      setProduct(data);
    }
    loadProduct();
  }, [handle]);

  useEffect(() => {
  const cartId = localStorage.getItem("cartId");
  if (cartId) {
    getCart(cartId).then(cart => {
      setCartItems(
        cart.lines.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.merchandise.product.title,
          price: Number(edge.node.merchandise.price.amount),
          image: edge.node.merchandise.product.featuredImage?.url || "/placeholder.png",
          quantity: edge.node.quantity,
        }))
      );
      setCheckoutUrl(cart.checkoutUrl);
    });
  }
}, []);

  if (!product) return <p>Loading...</p>;

  
const handleAddToCart = async () => {
  let cartId = localStorage.getItem("cartId");
  if (!cartId) {
    const cart = await createCart();
    cartId = cart.id;
    localStorage.setItem("cartId", cartId);
  }

  const variantId = product.variants.edges[0].node.id;
  const updatedCart = await addToCart(cartId, variantId, 1);

  console.log("Cart updated:", updatedCart);

  // ✅ sync local state with Shopify’s real cart
  setCartItems(
    updatedCart.lines.edges.map(edge => ({
    id: edge.node.id,  
    title: edge.node.merchandise.product.title,
    price: Number(edge.node.merchandise.price.amount),
    image: edge.node.merchandise.product.featuredImage?.url || "/placeholder.png",
    quantity: edge.node.quantity,
  }))
);

  setCheckoutUrl(updatedCart.checkoutUrl);
  setMiniCartOpen(true);
};


  return (
    <div className={styles.productPageContainer}>
      {/* Logo */}
      <Image
          src="/images/luluRemiBlack.PNG"
          alt="Lulu & Remi Logo"
          className={styles.LogoAboutPage}
          width={400}
          height={500}
        />
        {/* Product display */}
      <div className={styles.ProductInfoContainer}>
        <div className={styles.MainImageWrapper}>
            <Image
              src={product.images.edges[0]?.node.url || "/placeholder.png"}
              alt={product.images.edges[0]?.node.altText || product.title}
              width={400}
              height={400}
              className={styles.MainImage}
            />

            {/* Thumbnails */}
            <div className={styles.ThumbnailContainer}>
              {product.images.edges.slice(1).map(({ node }, i) => (
                <img
                  key={i}
                  src={node.url}
                  alt={node.altText || `Thumbnail ${i}`}
                  className={styles.ThumbnailImage}
                  onClick={() => {
                    // swap main image when clicking a thumbnail
                    const newImages = [...product.images.edges];
                    [newImages[0], newImages[i + 1]] = [newImages[i + 1], newImages[0]];
                    setProduct({ ...product, images: { edges: newImages } });
                  }}
                />
              ))}
            </div>
          </div>
        <div className={styles.DetailsContainer}>
          <h1 className={styles.ProductTitle}>{product.title}</h1>
          <p className={styles.ProductReviews}>
            <span className={styles.Star}>★</span> 5.0 
          </p>
          <p className={styles.ProductSubtitle}>{product.description}</p>
          <p className={styles.ProductPrice}>USD ${product.variants.edges[0].node.price.amount}</p>
          <div className={styles.placementAddToCart}>
            <AddToCartButton onClick={handleAddToCart} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.TabsContainer}>
        <menu className={styles.ProductDisplayTabs}>
          <div className={`${styles.Tab} ${ selectedTopic === "Details" ? styles.TabActive : "" }`} onClick={() => setSelectedTopic("Details")}>Details</div>
          <div className={`${styles.Tab} ${ selectedTopic === "Shipping" ? styles.TabActive : "" }`}onClick={() => setSelectedTopic("Shipping")}>Shipping</div>
          <div className={`${styles.Tab} ${ selectedTopic === "Return" ? styles.TabActive : "" }`} onClick={() => setSelectedTopic("Return")}> Return </div>
        </menu>
        {/* Tab content */}
        <article className={styles.ProductDisplayContent}>
          <ReactMarkdown>{CatalogDetails[selectedTopic].content}</ReactMarkdown>
        </article>
      </div>

      {/* FAQ Section */}
      <FAQSection />
      {miniCartOpen && ( 
        <MiniCart items={cartItems} onClose={() => setMiniCartOpen(false)} onCheckout={() => { window.location.href = "/cart"; }} />)}
    </div>
  );
}