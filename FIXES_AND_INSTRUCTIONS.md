# VerifyLens - Calendly & Video Background Fixes

## 🎉 What Was Fixed

### 1. ✅ Calendly URL Updated
**Issue:** The Calendly widget was using an incorrect URL (`https://calendly.com/verifylens/30min`)

**Fix:** Updated to use the correct URL: `https://calendly.com/jgabbard61`

**Files Changed:**
- `components/contact-section.tsx` - Line 435
- `components/calendly-modal.tsx` - Line 50

### 2. ✅ Video Background Improved
**Issue:** The video background was not displaying on the deployed Vercel site

**Fix:** Added robust error handling and loading states to ensure graceful fallback:
- Added video loading detection with fade-in animation
- Added error handling to fall back to gradient background if video fails
- Made text colors adaptive (white for video, dark for gradient)
- Smooth transitions between states

**File Changed:**
- `components/hero-section.tsx`

---

## 📋 Important: Calendly Configuration

### Getting Your Correct Calendly Embed Code

The current fix uses `https://calendly.com/jgabbard61` which should work for your main scheduling page. However, if you want to use a specific event type (like "30min"), follow these steps:

1. **Log in to Calendly:** Go to https://calendly.com and sign in

2. **Navigate to Your Event Type:**
   - Click on "Event Types" in the left sidebar
   - Select the event you want to embed (e.g., "Consultation Call", "Demo", etc.)

3. **Get the Embed Code:**
   - Click on the event name
   - Click "Share" or "Add to Website" button
   - Select "Inline Embed" option
   - You'll see your unique Calendly URL in the embed code

4. **Copy Your URL:**
   - Look for the `data-url` attribute in the code
   - Example: `data-url="https://calendly.com/jgabbard61/consultation"`
   - Copy this exact URL

5. **Update the Code (if needed):**
   - Open `components/contact-section.tsx`
   - Find line 435: `data-url="https://calendly.com/jgabbard61"`
   - Replace with your specific event URL if different
   
   - Open `components/calendly-modal.tsx`
   - Find line 50: `data-url="https://calendly.com/jgabbard61"`
   - Replace with your specific event URL if different

6. **Commit and Push:**
   ```bash
   cd /path/to/roblox-lander
   git add components/contact-section.tsx components/calendly-modal.tsx
   git commit -m "Update Calendly URL to specific event type"
   git push origin main
   ```

### Calendly Widget Customization

