/**
 * Core Web Vitals Tracking
 * Monitor performance metrics for SEO and user experience
 */

export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Report Web Vitals to analytics or logging service
 */
export function reportWebVitals(metric: WebVitalMetric) {
  // Core Web Vitals thresholds (as per Google)
  const thresholds = {
    LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
    FID: { good: 100, needsImprovement: 300 }, // First Input Delay
    CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
    FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
    TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: `${metric.value.toFixed(2)}ms`,
      rating: metric.rating,
    });
  }

  // Send to analytics (Google Analytics, Vercel Analytics, etc.)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', metric.name, {
      value: metric.value,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
}

/**
 * Measure page load performance
 */
export function measurePageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;

    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance] Page Load Time:', `${pageLoadTime}ms`);
      console.log('[Performance] DOM Content Loaded:', `${domContentLoaded}ms`);
    }
  });
}

