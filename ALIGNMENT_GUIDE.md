# 📐 Alignment System Guide - MANDATORY Global Consistency

## Overview

**MANDATORY RULE**: **NO random alignments allowed** - Everything MUST use the consistent alignment system defined here. This ensures pixel-perfect alignment across **ENTIRE PROJECT** - every page, every component.

## 🎯 Core Principles

1. **Consistent Spacing** - 8px base unit system
2. **Consistent Padding** - Section padding follows breakpoint rules
3. **Consistent Alignment** - Text and content alignment follows type rules
4. **Consistent Grid Gap** - Grid spacing follows breakpoint rules
5. **Global Application** - Applied to ENTIRE project, not per-page

---

## 📏 Spacing System (8px Base Unit)

**MANDATORY**: All spacing uses this system - NO random values.

```typescript
const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px - BASE UNIT
  4: '1rem', // 16px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  // ... continues
}
```

**Usage**:
- ✅ `padding: var(--spacing-4)` // 16px
- ❌ `padding: 17px` // NO - not in system
- ❌ `padding: 1.3rem` // NO - not in system

---

## 📦 Section Padding (MANDATORY)

**ALL sections** must use consistent padding:

| Breakpoint | Vertical | Horizontal |
|------------|----------|------------|
| Mobile | 48px (--spacing-12) | 16px (--spacing-4) |
| Tablet | 64px (--spacing-16) | 24px (--spacing-6) |
| Desktop | 80px (--spacing-20) | 32px (--spacing-8) |
| Desktop Large | 96px (--spacing-24) | 40px (--spacing-10) |

**Usage**:
```tsx
import { Section } from '@/components/alignment';

<Section> {/* Automatically uses consistent padding */}
  <Content />
</Section>
```

**CSS Class**:
```css
.section {
  padding: var(--section-padding-y-mobile) var(--section-padding-x-mobile);
}

@media (min-width: 1024px) {
  .section {
    padding: var(--section-padding-y-desktop) var(--section-padding-x-desktop);
  }
}
```

---

## 🎯 Container Alignment (MANDATORY)

**ALL containers** must use consistent max-widths:

| Breakpoint | Max Width |
|------------|-----------|
| Mobile | 100% |
| Tablet | 640px |
| Tablet Portrait | 768px |
| Tablet Landscape | 1024px |
| Desktop | 1280px |
| Desktop Large | 1536px |

**Usage**:
```tsx
import { Container } from '@/components/alignment';

<Container maxWidth="xl" align="center"> {/* Consistent alignment */}
  <Content />
</Container>
```

**CSS Class**:
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px; /* Desktop default */
}
```

---

## 📝 Text Alignment Rules (MANDATORY)

**NO random text alignment** - Follow these rules:

### Headings
- **Mobile**: Always center
- **Tablet**: Always center
- **Desktop**: Center (can be changed to left based on design)

### Body Text
- **Mobile**: Always left
- **Tablet**: Always left
- **Desktop**: Always left

### CTA/Buttons
- **Mobile**: Always center
- **Tablet**: Always center
- **Desktop**: Always center

**Usage**:
```tsx
// ✅ Correct
<h1 className="text-heading">Heading</h1>
<p className="text-body">Body text</p>
<div className="text-cta"><Button /></div>

// ❌ Wrong
<h1 className="text-left">Heading</h1> // NO - use text-heading
<p className="text-center">Body</p> // NO - body should be left
```

**CSS Classes**:
```css
.text-heading { text-align: center; }
.text-body { text-align: left; }
.text-cta { text-align: center; }
```

---

## 🎨 Content Alignment Rules (MANDATORY)

**ALL content** must follow consistent alignment:

### Sections
- **Mobile**: Center
- **Desktop**: Center (unless specified otherwise)

### Grid Items
- **Mobile**: Center
- **Desktop**: Center (unless specified otherwise)

### Cards
- **Mobile**: Center
- **Desktop**: Center (unless specified otherwise)

**CSS Classes**:
```css
.content-section { text-align: center; }
.content-grid { text-align: center; }
.content-card { text-align: center; }
```

---

## 🔲 Grid Gap System (MANDATORY)

**ALL grids** must use consistent gap spacing:

| Breakpoint | Gap |
|------------|-----|
| Mobile | 16px (--spacing-4) |
| Tablet | 24px (--spacing-6) |
| Desktop | 32px (--spacing-8) |
| Desktop Large | 40px (--spacing-10) |

**Usage**:
```tsx
import { Grid } from '@/components/alignment';

