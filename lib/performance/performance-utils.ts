/**
 * Performance Utilities
 * Optimize animations and interactions for better performance
 */

/**
 * Throttle function calls to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function calls to delay execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Check if device is low-end (for reducing animations)
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  // Check connection type (if available)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const effectiveType = connection?.effectiveType || '4g';
  
  // Low-end if: < 4 cores OR < 4GB RAM OR slow connection
  return (
    hardwareConcurrency < 4 ||
    deviceMemory < 4 ||
    (effectiveType === '2g' || effectiveType === 'slow-2g')
  );
}

/**
 * Request animation frame wrapper with fallback
 */
export function requestAnimationFrameSafe(callback: FrameRequestCallback): number {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  // Fallback for SSR or unsupported browsers
  return setTimeout(callback, 1000 / 60) as unknown as number;
}

/**
 * Cancel animation frame wrapper
 */
export function cancelAnimationFrameSafe(id: number): void {
  if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Use passive event listeners for better scroll performance
 */
export function usePassiveEventListener(
  element: HTMLElement,
  event: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
): () => void {
  const opts: AddEventListenerOptions = {
    passive: true,
    ...options,
  };

  element.addEventListener(event, handler, opts);

  return () => {
    element.removeEventListener(event, handler, opts);
  };
}

/**
 * Batch DOM reads/writes for better performance
 */
export function batchDOMUpdates(reads: () => void, writes: () => void): void {
  // Read all DOM properties first
  reads();
  
  // Then batch all writes
  requestAnimationFrameSafe(() => {
    writes();
  });
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImage(
  imgElement: HTMLImageElement,
  src: string,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imgElement.src = src;
          imgElement.classList.add('loaded');
          observer.unobserve(imgElement);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.01,
      ...options,
    }
  );

  observer.observe(imgElement);

  return () => {
    observer.unobserve(imgElement);
    observer.disconnect();
  };
}

