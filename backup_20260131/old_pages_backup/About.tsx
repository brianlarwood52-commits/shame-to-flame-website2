'use client'

import React from 'react';
import { Users, Heart, Book, Compass } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About Shame to Flame
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A ministry dedicated to walking alongside those who have been wounded by life, 
            offering hope, healing, and the transformative power of God's love.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-2xl p-8 mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed text-center mb-6">
              To provide a safe, biblically-grounded space where individuals can process shame, 
              grief, trauma, and spiritual wounds while discovering God's heart for restoration and purpose.
            </p>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center italic">
                "We believe that no pain is wasted in God's kingdom, and every story of brokenness 
                can become a testimony of His incredible power to heal and restore."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Healing Resources",
                description: "Trauma-informed biblical studies and practical tools for processing shame, grief, and spiritual wounds."
              },
              {
                icon: Book,
                title: "Daily Encouragement",
                description: "Daily Fire devotionals and reflections designed to inspire hope and strengthen faith on the healing journey."
              },
              {
                icon: Compass,
                title: "Guided Pathways",
                description: "Structured healing pathways that address specific struggles like depression, addiction, and relationship issues."
              },
              {
                icon: Users,
                title: "Community Support",
                description: "A safe, non-judgmental community where authenticity is valued and healing happens together."
              }
            ].map((offer, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <offer.icon className="h-12 w-12 text-flame-500 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3">{offer.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          
          <div className="space-y-8">
            <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl p-6">
              <h3 className="font-serif text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Grace Over Performance</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                We believe that God's love is not dependent on your performance or your ability to "get it right." 
                His grace is sufficient for every failure, every wound, and every broken place in your heart. 
                You are loved exactly as you are, right where you are.
              </p>
            </div>
            
            <div className="bg-flame-50 dark:bg-flame-900/30 rounded-xl p-6">
              <h3 className="font-serif text-2xl font-semibold text-flame-700 dark:text-flame-300 mb-4">Truth Spoken in Love</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                We are committed to biblical truth, but we believe it must always be shared with gentleness, 
                compassion, and understanding. Truth without love is harsh; love without truth is empty. 
                We strive for both in everything we do.
              </p>
            </div>
            
            <div className="bg-sage-50 dark:bg-sage-900/30 rounded-xl p-6">
              <h3 className="font-serif text-2xl font-semibold text-sage-700 dark:text-sage-300 mb-4">Safe Spaces for Healing</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Healing happens best in an environment of safety and acceptance. We are committed to creating 
                spaces where you can be honest about your struggles, ask difficult questions, and process 
                pain without fear of judgment or rejection.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-6">
              <h3 className="font-serif text-2xl font-semibold text-yellow-700 dark:text-yellow-300 mb-4">Hope for Every Story</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                No matter how dark your past, how deep your pain, or how broken you feel, we believe that 
                God has a plan for your healing and a purpose for your life. Your story isn't over, and 
                your pain doesn't have to be the end of your chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Heart for Ministry
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-sky-200 to-flame-200 dark:from-sky-700 dark:to-flame-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-12 w-12 text-flame-600 dark:text-flame-400" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-800 dark:text-white mb-2">Founded on Personal Experience</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Shame to Flame was founded by someone who has walked the difficult path from shame to healing. 
              Having experienced the isolating power of shame, the weight of spiritual wounds, and the 
              transformative grace of God's love, our founder understands both the depth of pain and the 
              reality of hope.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              This ministry is not led by someone who has theoretical knowledge about suffering—it's 
              guided by someone who has lived it, processed it, and found healing through God's grace. 
              This personal experience informs every resource we create and every interaction we have.
            </p>
            
            <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-xl p-6">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium text-center italic">
                "We don't offer quick fixes or easy answers. We offer companionship on the journey, 
                biblical hope for the process, and the assurance that God can use even your deepest 
                pain for His glory and your good."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership and Accountability */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Partnership and Accountability
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">Professional Support</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                While Shame to Flame offers biblical and spiritual resources, we recognize that some 
                wounds require professional counseling or medical care. We strongly encourage seeking 
                appropriate professional help when needed.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe God works through many means—including counselors, doctors, and other 
                helping professionals—to bring healing and wholeness to our lives.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">Ministry Network</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Shame to Flame is connected with other ministries focused on healing and restoration, 
                including Learn Live Forgive, Running to God, and Project Reconcile. This network 
                provides additional resources and accountability.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe in the power of community and collaboration in the healing process, 
                and we're grateful to be part of a larger movement of God's healing work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Invitation */}
      <section className="py-16 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            We'd Love to Connect With You
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Whether you're just beginning to explore your healing journey or you're ready to transform 
            your pain into purpose, we're here to walk alongside you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
            <a 
              href="/healing-pathways" 
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded-full transition-all duration-300"
            >
              Explore Resources
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;