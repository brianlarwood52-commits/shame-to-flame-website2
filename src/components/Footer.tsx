'use client'

import React from 'react'
import Link from 'next/link'
import { Flame, Heart, Mail, Phone } from 'lucide-react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

const Footer = () => {
  const { isInstalled, isInstallable, installApp } = usePWAInstall();

  const handleInstall = async () => {
    const accepted = await installApp();
    if (accepted) {
      localStorage.removeItem('pwa-install-dismissed');
    }
  };

  return (
    <footer className="relative bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <Flame className="h-8 w-8 sm:h-10 sm:w-10 text-flame-400" />
              <span className="font-serif font-bold text-xl sm:text-2xl">Shame to Flame</span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-md">
              A Bible-based ministry offering guided Scripture studies and spiritual encouragement
              for those carrying shame, guilt, and grief. A first step toward healing.
            </p>
            <div className="flex items-start space-x-2 sm:space-x-3 text-flame-300 bg-flame-900/20 p-3 sm:p-4 rounded-lg border border-flame-800/30">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm italic leading-relaxed">&ldquo;He heals the brokenhearted and binds up their wounds.&rdquo; &mdash; Psalm 147:3</span>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 text-flame-300">About</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/my-story" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">My Story</Link></li>
                  <li><Link href="/why-this-ministry" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Why This Ministry</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">About Us</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 text-flame-300">Guided Studies</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/guided-studies" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">All Study Paths</Link></li>
                  <li><Link href="/guided-studies/shame-and-guilt" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Shame &amp; Guilt</Link></li>
                  <li><Link href="/guided-studies/grief-and-loss" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Grief &amp; Loss</Link></li>
                  <li><Link href="/guided-studies/identity-in-christ" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Identity in Christ</Link></li>
                  <li><Link href="/guided-studies/forgiveness" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Forgiveness</Link></li>
                  <li><Link href="/guided-studies/hope-and-purpose" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Hope &amp; Purpose</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 text-flame-300">Prayer</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/prayer-rock-story" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">The Prayer Rock Story</Link></li>
                  <li><Link href="/submit-prayer" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Submit a Prayer</Link></li>
                </ul>

                <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 text-flame-300 mt-6">Support</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="/crisis-help" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Crisis Help
                    </Link>
                  </li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm">Contact Us</Link></li>
                  <li>
                    <div className="flex items-center space-x-2 text-gray-400 mt-2">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="text-xs">contact@shametoflame.faith</span>
                    </div>
                  </li>
                </ul>

                {!isInstalled && isInstallable && (
                  <>
                    <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 text-flame-300 mt-6">Install App</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      <li>
                        <button
                          onClick={handleInstall}
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm text-left"
                        >
                          Access content offline
                        </button>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800/50 pt-4 mb-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed max-w-3xl mx-auto">
            This ministry offers Bible-based encouragement and general spiritual guidance. It is not a substitute
            for professional counselling, therapy, or medical advice. If you are in crisis, please{' '}
            <Link href="/crisis-help" className="text-sky-400 hover:text-sky-300 underline">contact a professional helpline</Link>.
          </p>
        </div>

        <div className="border-t border-gray-800/50 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
              <Link href="/settings" className="hover:text-white transition-colors duration-200">
                Settings
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} Shame to Flame Ministry. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                A first step toward healing and hope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
