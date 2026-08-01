import React from 'react';
import { ProductColor, ProductMedia } from '../data/products';
import { cn } from '../utils';

interface ProductImageProps {
  color: ProductColor;
  type?: 'main' | 'lifestyle' | 'angle' | 'front';
  alt: string;
  className?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
  key?: string | number;
}

export function ProductImage({ color, type = 'main', alt, className, fetchpriority }: ProductImageProps) {
  let media: ProductMedia | undefined;

  if (Array.isArray(color.images)) {
    if (type === 'front') type = 'main';
    if (type === 'angle') type = 'lifestyle';
    media = color.images.find((img) => img.type === type) || color.images[0];
  } else {
    // Legacy support
    const src = (type === 'main' || type === 'front') ? (color.images as any).front : (color.images as any).angle;
    media = { type, src, fallback: src, alt };
  }

  if (!media) return null;

  const imgSrc = media.fallback || media.src;

  return (
    <picture className={cn("block w-full h-full", className)}>
      {media.src && media.src.endsWith('.webp') && (
        <source srcSet={media.src} type="image/webp" />
      )}
      <img
        src={imgSrc}
        alt={media.alt || alt}
        className="w-full h-full object-cover"
        loading={fetchpriority === 'high' ? 'eager' : 'lazy'}
      />
    </picture>
  );
}
