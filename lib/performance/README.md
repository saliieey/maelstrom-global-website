# Performance Utilities

This directory contains performance optimization utilities for the Maelstrom Global website.

## Files

- **`web-vitals.ts`** - Core Web Vitals tracking and reporting
- **`performance-utils.ts`** - Performance helper functions (throttle, debounce, device detection, etc.)

## Usage

### Track Web Vitals

```typescript
import { reportWebVitals } from '@/lib/performance/web-vitals';

// In your app (usually in _app.tsx or layout.tsx)
if (typeof window !== 'undefined') {
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  });
}
```

### Device Detection

```typescript
import { isLowEndDevice } from '@/lib/performance/performance-utils';

if (isLowEndDevice()) {
  // Reduce animation complexity
  // Skip heavy 3D animations
}
```

### Throttle/Debounce

```typescript
import { throttle, debounce } from '@/lib/performance/performance-utils';

// Throttle scroll handler
const handleScroll = throttle(() => {
  // Runs max once per 100ms
}, 100);

// Debounce resize handler
const handleResize = debounce(() => {
  // Runs 200ms after last call
}, 200);
```

## Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **FCP**: < 1.8s
- **TTFB**: < 800ms

