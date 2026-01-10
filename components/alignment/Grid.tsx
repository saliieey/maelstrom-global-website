'use client';

/**
 * Grid Component
 * MANDATORY: Use this for all grids to ensure consistent gap and alignment
 * NO random gaps or alignments - always use this component
 */

import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Responsive columns: [mobile, tablet, desktop] */
  responsiveCols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Gap override */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Alignment */
  align?: 'left' | 'center' | 'right' | 'stretch';
}

export const Grid = ({
  children,
  className = '',
  cols,
  responsiveCols,
  gap = 'md',
  align = 'center',
}: GridProps) => {
  // Responsive columns
  const mobileCols = responsiveCols?.mobile ?? cols ?? 1;
  const tabletCols = responsiveCols?.tablet ?? cols ?? 2;
  const desktopCols = responsiveCols?.desktop ?? cols ?? 3;

  // Gap classes (uses consistent spacing from globals.css)
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4 sm:gap-6 md:gap-8',
    md: 'grid', // Uses CSS variable from globals.css
    lg: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12',
    xl: 'gap-8 sm:gap-10 md:gap-12 lg:gap-16',
  };

  // Grid column classes
  const gridColClasses = `grid-cols-${mobileCols} sm:grid-cols-${tabletCols} md:grid-cols-${desktopCols} lg:grid-cols-${desktopCols}`;

  // Alignment classes
  const alignClasses = {
    left: 'justify-start content-start',
    center: 'justify-center content-center',
    right: 'justify-end content-end',
    stretch: 'justify-stretch content-stretch',
  };

  const gridClasses = [
    'grid',
    gridColClasses,
    gap !== 'none' && gapClasses[gap],
    alignClasses[align],
    'content-grid', // Consistent grid alignment
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={gridClasses}>{children}</div>;
};

