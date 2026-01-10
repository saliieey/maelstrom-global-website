'use client';

/**
 * Responsive Image Component
 * Optimized for all screen sizes with proper aspect ratios
 * Prevents layout shift and ensures perfect display on all devices
 */

import Image from 'next/image';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
}

export const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  fill,
  objectFit = 'cover',
  quality = 85,
}: ResponsiveImageProps) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Default sizes if not provided
  const defaultSizes =
    sizes ||
    `(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 90vw, 1280px`;

  const imageClassName = [
    'w-full h-auto',
    objectFit === 'cover' && 'object-cover',
    objectFit === 'contain' && 'object-contain',
    objectFit === 'fill' && 'object-fill',
    objectFit === 'none' && 'object-none',
    objectFit === 'scale-down' && 'object-scale-down',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (fill) {
    return (
      <div className="relative w-full" style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={imageClassName}
          sizes={defaultSizes}
          quality={quality}
          style={{ objectFit }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={imageClassName}
      sizes={defaultSizes}
      quality={quality}
      style={{ objectFit }}
    />
  );
};

