# Sitemap Maintenance Guide

This guide explains how to maintain and update the XML sitemap for optimal search engine discoverability.

## Overview

The sitemap has been updated to include all 53 pages of your website:
- 17 main static pages
- 31 Daily Fire devotional pages (dynamic routes)
- 3 Prayer Rock blog posts (dynamic routes)
- 1 sitemap page
- 1 privacy policy page

## File Locations

- **XML Sitemap**: `/public/sitemap.xml`
- **Robots.txt**: `/public/robots.txt`
- **Human Sitemap**: `/app/sitemap/page.tsx`

## When to Update the Sitemap

Update `/public/sitemap.xml` whenever you:

1. **Add a new page** - Add a new `<url>` entry
2. **Add new devotionals** - Add entries for `/daily-fire/32`, `/daily-fire/33`, etc.
3. **Add new blog posts** - Add entries for new Prayer Rock blog posts
4. **Remove pages** - Remove corresponding `<url>` entries
5. **Change page content significantly** - Update the `<lastmod>` date

## How to Add a New Page

### 1. Add to XML Sitemap

Add a new entry to `/public/sitemap.xml`:

```xml
<url>
  <loc>https://shametoflame.faith/your-new-page</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

### 2. Priority Guidelines

- `1.0` - Homepage, Crisis Help (most important)
- `0.9` - Main navigation pages (About, Contact, Resources)
- `0.8` - Content pages (Devotionals, Blog Posts, Study Library)
- `0.7` - Secondary pages
- `0.5` - Legal/Utility pages (Privacy Policy, Sitemap)

### 3. Change Frequency Guidelines

- `daily` - Daily Fire index page (changes daily)
- `weekly` - Healing Pathways, Bible Study, Prayer Rock
- `monthly` - Most content pages, devotionals, blog posts
- `yearly` - Legal pages, rarely changing content

### 4. Update LastMod Date

Always use ISO 8601 format: `YYYY-MM-DD`

## Example: Adding a New Daily Fire Devotional

If you add devotional #32:

```xml
<url>
  <loc>https://shametoflame.faith/daily-fire/32</loc>
  <lastmod>2024-12-15</lastmod>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

## Example: Adding a New Prayer Rock Blog Post

```xml
<url>
  <loc>https://shametoflame.faith/prayer-rock/blog/your-new-post-slug</loc>
  <lastmod>2024-12-15</lastmod>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

## Structured Data (Schema.org)

The following pages have Schema.org structured data for better SEO:

### 1. Organization Schema (All Pages)
- Location: `/app/layout.tsx` lines 102-120
- Type: `Organization`
- Includes: name, URL, logo, contact information

### 2. Article Schema (Daily Fire Devotionals)
- Location: `/app/daily-fire/[id]/page.tsx` lines 48-73
- Type: `Article`
- Includes: headline, description, author, publisher, date

### 3. BlogPosting Schema (Prayer Rock Blog)
- Location: `/app/prayer-rock/blog/[id]/page.tsx` lines 65-85
- Type: `BlogPosting`
- Includes: headline, author, date, publisher, keywords

## Submitting Your Sitemap to Search Engines

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to Sitemaps (left sidebar)
4. Enter: `sitemap.xml`
5. Click Submit

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Select your site
3. Navigate to Sitemaps
4. Enter: `https://shametoflame.faith/sitemap.xml`
5. Click Submit

## Verifying Your Sitemap

### 1. Manual Verification
Visit: `https://shametoflame.faith/sitemap.xml`

You should see a properly formatted XML file with all pages listed.

### 2. XML Validator
Use an online XML validator to ensure proper formatting:
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### 3. Google Search Console
After submission, check for errors in Google Search Console.

## Troubleshooting

### Issue: Search engines not finding new pages
**Solution**:
1. Verify the page is in sitemap.xml
2. Check that sitemap.xml is valid XML
3. Resubmit sitemap to search engines
4. Wait 2-7 days for re-indexing

### Issue: Sitemap shows errors in Search Console
**Solution**:
1. Check XML formatting (proper opening/closing tags)
2. Ensure all URLs are absolute (not relative)
3. Verify all URLs return 200 status code
4. Check that dates are in ISO 8601 format

### Issue: Duplicate content warnings
**Solution**:
1. Ensure each page has only ONE entry in sitemap
2. Use canonical URLs in page metadata
3. Check for URL variations (www vs non-www, http vs https)

## Robots.txt Configuration

The `/public/robots.txt` file references the sitemap:

```
User-agent: *
Allow: /

# Primary Domain Sitemap
Sitemap: https://shametoflame.faith/sitemap.xml

# Netlify Preview Domain Sitemap
Sitemap: https://incomparable-florentine-721a63.netlify.app/sitemap.xml
```

This tells search engines where to find your sitemap.

## Best Practices

1. **Keep It Updated** - Update sitemap when content changes
2. **Use Consistent URLs** - Always use the same URL format
3. **Set Realistic Priorities** - Not every page can be priority 1.0
4. **Update LastMod Dates** - Helps search engines know what to re-crawl
5. **Validate XML** - Invalid XML will be rejected by search engines
6. **Monitor Search Console** - Check for coverage issues regularly

## Automation Considerations

For future scalability, consider:

1. **Dynamic Sitemap Generation** - Create a Next.js API route that generates sitemap.xml dynamically
2. **Build-Time Generation** - Use a script to generate sitemap during `npm run build`
3. **Content Management System** - If you add a CMS, auto-generate sitemap from database

Example script location (future): `/scripts/generate-sitemap.js`

## Current Status

✅ All 53 pages included in sitemap
✅ All dynamic routes mapped
✅ Structured data added to articles and blog posts
✅ Robots.txt properly configured
✅ LastMod dates set to 2024-12-12
✅ Priorities assigned appropriately

## Questions?

If you have questions about maintaining the sitemap, refer to:
- [Google's Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Schema.org Documentation](https://schema.org/)
