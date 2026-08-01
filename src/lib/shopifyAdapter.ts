import { Product as ShopifyProduct } from "shopify-buy";
import { Product as LocalProduct } from "../data/products";

export function mapShopifyProducts(shopifyProducts: ShopifyProduct[]): LocalProduct[] {
  return shopifyProducts.filter(p => p && p.title).map(shopifyProduct => {
    // Try to extract images
    const images = (shopifyProduct.images || []).map((img: any, index: number) => ({
      type: index === 0 ? "main" : index === 1 ? "lifestyle" : `angle${index}`,
      src: img.url || img.originalSrc || img.src,
      fallback: img.url || img.originalSrc || img.src,
      alt: img.altText || shopifyProduct.title
    }));
    
    if (images.length === 0) {
      images.push({
        type: "main",
        src: "https://via.placeholder.com/600x800",
        fallback: "https://via.placeholder.com/600x800",
        alt: shopifyProduct.title
      });
    }

    // Price
    const price = shopifyProduct.variants[0]?.price?.amount || 0;

    return {
      id: shopifyProduct.id as string,
      slug: shopifyProduct.handle,
      name: { fr: shopifyProduct.title, ar: shopifyProduct.title },
      hook: { fr: "", ar: "" },
      description: { fr: shopifyProduct.description || "", ar: shopifyProduct.description || "" },
      price: Number(price),
      originalPrice: null,
      colors: [
        {
          id: "default",
          name: { fr: "Standard", ar: "Standard" },
          value: "#000",
          images: images
        }
      ],
      sizes: ["S", "M", "L"], 
      stockCount: 10
    };
  });
}
