import Link from 'next/link';
import { FileText } from 'lucide-react';
import { devotionals } from '@/data/dailyFireDevotionals';

export const metadata = {
  title: 'Sitemap - All Pages | Shame to Flame Ministry',
  description: 'Complete list of all pages on Shame to Flame Ministry website. Find resources, healing pathways, prayer support, and biblical guidance.',
  robots: 'index, follow',
}

export default function SitemapPage() {
  const sitePages = [
    {
      title: 'Main Pages',
      pages: [
        { name: 'Home', url: '/', description: 'Welcome to Shame to Flame Ministry' },
        { name: 'About', url: '/about', description: 'Learn about our mission and ministry' },
        { name: 'My Story', url: '/my-story', description: 'Personal testimony of transformation' },
        { name: 'Why This Ministry', url: '/why-this-ministry', description: 'The heart behind Shame to Flame' },
        { name: 'Contact', url: '/contact', description: 'Get in touch with our ministry team' },
      ]
    },
    {
      title: 'Resources',
      pages: [
        { name: 'Crisis Help', url: '/crisis-help', description: 'Immediate help resources and crisis support hotlines' },
        { name: 'Healing Pathways', url: '/healing-pathways', description: 'Guided Bible studies for healing and recovery' },
        { name: 'Daily Fire', url: '/daily-fire', description: 'Daily devotionals and encouragements' },
        { name: 'Prayer Rock Archive', url: '/prayer-rock', description: 'Collection of prayers and testimonies' },
        { name: 'Prayer Rock Story', url: '/prayer-rock-story', description: 'The story behind Prayer Rock' },
        { name: 'Submit Prayer Request', url: '/submit-prayer', description: 'Share your prayer needs with us' },
      ]
    },
    {
      title: 'Daily Fire Devotionals',
      pages: devotionals.map(devotional => ({
        name: devotional.title,
        url: `/daily-fire/${devotional.slug}`,
        description: `${devotional.scripture.reference} - ${devotional.category}`
      }))
    },
    {
      title: 'Prayer Rock Blog',
      pages: [
        { name: 'The Rock That Changed Everything', url: '/prayer-rock/blog/the-rock-that-changed-everything', description: 'The origin story of Shame to Flame Ministry' },
        { name: 'When Family Becomes the Wound', url: '/prayer-rock/blog/when-family-becomes-the-wound', description: 'Understanding and healing from family dysfunction' },
        { name: 'The Gift of Spiritual Sensitivity', url: '/prayer-rock/blog/the-gift-of-spiritual-sensitivity', description: 'Embracing your sensitivity as a spiritual gift' },
      ]
    },
    {
      title: 'Healing Pathway Programs',
      pages: [
        { name: 'Overcoming Shame', url: '/healing-pathways/overcoming-shame', description: 'Biblical journey from shame to identity in Christ (8 weeks)' },
        { name: 'Grief and Loss', url: '/healing-pathways/grief-and-loss', description: 'Processing grief and finding hope in pain (10 weeks)' },
        { name: 'Healing from Spiritual Abuse', url: '/healing-pathways/spiritual-abuse-recovery', description: 'Recovering from religious trauma (12 weeks)' },
      ]
    },
    {
      title: 'Study Library',
      pages: [
        { name: 'Bible Study', url: '/bible-study', description: 'Interactive Bible reading and study tools' },
        { name: 'SDA Commentary Search', url: '/sda-commentary-search', description: 'Search Seventh-day Adventist Bible Commentary' },
        { name: 'Mary Magdalene Apologetic', url: '/mary-magdalene-apologetic', description: 'Biblical study on Mary Magdalene' },
      ]
    },
    {
      title: 'Ministry Hub',
      pages: [
        { name: 'Ministry Hub', url: '/ministry-hub', description: 'Central hub for all ministry resources and updates' },
      ]
    },
    {
      title: 'Legal',
      pages: [
        { name: 'Privacy Policy', url: '/privacy-policy', description: 'How we protect your information' },
      ]
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Sitemap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Complete directory of all pages and resources on Shame to Flame Ministry
          </p>
        </div>
      </section>

      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sitePages.map((section, index) => (
              <div key={index}>
                <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b-2 border-flame-500/30">
                  {section.title}
                </h2>
                <div className="grid gap-4">
                  {section.pages.map((page, pageIndex) => (
                    <Link
                      key={pageIndex}
                      href={page.url}
                      className="block p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-flame-500 dark:hover:border-flame-500 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-flame-600 dark:group-hover:text-flame-400 transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            {page.description}
                          </p>
                        </div>
                        <span className="text-flame-600 dark:text-flame-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {page.url}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Need Help Finding Something?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Contact us if you need assistance navigating our resources
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
