'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const MyStory = () => {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="My Story"
        subtitle="How a broken man found purpose on a rock among the trees"
      />

      {/* Opening — reaching bottom */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I&rsquo;m not a counsellor. I&rsquo;m not a pastor. I&rsquo;m a man who hit
            rock bottom&mdash;grief, loss, shame, the kind that makes you believe
            God couldn&rsquo;t possibly have a use for someone like you.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            I carried that weight for years. Loss piled on loss. People I loved
            were gone. My own choices added to the wreckage. And somewhere in the
            middle of it all, I convinced myself I was disqualified&mdash;too
            broken, too far gone, too late.
          </p>
        </div>
      </section>

      {/* The Prayer Rock moment */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            The Day Everything Changed
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            There&rsquo;s a hill in Helena Valley, just outside Perth. Trees, silence,
            and a flat rock near the top. One day, at my lowest, I climbed that
            hill with nothing but my Bible and a heart full of desperation. I
            fell to my knees on that rock and I let everything out&mdash;the grief,
            the shame, the years of pretending I was fine.
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed italic text-center">
              I didn&rsquo;t hear an audible voice. But something shifted. The weight
              didn&rsquo;t disappear, but for the first time in as long as I could
              remember, I felt like I wasn&rsquo;t carrying it alone. God met me on
              that rock, right in the middle of my mess.
            </p>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            That place became what I call Prayer Rock. And what happened there
            wasn&rsquo;t just a personal moment&mdash;it was a calling.
          </p>
        </div>
      </section>

      {/* The calling */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            The Calling
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            God didn&rsquo;t tell me to go start a mega-church. He didn&rsquo;t hand me a
            theology degree. What I felt, clearly and unmistakably, was this:
            there are people out there who feel exactly the way I felt&mdash;broken,
            ashamed, disqualified&mdash;and they need someone to walk beside them.
            Not to fix them. Just to say, &ldquo;I&rsquo;ve been there, and God hasn&rsquo;t
            given up on you.&rdquo;
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            That&rsquo;s what Shame to Flame is. It&rsquo;s not a pulpit. It&rsquo;s an
            outstretched hand from someone who knows what the bottom looks like,
            pointing back to the God who was there the whole time.
          </p>
        </div>
      </section>

      {/* Why this ministry */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Why Me?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Honestly? I&rsquo;ve asked that question a hundred times. I&rsquo;m not
            trained. I don&rsquo;t have letters after my name. But I do have
            this&mdash;I walked through the fire and I came out the other side with
            a Bible in my hand and a conviction that Scripture has the power to
            meet people where professional help hasn&rsquo;t reached them yet.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            This ministry is Bible-based encouragement from someone who
            understands shame firsthand. It&rsquo;s guided studies, not therapy
            sessions. It&rsquo;s a first step, not the last one. And it&rsquo;s built on
            the belief that God uses broken people&mdash;not in spite of their
            brokenness, but through it.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            If you need professional help, please get it. If you need crisis
            support, we have resources for that too. But if you need a place to
            start&mdash;a gentle, Scripture-guided hand to help you look up
            again&mdash;that&rsquo;s what this is for.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Your Story Isn&rsquo;t Over
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            If anything I&rsquo;ve shared sounds familiar, I want you to know
            this&mdash;you&rsquo;re not disqualified. You&rsquo;re not too far gone. And you
            don&rsquo;t have to figure this out alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/healing-pathways"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start a Guided Study
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/crisis-help"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 hover:bg-white/10 hover:border-white/60 text-white font-medium rounded-full transition-all duration-300"
            >
              Crisis &amp; Support Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 sm:py-10 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </section>
    </div>
  )
}

export default MyStory
