# Hostinger WordPress Setup Guide

## 🎯 Finding Your WordPress API URL

### Step 1: Find Your WordPress Site URL

**If you already have WordPress installed on Hostinger:**

1. **Log into Hostinger** (hpanel.hostinger.com)
2. **Go to Websites** → Find your website
3. **Click on your website** to see details
4. **Look for "Domain"** or "Website URL" - this is your WordPress site URL

**Examples:**
- `https://yourdomain.com`
- `https://www.yourdomain.com`
- `https://yourdomain.hostingersite.com` (if using Hostinger subdomain)

---

### Step 2: Your WordPress API URL Format

Your WordPress API URL is simply your website URL + `/wp-json/wp/v2/works`

**Format:**
```
https://yourdomain.com/wp-json/wp/v2/works
```

**But for the `.env.local` file, you only need:**
```
WORDPRESS_API_URL=https://yourdomain.com
```

(No `/wp-json` part needed - the code adds that automatically)

---

## 📋 Complete Setup Steps

### Option A: WordPress Already Installed

1. **Find your WordPress URL** (from Hostinger panel)
2. **Create `.env.local` file** in your project root
3. **Add this line:**
   ```
   WORDPRESS_API_URL=https://yourdomain.com
   ```
   (Replace `yourdomain.com` with your actual domain)

4. **Install the WordPress Plugin:**
   - Log into WordPress admin: `https://yourdomain.com/wp-admin`
   - Go to **Plugins** → **Add New** → **Upload Plugin**
   - Upload `wordpress-plugin/maelstrom-works-cpt.php`
   - Activate the plugin

5. **Test the API:**
   - Visit: `https://yourdomain.com/wp-json/wp/v2/works`
   - You should see `[]` (empty array) or works if you've added any

6. **Restart your Next.js server:**
   ```bash
   npm run dev
   ```

---

### Option B: WordPress NOT Installed Yet

**If you don't have WordPress on Hostinger yet:**

1. **Install WordPress:**
   - Log into Hostinger (hpanel.hostinger.com)
   - Go to **Websites** → **Create Website**
   - Choose **WordPress** option
   - Follow the installation wizard
   - Note your website URL

2. **Then follow Option A steps above**

---

## 🔍 How to Find Your Exact URL

### Method 1: From Hostinger Panel
1. Log in to Hostinger
2. Go to **Websites**
3. Click on your website
4. Look for **"Domain"** or **"Primary Domain"**
5. Copy that URL

### Method 2: From WordPress Admin
1. Log into WordPress: `https://yourdomain.com/wp-admin`
2. Go to **Settings** → **General**
3. Look at **"WordPress Address (URL)"** and **"Site Address (URL)"**
4. Use the **"Site Address (URL)"** value

### Method 3: Test Your Domain
1. Open your browser
2. Type your domain (e.g., `https://yourdomain.com`)
3. If WordPress loads, that's your URL!

---

## ✅ Example Setup

**If your domain is `maelstromglobal.com`:**

1. **In `.env.local` file:**
   ```
   WORDPRESS_API_URL=https://maelstromglobal.com
   ```

2. **WordPress API endpoint will be:**
   ```
   https://maelstromglobal.com/wp-json/wp/v2/works
   ```

3. **WordPress admin:**
   ```
   https://maelstromglobal.com/wp-admin
   ```

---

## 🧪 Testing Your Setup

### Test 1: Check WordPress is Running
Visit: `https://yourdomain.com`
- ✅ Should show WordPress site
- ❌ If not, WordPress isn't installed yet

### Test 2: Check REST API Works
Visit: `https://yourdomain.com/wp-json/wp/v2/works`
- ✅ Should show `[]` or JSON data
- ❌ If 404, plugin not activated or permalinks need refresh

### Test 3: Check Plugin is Active
1. Go to WordPress admin: `https://yourdomain.com/wp-admin`
2. Go to **Plugins**
3. Look for "Maelstrom Works Custom Post Type"
4. Should show "Active"

---

## 🆘 Common Issues

### Issue: "404 Not Found" when accessing API

**Solution:**
1. Go to WordPress admin
2. **Settings** → **Permalinks**
3. Click **"Save Changes"** (even if you don't change anything)
4. This refreshes the permalink structure

### Issue: "WORDPRESS_API_URL is not set"

**Solution:**
1. Make sure `.env.local` file exists in project root
2. Make sure it has: `WORDPRESS_API_URL=https://yourdomain.com`
3. Restart Next.js server (stop and run `npm run dev` again)

### Issue: Can't access WordPress admin

**Solution:**
1. Check your domain is correct
2. Check WordPress is installed
3. Contact Hostinger support if needed

---

## 📝 Quick Checklist

- [ ] WordPress installed on Hostinger
- [ ] Know your WordPress site URL
- [ ] Created `.env.local` file
- [ ] Added `WORDPRESS_API_URL=https://yourdomain.com`
- [ ] Installed WordPress plugin (`maelstrom-works-cpt.php`)
- [ ] Activated plugin in WordPress admin
- [ ] Tested API endpoint: `https://yourdomain.com/wp-json/wp/v2/works`
- [ ] Restarted Next.js server

---

## 💡 Pro Tip

**If you're not sure about your URL:**
1. Log into Hostinger
2. Go to **Websites**
3. Click on your website
4. Look for the domain/URL shown there
5. That's your WordPress URL!

---

**Need more help?** Check the Hostinger support or WordPress documentation.

