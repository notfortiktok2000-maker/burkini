import Client from 'shopify-buy';

// Initialize the Shopify client
// The domain and storefront token are loaded from environment variables.
// In Vite, client-side env variables are prefixed with VITE_.
export const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || '',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
  apiVersion: '2024-01'
});

// Helper function to fetch all products
export async function fetchShopifyProducts() {
  if (!import.meta.env.VITE_SHOPIFY_DOMAIN || !import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
    console.warn("Shopify environment variables are missing. Please add VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN.");
    return [];
  }
  
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return [];
  }
}

// Helper function to create a checkout
export async function createShopifyCheckout() {
  try {
    const checkout = await shopifyClient.checkout.create();
    return checkout;
  } catch (error) {
    console.error("Error creating Shopify checkout:", error);
    return null;
  }
}
