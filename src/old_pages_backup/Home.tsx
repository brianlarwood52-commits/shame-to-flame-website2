'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, BookOpen, Phone, ChevronDown, Flame, Users, Compass } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';
import HeroAnimation from '../components/HeroAnimation';

const Home = () => {
  const studyPaths = [
    {
      title: "Shame & Guilt",
      description: "When the weight of what you've done — or what was done to you — feels unbearable. Scripture has a path through it.",
      verse: "Isaiah 1:18",
      gradient: "from-flame-600 to-flame-800",
      slug: "shame-and-guilt",
      icon: Flame,
    },
    {
      title: "Grief & Loss",
      description: "Whether it's a person, a relationship, or a life you thought you'd have. You're not alone in this.",
      verse: "Psalm 34:18",
      gradient: "from-sky-600 to-sky-800",
      slug: "grief-and-loss",
      icon: Heart,
    },
    {
      title: "Identity in Christ",
      description: "When you've lost sight of who you are. When shame has rewritten your story. God has a different version.",
      verse: "2 Corinthians 5:17",
      gradient: "from-purple-600 to-purple-800",
      slug: "identity-in-christ",
      icon: Users,
    },
    {
      title: "Forgiveness",
      description: "The hardest journey. Forgiving others, forgiving yourself, and understanding a God who already has.",
      verse: "Ephesians 4:32",
      gradient: "from-sage-600 to-sage-800",
      slug: "forgiveness",
      icon: Shield,
    },
    {
      title: "Hope & Purpose",
      description: "When life feels pointless. When you can't see the road ahead. God's plan doesn't require your clarity — just your willingness.",
      verse: "Jeremiah 29:11",
      gradient: "from-violet-600 to-violet-800",
      slug: "hope-and-purpose",
      icon: Compass,
    },
  ];

  return (
    <div>
      {/* Animated Hero Section */}
      <HeroAnimation />

      {/* What This Ministry Is */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
            A Safe Place to Begin
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Shame to Flame is a Bible-based ministry for people who are hurting. Whether you&apos;re carrying guilt,
            walking through grief, questioning your identity, or feeling distant from God — this is a place to start.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
            We offer guided Scripture studies, not professional counselling. Think of this as a companion
            that walks with you through the Bible, helps you see that you&apos;re not alone, and gives you
            the courage to take the next step — whatever that looks like for you.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {[
              {
                icon: BookOpen,
                title: "Bible-Based",
                description: "Every study path is grounded in Scripture, with insights from Ellen White and biblical characters who walked through the same struggles."
              },
              {
                icon: Shield,
                title: "Private by Design",
                description: "Your journey stays on your device. We don't track you, store your data, or share your information. Your reflections are yours alone."
              },
              {
                icon: Heart,
                title: "A First Step",
                description: "This ministry is a beginning — an introduction to God's plan for your life. When you need more, we'll help you find professional support."
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-flame-100 dark:from-sky-900/50 dark:to-flame-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-flame-600 dark:text-flame-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guided Study Paths */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Guided Bible Study Paths
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the study that speaks to where you are right now. Each path is a journey through Scripture,
              designed to meet you where you are and walk with you forward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {studyPaths.map((path, index) => (
              <Link
                key={index}
                href={`/guided-studies/${path.slug}`}
                className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className={`h-28 bg-gradient-to-br ${path.gradient} flex items-center justify-center relative`}>
                  <path.icon className="h-10 w-10 text-white/80" />
                  <div className="absolute bottom-2 right-3 text-white/60 text-xs font-medium">{path.verse}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">{path.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">{path.description}</p>
                  <div className="flex items-center text-flame-600 dark:text-flame-400 font-medium text-sm group-hover:text-flame-700 dark:group-hover:text-flame-300">
                    Begin this study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story Snippet */}
      <section className="relative py-12 sm:py-16 lg:py-20 text-white overflow-hidden border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-black">
        <div 
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url('/prayer-rock-placeholder.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-6 italic">
            &ldquo;At my lowest point — after years of grief, loss, and shame — I climbed a hill
            and fell to my knees on a rock among the trees. There, God revealed a new mission:
            to help others who feel broken rediscover who they are through Him.&rdquo;
          </p>
          <p className="text-white/80 text-base sm:text-lg mb-4 sm:mb-6">
            That sacred place became Prayer Rock — the birthplace of this ministry.
          </p>
          <Link
            href="/my-story"
            className="inline-flex items-center px-6 py-3 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-colors"
          >
            Read the full story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Crisis Resources Banner */}
      <section className="py-8 bg-sky-600/90 dark:bg-sky-800/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Phone className="h-6 w-6 text-white" />
            <p className="text-white text-sm sm:text-base lg:text-lg">
              Need to talk to someone? Free crisis helplines are available 24/7.
            </p>
            <Link
              href="/crisis-help"
              className="inline-flex items-center px-6 py-2 bg-white text-sky-600 font-medium rounded-full hover:bg-sky-50 transition-colors"
            >
              View Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            You Don&apos;t Have to Walk This Path Alone
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            This is a beginning — not the whole journey. Whether you need to open God&apos;s Word
            for the first time or rediscover the faith you once had, these studies are here to walk with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/guided-studies" 
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white text-sm sm:text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start a Guided Study
            </Link>
            <Link 
              href="/submit-prayer" 
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-white text-sm sm:text-base font-medium rounded-full transition-all duration-300"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </section>
    </div>
  );
};

export default Home;