<Grid cols={3} gap="md"> {/* Consistent gap */}
  <Card />
  <Card />
  <Card />
</Grid>
```

**CSS Class**:
```css
.grid {
  gap: var(--grid-gap-mobile);
}

@media (min-width: 1024px) {
  .grid {
    gap: var(--grid-gap-desktop);
  }
}
```

---

## 🧩 Alignment Components

### Section Component

**MANDATORY**: Use for ALL sections.

```tsx
import { Section } from '@/components/alignment';

<Section id="about" padding="md">
  <Container>
    <Content />
  </Container>
</Section>
```

**Props**:
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl' (uses consistent system)
- `id`: Section ID for navigation
- `backgroundColor`: Optional background override

### Container Component

**MANDATORY**: Use for ALL content containers.

```tsx
import { Container } from '@/components/alignment';

<Container maxWidth="xl" align="center" padding={true}>
  <Content />
</Container>
```

**Props**:
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none'
- `align`: 'left' | 'center' | 'right'
- `padding`: boolean | 'sm' | 'md' | 'lg'

### Grid Component

**MANDATORY**: Use for ALL grids.

```tsx
import { Grid } from '@/components/alignment';

<Grid 
  cols={3}
  responsiveCols={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap="md"
  align="center"
>
  <Card />
  <Card />
  <Card />
</Grid>
```

**Props**:
- `cols`: 1 | 2 | 3 | 4 | 6 | 12
- `responsiveCols`: { mobile?, tablet?, desktop? }
- `gap`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `align`: 'left' | 'center' | 'right' | 'stretch'

### Flex Component

**MANDATORY**: Use for ALL flex layouts.

```tsx
import { Flex } from '@/components/alignment';

<Flex 
  direction="row"
  justify="center"
  align="center"
  gap="md"
>
  <Item />
  <Item />
</Flex>
```

**Props**:
- `direction`: 'row' | 'column' | 'row-reverse' | 'column-reverse'
- `responsiveDirection`: { mobile?, tablet?, desktop? }
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- `align`: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
- `wrap`: boolean | 'nowrap' | 'wrap' | 'wrap-reverse'
- `gap`: 'none' | 'sm' | 'md' | 'lg' | 'xl'

---

## ✅ Implementation Checklist

### For Every Page/Component

- [ ] Use `<Section>` component for all sections
- [ ] Use `<Container>` component for all content containers
- [ ] Use `<Grid>` component for all grids
- [ ] Use `<Flex>` component for all flex layouts
- [ ] Use `text-heading`, `text-body`, `text-cta` classes for text
- [ ] Use consistent spacing values (8px base unit)
- [ ] Use section padding (responsive)
- [ ] Use grid gap (responsive)
- [ ] NO random alignments
- [ ] NO random spacing values
- [ ] NO inline styles for alignment/spacing

---

## ❌ Common Mistakes to Avoid

### ❌ DON'T:

1. **Random Text Alignment**
   ```tsx
   // ❌ WRONG
   <h1 className="text-left">Heading</h1>
   
   // ✅ CORRECT
   <h1 className="text-heading">Heading</h1>
   ```

2. **Random Padding**
   ```tsx
   // ❌ WRONG
   <div className="py-7 px-5">Content</div>
   
   // ✅ CORRECT
   <Section padding="md">Content</Section>
   ```

3. **Random Max-Widths**
   ```tsx
   // ❌ WRONG
   <div className="max-w-[1173px]">Content</div>
   
   // ✅ CORRECT
   <Container maxWidth="xl">Content</Container>
   ```

4. **Random Grid Gaps**
   ```tsx
   // ❌ WRONG
   <div className="grid gap-[23px]">Grid</div>
   
   // ✅ CORRECT
   <Grid gap="md">Grid</Grid>
   ```

5. **Inline Styles for Alignment**
   ```tsx
   // ❌ WRONG
   <div style={{ padding: '17px', textAlign: 'center' }}>
   
   // ✅ CORRECT
   <Section padding="md">
     <Container align="center">
   ```

---

## 🎯 Best Practices

### 1. **Always Use Components**

**For Sections**:
```tsx
import { Section } from '@/components/alignment';

<Section id="hero" padding="lg">
  {/* Content */}
</Section>
```

**For Containers**:
```tsx
import { Container } from '@/components/alignment';

<Container maxWidth="xl" align="center">
  {/* Content */}
</Container>
```

**For Grids**:
```tsx
import { Grid } from '@/components/alignment';

<Grid cols={3} gap="md" align="center">
  {/* Items */}
</Grid>
```

### 2. **Use CSS Variables**

When you need custom spacing, use CSS variables:

```css
/* ✅ CORRECT */
.custom-element {
  padding: var(--spacing-4); /* 16px */
  margin: var(--spacing-8); /* 32px */
}

/* ❌ WRONG */
.custom-element {
  padding: 17px; /* Not in system */
  margin: 1.3rem; /* Not in system */
}
```

### 3. **Follow Alignment Rules**

**Text Alignment**:
- Headings: `text-heading` (center)
- Body: `text-body` (left)
- CTA: `text-cta` (center)

**Content Alignment**:
- Sections: `content-section` (center)
- Grids: `content-grid` (center)
- Cards: `content-card` (center)

---

## 📊 Alignment Examples

### Complete Page Structure

```tsx
import { Section, Container, Grid } from '@/components/alignment';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section id="hero" padding="xl">
        <Container maxWidth="xl" align="center">
          <h1 className="text-heading">Hero Heading</h1>
          <p className="text-body">Hero description</p>
          <div className="text-cta">
            <Button>CTA</Button>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services" padding="md">
        <Container maxWidth="xl" align="center">
          <h2 className="text-heading">Services</h2>
          <Grid cols={3} gap="md" align="center">
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </Grid>
        </Container>
      </Section>

      {/* About Section */}
      <Section id="about" padding="md">
        <Container maxWidth="lg" align="left">
          <h2 className="text-heading">About</h2>
          <p className="text-body">About content...</p>
        </Container>
      </Section>
    </>
  );
}
```

---

## 🔧 Troubleshooting

### Issue: Inconsistent Alignment

**Solution**: Always use alignment components and classes:
```tsx
// ✅ Use components
<Section>
  <Container align="center">
    <h1 className="text-heading">Title</h1>
  </Container>
</Section>
```

### Issue: Random Spacing

**Solution**: Use spacing system:
```tsx
// ✅ Use spacing variables
<div className="p-4 sm:p-6 md:p-8"> {/* Uses 16px/24px/32px */}
```

### Issue: Layout Collapse

**Solution**: Use Section and Container components:
```tsx
// ✅ Use Section and Container
<Section padding="md">
  <Container maxWidth="xl">
    {/* Content */}
  </Container>
</Section>
```

---

## 📚 Files Reference

- `lib/alignment/alignment-system.ts` - Alignment system definitions
- `components/alignment/Section.tsx` - Section component
- `components/alignment/Container.tsx` - Container component
- `components/alignment/Grid.tsx` - Grid component
- `components/alignment/Flex.tsx` - Flex component
- `app/globals.css` - Global alignment CSS classes and variables

---

## 🚨 MANDATORY REMINDER

**NO random alignments allowed!**

- ✅ Always use alignment components
- ✅ Always use alignment classes
- ✅ Always use consistent spacing
- ✅ Always follow alignment rules
- ❌ NO inline styles for alignment
- ❌ NO random spacing values
- ❌ NO per-page alignment overrides

**This system applies to ENTIRE PROJECT - every page, every component!** 📐

