'use client';

/**
 * Section Component
 * MANDATORY: Use this for all sections to ensure consistent padding and alignment
 * NO random padding or alignment - always use this component
 */

import { ReactNode, forwardRef, CSSProperties } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Section ID for navigation */
  id?: string;
  /** Background color override */
  backgroundColor?: string;
  /** Override default padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Inline styles */
  style?: CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className = '',
  id,
  backgroundColor,
  padding = 'md',
  style,
}, ref) => {
  const { isMobile, isTablet } = useResponsive();

  const paddingClasses = {
    none: '',
    sm: 'py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8',
    md: 'section', // Uses CSS variable from globals.css
    lg: 'py-16 px-6 sm:py-20 sm:px-8 md:py-24 md:px-10 lg:py-32 lg:px-12',
    xl: 'py-20 px-6 sm:py-24 sm:px-8 md:py-32 md:px-10 lg:py-40 lg:px-12',
  };

  const sectionClasses = [
    'w-full',
    padding !== 'none' && paddingClasses[padding],
    'content-section', // Consistent content alignment
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sectionStyle = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...style,
  };

  return (
    <section
      ref={ref}
      id={id}
      className={sectionClasses}
      style={Object.keys(sectionStyle).length > 0 ? sectionStyle : undefined}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

