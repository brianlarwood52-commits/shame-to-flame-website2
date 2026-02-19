import React from 'react'
import Home from '../src/old_pages_backup/Home'

export const metadata = {
  title: 'Shame to Flame - From Darkness to Light',
  description: 'A Christian ministry guiding you from shame, guilt, and grief toward renewed hope, faith, and purpose through God\'s love and grace.',
}

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shame to Flame Ministry",
  "url": "https://shametoflame.faith",
  "logo": "https://shametoflame.faith/flame-icon.svg",
  "description": "A Christian ministry guiding individuals from shame, guilt, and grief toward renewed hope, faith, and purpose through God's love and grace.",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "contact@shametoflame.faith",
    "availableLanguage": "English"
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <Home />
    </>
  )
}
