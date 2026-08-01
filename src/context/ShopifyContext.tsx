import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { shopifyClient } from '../lib/shopify';
import { Product as ShopifyProduct, Checkout as ShopifyCheckout } from 'shopify-buy';

interface ShopifyContextType {
  products: ShopifyProduct[];
  checkout: ShopifyCheckout | null;
  isReady: boolean;
  createCheckout: () => Promise<void>;
  addItemToCheckout: (variantId: string, quantity: number) => Promise<void>;
  updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeLineItem: (lineItemId: string) => Promise<void>;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export function ShopifyProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [checkout, setCheckout] = useState<ShopifyCheckout | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeShopify = async () => {
      // Check if credentials exist
      if (!import.meta.env.VITE_SHOPIFY_DOMAIN || !import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) {
        setIsReady(true);
        return;
      }

      try {
        // Fetch products
        const fetchedProducts = await shopifyClient.product.fetchAll() as any[];
        
        // Check if Shopify returned an error instead of products
        if (fetchedProducts && fetchedProducts.length > 0 && fetchedProducts[0].message === 'Not Found') {
          console.warn("Shopify returned Not Found. Please check your credentials.");
          setProducts([]);
        } else {
          setProducts(fetchedProducts as ShopifyProduct[]);
        }
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Shopify:", error);
        alert("Shopify Connection Error: Please make sure you have added both VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN to your AI Studio Environment Variables, and that they are correct.");
      } finally {
        setIsReady(true);
      }
    };

    initializeShopify();
  }, []);

  const createNewCheckout = async () => {
    try {
      const newCheckout = await shopifyClient.checkout.create();
      setCheckout(newCheckout as ShopifyCheckout);
      localStorage.setItem('shopify_checkout_id', newCheckout.id as string);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  const createCheckout = async () => {
    await createNewCheckout();
  };

  const addItemToCheckout = async (variantId: string, quantity: number) => {
    if (!checkout) return;
    try {
      const lineItemsToAdd = [{ variantId, quantity }];
      const newCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
      setCheckout(newCheckout as ShopifyCheckout);
    } catch (error) {
      console.error("Error adding item to checkout:", error);
    }
  };

  const updateLineItem = async (lineItemId: string, quantity: number) => {
    if (!checkout) return;
    try {
      const lineItemsToUpdate = [{ id: lineItemId, quantity }];
      const newCheckout = await shopifyClient.checkout.updateLineItems(checkout.id, lineItemsToUpdate);
      setCheckout(newCheckout as ShopifyCheckout);
    } catch (error) {
      console.error("Error updating line item:", error);
    }
  };

  const removeLineItem = async (lineItemId: string) => {
    if (!checkout) return;
    try {
      const lineItemIdsToRemove = [lineItemId];
      const newCheckout = await shopifyClient.checkout.removeLineItems(checkout.id, lineItemIdsToRemove);
      setCheckout(newCheckout as ShopifyCheckout);
    } catch (error) {
      console.error("Error removing line item:", error);
    }
  };

  return (
    <ShopifyContext.Provider
      value={{
        products,
        checkout,
        isReady,
        createCheckout,
        addItemToCheckout,
        updateLineItem,
        removeLineItem,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
}
