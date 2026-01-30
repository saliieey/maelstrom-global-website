# Maelstrom Works WordPress Plugin

This plugin creates a custom post type for managing portfolio works on the Maelstrom Global website.

## Installation

1. **Upload Plugin Files**
   - Copy the entire `wordpress-plugin` folder to your WordPress installation
   - Place it in: `/wp-content/plugins/maelstrom-works-cpt/`

2. **Activate Plugin**
   - Go to WordPress Admin → Plugins
   - Find "Maelstrom Works Custom Post Type"
   - Click "Activate"

## Features

- ✅ Custom Post Type: "Works"
- ✅ Custom Taxonomy: "Work Categories"
- ✅ REST API Support (for headless CMS)
- ✅ Custom Meta Fields:
  - Description/Tagline
  - Image 1 & Image 2 URLs
  - Alt text for images
  - Featured flag (for home page)
  - Display order
- ✅ Default Categories Pre-created

## Usage

### Adding a New Work

1. Go to **Works** → **Add New**
2. Enter title
3. Fill in Work Details meta box:
   - Description/Tagline
   - Image URLs (use "Select Image" button)
   - Alt text
   - Featured checkbox
   - Order number
4. Select category
5. Publish

### REST API Endpoint

Once activated, works are available at:
```
GET /wp-json/wp/v2/works
```

Query parameters:
- `per_page=100` - Number of works to return
- `_embed=1` - Include embedded media
- `status=publish` - Only published works

## Custom Fields

All custom fields are exposed in the REST API under `work_details`:

```json
{
  "work_details": {
    "description": "Short description",
    "image1": "https://example.com/image1.jpg",
    "image1_alt": "Alt text",
    "image2": "https://example.com/image2.jpg",
    "image2_alt": "Alt text",
    "featured": true,
    "order": 1
  }
}
```

## Categories

Default categories created automatically:
- Social Media
- Performance Marketing
- SEO
- Influencer Marketing
- Web Development & UI/UX
- Production
- Branding & Creative

## Support

For setup instructions, see `WORDPRESS_INTEGRATION_SETUP.md` in the project root.


