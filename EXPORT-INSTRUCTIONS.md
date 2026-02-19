# How to Export Your Website

Since download isn't available in this interface, here are your options:

## Option 1: Use Git (If Available)

```bash
git init
git add .
git commit -m "Shame to Flame website complete"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Then clone the repo on your computer.

## Option 2: Copy the Built Site

The entire website is in the `out/` folder. You can:

1. Select all files in `out/` folder
2. Copy the content
3. Paste into a new folder on your computer

The out/ folder contains these HTML files ready to deploy:
- index.html (homepage)
- about.html
- my-story.html  
- healing-pathways.html
- daily-fire.html
- And 10 more pages...

## Option 3: Rebuild Locally

Copy this entire project folder to your computer, then run:

```bash
npm install
npm run build
```

The `out/` folder will be generated with your complete static site.

## Option 4: Deploy Directly from Here

If this environment has deployment tools, you can deploy directly:

### To Netlify:
```bash
npm install -g netlify-cli
netlify deploy --dir=out --prod
```

### To Vercel:
```bash
npm install -g vercel
vercel --prod
```

## What's in the out/ folder:

All your pages as static HTML:
✅ index.html - Homepage
✅ about.html - About page
✅ bible-study.html
✅ contact.html
✅ daily-fire.html
✅ healing-pathways.html
✅ mary-magdalene-apologetic.html
✅ ministry-hub.html  
✅ my-story.html
✅ prayer-rock.html
✅ prayer-rock-story.html
✅ sda-commentary-search.html
✅ why-this-ministry.html
✅ 404.html
✅ _next/ folder with all JavaScript/CSS

The site is 100% working and ready!
