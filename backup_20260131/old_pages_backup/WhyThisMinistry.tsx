'use client'

import React from 'react';
import { Target, Compass, Users, Lightbulb } from 'lucide-react';

const WhyThisMinistry = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Why This Ministry Exists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Born from pain, forged in hope, and dedicated to the truth that no one should 
            walk through shame and healing alone.
          </p>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-2xl p-8 mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Vision</h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed text-center">
              To create a sanctuary where wounded hearts find healing, broken spirits discover wholeness, 
              and shame transforms into the flame of purpose—all through the redemptive love of Jesus Christ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4">The Heart Behind the Ministry</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Shame to Flame was born from a deeply personal understanding of what it means to be trapped 
                in cycles of shame, guilt, and spiritual disconnection. Having walked through the valley of 
                despair and emerged by God's grace, I couldn't remain silent about the hope that changed everything.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This ministry exists because too many people are suffering in silence, believing lies about 
                their worth, and missing out on the abundant life God has planned for them. It exists because 
                the church should be the safest place for broken people, not a performance stage for those 
                who have it all together.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4">The Gap We Fill</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Many people have been wounded by religion or feel like they don't fit the mold of what a 
                "good Christian" should look like. Others carry deep shame that makes them feel unworthy 
                of God's love. Traditional ministry approaches often don't address the complex intersection 
                of faith, trauma, and mental health.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Shame to Flame bridges this gap by offering trauma-informed, biblically grounded resources 
                that meet people exactly where they are—in their mess, in their questions, in their pain—and 
                walk alongside them toward healing and wholeness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Radical Grace",
                description: "We believe God's grace is sufficient for every sin, every wound, and every broken place. No one is too far gone for His love."
              },
              {
                icon: Compass,
                title: "Truth in Love",
                description: "We speak biblical truth with gentleness, understanding that healing happens in an atmosphere of safety and acceptance."
              },
              {
                icon: Users,
                title: "Safe Community",
                description: "We create spaces where authenticity is valued over perfection, and vulnerability is met with compassion."
              },
              {
                icon: Lightbulb,
                title: "Practical Hope",
                description: "We offer concrete tools and pathways for healing, not just inspiration, because hope needs action to become reality."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <value.icon className="h-12 w-12 text-flame-500 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Need */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            The Need Is Real
          </h2>
          
          <div className="space-y-8">
            <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl p-6">
              <h3 className="font-serif text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">Spiritual Wounds</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Many people have been hurt by churches, religious leaders, or toxic theology that emphasized 
                performance over grace. They long for God but are afraid to trust again.
              </p>
            </div>
            
            <div className="bg-flame-50 dark:bg-flame-900/30 rounded-xl p-6">
              <h3 className="font-serif text-xl font-semibold text-flame-700 dark:text-flame-300 mb-3">Shame and Trauma</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Shame tells us that we ARE bad, not just that we've done bad things. This lie keeps people 
                trapped in cycles of self-destruction and prevents them from receiving God's love.
              </p>
            </div>
            
            <div className="bg-sage-50 dark:bg-sage-900/30 rounded-xl p-6">
              <h3 className="font-serif text-xl font-semibold text-sage-700 dark:text-sage-300 mb-3">Isolation and Disconnection</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                When people feel broken or "too much" for traditional church settings, they often withdraw 
                completely, missing out on both divine and human love that could facilitate healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Approach
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-flame-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Meet People Where They Are</h3>
                <p className="text-gray-300 leading-relaxed">
                  We don't require people to clean up their act before they can receive help. We offer 
                  resources for every stage of the healing journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-flame-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Combine Faith and Wisdom</h3>
                <p className="text-gray-300 leading-relaxed">
                  We integrate biblical truth with trauma-informed practices, understanding that God works 
                  through many means to bring healing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-flame-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Provide Ongoing Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Healing is a journey, not a destination. We offer daily encouragement, structured pathways, 
                  and a community that walks alongside each person.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-flame-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Celebrate Transformation</h3>
                <p className="text-gray-300 leading-relaxed">
                  We believe that every person's healing story has the power to inspire others. We create 
                  space for testimonies and celebration of God's redemptive work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Built on God's Promises
          </h2>
          
          <div className="space-y-6">
            <blockquote className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "The Spirit of the Lord God is upon me, because the Lord has anointed me to bring 
                good news to the poor; he has sent me to bind up the brokenhearted, to proclaim 
                liberty to the captives, and the opening of the prison to those who are bound;"
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-medium">Isaiah 61:1</cite>
            </blockquote>
            
            <blockquote className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "He heals the brokenhearted and binds up their wounds."
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-medium">Psalm 147:3</cite>
            </blockquote>
            
            <blockquote className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "And we know that in all things God works for the good of those who love him, 
                who have been called according to his purpose."
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-medium">Romans 8:28</cite>
            </blockquote>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-8 leading-relaxed">
            This ministry exists because these promises are true, and every person deserves to experience 
            the healing, hope, and purpose that God offers through His love.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhyThisMinistry;