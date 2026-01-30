# Test Your WordPress API

## ✅ Your Work is Published!

Now let's test if it's showing up in the API:

## 🧪 Step 1: Test API Endpoint

**Open this URL in a new browser tab:**
```
https://maelstromglobal.in/wp-json/wp/v2/works
```

**Expected Result:**
You should see JSON data like:
```json
[
  {
    "id": 8167,
    "title": {
      "rendered": "Partnering with Amend Dental"
    },
    ...
  }
]
```

**If you see:** `[]` (empty array) or an error, we need to fix something.

---

## 🔄 Step 2: Restart Next.js Server

**In your terminal:**

1. Stop the server: Press **Ctrl+C**
2. Start again: Run `npm run dev`
3. Wait for it to start

---

## 🎉 Step 3: Check Your Website

**Visit your Next.js website:**
- Go to: `http://localhost:3000`
- Scroll to "Our Works" section
- You should see "Partnering with Amend Dental"!

---

## ✅ Success Checklist

- [ ] API endpoint shows your work (not empty `[]`)
- [ ] Restarted Next.js server
- [ ] Work appears on your website
- [ ] Image loads correctly

---

## 🆘 If Work Doesn't Appear

1. **Check API first:** Visit `https://maelstromglobal.in/wp-json/wp/v2/works`
2. **If empty:** Make sure work is "Published" (not Draft)
3. **If 404:** Go to WordPress → Settings → Permalinks → Save Changes
4. **Check browser console** for errors

---

**Try the API URL now and tell me what you see!**

