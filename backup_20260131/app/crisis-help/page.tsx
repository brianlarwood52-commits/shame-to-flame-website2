import CrisisHelp from '../../src/old_pages_backup/CrisisHelp'

export const metadata = {
  title: 'Crisis Support Resources - Get Help Now | Shame to Flame Ministry',
  description: '24/7 crisis hotlines and mental health resources. US: 988 Suicide Prevention, Australia: Lifeline 13 11 14, Beyond Blue 1300 22 4636. You are not alone.',
  openGraph: {
    title: 'Crisis Support Resources - Get Immediate Help',
    description: 'Access immediate crisis support and suicide prevention hotlines. Available 24/7 for those in need.',
    type: 'website',
  },
}

const crisisPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Crisis Support Resources",
  "description": "Emergency crisis support hotlines and mental health resources for immediate help",
  "url": "https://shametoflame.faith/crisis-help",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Crisis Hotlines",
    "itemListElement": [
      {
        "@type": "Organization",
        "name": "National Suicide Prevention Lifeline",
        "telephone": "988",
        "url": "https://988lifeline.org/",
        "areaServed": "US"
      },
      {
        "@type": "Organization",
        "name": "Crisis Text Line",
        "telephone": "741741",
        "url": "https://www.crisistextline.org/",
        "areaServed": "US"
      },
      {
        "@type": "Organization",
        "name": "Lifeline Australia",
        "telephone": "13 11 14",
        "url": "https://www.lifeline.org.au/",
        "areaServed": "AU"
      },
      {
        "@type": "Organization",
        "name": "Beyond Blue",
        "telephone": "1300 22 4636",
        "url": "https://www.beyondblue.org.au/",
        "areaServed": "AU"
      }
    ]
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crisisPageSchema) }}
      />
      <CrisisHelp />
    </>
  )
}
