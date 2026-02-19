'use client'

import React, { useState, useEffect } from 'react';
import { BookOpen, Key, Info, Star, Clock, Users } from 'lucide-react';
import BibleReader from '../components/BibleReader';

const BibleStudy = () => {
  return (
    <div className="animate-fade-in min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Bible Study Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Dive deep into God's Word with our comprehensive Bible reading platform. 
            Choose from multiple translations, navigate easily through books and chapters, 
            and prepare your heart for transformation through Scripture.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Bible Study Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-flame-100 dark:bg-flame-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-flame-600 dark:text-flame-400" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Multiple Translations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Choose from ESV, NIV, KJV, NLT, NASB and more
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Easy Navigation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Jump between books, chapters, and specific verses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-sage-600 dark:text-sage-400" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Reading Plans
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Structured plans for systematic Bible study (Coming Soon)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Study Groups
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Collaborative study features (Coming Soon)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bible Reader */}
      <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <BibleReader />
      </section>

      {/* Study Tips */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Bible Study Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-sky-50/90 to-sky-100/90 dark:from-sky-900/30 dark:to-sky-800/30 backdrop-blur-sm rounded-xl p-6 border border-sky-200/50 dark:border-sky-700/50">
              <h3 className="font-serif text-xl font-semibold text-sky-700 dark:text-sky-300 mb-4">
                Start with Prayer
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Before diving into Scripture, ask the Holy Spirit to open your heart and mind 
                to receive God's truth. Prayer prepares us to hear from God through His Word.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-flame-50/90 to-flame-100/90 dark:from-flame-900/30 dark:to-flame-800/30 backdrop-blur-sm rounded-xl p-6 border border-flame-200/50 dark:border-flame-700/50">
              <h3 className="font-serif text-xl font-semibold text-flame-700 dark:text-flame-300 mb-4">
                Read in Context
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Understanding the historical and cultural context helps us interpret Scripture 
                accurately. Consider who wrote it, when, and to whom it was written.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-sage-50/90 to-sage-100/90 dark:from-sage-900/30 dark:to-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-200/50 dark:border-sage-700/50">
              <h3 className="font-serif text-xl font-semibold text-sage-700 dark:text-sage-300 mb-4">
                Apply Personally
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Ask yourself: "What is God saying to me through this passage?" Look for 
                practical ways to apply biblical truths to your daily life and relationships.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50/90 to-purple-100/90 dark:from-purple-900/30 dark:to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50">
              <h3 className="font-serif text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
                Study Consistently
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Regular, consistent study is more beneficial than occasional long sessions. 
                Even 10-15 minutes daily can transform your relationship with God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-16 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-8">
            Coming Soon to Bible Study Center
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Info className="h-8 w-8 text-flame-400 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Study Notes</h3>
              <p className="text-gray-300 text-sm">
                Personal note-taking and highlighting features
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-8 w-8 text-sky-400 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Group Studies</h3>
              <p className="text-gray-300 text-sm">
                Collaborative study sessions with discussion features
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Star className="h-8 w-8 text-sage-400 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">Reading Plans</h3>
              <p className="text-gray-300 text-sm">
                Guided reading plans for systematic Bible study
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 mt-8">
            We're continuously improving the Bible Study Center to help you grow deeper in God's Word.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BibleStudy;