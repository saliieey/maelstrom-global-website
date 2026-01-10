'use client';

/**
 * Flex Component
 * MANDATORY: Use this for all flex layouts to ensure consistent alignment
 * NO random flex alignments - always use this component
 */

import { ReactNode } from 'react';

interface FlexProps {
  children: ReactNode;
  className?: string;
  /** Direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Responsive direction */
  responsiveDirection?: {
    mobile?: 'row' | 'column';
    tablet?: 'row' | 'column';
    desktop?: 'row' | 'column';
  };
  /** Justify content (horizontal alignment) */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Align items (vertical alignment) */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Wrap */
  wrap?: boolean | 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Gap */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Flex = ({
  children,
  className = '',
  direction = 'row',
  responsiveDirection,
  justify = 'center',
  align = 'center',
  wrap = false,
  gap = 'md',
}: FlexProps) => {
  const baseDirection = responsiveDirection?.mobile ?? direction;

  // Direction classes
  const directionClasses = `flex-${baseDirection}`;
  const tabletDirection =
    responsiveDirection?.tablet && `md:flex-${responsiveDirection.tablet}`;
  const desktopDirection =
    responsiveDirection?.desktop && `lg:flex-${responsiveDirection.desktop}`;

  // Justify classes
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  // Align classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  // Wrap classes
  const getWrapClass = (wrapValue: boolean | 'nowrap' | 'wrap' | 'wrap-reverse'): string => {
    if (wrapValue === false || wrapValue === 'nowrap') {
      return 'flex-nowrap';
    }
    if (wrapValue === true || wrapValue === 'wrap') {
      return 'flex-wrap';
    }
    if (wrapValue === 'wrap-reverse') {
      return 'flex-wrap-reverse';
    }
    return 'flex-nowrap';
  };

  // Gap classes (uses consistent spacing)
  const gapClasses = {
    none: '',
    sm: 'gap-2 sm:gap-4',
    md: 'gap-4 sm:gap-6 md:gap-8',
    lg: 'gap-6 sm:gap-8 md:gap-10',
    xl: 'gap-8 sm:gap-10 md:gap-12',
  };

  const flexClasses = [
    'flex',
    directionClasses,
    tabletDirection,
    desktopDirection,
    justifyClasses[justify],
    alignClasses[align],
    getWrapClass(wrap),
    gap !== 'none' && gapClasses[gap],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={flexClasses}>{children}</div>;
};

