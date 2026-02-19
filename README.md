# Shame to Flame Ministry Website

A Christian ministry website dedicated to guiding people from shame, guilt, and grief toward renewed hope, faith, and purpose through God's love and grace.

## Features

- **Healing Pathways**: Guided Bible studies addressing shame, grief, depression, and relationship struggles
- **Daily Fire**: Daily encouragements, devotionals, and reflections
- **Prayer Rock Archive**: Collection of prayers, answered testimonies, and spiritual insights
- **Bible Study Tools**: Interactive Bible reading and commentary search
- **Ministry Hub**: Central hub for all ministry resources
- **Responsive Design**: Beautiful, accessible design that works on all devices
- **Dark Mode**: Automatic theme switching for comfortable viewing
- **Video Background**: Inspiring visual experience with animated gradients

## Technology Stack

- **Framework**: Next.js 16.0.5 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: Formspree integration

## Quick Deployment

This is a static website that can be deployed anywhere:

1. **Download** the `shame-to-flame-static.tar.gz` file
2. **Extract** the archive
3. **Upload** the `out` folder to any static hosting service

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Local Development

If you want to modify the site:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
shame-to-flame-website/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with Navigation, Footer, VideoBackground
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page
│   ├── bible-study/             # Bible study page
│   ├── contact/                 # Contact page
│   ├── daily-fire/              # Daily devotionals
│   ├── healing-pathways/        # Healing pathways
│   ├── ministry-hub/            # Ministry hub
│   ├── my-story/                # Personal story
│   ├── prayer-rock/             # Prayer archive
│   └── ...                      # Other pages
├── src/
│   ├── components/              # React components
│   │   ├── Navigation.tsx       # Main navigation
│   │   ├── Footer.tsx           # Footer component
│   │   ├── VideoBackground.tsx  # Animated background
│   │   └── ...                  # Other components
│   ├── data/                    # Data files
│   │   ├── healingPathways.ts   # Pathway definitions
│   │   ├── blogPosts.ts         # Blog content
│   │   └── ...                  # Other data
│   └── hooks/                   # Custom React hooks
├── public/                      # Static assets
│   ├── shame-to-flame.mp4       # Background video
│   ├── flame-icon.svg           # Site icon
│   └── ...                      # Other assets
└── out/                         # Built static site (after npm run build)
```

## Pages

- `/` - Homepage with ministry overview
- `/about` - About the ministry
- `/my-story` - Personal testimony
- `/why-this-ministry` - Ministry purpose and vision
- `/healing-pathways` - Guided healing resources
- `/daily-fire` - Daily devotionals
- `/prayer-rock` - Prayer archive
- `/prayer-rock-story` - The story behind Prayer Rock
- `/bible-study` - Bible study tools
- `/ministry-hub` - Ministry resources
- `/contact` - Contact form
- `/sda-commentary-search` - SDA commentary search
- `/mary-magdalene-apologetic` - Biblical apologetic

## Customization

### Changing Colors

Colors are defined in `tailwind.config.js`:
- Primary: Flame colors (orange/red tones)
- Secondary: Sky colors (blue tones)
- Accent: Sage colors (green tones)

### Adding New Pages

1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. The page will automatically be added to routing

### Modifying Content

Content is stored in:
- `src/data/` - Structured data files
- Page components - Direct content in JSX

## License

Copyright © 2024 Shame to Flame Ministry. All rights reserved.

## Support

For questions or support, contact: contact@shametoflame.faith

---

*"He heals the brokenhearted and binds up their wounds." - Psalm 147:3*
