# Quick Steps - What To Do Right Now

## ✅ Step 1: Already Done!
Your `.env.local` file now has:
```
WORDPRESS_API_URL=https://maelstromglobal.in
```

---

## 📦 Step 2: Install WordPress Plugin

**In WordPress Admin (where you are now):**

1. **Click "Plugins"** in the left sidebar
2. **Click "Add New"** at the top
3. **Click "Upload Plugin"** button (top of page)
4. **Click "Choose File"**
5. **Navigate to:** `wordpress-plugin/maelstrom-works-cpt.php` in your project folder
6. **Click "Install Now"**
7. **Click "Activate Plugin"**

---

## ✅ Step 3: Verify Installation

After activating, you should see:
- ✅ New menu item **"Works"** in the left sidebar
- ✅ Click **"Works"** → **"All Works"** to see the works page

---

## 🧪 Step 4: Test API

Open this URL in a new browser tab:
```
https://maelstromglobal.in/wp-json/wp/v2/works
```

**Expected result:** You should see `[]` (empty array) - this means it's working!

---

## 🔄 Step 5: Restart Next.js

1. Go to your terminal where Next.js is running
2. Press **Ctrl+C** to stop
3. Run: `npm run dev`
4. Check your website - it should now connect to WordPress!

---

## 🎉 Done!

Now you can:
- Add works in WordPress: **Works** → **Add New**
- Edit works: **Works** → **All Works**
- Delete works: **Works** → **All Works** → Trash

Your Next.js website will automatically show works from WordPress!

---

## 🆘 Troubleshooting

**If you don't see "Works" menu:**
- Make sure plugin is activated
- Refresh the WordPress admin page

**If API shows 404:**
- Go to **Settings** → **Permalinks**
- Click **"Save Changes"** (even without changing anything)
- Try the API URL again

**If Next.js still shows mock data:**
- Make sure `.env.local` has the correct URL
- Restart Next.js server completely
- Check browser console for errors

