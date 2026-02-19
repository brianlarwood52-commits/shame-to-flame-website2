'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const PrayerRockStory = () => {
  return (
    <div className="animate-fade-in">
      <PageHero
        title="The Prayer Rock Story"
        subtitle="Where it all began"
      />

      {/* The place */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            There&rsquo;s a hill in Helena Valley, just east of Perth in Western
            Australia. It&rsquo;s not famous. There&rsquo;s no sign pointing to it, no
            plaque, no church built on its slopes. Just bush, trees, birdsong,
            and a flat rock near the top where a man once fell to his knees and
            everything changed.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            That man was me. And that rock is where Shame to Flame was born.
          </p>
        </div>
      </section>

      {/* The encounter */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            The Weight I Carried
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            By the time I climbed that hill, I was carrying years of
            grief&mdash;people I&rsquo;d lost, relationships that had fractured, shame
            that had wrapped itself around my identity like a vine. I&rsquo;d lost
            family. I&rsquo;d lost direction. And somewhere along the way, I&rsquo;d lost
            the belief that God could still use me for anything.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I climbed that hill because I had nowhere else to go. Bible in hand,
            tears already falling, I knelt on the rock among the trees and let
            it all out. Every failure. Every loss. Every lie shame had told me
            about who I was.
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed italic text-center">
              And there, in the silence between the trees, God didn&rsquo;t lecture me.
              He didn&rsquo;t list my failures. He met me. And in that meeting, I
              felt something I hadn&rsquo;t felt in years&mdash;that I wasn&rsquo;t finished.
              That He had something for me to do.
            </p>
          </div>
        </div>
      </section>

      {/* The surrender and calling */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            The Surrender
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            What happened on that rock wasn&rsquo;t dramatic in the way the world
            would notice. No thunder, no visions. Just a broken man finally
            stopping&mdash;stopping the running, the pretending, the
            self-reliance&mdash;and letting God in.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            That was the moment I surrendered. Not just the pain, but the idea
            that I had to earn my way back. And in the space that surrender
            created, I heard the calling: help others who feel the way you
            felt. Walk with them. Point them to Me.
          </p>
        </div>
      </section>

      {/* What Prayer Rock represents */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/20 dark:to-flame-900/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            What Prayer Rock Represents
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Prayer Rock isn&rsquo;t a shrine. It&rsquo;s not a tourist destination or a
            pilgrimage site. It&rsquo;s not even really about the physical
            rock&mdash;though that rock is very real and very dear to me.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Prayer Rock is a concept. It&rsquo;s the place where you stop running.
            The place where you drop the act, put down the weight, and let God
            meet you exactly as you are. It&rsquo;s the moment you trade shame for
            surrender.
          </p>
          <div className="bg-flame-50 dark:bg-flame-900/20 rounded-xl p-6 sm:p-8 border border-flame-200/50 dark:border-flame-700/50">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium text-center">
              Your Prayer Rock doesn&rsquo;t have to be a literal rock. It&rsquo;s
              wherever you finally stop and let God in&mdash;a kitchen floor at
              2&nbsp;a.m., a parked car, a quiet bench, your own backyard. The
              location doesn&rsquo;t matter. The surrender does.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Take Your First Step
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you&rsquo;re carrying something heavy right now or you just need
            a quiet place to begin again, you&rsquo;re welcome here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-prayer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Submit a Prayer Request
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/healing-pathways"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/40 hover:bg-white/10 hover:border-white/60 text-white font-medium rounded-full transition-all duration-300"
            >
              Start a Guided Study
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

export default PrayerRockStory
