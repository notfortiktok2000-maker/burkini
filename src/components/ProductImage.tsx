import React, { useState } from 'react';
import { ProductColor, ProductMedia } from '../data/products';
import { cn } from '../utils';

interface ProductImageProps {
  color: ProductColor;
  type?: 'main' | 'lifestyle' | 'angle' | 'front';
  alt: string;
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  key?: string | number;
}

export function ProductImage({ color, type = 'main', alt, className, fetchPriority }: ProductImageProps) {
  const [error, setError] = useState(false);
  let media: ProductMedia | undefined;

  if (Array.isArray(color.images)) {
    if (type === 'front') type = 'main';
    if (type === 'angle') type = 'lifestyle';
    media = color.images.find((img) => img.type === type) || color.images[0];
  } else {
    // Legacy support
    const src = (type === 'main' || type === 'front') ? (color.images as any).front : (color.images as any).angle;
    media = { type, src, alt };
  }

  if (!media || error) return (
      <div className={cn("w-full h-full bg-gray-50 flex items-center justify-center text-sm text-gray-500 text-center p-4", className)}>
        <span>Image momentanément indisponible</span>
      </div>
  );

  return (
    <div className={cn("block w-full h-full", className)}>
      <img
        src={media.src}
        alt={media.alt || alt}
        className="w-full h-full object-cover"
        loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
        fetchPriority={fetchPriority}
        onError={() => {
          console.error(`Failed to load image: ${media.src}`);
          setError(true);
        }}
      />
    </div>
  );
}
