import About from '../../src/old_pages_backup/About'

export const metadata = {
  title: 'About Shame to Flame Ministry - Our Mission & Values',
  description: 'Learn about Shame to Flame ministry, our mission to help individuals heal from shame, trauma, and spiritual wounds through biblical guidance and compassionate support.',
  openGraph: {
    title: 'About Shame to Flame Ministry',
    description: 'Discover our mission to transform shame into strength through God\'s healing love and biblical guidance.',
    type: 'website',
  },
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Shame to Flame Ministry",
  "description": "Learn about Shame to Flame ministry, our mission to help individuals heal from shame, trauma, and spiritual wounds through biblical guidance and compassionate support.",
  "url": "https://shametoflame.faith/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "Shame to Flame Ministry",
    "url": "https://shametoflame.faith",
    "description": "A Christian ministry dedicated to helping individuals transform shame into strength through God's healing love and biblical guidance."
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <About />
    </>
  )
}
