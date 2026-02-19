import SubmitPrayer from '../../src/old_pages_backup/SubmitPrayer'

export const metadata = {
  title: 'Submit Prayer Request - Confidential Prayer Support | Shame to Flame',
  description: 'Submit your prayer request confidentially. Our ministry team personally prays over each request and responds with biblical encouragement. You are not alone.',
  openGraph: {
    title: 'Submit Prayer Request - Confidential Prayer Support',
    description: 'Submit your prayer request confidentially. Receive personal prayer and biblical encouragement. You are not alone.',
    type: 'website',
  },
}

const prayerPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Submit Prayer Request",
  "description": "Submit your prayer request confidentially. Our ministry team personally prays over each request and responds with biblical encouragement.",
  "url": "https://shametoflame.faith/submit-prayer",
  "potentialAction": {
    "@type": "CommunicateAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://shametoflame.faith/submit-prayer",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "description": "Submit a confidential prayer request to Shame to Flame Ministry"
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prayerPageSchema) }}
      />
      <SubmitPrayer />
    </>
  )
}
