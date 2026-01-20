# Client Logos

## How to Add Your Client Logos

1. **Copy your logos from Downloads:**
   - Navigate to your Downloads folder
   - Find the "our clients" folder
   - Copy all 21 logo files to this directory: `public/assets/images/clients/`

2. **Supported File Formats:**
   - PNG (recommended for logos with transparency)
   - JPG/JPEG
   - SVG (best for scalable logos)
   - WEBP

3. **Naming Convention:**
   - You can name them however you like (e.g., `client-1.png`, `bbk-logo.svg`, etc.)
   - After copying, update the `clientLogos` array in `sections/ClientsSection.tsx` with your actual filenames

4. **Example Update:**
   ```typescript
   const clientLogos: ClientLogo[] = [
     { id: "client-1", name: "BBK", src: "/assets/images/clients/bbk-logo.png", alt: "BBK Logo" },
     { id: "client-2", name: "Government of Kerala", src: "/assets/images/clients/kerala-logo.png", alt: "Government of Kerala Logo" },
     // ... continue for all 21 logos
   ];
   ```

5. **Logo Requirements:**
   - Logos will be displayed in white (using CSS filter)
   - Recommended size: 200x200px minimum (will scale automatically)
   - Transparent backgrounds work best
   - High resolution logos will look better

## Current Status

⚠️ **Action Required:** Copy your 21 logo files from Downloads to this folder, then update the `clientLogos` array in `sections/ClientsSection.tsx`.


