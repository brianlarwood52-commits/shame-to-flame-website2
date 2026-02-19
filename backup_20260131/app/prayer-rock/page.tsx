import PrayerRock from '../../src/old_pages_backup/PrayerRock'

export const metadata = {
  title: 'Prayer Rock Archive - Answered Prayers & Testimonies | Shame to Flame',
  description: 'Explore testimonies of answered prayers, spiritual insights, and stories of God\'s faithfulness. Be encouraged by real stories of transformation and divine intervention.',
  openGraph: {
    title: 'Prayer Rock Archive - Answered Prayers & Testimonies',
    description: 'Real testimonies of answered prayers and God\'s faithfulness. Be encouraged by stories of transformation and hope.',
    type: 'website',
  },
}

const prayerRockSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Prayer Rock Archive - Answered Prayers & Testimonies",
  "description": "A sacred collection of prayers, personal reflections, spiritual insights, and testimonies of answered prayers. Real stories of God's faithfulness and transformation.",
  "url": "https://shametoflame.faith/prayer-rock",
  "publisher": {
    "@type": "Organization",
    "name": "Shame to Flame Ministry",
    "url": "https://shametoflame.faith"
  },
  "mainEntity": {
    "@type": "Blog",
    "name": "Prayer Rock Archive",
    "description": "Personal reflections, prayers, and testimonies from the journey of faith and healing"
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prayerRockSchema) }}
      />
      <PrayerRock />
    </>
  )
}
