'use client';

/**
 * Responsive Text Component
 * Fluid typography that scales perfectly across all devices
 * Prevents text overflow and maintains readability
 */

import { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { fluidTypography } from '@/lib/responsive/responsive-utils';

interface ResponsiveTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  className?: string;
  /** Use fluid typography (scales with viewport) */
  fluid?: boolean;
  /** Mobile size override */
  mobileSize?: number;
  /** Desktop size override */
  desktopSize?: number;
}

const sizeClasses = {
  xs: 'text-xs sm:text-sm',
  sm: 'text-sm sm:text-base',
  base: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl md:text-2xl',
  xl: 'text-xl sm:text-2xl md:text-3xl',
  '2xl': 'text-2xl sm:text-3xl md:text-4xl',
  '3xl': 'text-3xl sm:text-4xl md:text-5xl',
  '4xl': 'text-4xl sm:text-5xl md:text-6xl',
  '5xl': 'text-5xl sm:text-6xl md:text-7xl',
  '6xl': 'text-6xl sm:text-7xl md:text-8xl',
};

const TagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  div: 'div',
} as const;

export const ResponsiveText = ({
  children,
  as = 'p',
  size = 'base',
  className = '',
  fluid = false,
  mobileSize,
  desktopSize,
}: ResponsiveTextProps) => {
  const { isMobile, isTablet } = useResponsive();
  const Tag = TagMap[as] as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

  const baseClasses = fluid
    ? ''
    : sizeClasses[size] || sizeClasses.base;

  const fluidStyle =
    fluid && mobileSize && desktopSize
      ? {
          fontSize: fluidTypography(mobileSize, desktopSize, 320, 1920),
        }
      : {};

  const responsiveClasses = [
    baseClasses,
    'leading-tight sm:leading-normal md:leading-relaxed',
    'break-words', // Prevent overflow
    'hyphens-auto', // Better text wrapping
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={responsiveClasses} style={fluidStyle}>
      {children}
    </Tag>
  );
};

