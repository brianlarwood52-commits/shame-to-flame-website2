import SDACommentarySearch from '../../src/old_pages_backup/SDACommentarySearch'

export const metadata = {
  title: 'SDA Bible Commentary Search Tool | Shame to Flame Ministry',
  description: 'Search the Seventh-day Adventist Bible Commentary for deep theological insights and biblical understanding. Free access to comprehensive Scripture commentary.',
  openGraph: {
    title: 'SDA Bible Commentary Search Tool',
    description: 'Search the SDA Bible Commentary for theological insights and deep biblical understanding. Free access.',
    type: 'website',
  },
}

export default function Page() {
  return <SDACommentarySearch />
}