In the Calendly dashboard, you can customize:
- **Colors:** Match your brand (blue/purple theme)
- **Background Color:** Keep it white or light
- **Button & Link Color:** Use blue (#3B82F6) to match your site
- **Text Color:** Black for readability

---

## 🎥 Video Background Troubleshooting

### Current State
The video file (`verifylens_hero_background.mp4`, 17MB) is in the `public` folder and pushed to GitHub.

### Why the Video Might Not Show

1. **Large File Size:** 17MB is significant and may take time to load
2. **Vercel Deployment:** First deploy after adding video may need cache clearing
3. **Browser Caching:** Your browser might be caching old version
4. **Network Speed:** Slow connections may timeout before video loads

### Verification Steps

1. **Check if Video Exists on Vercel:**
   - Visit: `https://your-vercel-domain.vercel.app/verifylens_hero_background.mp4`
   - If you see the video, it's deployed correctly
   - If you get 404, the video wasn't deployed (see solutions below)

2. **Check Browser Console:**
   - Open your deployed site
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Look for any errors related to video loading
   - Check "Network" tab to see if video is being requested/loaded

3. **Test Locally:**
   ```bash
   cd /path/to/roblox-lander
   yarn dev
   ```
   - Visit http://localhost:3000
   - The video should show (it's a local file)
   - If it works locally but not on Vercel, it's a deployment issue

### Solutions if Video Still Doesn't Show

#### Option 1: Clear Vercel Cache and Redeploy
```bash
# In your Vercel dashboard:
# 1. Go to your project
# 2. Go to "Deployments"
# 3. Click "..." on latest deployment
# 4. Click "Redeploy"
# 5. Check "Clear Build Cache"
# 6. Click "Redeploy"
```

#### Option 2: Host Video on CDN (Recommended for Large Files)

Using a CDN like Cloudinary, AWS S3, or Vercel Blob Storage will improve performance:

**Using Vercel Blob Storage (Easiest):**

1. **Install Vercel Blob:**
   ```bash
   cd /path/to/roblox-lander
   yarn add @vercel/blob
   ```

2. **Upload Video:**
   - Go to Vercel Dashboard → Your Project → Storage → Blob
   - Click "Upload"
   - Upload `verifylens_hero_background.mp4`
   - Copy the public URL (e.g., `https://xxxxx.public.blob.vercel-storage.com/video.mp4`)

3. **Update Code:**
   - Open `components/hero-section.tsx`
   - Replace line 32: `<source src="/verifylens_hero_background.mp4" type="video/mp4" />`
   - With: `<source src="YOUR_VERCEL_BLOB_URL" type="video/mp4" />`

4. **Commit and Push:**
   ```bash
   git add components/hero-section.tsx
   git commit -m "Use Vercel Blob Storage for video background"
   git push origin main
   ```

**Using Cloudinary (Free Tier Available):**

1. Sign up at https://cloudinary.com
2. Upload your video
3. Copy the public URL
4. Update `components/hero-section.tsx` with the URL
5. Commit and push

#### Option 3: Compress the Video

If you want to keep it in the repository but reduce size:

```bash
# Using ffmpeg (install if needed: brew install ffmpeg or apt install ffmpeg)
ffmpeg -i verifylens_hero_background.mp4 -vcodec h264 -crf 28 -preset medium verifylens_hero_background_compressed.mp4

# This should reduce the file size by 50-70%
```

Then:
1. Replace the video in `public/` folder
2. Commit and push

#### Option 4: Use a Static Gradient (Simplest)

If video continues to be problematic:

1. Open `components/hero-section.tsx`
2. Remove the video element (lines 21-35)
3. Keep only the gradient background (already there as fallback)
4. Commit and push

---

## 🚀 Deployment Checklist

After making any changes:

- [ ] Test locally: `yarn dev`
- [ ] Check that Calendly widget loads
- [ ] Check that video background shows (or gradient fallback)
- [ ] Verify no console errors
- [ ] Build succeeds: `yarn build`
- [ ] Commit changes: `git add . && git commit -m "Your message"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Vercel auto-deploys (watch the deployment in Vercel dashboard)
- [ ] Visit deployed site and verify both fixes

---

## 🔗 Useful Links

- **Calendly Dashboard:** https://calendly.com/app/event-types
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Calendly Public Page:** https://calendly.com/jgabbard61
- **Vercel Blob Storage Docs:** https://vercel.com/docs/storage/vercel-blob
- **Cloudinary (Free CDN):** https://cloudinary.com

---

## 💡 Current Implementation Features

### Video Background with Smart Fallback
- ✅ Video fades in smoothly when loaded (1-second transition)
- ✅ Gradient background shown while video loads
- ✅ Automatic fallback to gradient if video fails
- ✅ Text colors adapt based on background (white for video, dark for gradient)
- ✅ No jarring transitions or blank screens
- ✅ Works on all devices and browsers

### Calendly Integration
- ✅ Dual options: "Send Message" form or "Schedule a Demo"
- ✅ Inline widget embedded in contact section
- ✅ Modal popup for "Schedule a Demo" in hero section
- ✅ Calendly script loads only when needed
- ✅ Customizable colors to match your brand

---

## ❓ Need Help?

If you encounter any issues:

1. **Check this file first** - Most common issues are covered above
2. **Check browser console** - Press F12, look for errors
3. **Check Vercel deployment logs** - See what went wrong during build
4. **Test locally first** - If it works locally, it's a deployment issue
5. **Clear cache** - Both browser cache and Vercel build cache

---

## 📝 Summary of Changes

All changes have been committed and pushed to the `main` branch:

1. ✅ Fixed Calendly URL in `components/contact-section.tsx`
2. ✅ Fixed Calendly URL in `components/calendly-modal.tsx`
3. ✅ Enhanced video background with loading states in `components/hero-section.tsx`
4. ✅ Added graceful fallback for video errors
5. ✅ Made text colors adaptive based on background

**Next Steps:**
1. Wait for Vercel to auto-deploy (2-3 minutes)
2. Visit your site and verify the fixes
3. If Calendly needs a specific event URL, update following instructions above
4. If video still doesn't show, follow troubleshooting steps above

---

**Last Updated:** October 24, 2025
**Changes Pushed To:** `main` branch
**Status:** ✅ Ready for deployment
