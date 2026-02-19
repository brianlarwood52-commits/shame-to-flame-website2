'use client'

import React from 'react'
import { Shield, Inbox, Smartphone, Cpu, Heart, Mail } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const PrivacyPolicy = () => {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy matters to us"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
            Last updated: January 2026
          </p>

          <div className="space-y-12">
            {/* Our commitment */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Our commitment
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Privacy by design.</strong> We believe your spiritual
                journey is personal. We&rsquo;ve built this ministry with
                privacy at its core.
              </p>
            </div>

            {/* What we collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                  <Inbox className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  What we collect
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Minimal.</strong> No tracking, no analytics cookies, no
                user profiles. If you use forms (contact, prayer), we receive
                what you submit.
              </p>
            </div>

            {/* What stays on your device */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  What stays on your device
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Study progress, reflections, journal entries, Bible bookmarks.
                This data is stored locally in your browser and is never sent to
                our servers. If you clear it, it&rsquo;s gone.
              </p>
            </div>

            {/* Third-party services */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Third-party services
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use Groq AI and HuggingFace for NLP processing. Text you
                submit to guided studies may be processed by these services.
                They do not store data long-term. We never send identifying
                information.
              </p>
            </div>

            {/* Crisis resources */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Crisis resources
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Links to crisis helplines are provided as a public service. We
                are not affiliated with these organizations.
              </p>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Contact
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Questions about privacy? Email{' '}
                <a
                  href="mailto:contact@shametoflame.faith"
                  className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300"
                >
                  contact@shametoflame.faith
                </a>
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12">
            <Disclaimer compact={true} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
