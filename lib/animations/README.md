# Animation System Documentation

## Overview

This animation system is designed to showcase Maelstrom Global's technical capabilities through impressive, high-performance animations that create an engaging user experience.

## 🎯 Animation Strategy

### Core Principles
1. **Consistent Scroll Animations** - Every section animates on scroll entry
2. **Performance First** - Optimized for 60fps on all devices
3. **Accessibility** - Respects `prefers-reduced-motion`
4. **Progressive Enhancement** - Works without JavaScript fallback

## 📚 Libraries Used

### Primary Libraries
- **GSAP** (v3.12.5) - Advanced scroll-triggered animations
- **Three.js** (v0.169.0) - 3D graphics and interactive elements
- **Framer Motion** (v11.3.19) - React-friendly animations
- **Lenis** (v1.0.42) - Buttery smooth scrolling
- **Motion One** (v11.3.16) - Lightweight, performant animations
- **Lottie** (v2.4.0) - Complex After Effects animations

### Supporting Libraries
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber

## 🎨 Animation Types

### 1. Scroll-Triggered Animations (GSAP)
- **Fade In** - Elements fade in as they enter viewport
- **Scale In** - Elements scale from small to full size
- **Slide In** - Elements slide in from any direction (left, right, top, bottom)
- **Parallax** - Background elements move at different speeds
- **Text Reveal** - Character-by-character or word-by-word reveals
- **Stagger** - Multiple elements animate in sequence
- **Clip Path Reveal** - Elements reveal using clip-path transitions
- **Pin** - Elements stay fixed during scroll

### 2. 3D Animations (Three.js)
- **3D Models** - Interactive 3D objects
- **Particle Systems** - Dynamic particle effects
- **Rotating Meshes** - 3D objects with rotation
- **Gradient Backgrounds** - 3D shader-based gradients
- **Scroll-Controlled 3D** - 3D elements that respond to scroll

### 3. React Animations (Framer Motion)
- **Component Transitions** - Smooth component state changes
- **Layout Animations** - Automatic layout shift animations
- **Gesture Animations** - Drag, hover, tap interactions
- **Page Transitions** - Smooth navigation between pages

### 4. Smooth Scrolling (Lenis)
- **Buttery Smooth Scroll** - 60fps scrolling experience
- **Momentum Scrolling** - Natural scroll feel
- **Scroll Events** - Fine-grained scroll position tracking

## 🔧 Usage Examples

### Basic Fade In
```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={0.2} y={50}>
  <div>This will fade in on scroll</div>
</FadeIn>
```

### Staggered List Animation
```tsx
import { StaggerContainer } from '@/components/animations';

<StaggerContainer stagger={0.1}>
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</StaggerContainer>
```

### Parallax Background
```tsx
import { Parallax } from '@/components/animations';

<Parallax speed={0.5}>
  <div className="background-image" />
</Parallax>
```

### 3D Element
```tsx
import { Scroll3DScene, RotatingMesh } from '@/lib/animations/three-utils';

<Scroll3DScene>
  <RotatingMesh position={[0, 0, 0]} color="#ff6b35" />
</Scroll3DScene>
```

### GSAP Animation Hook
```tsx
import { fadeInOnScroll } from '@/lib/animations/gsap-utils';
import { useEffect, useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      fadeInOnScroll(ref.current, { duration: 1, y: 50 });
    }
  }, []);
  
  return <div ref={ref}>Animated content</div>;
}
```

## 🎯 Implementation Guidelines

### Performance Best Practices
1. **Use `will-change` sparingly** - Only on actively animating elements
2. **Prefer transforms** - Use `transform` and `opacity` for animations
3. **Debounce scroll events** - Use GSAP's ScrollTrigger instead of scroll listeners
4. **Lazy load 3D** - Only load Three.js when needed
5. **Reduce motion** - Always check `prefers-reduced-motion`

### Accessibility
- All animations respect `prefers-reduced-motion: reduce`
- AnimationProvider automatically detects and disables animations for users who prefer reduced motion
- Use semantic HTML for screen reader compatibility

### Responsive Considerations
- Test animations on mobile, tablet, and desktop
- Reduce animation complexity on mobile devices if needed
- Use `matchMedia` for device-specific animations

## 🎨 Color Theme

The animation system uses the orange and black gradient theme:

- **Primary Orange**: `#ff6b35`
- **Black**: `#000000`
- **Gradients**: Defined in `lib/theme/colors.ts`

## 📖 Component Reference

### Animation Components
- `<FadeIn>` - Fade in animation
- `<ScaleIn>` - Scale in animation
- `<SlideIn>` - Slide in from direction
- `<StaggerContainer>` - Stagger children animations
- `<Parallax>` - Parallax scrolling effect

### Hooks
- `useScrollAnimation()` - Scroll-triggered animation hook
- `useScrollProgress()` - Track overall scroll progress
- `useElementScroll()` - Track element scroll position
- `useAnimation()` - Access animation context

### Utilities
- `fadeInOnScroll()` - GSAP fade in utility
- `scaleInOnScroll()` - GSAP scale in utility
- `slideInOnScroll()` - GSAP slide in utility
- `parallaxScroll()` - GSAP parallax utility
- `staggerFadeIn()` - GSAP stagger utility
- `initSmoothScroll()` - Lenis smooth scroll init
- `scrollTo()` - Programmatic scroll

## 🚀 Next Steps

When implementing pages:
1. Wrap page content in `<AnimationProvider>` (already in layout)
2. Use animation components for scroll-triggered effects
3. Add 3D elements where appropriate to showcase capabilities
4. Test on all device sizes
5. Verify accessibility with reduced motion

