# 🔧 Fix Your .env.local File RIGHT NOW

## ❌ Current Problem

Your `.env.local` file has:
```
Line 3: WORDPRESS_API_URL=          ← EMPTY! DELETE THIS!
Line 7: WORDPRESS_API_URL=https://maelstromglobal.in  ← KEEP THIS!
```

**The empty one is being read first, so Next.js thinks it's not set!**

---

## ✅ Fix Steps

### Step 1: Open `.env.local` file

### Step 2: Delete line 3
**Delete this entire line:**
```
WORDPRESS_API_URL=
```

### Step 3: Your file should look like this:
```
# WordPress Headless CMS Configuration
WORDPRESS_AUTH_TOKEN=

# Environment
NODE_ENV=development
WORDPRESS_API_URL=https://maelstromglobal.in
```

**OR even simpler:**
```
WORDPRESS_API_URL=https://maelstromglobal.in
NODE_ENV=development
```

### Step 4: Save the file (Ctrl+S)

### Step 5: Restart Server
1. **In terminal:** Press **Ctrl+C** (stop server)
2. **Wait** for it to fully stop
3. **Run:** `npm run dev`
4. **Wait** for it to start

### Step 6: Check Terminal
- ✅ You should **NOT** see: "WORDPRESS API URL is not set"
- ✅ The warning should be **GONE**!

---

## 🎯 Why This Happens

In `.env` files, if you have the same variable twice:
- The **FIRST** one is usually read
- So `WORDPRESS_API_URL=` (empty) on line 3 overrides the correct one on line 7
- Next.js reads the empty value and thinks it's not set

**Solution:** Delete the empty one, keep only the correct one!

---

## ✅ After Fixing

1. Save `.env.local`
2. Restart server (Ctrl+C, then `npm run dev`)
3. Check terminal - warning should be gone
4. Visit your website - works should appear!

---

**Do this now and tell me if the warning disappears!** 🚀

