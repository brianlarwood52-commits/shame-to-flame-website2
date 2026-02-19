import Contact from '../../src/old_pages_backup/Contact'

export const metadata = {
  title: 'Contact Us - Get Prayer & Support | Shame to Flame Ministry',
  description: 'Reach out for prayer support, spiritual guidance, and encouragement. Submit prayer requests, access healing resources, or contact our ministry team for help.',
  openGraph: {
    title: 'Contact Shame to Flame Ministry',
    description: 'Get prayer support, submit prayer requests, and connect with our ministry for spiritual guidance and encouragement.',
    type: 'website',
  },
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Shame to Flame Ministry",
    "url": "https://shametoflame.faith",
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "contact@shametoflame.faith",
      "availableLanguage": "English"
    }, {
      "@type": "ContactPoint",
      "contactType": "Prayer Requests",
      "email": "contact@shametoflame.faith",
      "availableLanguage": "English"
    }]
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Contact />
    </>
  )
}
