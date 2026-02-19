'use client'

import React from 'react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const About = () => {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="About Shame to Flame"
        subtitle="A Bible-based ministry for those who carry shame, guilt, and grief"
      />

      <section className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
            What We Are
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            Shame to Flame is a digital companion offering guided Scripture studies and spiritual
            encouragement. We are Bible-based, privacy-first, and designed to be a first step
            toward healing for those who carry shame, guilt, and grief.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
            What We Believe
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            This ministry is Seventh-day Adventist in foundation. Scripture is our bedrock. Ellen
            White&apos;s writings provide additional insight into God&apos;s character and His plan
            for restoration. We believe God meets people where they are, especially in their pain.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
            What We&apos;re Not
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            We are not counsellors, not therapists, and not a crisis service. We provide
            Bible-based encouragement and general spiritual guidance. When needed, we point people
            toward professional help.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
            Our Approach
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            We offer guided Bible studies through five themed paths. Privacy is built in by
            design—your data stays on your device. This ministry is designed for people to grow
            with it and eventually outgrow it as they move further along their healing journey.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </section>
    </div>
  )
}

export default About
