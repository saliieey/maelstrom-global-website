'use client';

/**
 * Container Component
 * MANDATORY: Use this for all content containers to ensure consistent max-width and alignment
 * NO random max-widths or alignments - always use this component
 */

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Max width override */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  /** Padding override */
  padding?: boolean | 'sm' | 'md' | 'lg';
}

export const Container = ({
  children,
  className = '',
  maxWidth = 'xl',
  align = 'center',
  padding = true,
}: ContainerProps) => {
  // Uses consistent container from globals.css
  const containerClasses = [
    'container', // Base container with consistent max-widths
    maxWidth !== 'none' && maxWidth !== 'xl' && `max-w-${maxWidth}`,
    padding === false && 'px-0',
    padding === 'sm' && 'px-4',
    padding === 'md' && '', // Default from .container
    padding === 'lg' && 'px-6 md:px-8 lg:px-10',
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={containerClasses}>{children}</div>;
};

