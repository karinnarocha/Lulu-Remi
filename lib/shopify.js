// lib/shopify.js

// --- Core fetch utility ---
export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error("Shopify API request failed");
  }

  return response.json();
}

// --- Helper: Fix broken checkout URLs ---
function fixCheckoutDomain(checkoutUrl) {
  if (!checkoutUrl) return checkoutUrl;

  // 👇 Change this domain later if you set up shop.lulunremi.com
  return checkoutUrl.replace("098gyk-ff.myshopify.com", "shop.lulunremi.com");}

// --- PRODUCT QUERIES ---
export async function getProducts() {
  const query = `
    {
      products(first: 6) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query);
  return response.data.products.edges.map(({ node }) => node);
}

export async function getProductByHandle(handle) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { handle });
  return response.data.product;
}

// --- CART MUTATIONS ---
export async function createCart() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
        }
      }
    }
  `;
  const response = await shopifyFetch(query);
  return response.data.cartCreate.cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  };

  const response = await shopifyFetch(query, variables);
  const cart = response.data.cartLinesAdd.cart;

  if (cart && cart.checkoutUrl) {
    cart.checkoutUrl = fixCheckoutDomain(cart.checkoutUrl);
  }

  return cart;
}

export async function getCart(cartId) {
  const query = `
    query cart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product { title featuredImage { url } }
                  price { amount }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount }
          totalAmount { amount }
        }
      }
    }
  `;

  const res = await shopifyFetch(query, { cartId });
  const cart = res.data.cart;

  if (cart && cart.checkoutUrl) {
    cart.checkoutUrl = fixCheckoutDomain(cart.checkoutUrl);
  }

  return cart;
}

export async function cartLinesUpdate(cartId, lineId, quantity) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          cost {
            totalAmount { amount }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    price { amount }
                    product {
                      title
                      featuredImage { url }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };

  const response = await shopifyFetch(query, variables);
  const cart = response.data.cartLinesUpdate.cart;

  if (cart && cart.checkoutUrl) {
    cart.checkoutUrl = fixCheckoutDomain(cart.checkoutUrl);
  }

  return cart;
}

export async function cartLinesRemove(cartId, lineId) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          cost {
            totalAmount { amount }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    price { amount }
                    product {
                      title
                      featuredImage { url }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { cartId, lineIds: [lineId] };

  const response = await shopifyFetch(query, variables);
  const cart = response.data.cartLinesRemove.cart;

  if (cart && cart.checkoutUrl) {
    cart.checkoutUrl = fixCheckoutDomain(cart.checkoutUrl);
  }

  return cart;
}
