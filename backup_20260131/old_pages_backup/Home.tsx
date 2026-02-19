'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Sunrise, Users, ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            From <span className="text-sky-300">Shame</span> to <span className="text-flame-400">Flame</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Your pain has a purpose. Your story isn't over.
            Discover how God can transform your deepest wounds into your greatest strength.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/healing-pathways"
              className="group inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-flame-500/50"
            >
              Start Your Healing Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/my-story"
              className="group inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Read My Story
            </Link>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70 drop-shadow-lg" />
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              A Safe Place for Healing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We understand the weight of shame, the ache of grief, and the loneliness of spiritual wounds. 
              Here, you'll find biblical hope, practical tools, and a community that walks alongside you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Trauma-Informed Care",
                description: "Gentle, understanding approaches that honor your journey and respect your pace of healing."
              },
              {
                icon: Shield,
                title: "Safe Community",
                description: "A judgment-free environment where you can be authentic about your struggles and victories."
              },
              {
                icon: Sunrise,
                title: "Biblical Hope",
                description: "Discover how God's love can transform your pain into purpose and your story into strength."
              },
              {
                icon: Users,
                title: "Guided Support",
                description: "Structured pathways and daily encouragements to help you take the next step forward."
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-flame-100 dark:from-sky-900/50 dark:to-flame-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-flame-600 dark:text-flame-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Resources for Your Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of healing resources, daily encouragements, and prayer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Healing Pathways",
                description: "Guided Bible studies addressing shame, grief, depression, and relationship struggles.",
                link: "/healing-pathways",
                gradient: "from-sky-400 to-sky-600"
              },
              {
                title: "Daily Fire",
                description: "Daily encouragements, devotionals, and reflections to inspire hope each day.",
                link: "/daily-fire",
                gradient: "from-flame-400 to-flame-600"
              },
              {
                title: "Prayer Rock Archive",
                description: "A collection of prayers, answered testimonies, and spiritual insights.",
                link: "/prayer-rock",
                gradient: "from-sage-400 to-sage-600"
              }
            ].map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/20 dark:border-gray-700/50"
              >
                <div className={`h-40 bg-gradient-to-br ${resource.gradient} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="text-3xl font-serif font-bold mb-2">{resource.title}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{resource.description}</p>
                  <div className="flex items-center text-flame-600 dark:text-flame-400 font-medium group-hover:text-flame-700 dark:group-hover:text-flame-300">
                    Explore Resource
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            You Don't Have to Walk This Path Alone
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Whether you're just beginning to acknowledge your pain or you're ready to transform it into purpose, 
            we're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
            >
              Get Personal Support
            </Link>
            <Link 
              href="/daily-fire" 
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300"
            >
              Start with Daily Encouragement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;