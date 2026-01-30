# WordPress Integration Setup Guide

This guide will help you set up WordPress as a headless CMS for the Maelstrom Global website, specifically for managing the "Our Works" section dynamically.

## 📋 Overview

The OurWorksSection is designed to fetch content from WordPress, allowing content editors to:
- ✅ Add new works/portfolio items
- ✅ Update existing works
- ✅ Remove works
- ✅ Manage categories
- ✅ Set featured works for home page
- ✅ Control display order

## 🔧 WordPress Setup

### Step 1: Install the Plugin

1. **Upload the Plugin**
   - Copy the file `wordpress-plugin/maelstrom-works-cpt.php` to your WordPress installation
   - Place it in: `/wp-content/plugins/maelstrom-works-cpt/maelstrom-works-cpt.php`

2. **Activate the Plugin**
   - Log into WordPress Admin
   - Go to **Plugins** → **Installed Plugins**
   - Find "Maelstrom Works Custom Post Type"
   - Click **Activate**

### Step 2: Verify Custom Post Type

After activation, you should see:
- A new **"Works"** menu item in the WordPress admin sidebar
- Default categories already created:
  - Social Media
  - Performance Marketing
  - SEO
  - Influencer Marketing
  - Web Development & UI/UX
  - Production
  - Branding & Creative

### Step 3: Test REST API Endpoint

