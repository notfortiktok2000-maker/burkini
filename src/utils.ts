import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ProductColor, ProductMedia } from "./data/products";

export function getMainImage(color: ProductColor): string {
  if (Array.isArray(color.images)) {
    const main = color.images.find(img => img.type === "main") || color.images[0];
    return main.src;
  }
  return (color.images as any).front;
}

export function getSecondaryImage(color: ProductColor): string {
  if (Array.isArray(color.images)) {
    const sec = color.images.find(img => img.type === "lifestyle" || img.type === "angle") || color.images[1] || color.images[0];
    return sec.src;
  }
  return (color.images as any).angle;
}

export function getImageList(color: ProductColor): ProductMedia[] {
  if (Array.isArray(color.images)) {
    return color.images;
  }
  return [
    { type: "main", src: (color.images as any).front, alt: color.name.fr },
    { type: "lifestyle", src: (color.images as any).angle, alt: color.name.fr }
  ];
}
