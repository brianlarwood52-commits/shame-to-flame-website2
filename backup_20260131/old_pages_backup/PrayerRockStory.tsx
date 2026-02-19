'use client'

import React from 'react';
import Link from 'next/link';
import { Heart, Mountain, Flame, ArrowRight, BookOpen, Star } from 'lucide-react';

const PrayerRockStory = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float mb-6">
            <Mountain className="h-16 w-16 text-flame-500 mx-auto" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            The Story of Prayer Rock
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            From tragedy and loss to purpose and calling - the sacred place where 
            Shame to Flame ministry was born
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Brother's Story */}
            <div className="bg-gradient-to-r from-sky-50/90 to-sky-100/90 dark:from-sky-900/30 dark:to-sky-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-sky-200/50 dark:border-sky-700/50">
              <div className="flex items-center mb-6">
                <Star className="h-8 w-8 text-sky-600 dark:text-sky-400 mr-3" />
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-0">
                  It Begins with Len
                </h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                The story of Prayer Rock begins long before I ever found it. It starts with my brother, 
                Len Larwood, who felt called to missionary work as a boy. He followed that calling to the 
                Solomon Islands, serving as a nurse and spiritual leader at Atoifi Adventist Hospital. 
                His life there touched many, bringing love and faith to places once bound by fear.
              </p>
              
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                When he died tragically in a tractor accident in 1979, our family was heartbroken. 
                I was only fourteen when I flew with my parents to the islands for his funeral — a journey 
                filled with miracles, storms, and faith. It was there I first witnessed the power of God's 
                presence through the singing and faith of the island people.
              </p>
            </div>

            {/* The Losses */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                A Season of Loss
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                That loss marked the beginning of many. Over the years that followed, I would lose my father, 
                my uncle, my aunt, my home to fire, and nearly my own life. Each time, I found myself on my 
                knees, crying out to God.
              </p>
              
              <div className="bg-flame-50/90 dark:bg-flame-900/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-flame-400 mb-6">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  During that house fire, when I thought I was going to die, I prayed the most desperate 
                  prayer of my life: that if God would spare me, I would live for Him. He did.
                </p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                In time, I also learned the deeper ache of identity — growing up adopted, losing family, 
                and later discovering my birth name and biological relatives. Meeting my birth mother, and 
                years later reuniting with my cousins Cheryl, Tracy, and Lynette, felt like pieces of a 
                long-lost puzzle falling into place. Yet, even those relationships were tested by heartbreak 
                and misunderstanding.
              </p>
            </div>

            {/* The Rock */}
            <div className="bg-gradient-to-br from-sage-50/90 to-sage-100/90 dark:from-sage-900/30 dark:to-sage-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-sage-200/50 dark:border-sage-700/50">
              <div className="flex items-center mb-6">
                <Mountain className="h-8 w-8 text-sage-600 dark:text-sage-400 mr-3" />
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-0">
                  Finding Prayer Rock
                </h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6 text-lg">
                In 2022, at my lowest point — after years of grief, guilt, and longing to reconcile with 
                family — I climbed a hill in Helena Valley, Bible in hand, and fell to my knees on a rock 
                among the trees. There, I wept, prayed, and pleaded with God to restore my family, my purpose, 
                and my faith.
              </p>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium text-center">
                  It was at that rock that God revealed a new mission: to help others who feel broken, 
                  lost, and ashamed rediscover who they are through Him.
                </p>
              </div>
              
              <p className="text-sage-700 dark:text-sage-300 leading-relaxed mt-6 text-center font-medium">
                That sacred place became known to me as Prayer Rock — the birthplace of the Shame to Flame ministry.
              </p>
            </div>

            {/* The Meaning */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                The Meaning of Prayer Rock
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                Prayer Rock is more than a physical place. It's a symbol of rebirth, identity, and surrender — 
                the moment when despair turned into purpose. It reminds me that no matter how far we've fallen, 
                God can lift us again.
              </p>
              
              <div className="bg-gradient-to-r from-flame-50/90 to-orange-50/90 dark:from-flame-900/30 dark:to-orange-900/30 backdrop-blur-sm rounded-xl p-8 border border-flame-200/50 dark:border-flame-700/50">
                <h3 className="font-serif text-2xl font-semibold text-flame-700 dark:text-flame-300 mb-6 text-center">
                  Through Shame to Flame, my goal is to help others find what I found at Prayer Rock:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-flame-200 dark:bg-flame-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-flame-600 dark:text-flame-400" />
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">A new identity in Christ</h4>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-flame-200 dark:bg-flame-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="h-6 w-6 text-flame-600 dark:text-flame-400" />
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">A path out of shame and loss</h4>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-flame-200 dark:bg-flame-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-flame-600 dark:text-flame-400" />
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">A renewed sense of belonging and purpose</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* The Mission */}
            <div className="bg-gray-900/90 dark:bg-black/90 backdrop-blur-md rounded-2xl p-8 text-white">
              <div className="text-center">
                <Flame className="h-12 w-12 text-flame-400 mx-auto mb-6" />
                <h2 className="font-serif text-3xl font-bold mb-6">
                  From Shame to Flame
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Because when we kneel at the cross, our brokenness becomes His canvas — and what once 
                  brought us shame can become the very flame that lights the way for others.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/healing-pathways" 
                    className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
                  >
                    Start Your Healing Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    href="/prayer-rock" 
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300"
                  >
                    Visit Prayer Rock Archive
                    <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-sky-600 dark:text-sky-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Built on God's Promises
          </h2>
          
          <blockquote className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 mb-6">
            <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
              "He brought me up out of the pit of destruction, out of the miry clay, 
              and He set my feet upon a rock making my footsteps firm."
            </p>
            <cite className="text-flame-600 dark:text-flame-400 font-medium">Psalm 40:2</cite>
          </blockquote>
          
          <blockquote className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
            <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
              "And we know that in all things God works for the good of those who love him, 
              who have been called according to his purpose."
            </p>
            <cite className="text-flame-600 dark:text-flame-400 font-medium">Romans 8:28</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default PrayerRockStory;