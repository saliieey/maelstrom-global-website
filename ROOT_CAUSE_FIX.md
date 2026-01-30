# 🎯 ROOT CAUSE FOUND & FIXED!

## ❌ The Real Problem

Your project uses **static export** (`output: "export"` in `next.config.ts`).

**In static exports:**
- `process.env` variables are **NOT available** in client components at runtime
- Only `NEXT_PUBLIC_*` variables are available in the browser
- Your `OurWorksSection` is a **client component** (`"use client"`)
- So it can't read `WORDPRESS_API_URL`!

---

## ✅ What I Fixed

I updated `lib/wordpress.ts` to support both:
- `NEXT_PUBLIC_WORDPRESS_API_URL` (for static export/client-side)
- `WORDPRESS_API_URL` (for server-side/SSR)

---

## 🔧 What You Need to Do

### Step 1: Update `.env.local` File

**Change this:**
```
WORDPRESS_API_URL=https://maelstromglobal.in
```

**To this:**
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://maelstromglobal.in
```

**OR keep both:**
```
WORDPRESS_API_URL=https://maelstromglobal.in
NEXT_PUBLIC_WORDPRESS_API_URL=https://maelstromglobal.in
```

### Step 2: Restart Server

1. **Stop server:** Press **Ctrl+C**
2. **Start again:** `npm run dev`

### Step 3: Check Terminal

- ✅ Warning should be **GONE**!
- ✅ Works should appear on your website!

---

## 🎯 Why This Happens

**Static Export Mode:**
- Your site is pre-built as static HTML
- No server at runtime
- Environment variables need `NEXT_PUBLIC_` prefix to be available in browser
- Without prefix, they're only available at build time (server-side)

**Client Components:**
- `OurWorksSection` runs in the browser
- Needs `NEXT_PUBLIC_` prefix to access env variables
- Without it, `process.env.WORDPRESS_API_URL` is `undefined`

---

## ✅ Summary

- ✅ **Root Cause:** Static export + client component = can't read env vars
- ✅ **Solution:** Use `NEXT_PUBLIC_WORDPRESS_API_URL` in `.env.local`
- ✅ **Code Fixed:** Updated `lib/wordpress.ts` to support both formats

**Update your `.env.local` file now and restart!** 🚀

