import type { Metadata } from 'next'
import GuidedStudiesContent from './GuidedStudiesContent'

export const metadata: Metadata = {
  title: 'Guided Bible Studies',
  description:
    'Choose from five guided Bible study paths covering shame, grief, identity, forgiveness, and hope. Walk through Scripture at your own pace with reflection questions and practical encouragement.',
  openGraph: {
    title: 'Guided Bible Studies',
    description:
      'Five guided Bible study paths to walk through Scripture at your own pace.',
    type: 'website',
  },
}

export default function GuidedStudiesPage() {
  return <GuidedStudiesContent />
}
