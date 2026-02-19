# Shame to Flame - Deployment Guide

## Quick Start

Your static website has been built and is ready for deployment!

## What's Included

The `shame-to-flame-static.tar.gz` archive contains:
- `out/` - Complete static website (HTML, CSS, JS)
- `public/` - Static assets (images, videos, icons)
- `package.json` - Project dependencies
- All configuration files

## Deployment Options

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `out` folder
3. Your site is live!

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import this project from GitHub or upload the folder
3. Vercel will automatically detect Next.js and deploy

### Option 3: GitHub Pages
1. Push the `out` folder to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the branch with the `out` folder

### Option 4: Any Static Host
Upload the contents of the `out` folder to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any web hosting service

## Local Testing

To test locally before deployment:

```bash
# Extract the archive
tar -xzf shame-to-flame-static.tar.gz

# Serve the out directory
cd out
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000 in your browser

## Important Notes

1. **Video File**: The `shame-to-flame.mp4` video is included in the public folder. Make sure it's uploaded with the rest of the files.

2. **Environment Variables**: If you add backend features later, create a `.env.local` file with your API keys.

3. **Custom Domain**: After deploying, you can add a custom domain through your hosting provider's dashboard.

4. **Updates**: To update the site, rebuild with `npm run build` and re-upload the `out` folder.

## File Structure

```
out/
├── index.html              # Homepage
├── about.html             # About page
├── bible-study.html       # Bible Study page
├── contact.html           # Contact page
├── daily-fire.html        # Daily Fire page
├── healing-pathways.html  # Healing Pathways page
├── my-story.html          # My Story page
├── prayer-rock.html       # Prayer Rock page
├── _next/                 # Next.js assets
└── [other pages...]

public/
├── shame-to-flame.mp4     # Background video
├── flame-icon.svg         # Site icon
├── manifest.json          # PWA manifest
└── sw.js                  # Service worker
```

## Need Help?

- Next.js Deployment: https://nextjs.org/docs/deployment
- Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

## Build Info

- Framework: Next.js 16.0.5
- Build Type: Static Export
- Pages: 15 static HTML pages
- Total Size: ~377KB (compressed)
