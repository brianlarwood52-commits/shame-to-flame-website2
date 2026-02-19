'use client'

import React from 'react'
import Link from 'next/link'
import { Flame, Heart, Mail } from 'lucide-react'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <Flame className="h-10 w-10 text-flame-400" />
              <span className="font-serif font-bold text-2xl">Shame to Flame</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              A safe place for healing and hope. We believe that no matter how deep your pain,
              God's love can transform your shame into flame.
            </p>
            <div className="flex items-start space-x-3 text-flame-300 bg-flame-900/20 p-4 rounded-lg border border-flame-800/30">
              <Heart className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm italic leading-relaxed">"He heals the brokenhearted and binds up their wounds." - Psalm 147:3</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">About</h3>
                <ul className="space-y-3">
                  <li><Link href="/my-story" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">My Story</Link></li>
                  <li><Link href="/why-this-ministry" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Why This Ministry</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">Resources</h3>
                <ul className="space-y-3">
                  <li><Link href="/crisis-help" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Crisis Help</Link></li>
                  <li><Link href="/healing-pathways" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Healing Pathways</Link></li>
                  <li><Link href="/daily-fire" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Daily Fire</Link></li>
                  <li><Link href="/ministry-hub" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Ministry Hub</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">Study</h3>
                <ul className="space-y-3">
                  <li><Link href="/mary-magdalene-apologetic" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Mary Magdalene</Link></li>
                  <li><Link href="/bible-study" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Bible Study Hub</Link></li>
                  <li><Link href="/sda-commentary-search" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">SDA Commentary</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">Prayer Rock</h3>
                <ul className="space-y-3">
                  <li><Link href="/prayer-rock-story" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">The Story</Link></li>
                  <li><Link href="/prayer-rock" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">The Archive</Link></li>
                  <li><Link href="/submit-prayer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Submit Prayer</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">Connect</h3>
                <ul className="space-y-3">
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Contact Us</Link></li>
                  <li>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">contact@shametoflame.faith</span>
                    </div>
                  </li>
                </ul>
              </div>

              {!isInstalled && isInstallable && (
                <div>
                  <h3 className="font-semibold text-base uppercase tracking-wider mb-4 text-flame-300">Install App</h3>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={handleInstall}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left"
                      >
                        Access content offline and get a faster experience
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-gray-400">
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
              <p className="text-gray-400 text-sm">
                © 2024 Shame to Flame Ministry. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Walking together toward healing and hope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
