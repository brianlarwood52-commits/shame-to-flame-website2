import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '../src/components/Navigation'
import Footer from '../src/components/Footer'
import VideoBackground from '../src/components/VideoBackground'
import PWAWrapper from '../src/components/PWAWrapper'
import OfflineStatus from '../src/components/OfflineStatus'
import Providers from '../src/components/Providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ea580c',
}


export const metadata: Metadata = {
  title: {
    default: 'Shame to Flame - From Darkness to Light',
    template: '%s | Shame to Flame Ministry',
  },
  description: 'A Christian ministry guiding you from shame, guilt, and grief toward renewed hope, faith, and purpose through God\'s love and grace.',
  keywords: ['Christian ministry', 'healing from shame', 'trauma recovery', 'biblical guidance', 'prayer support', 'spiritual healing', 'grief support', 'faith-based counseling'],
  authors: [{ name: 'Shame to Flame Ministry' }],
  creator: 'Shame to Flame Ministry',
  applicationName: 'Shame to Flame Ministry',
  appleWebApp: {
    capable: true,
    title: 'Shame to Flame',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  publisher: 'Shame to Flame Ministry',
  icons: {
    icon: '/flame-icon.svg',
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
      { url: '/flame-icon.svg' },
    ],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://shametoflame.faith'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shametoflame.faith',
    siteName: 'Shame to Flame Ministry',
    title: 'Shame to Flame - From Darkness to Light',
    description: 'A Christian ministry guiding you from shame, guilt, and grief toward renewed hope, faith, and purpose through God\'s love and grace.',
    images: [
      {
        url: '/flame-icon.svg',
        width: 800,
        height: 800,
        alt: 'Shame to Flame Ministry Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shame to Flame - From Darkness to Light',
    description: 'A Christian ministry guiding you from shame, guilt, and grief toward renewed hope, faith, and purpose.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shame to Flame" />
        <link rel="apple-touch-icon" href="/flame-icon.svg" />
        <meta name="theme-color" content="#ea580c" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shame to Flame Ministry",
              "url": "https://shametoflame.faith",
              "logo": "https://shametoflame.faith/flame-icon.svg",
              "description": "A Christian ministry providing trauma-informed support, biblical guidance, and healing resources for individuals recovering from shame, grief, and spiritual wounds.",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Ministry Support",
                "email": "contact@shametoflame.faith"
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <VideoBackground />
          <OfflineStatus />
          <div className="relative z-10">
            <Navigation />
            <main>{children}</main>
            <Footer />
          </div>
          <PWAWrapper />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