1. Visit: `https://your-wordpress-site.com/wp-json/wp/v2/works`
2. You should see an empty array `[]` (or works if you've added any)
3. If you see a 404 error, check that:
   - The plugin is activated
   - Permalinks are enabled (Settings → Permalinks → Save Changes)

## 📝 Adding Works via WordPress

### Creating a New Work

1. **Navigate to Works**
   - Go to **Works** → **Add New** in WordPress admin

2. **Fill in Basic Information**
   - **Title**: Enter the work title (e.g., "Partnering with Amend Dental")
   - **Content/Description**: Enter the full description (optional, used as fallback)

3. **Set Work Details** (in the "Work Details" meta box)
   - **Description/Tagline**: Short tagline shown below title (e.g., "Where modern care meets confident smiles")
   - **Image 1 URL**: Primary image URL (click "Select Image" to use media library)
   - **Image 1 Alt Text**: Alt text for accessibility
   - **Image 2 URL**: Secondary image URL (optional)
   - **Image 2 Alt Text**: Alt text for secondary image
   - **Featured**: Check this box to show on home page
   - **Order**: Number for sorting (lower numbers appear first)

4. **Select Category**
   - In the right sidebar, select a **Category** from the list

5. **Publish**
   - Click **Publish** to make it live

### Editing Existing Works

1. Go to **Works** → **All Works**
2. Hover over any work and click **Edit**
3. Update fields as needed
4. Click **Update**

### Deleting Works

1. Go to **Works** → **All Works**
2. Hover over a work and click **Trash**
3. Or select multiple works and use **Bulk Actions** → **Move to Trash**

## 🔌 Next.js Configuration

### Step 1: Set Environment Variables

Create or update `.env.local` in your Next.js project root:

```env
WORDPRESS_API_URL=https://your-wordpress-site.com
WORDPRESS_AUTH_TOKEN=your_auth_token_optional
```

**Important Notes:**
- Replace `https://your-wordpress-site.com` with your actual WordPress site URL
- Do NOT include trailing slash
- `WORDPRESS_AUTH_TOKEN` is optional (only needed if your WordPress requires authentication)
- For local development, you might use: `http://localhost:8080` (adjust port as needed)

### Step 2: Verify Connection

1. **Start your Next.js development server:**
   ```bash
   npm run dev
   ```

2. **Check the browser console:**
   - If WordPress is connected: No warnings
   - If WordPress is not connected: You'll see "Failed to fetch works from WordPress" (this is OK, it will use mock data)

3. **Test the API:**
   - Visit `http://localhost:3000/works` in your browser
   - Check Network tab in DevTools
   - Look for requests to your WordPress API

## 🎯 How It Works

### Data Flow

```
WordPress Admin → Works Post Type → REST API → Next.js → Website
```

1. **Content Editor** adds/edits works in WordPress admin
2. **WordPress** stores data in database
3. **REST API** exposes data at `/wp-json/wp/v2/works`
4. **Next.js** fetches data on page load
5. **Website** displays works dynamically

### Fallback Behavior

The system is designed to gracefully handle WordPress connection issues:

- ✅ **WordPress Connected**: Fetches real data from WordPress
- ✅ **WordPress Not Connected**: Falls back to mock data (for development)
- ✅ **API Error**: Shows mock data, logs warning in console
- ✅ **No Works Found**: Shows empty state or mock data

### Caching

- Data is cached for **1 hour** (3600 seconds)
- To see immediate updates, you may need to:
  - Wait for cache to expire, OR
  - Restart the Next.js server, OR
  - Clear Next.js cache

## 📊 API Response Structure

The WordPress REST API returns works in this format:

```json
[
  {
    "id": 1,
    "title": {
      "rendered": "Partnering with Amend Dental"
    },
    "slug": "amend-dental",
    "excerpt": {
      "rendered": "Where modern care meets confident smiles"
    },
    "work_details": {
      "description": "Where modern care meets confident smiles",
      "image1": "https://example.com/image1.jpg",
      "image1_alt": "Amend Dental Campaign",
      "image2": "https://example.com/image2.jpg",
      "image2_alt": "Amend Dental Photography",
      "featured": true,
      "order": 1
    },
    "work_category_names": "Branding & Creative",
    "date": "2024-01-01T00:00:00"
  }
]
```

## 🔍 Troubleshooting

### Issue: Works not appearing on website

**Check:**
1. ✅ Plugin is activated in WordPress
2. ✅ Works are published (not draft)
3. ✅ Environment variable `WORDPRESS_API_URL` is set correctly
4. ✅ WordPress REST API is accessible (visit `/wp-json/wp/v2/works` directly)
5. ✅ Check browser console for errors
6. ✅ Check Next.js terminal for warnings

### Issue: REST API returns 404

**Solutions:**
1. Go to WordPress Admin → **Settings** → **Permalinks**
2. Click **Save Changes** (this refreshes permalink structure)
3. Verify plugin is activated
4. Check that custom post type is registered (use a plugin like "Custom Post Type UI" to verify)

### Issue: Images not loading

**Check:**
1. Image URLs are absolute (include `http://` or `https://`)
2. Images are accessible (try opening URL directly in browser)
3. WordPress media library URLs are correct
4. CORS is enabled if WordPress is on different domain

### Issue: Categories not showing

**Solutions:**
1. Ensure works have categories assigned
2. Check that category names match exactly:
   - "Social Media"
   - "Performance Marketing"
   - "SEO"
   - "Influencer Marketing"
   - "Web Development & UI/UX"
   - "Production"
   - "Branding & Creative"

## 🚀 Production Deployment

### Before Going Live

1. ✅ Set `WORDPRESS_API_URL` in production environment variables
2. ✅ Test WordPress API endpoint is publicly accessible
3. ✅ Verify all works are published
4. ✅ Test featured works appear on home page
5. ✅ Test category filtering works
6. ✅ Verify images load correctly

### Security Considerations

- ✅ WordPress REST API is public by default (works are public content)
- ✅ If you need authentication, set `WORDPRESS_AUTH_TOKEN`
- ✅ Consider rate limiting on WordPress side
- ✅ Use HTTPS for WordPress API URL

## 📚 Additional Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Custom Post Types in WordPress](https://developer.wordpress.org/plugins/post-types/)

## ✅ Checklist

Use this checklist when setting up:

- [ ] WordPress plugin installed and activated
- [ ] Custom post type "Works" appears in admin
- [ ] REST API endpoint accessible (`/wp-json/wp/v2/works`)
- [ ] Environment variable `WORDPRESS_API_URL` set in `.env.local`
- [ ] Test adding a work in WordPress
- [ ] Verify work appears on website
- [ ] Test featured works on home page
- [ ] Test category filtering
- [ ] Verify images load correctly
- [ ] Test updating a work
- [ ] Test deleting a work

---

**Need Help?** Check the console logs and WordPress debug logs for detailed error messages.


