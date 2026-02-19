'use client'

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MyStory = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-flame-500 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              My Story of Redemption
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              From the depths of shame and despair to the heights of God's grace and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 dark:border-gray-700/50">
              <blockquote className="text-center font-serif text-2xl text-gray-700 dark:text-gray-200 italic mb-4">
                "He brought me up out of the pit of destruction, out of the miry clay, 
                and He set my feet upon a rock making my footsteps firm."
              </blockquote>
              <p className="text-center text-flame-600 dark:text-flame-400 font-medium">- Psalm 40:2</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6">The Pit of Shame</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  For years, I carried a weight that seemed too heavy to bear. Shame had become my companion, 
                  whispering lies about my worth, my future, and my relationship with God. What started as 
                  childhood wounds had grown into a fortress of self-protection that kept me isolated from 
                  the very love I desperately needed.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I knew all the right words to say, all the Bible verses about God's love, but in my heart, 
                  I couldn't believe they applied to someone like me. The pain felt too deep, the mistakes too many, 
                  the brokenness too complete. I had convinced myself that God's grace was for everyone else—but not for me.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6">The Breaking Point</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Rock bottom became the solid foundation I needed to build a new life. In my darkest moment, 
                  when I had nowhere left to turn and no strength left to pretend, I finally cried out to God 
                  with complete honesty. No religious words, no pretense—just raw, desperate need.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  That's when I discovered that God doesn't wait for us to clean ourselves up before He loves us. 
                  He meets us in our mess, in our shame, in our brokenness. He whispers, "This is exactly where 
                  I want to begin."
                </p>
              </div>

              <div className="bg-flame-50/90 dark:bg-flame-900/30 backdrop-blur-sm rounded-xl p-6 border border-flame-200/50 dark:border-flame-700/50">
                <h3 className="font-serif text-2xl font-semibold text-flame-700 dark:text-flame-300 mb-4">The Turning Point</h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  I'll never forget the moment I realized that my pain wasn't wasted. God began to show me that 
                  every wound, every tear, every moment of despair could become a doorway for His healing power—not 
                  just in my life, but in the lives of others who were walking similar paths.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6">The Transformation</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Healing didn't happen overnight. It was a journey of small steps, daily choices to believe God's 
                  truth over my feelings, and learning to extend to myself the same grace I would offer a friend. 
                  Through counseling, community, and countless hours in God's Word, I began to see myself through His eyes.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The shame that had once defined me began to transform into compassion for others. The pain that 
                  had isolated me became a bridge to connect with hurting hearts. My story of brokenness became 
                  a testimony of God's incredible power to restore and redeem.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6">The Mission</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Today, I stand amazed at what God has done. Not because my life is perfect—it's not. But because 
                  I've learned that God's love is not dependent on my performance, and His grace is sufficient for 
                  every failure, every wound, every broken place in my heart.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Shame to Flame was born from this journey. It's my offering to others who are where I once was—lost 
                  in shame, believing lies about their worth, and wondering if God could ever love someone like them. 
                  The answer is a resounding YES. Your story isn't over. Your pain has purpose. And God is ready to 
                  transform your shame into flame.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-sky-600/90 to-flame-600/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Your Story Matters Too
          </h2>
          <p className="text-xl mb-8 leading-relaxed opacity-90">
            If my story resonates with yours, please know that you're not alone. God has a plan for your pain, 
            and your healing journey can become a beacon of hope for others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/healing-pathways" 
              className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30"
            >
              Begin Your Healing Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/50 hover:bg-white/10 hover:border-white/70 backdrop-blur-sm font-medium rounded-full transition-all duration-300"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyStory;