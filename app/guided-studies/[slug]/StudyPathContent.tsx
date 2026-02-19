'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, BookOpen } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

interface StudySession {
  title: string
  description: string
}

interface StudyPathConfig {
  title: string
  slug: string
  verse: string
  description: string
  intro: string
  sessions: StudySession[]
}

export default function StudyPathContent({
  study,
  slug,
}: {
  study: StudyPathConfig | null
  slug: string
}) {
  if (!study) {
    return (
      <div className="animate-fade-in">
        <PageHero title="Study Not Found" />
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
              <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4">
                We couldn&apos;t find that study
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                The study path &ldquo;{slug}&rdquo; doesn&apos;t exist yet. Browse
                our available guided studies to find the path that speaks to you.
              </p>
              <Link
                href="/guided-studies"
                className="inline-flex items-center gap-2 bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHero title={study.title} subtitle={study.verse} />

      {/* Intro Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guided-studies"
            className="inline-flex items-center gap-2 text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            All guided studies
          </Link>

          <div className="bg-gradient-to-br from-flame-50 to-orange-50 dark:from-flame-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {study.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Sessions List */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Study Sessions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            {study.sessions.length} sessions &middot; Work through them at your
            own pace
          </p>

          <div className="space-y-4">
            {study.sessions.map((session, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-flame-100 dark:bg-flame-900/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-flame-700 dark:text-flame-300">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full">
                      <Lock className="h-3 w-3" />
                      <span className="hidden sm:inline">Coming soon</span>
                      <span className="sm:hidden">Soon</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Encouragement */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20 rounded-2xl p-8">
            <BookOpen className="h-10 w-10 text-flame-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4">
              This study is being prepared
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto mb-6">
              Each session is being carefully crafted with Scripture, reflection
              questions, and practical encouragement. Check back soon, or
              explore our other resources while you wait.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/guided-studies"
                className="inline-flex items-center gap-2 bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Browse all studies
              </Link>
              <Link
                href="/daily-fire"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-flame-300 dark:hover:border-flame-600 transition-all duration-200"
              >
                Read Daily Fire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </section>
    </div>
  )
}
