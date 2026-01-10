'use client';

/**
 * Responsive Container Component
 * Pixel-perfect responsive container that adapts to all screen sizes
 * Prevents layout collapse and maintains proper spacing on all devices
 * MANDATORY: Uses consistent alignment system - no random alignments
 * 
 * NOTE: Consider using <Container> from @/components/alignment for better consistency
 */

import { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  /** Custom max-width override - uses consistent system */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  /** Add horizontal padding - uses consistent spacing system */
  padding?: boolean | 'sm' | 'md' | 'lg';
  /** Center content - MANDATORY alignment */
  center?: boolean;
}

// Uses consistent max-widths from alignment system
const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
  none: '',
};

// Uses consistent spacing from alignment system (8px base unit)
const paddingClasses = {
  sm: 'px-4', // 16px - uses --spacing-4
  md: 'px-4 sm:px-6 md:px-8', // 16px/24px/32px - consistent progression
  lg: 'px-6 sm:px-8 md:px-10 lg:px-12', // 24px/32px/40px/48px - consistent progression
};

export const ResponsiveContainer = ({
  children,
  className = '',
  maxWidth = '2xl',
  padding = true,
  center = true,
}: ResponsiveContainerProps) => {
  const { width, isMobile, isTablet } = useResponsive();

  const containerClasses = [
    'w-full',
    maxWidth !== 'none' && maxWidthClasses[maxWidth],
    padding === true ? paddingClasses.md : padding === false ? '' : paddingClasses[padding],
    center && 'mx-auto text-center', // MANDATORY: Consistent center alignment
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} style={{ maxWidth: '100%' }}>
      {children}
    </div>
  );
};

