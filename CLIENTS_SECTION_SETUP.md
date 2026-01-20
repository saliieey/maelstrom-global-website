# Clients Section Setup Guide

## ✅ What's Been Created

1. **Clients Section Component** (`sections/ClientsSection.tsx`)
   - Dark gradient background matching the reference design
   - "Our Clients" heading with elegant serif font
   - Responsive grid layout (2 columns mobile, 3 tablet, 5 desktop)
   - Smooth scroll animations using GSAP
   - Hover effects (scale + brightness on desktop)
   - Logos displayed in white (using CSS filter)

2. **Folder Structure**
   - Created: `public/assets/images/clients/`
   - This is where your logo files should go

3. **Integration**
   - Added to main page (`app/page.tsx`) after Stats section

## 📋 Next Steps - What You Need to Do

### Step 1: Copy Your Logo Files

1. Open File Explorer
2. Navigate to: `C:\Users\user\Downloads\our clients`
3. Select all 21 logo files
4. Copy them (Ctrl+C)
5. Navigate to: `C:\Users\user\OneDrive\Documents\Projects\maelstrom-global-website\public\assets\images\clients\`
6. Paste them here (Ctrl+V)

### Step 2: Update the Component

After copying the logos, you need to update the `clientLogos` array in `sections/ClientsSection.tsx`:

1. Open `sections/ClientsSection.tsx`
2. Find the `clientLogos` array (around line 30-50)
3. Replace the placeholder entries with your actual logos

**Example:**
```typescript
const clientLogos: ClientLogo[] = [
  { 
    id: "bbk", 
    name: "BBK", 
    src: "/assets/images/clients/bbk.png", // Use your actual filename
    alt: "BBK Logo" 
  },
  { 
    id: "kerala", 
    name: "Government of Kerala", 
    src: "/assets/images/clients/kerala.png", // Use your actual filename
    alt: "Government of Kerala Logo" 
  },
  // ... continue for all 21 logos
];
```

**Important Notes:**
- Use the exact filename as it appears in the `clients` folder
- Include the file extension (.png, .jpg, .svg, etc.)
- The path should always start with `/assets/images/clients/`
- You can name them anything you want (e.g., `bbk-logo.svg`, `client-1.png`, etc.)

### Step 3: Test

1. Run your development server: `npm run dev`
2. Scroll down to see the Clients section
3. Hover over logos to see the animation effect
4. Check on mobile to ensure responsive layout works

## 🎨 Features

- **Dark Gradient Background**: Purple-to-black gradient matching reference
- **Elegant Typography**: Serif font for "Our Clients" heading
- **Responsive Grid**: 
  - Mobile: 2 columns
  - Tablet: 3 columns  
  - Desktop: 5 columns
- **Smooth Animations**: Fade-in and slide-up on scroll
- **Hover Effects**: Scale and brightness increase on desktop
- **White Logos**: CSS filter converts logos to white automatically

## 🔧 Customization

### Change Grid Columns
Edit the grid classes in `ClientsSection.tsx`:
```tsx
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
```

### Change Background Gradient
Edit the `background` style in the section:
```tsx
style={{
  background: "linear-gradient(180deg, #1a0f1a 0%, #0a0a0a 50%, #000000 100%)",
}}
```

### Adjust Hover Effect
Modify the scale and brightness values in the hover animation:
```typescript
const scaleTween = gsap.to(logo, {
  scale: 1.1, // Change this value (1.0 = no scale, 1.2 = 20% larger)
  // ...
});
```

## ❓ Troubleshooting

**Logos not showing?**
- Check file paths are correct in the `clientLogos` array
- Ensure files are in `public/assets/images/clients/`
- Check browser console for 404 errors

**Logos too dark/bright?**
- Adjust `opacity` in the img className (currently `opacity-90`)
- Adjust `brightness` filter if needed

**Hover not working?**
- Hover effects only work on desktop (768px+)
- Check browser console for JavaScript errors

## 📝 File Structure

```
public/
  assets/
    images/
      clients/
        ├── README.md
        ├── logo-1.png (your files)
        ├── logo-2.png
        └── ... (all 21 logos)
```


