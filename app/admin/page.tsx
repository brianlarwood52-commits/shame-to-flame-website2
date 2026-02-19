import Admin from '../../src/old_pages_backup/Admin'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Admin Dashboard - Shame to Flame Ministry',
  description: 'Admin dashboard for managing contact submissions and prayer requests',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navigation />
      <Admin />
      <Footer />
    </div>
  )
}
