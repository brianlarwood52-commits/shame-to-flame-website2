'use client'

import React from 'react'
import Link from 'next/link'
import { Flame, Heart, Users, Shield, Compass, ArrowRight, BookOpen } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const studyPaths = [
  {
    title: 'Shame & Guilt',
    slug: 'shame-and-guilt',
    verse: 'Isaiah 1:18',
    icon: Flame,
    description:
      "When the weight of what you've done \u2014 or what was done to you \u2014 feels unbearable. Scripture has a path through it.",
    gradient: 'from-flame-600 to-orange-500',
  },
  {
    title: 'Grief & Loss',
    slug: 'grief-and-loss',
    verse: 'Psalm 34:18',
    icon: Heart,
    description:
      "Whether it's a person, a relationship, or a life you thought you'd have. You're not alone in this.",
    gradient: 'from-sky-600 to-blue-500',
  },
  {
    title: 'Identity in Christ',
    slug: 'identity-in-christ',
    verse: '2 Corinthians 5:17',
    icon: Users,
    description:
      "When you've lost sight of who you are. When shame has rewritten your story. God has a different version.",
    gradient: 'from-purple-600 to-violet-500',
  },
  {
    title: 'Forgiveness',
    slug: 'forgiveness',
    verse: 'Ephesians 4:32',
    icon: Shield,
    description:
      'The hardest journey. Forgiving others, forgiving yourself, and understanding a God who already has.',
    gradient: 'from-sage-600 to-emerald-500',
  },
  {
    title: 'Hope & Purpose',
    slug: 'hope-and-purpose',
    verse: 'Jeremiah 29:11',
    icon: Compass,
    description:
      "When life feels pointless. When you can't see the road ahead. God's plan doesn't require your clarity \u2014 just your willingness.",
    gradient: 'from-amber-600 to-yellow-500',
  },
]

export default function GuidedStudiesContent() {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="Guided Bible Studies"
        subtitle="Choose the study that speaks to where you are right now. Each path walks through Scripture at your pace."
      />

      {/* Study Path Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyPaths.map((path) => {
              const Icon = path.icon
              return (
                <Link
                  key={path.slug}
                  href={`/guided-studies/${path.slug}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700">
                    {/* Gradient Header */}
                    <div
                      className={`bg-gradient-to-r ${path.gradient} p-6 flex items-center justify-center`}
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-flame-600 dark:group-hover:text-flame-400 transition-colors duration-200">
                        {path.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                        {path.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-xs text-sky-600 dark:text-sky-400 font-medium italic">
                          {path.verse}
                        </span>
                        <span className="text-flame-600 dark:text-flame-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                          Begin this study
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gradient-to-br from-flame-50 to-sky-50 dark:from-flame-900/20 dark:to-sky-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-flame-500 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            What to Expect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Each guided study includes reflection questions rooted in Scripture,
            insights from biblical characters who faced similar struggles,
            practical encouragement, and next steps for your journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Reflection Questions', detail: 'Rooted in Scripture' },
              { label: 'Biblical Examples', detail: 'Characters who walked this road' },
              { label: 'Practical Encouragement', detail: 'Steps you can take today' },
              { label: 'Your Own Pace', detail: 'No rush, no pressure' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md"
              >
                <p className="font-semibold text-gray-800 dark:text-white text-sm">
                  {item.label}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  {item.detail}
                </p>
              </div>
            ))}
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
