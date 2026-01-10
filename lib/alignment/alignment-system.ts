/**
 * Global Alignment System
 * MANDATORY: Consistent alignment across entire project
 * No random alignments - everything follows this system
 */

/**
 * Spacing Scale (8px base unit)
 * Consistent spacing throughout the entire project
 */
export const spacing = {
  // Base spacing units (8px increments)
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  40: '10rem', // 160px
  48: '12rem', // 192px
  64: '16rem', // 256px
} as const;

/**
 * Section Padding (Consistent across all sections)
 */
export const sectionPadding = {
  mobile: {
    y: spacing[12], // 48px vertical
    x: spacing[4], // 16px horizontal
  },
  tablet: {
    y: spacing[16], // 64px vertical
    x: spacing[6], // 24px horizontal
  },
  desktop: {
    y: spacing[20], // 80px vertical
    x: spacing[8], // 32px horizontal
  },
  desktopLarge: {
    y: spacing[24], // 96px vertical
    x: spacing[10], // 40px horizontal
  },
} as const;

/**
 * Container Max Widths (Consistent across all containers)
 */
export const containerMaxWidths = {
  mobile: '100%',
  tablet: '640px',
  tabletPortrait: '768px',
  tabletLandscape: '1024px',
  desktop: '1280px',
  desktopLarge: '1536px',
} as const;

/**
 * Text Alignment Rules
 * MANDATORY: Follow these rules for consistent alignment
 */
export const textAlignment = {
  // Headings: Always center on mobile, center/left on desktop
  heading: {
    mobile: 'center',
    tablet: 'center',
    desktop: 'center', // Can be 'left' or 'center' based on design
  },
  // Body text: Always left-aligned (for readability)
  body: {
    mobile: 'left',
    tablet: 'left',
    desktop: 'left',
  },
  // CTA/Buttons: Always center on mobile, center on desktop
  cta: {
    mobile: 'center',
    tablet: 'center',
    desktop: 'center',
  },
} as const;

/**
 * Content Alignment
 * MANDATORY: Consistent content alignment patterns
 */
export const contentAlignment = {
  // Section content: Center on mobile, center on desktop (unless specified)
  section: {
    mobile: 'center',
    tablet: 'center',
    desktop: 'center',
  },
  // Grid items: Center on mobile, left/center on desktop
  grid: {
    mobile: 'center',
    tablet: 'center',
    desktop: 'center',
  },
  // Cards: Center on mobile, center/left on desktop
  card: {
    mobile: 'center',
    tablet: 'center',
    desktop: 'center',
  },
} as const;

/**
 * Vertical Alignment
 */
export const verticalAlignment = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
} as const;

/**
 * Horizontal Alignment
 */
export const horizontalAlignment = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
} as const;

/**
 * Grid Gap (Consistent spacing between grid items)
 */
export const gridGap = {
  mobile: spacing[4], // 16px
  tablet: spacing[6], // 24px
  desktop: spacing[8], // 32px
  desktopLarge: spacing[10], // 40px
} as const;

/**
 * Get spacing value
 */
export const getSpacing = (size: keyof typeof spacing): string => {
  return spacing[size];
};

/**
 * Get section padding for breakpoint
 */
export const getSectionPadding = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'desktopLarge') => {
  return sectionPadding[breakpoint];
};

/**
 * Get text alignment for type and breakpoint
 */
export const getTextAlignment = (
  type: 'heading' | 'body' | 'cta',
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): string => {
  return textAlignment[type][breakpoint];
};

/**
 * Get content alignment for type and breakpoint
 */
export const getContentAlignment = (
  type: 'section' | 'grid' | 'card',
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): string => {
  return contentAlignment[type][breakpoint];
};

