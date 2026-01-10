/**
 * Maelstrom Global Theme Colors
 * Orange and Black gradient theme for agency website
 */

export const colors = {
  // Primary Orange (Agency Brand)
  orange: {
    50: '#fff4ed',
    100: '#ffe4d4',
    200: '#ffc5a8',
    300: '#ff9d71',
    400: '#ff6b35', // Main orange
    500: '#ff4a16',
    600: '#f02d0c',
    700: '#c71f0b',
    800: '#9e1a10',
    900: '#7f1a12',
  },

  // Black & Grays
  black: {
    pure: '#000000',
    950: '#0a0a0a',
    900: '#171717',
    800: '#262626',
    700: '#404040',
    600: '#525252',
    500: '#737373',
    400: '#a3a3a3',
    300: '#d4d4d4',
    200: '#e5e5e5',
    100: '#f5f5f5',
    50: '#fafafa',
    white: '#ffffff',
  },

  // Gradient Presets
  gradients: {
    primary: 'linear-gradient(135deg, #000000 0%, #ff6b35 100%)',
    primaryReverse: 'linear-gradient(135deg, #ff6b35 0%, #000000 100%)',
    diagonal: 'linear-gradient(45deg, #000000 0%, #ff6b35 50%, #000000 100%)',
    radial: 'radial-gradient(circle, #ff6b35 0%, #000000 100%)',
    hero: 'linear-gradient(180deg, #0a0a0a 0%, #171717 50%, #262626 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(255,107,53,0.2) 100%)',
    text: 'linear-gradient(135deg, #ff6b35 0%, #ff9d71 100%)',
    subtle: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(0,0,0,0.1) 100%)',
  },

  // Semantic Colors
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

/**
 * CSS Variables for theme
 */
export const cssVariables = {
  '--color-primary': colors.orange[400],
  '--color-primary-dark': colors.orange[500],
  '--color-primary-light': colors.orange[300],
  '--color-black': colors.black.pure,
  '--color-black-soft': colors.black[900],
  '--gradient-primary': colors.gradients.primary,
  '--gradient-hero': colors.gradients.hero,
  '--gradient-text': colors.gradients.text,
} as const;

