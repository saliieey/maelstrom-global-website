# ✅ Plugin is Active! Next Steps

## ✅ Current Status
- ✅ WordPress plugin installed and ACTIVE
- ✅ "Works" menu visible in WordPress sidebar
- ✅ `.env.local` configured with WordPress URL

---

## 🧪 Step 1: Test API Endpoint

**Open this URL in a new browser tab:**
```
https://maelstromglobal.in/wp-json/wp/v2/works
```

**Expected Result:**
- You should see `[]` (empty array) - this means API is working!

---

## 📝 Step 2: Add Your First Work

**In WordPress Admin:**

1. **Click "Works"** in the left sidebar
2. **Click "Add New"**
3. **Fill in the form:**
   - **Title:** "Partnering with Amend Dental" (or any title)
   - **Description/Tagline:** "Where modern care meets confident smiles"
   - **Category:** Select "Branding & Creative" (or any category)
   - **Image 1 URL:** Click "Select Image" button, choose an image
   - **Image 1 Alt Text:** "Amend Dental Campaign"
   - **Featured:** ✅ Check this box (to show on home page)
   - **Order:** 1
4. **Click "Publish"**

---

## 🔄 Step 3: Restart Next.js Server

**In your terminal:**

1. Stop the server: Press **Ctrl+C**
2. Start again: Run `npm run dev`
3. Wait for it to start

---

## 🎉 Step 4: Check Your Website

**Visit your Next.js website:**
- Go to: `http://localhost:3000` (or your dev URL)
- Scroll to "Our Works" section
- You should see the work you just added!

---

## ✅ Success Checklist

- [ ] API endpoint shows `[]` or works data
- [ ] Added at least one work in WordPress
- [ ] Restarted Next.js server
- [ ] Works appear on your website

---

## 🆘 Troubleshooting

**If works don't appear:**
1. Check browser console for errors
2. Verify `.env.local` has correct URL
3. Make sure work is "Published" (not draft)
4. Check API endpoint directly in browser

**If API shows 404:**
1. Go to WordPress: **Settings** → **Permalinks**
2. Click **"Save Changes"** (even without changing)
3. Try API URL again

---

## 🎯 You're Almost Done!

Once you see works on your website, everything is working perfectly! 🎉

