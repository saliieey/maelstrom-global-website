/**
 * Animation Components Export
 * Centralized export for all animation components
 * 
 * Performance Note: Use LazyFadeIn for better performance (lazy loads GSAP)
 * Use regular FadeIn only when GSAP is already loaded
 */

export { FadeIn } from './FadeIn';
export { ScaleIn } from './ScaleIn';
export { SlideIn } from './SlideIn';
export { StaggerContainer } from './StaggerContainer';
export { Parallax } from './Parallax';

// Performance-optimized versions (recommended)
export { LazyFadeIn } from './LazyFadeIn';
export { PerformanceWrapper } from './PerformanceWrapper';

