import HealingPathways from '../../src/old_pages_backup/HealingPathways'

export const metadata = {
  title: 'Healing Pathways - Bible-Based Recovery Programs | Shame to Flame',
  description: 'Explore guided healing pathways for shame, grief, depression, and trauma. Free biblical resources and structured programs designed to restore hope and emotional wellness.',
  openGraph: {
    title: 'Healing Pathways - Bible-Based Recovery Programs',
    description: 'Guided Bible studies and resources for healing from shame, grief, depression, and trauma. Start your journey to wholeness.',
    type: 'website',
  },
}

const healingPathwaysSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Healing Pathways - Bible-Based Recovery Programs",
  "description": "Explore guided healing pathways for shame, grief, depression, and trauma. Free biblical resources and structured programs designed to restore hope and emotional wellness.",
  "url": "https://shametoflame.faith/healing-pathways",
  "publisher": {
    "@type": "Organization",
    "name": "Shame to Flame Ministry",
    "url": "https://shametoflame.faith"
  },
  "about": {
    "@type": "Thing",
    "name": "Christian Healing and Recovery",
    "description": "Biblical resources for emotional and spiritual healing"
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healingPathwaysSchema) }}
      />
      <HealingPathways />
    </>
  )
}
