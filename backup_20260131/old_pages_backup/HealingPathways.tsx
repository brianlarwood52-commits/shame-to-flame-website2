'use client'

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Shield, Sunrise, ArrowRight, Users, Clock, Star } from 'lucide-react';
import { healingPathways } from '../data/healingPathways';
import OfflineDownload from '../components/OfflineDownload';

const HealingPathways = () => {
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Heart,
      Sunrise,
      Shield,
      Users,
      BookOpen
    };
    return icons[iconName] || BookOpen;
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      flame: "from-flame-400 to-flame-600 border-flame-200",
      sky: "from-sky-400 to-sky-600 border-sky-200",
      sage: "from-sage-400 to-sage-600 border-sage-200",
      yellow: "from-yellow-400 to-yellow-600 border-yellow-200",
      purple: "from-purple-400 to-purple-600 border-purple-200",
      rose: "from-rose-400 to-rose-600 border-rose-200"
    };
    return colorMap[color] || colorMap.flame;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Healing Pathways
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Guided biblical studies and practical resources designed to walk you through 
            specific areas of healing and growth. Each pathway is trauma-informed and 
            grounded in God's love and truth.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            How Healing Pathways Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-flame-100 dark:bg-flame-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-flame-600 dark:text-flame-400">1</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Choose Your Path</h3>
              <p className="text-gray-600 dark:text-gray-300">Select the pathway that addresses your current area of need or interest.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-sky-600 dark:text-sky-400">2</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Work at Your Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">Each pathway includes weekly sessions that you can complete on your own schedule.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-sage-600 dark:text-sage-400">3</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Complete reflection questions and practical steps while tracking your healing journey.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/50">
            <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed">
              <strong>Important Note:</strong> While these pathways offer biblical guidance and practical tools, 
              they are not a substitute for professional counseling when needed. We encourage you to seek 
              appropriate professional help alongside your spiritual healing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Available Pathways
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healingPathways.map((pathway) => {
              const IconComponent = getIconComponent(pathway.icon);
              
              return (
                <div key={pathway.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/20 dark:border-gray-700/50">
                  <div className={`h-32 bg-gradient-to-br ${getColorClasses(pathway.color)} flex items-center justify-center`}>
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white">
                        {pathway.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(pathway.difficulty)}`}>
                        {pathway.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {pathway.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{pathway.estimatedWeeks} weeks</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{pathway.sessions.length} sessions</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/healing-pathways/${pathway.id}`}
                      className="w-full bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group mb-3"
                    >
                      Start This Pathway
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    <div className="flex justify-center">
                      <OfflineDownload
                        contentId={`pathway-${pathway.id}`}
                        contentType="pathway"
                        contentTitle={pathway.title}
                        contentData={pathway}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Resources */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-sky-50/90 to-sky-100/90 dark:from-sky-900/30 dark:to-sky-800/30 backdrop-blur-sm rounded-xl p-6 border border-sky-200/50 dark:border-sky-700/50">
              <h3 className="font-serif text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">Quick Start Guides</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                New to healing work? Our quick start guides help you understand where to begin 
                and what to expect on your journey.
              </p>
              <Link 
                href="/quick-start" 
                className="inline-flex items-center text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
              >
                Explore Quick Starts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-flame-50/90 to-flame-100/90 dark:from-flame-900/30 dark:to-flame-800/30 backdrop-blur-sm rounded-xl p-6 border border-flame-200/50 dark:border-flame-700/50">
              <h3 className="font-serif text-2xl font-semibold text-flame-700 dark:text-flame-300 mb-4">Support Groups</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Join others who are walking similar paths. Our online support groups provide 
                encouragement and accountability in a safe environment.
              </p>
              <Link 
                href="/support-groups" 
                className="inline-flex items-center text-flame-600 hover:text-flame-700 dark:text-flame-400 dark:hover:text-flame-300 font-medium"
              >
                Find Your Group
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Remember: healing is not a destination but a journey. Every step you take toward 
            wholeness is significant, and you don't have to take those steps alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
            >
              Get Personal Guidance
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

export default HealingPathways;