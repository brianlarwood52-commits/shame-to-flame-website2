'use client'

import React from 'react';
import { BookOpen, Heart, Star, Users, ArrowRight, Download } from 'lucide-react';

const MaryMagdaleneApologetic = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Reclaiming Mary Magdalene
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            From Family Betrayal to Resurrection Witness: A Biblical Apologetic
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">Introduction</h2>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              For nearly two thousand years, Mary Magdalene has been one of the most misunderstood figures in Christian history. Popular culture, religious tradition, and even well-meaning sermons have painted her as a reformed prostitute—a woman of the streets who found redemption at the feet of Jesus. This narrative, while compelling in its message of grace, has done a profound disservice to both Mary's true story and to countless believers who have been wounded not by their own choices, but by the betrayal of those they trusted most.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              The traditional portrayal of Mary Magdalene as a prostitute is not only historically questionable—it fundamentally misses the deeper, more painful truth of her experience. What if Mary Magdalene's story isn't about sexual sin at all, but about something far more devastating: the betrayal of family, the rejection by religious leaders who should have protected her, and the public shaming by those who were supposed to love her unconditionally?
            </p>

            <div className="bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/50 my-8">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                Through careful examination of Scripture, the insights of Ellen G. White, and the scholarship found in the Seventh-day Adventist Bible Commentary, a different picture emerges—one that reveals Mary Magdalene not as a woman of the streets, but as a woman of noble birth whose heart was shattered by those closest to her. She was, according to this evidence, the sister of Martha and Lazarus, and the niece of Simon the Pharisee—the very man who would publicly shame her in his own home.
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              This is not merely an academic exercise in biblical interpretation. The true story of Mary Magdalene speaks directly to anyone who has ever been wounded by family betrayal, rejected by religious communities, or made to feel that their pain disqualifies them from God's love. Her story is one of profound relevance for our time, when so many carry the shame not of their own making, but of wounds inflicted by those who should have been their protectors.
            </p>
          </div>
        </div>
      </section>

      {/* Key Arguments */}
      <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Key Arguments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-flame-100 dark:bg-flame-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-flame-600 dark:text-flame-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                The "Without Blemish" Principle
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                While God's grace can make any gift acceptable, Mary's sacrifice of her dowry—her future security—to purchase the precious ointment shows the depth of her devotion and the Holy Spirit's prompting for this sacred act.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                "Your Faith Has Saved You"
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Jesus said "Your faith has saved you"—not "Go and sin no more." This suggests she was already in right standing with God, her heart already turned toward Him despite her wounds.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-sage-600 dark:text-sage-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                Family Betrayal, Not Profession
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                As the niece of Simon the Pharisee and sister of Martha and Lazarus, Mary's encounters with men stemmed from family betrayal and seeking love in wrong places—not professional activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Why This Matters
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              The implications of understanding Mary Magdalene's true story extend far beyond historical accuracy. When we perpetuate the myth of Mary as a reformed prostitute, we inadvertently reinforce several harmful ideas:
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-400 dark:border-yellow-600 mb-6">
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>We suggest that dramatic sin is somehow more worthy of Jesus's attention than the quiet suffering of the betrayed and abandoned.</li>
                <li>We imply that a woman's worth is primarily tied to her sexual purity or impurity.</li>
                <li>We miss the profound truth that Jesus came not just for those who had made wrong choices, but for those who had been wronged by others—especially by family and religious leaders.</li>
              </ul>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              But perhaps most significantly, we overlook one of the most powerful theological truths embedded in Mary's story: that her gift to Jesus—the precious ointment with which she anointed Him—represented an extraordinary sacrifice. While God's grace can make any offering acceptable ("Though your sins be as scarlet, they shall be as white as snow"), the evidence suggests Mary sacrificed her dowry—her future security and hope of marriage—to purchase this costly ointment. This wasn't the act of someone earning money through sin, but of someone giving up everything for love of her Savior.
            </p>

            <div className="bg-gradient-to-r from-flame-50/90 to-orange-50/90 dark:from-flame-900/30 dark:to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-flame-200/50 dark:border-flame-700/50">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium italic text-center">
                When Jesus looked at Mary, He saw not a prostitute to be reformed, but a daughter who had sacrificed everything—including her dowry and future security—out of love for Him. When He said to her, "Your faith has saved you," He was affirming the faith that had survived family betrayal and led her to give up her most precious possession for His honor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Full Apologetic Coming Soon
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            This introduction is just the beginning. The complete biblical apologetic will include detailed scriptural analysis, Ellen White insights, historical context, and practical applications for modern believers who have experienced family betrayal and religious rejection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50">
              <Download className="mr-2 h-5 w-5" />
              Download Preview (PDF)
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300">
              Subscribe for Updates
            </button>
          </div>
          
          <p className="text-gray-400 mt-6">
            Interested in the full book? Contact us to be notified when it's available.
          </p>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-sky-600 dark:text-sky-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Built on Scripture and Spirit of Prophecy
          </h2>
          
          <blockquote className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
            <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
              "Her journey from family betrayal to becoming the first witness of the resurrection is not just her story—it is the story of everyone who has discovered that their deepest wounds can become the very place where they encounter the transforming love of Christ."
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default MaryMagdaleneApologetic;