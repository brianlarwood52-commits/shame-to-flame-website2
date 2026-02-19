'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Users, Star, Key } from 'lucide-react';
import { getPathwayById } from '../data/healingPathways';
import PathwaySession from '../components/PathwaySession';

const PathwayDetail = () => {
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Set<number>>(new Set());

  const pathway = null;

  if (!pathway) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Pathway Not Found
          </h1>
          <Link
            href="/healing-pathways"
            className="text-flame-600 hover:text-flame-700 font-medium"
          >
            Return to Healing Pathways
          </Link>
        </div>
      </div>
    );
  }

  const currentSession = pathway.sessions[currentSessionIndex];
  const progress = (completedSessions.size / pathway.sessions.length) * 100;

  const handleSessionComplete = () => {
    setCompletedSessions(prev => new Set([...prev, currentSessionIndex]));
  };

  const handleNext = () => {
    if (currentSessionIndex < pathway.sessions.length - 1) {
      setCurrentSessionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSessionIndex > 0) {
      setCurrentSessionIndex(prev => prev - 1);
    }
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
    <div className="animate-fade-in min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/healing-pathways"
              className="inline-flex items-center text-flame-600 hover:text-flame-700 dark:text-flame-400 dark:hover:text-flame-300 font-medium mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pathways
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {pathway.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {pathway.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {pathway.estimatedWeeks} weeks
                  </span>
                </div>
                <div className="flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full px-4 py-2">
                  <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {pathway.sessions.length} sessions
                  </span>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-medium ${getDifficultyColor(pathway.difficulty)}`}>
                  <Star className="h-4 w-4 inline mr-1" />
                  {pathway.difficulty}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50">
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Your Progress
                </h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Sessions Completed</span>
                    <span>{completedSessions.size}/{pathway.sessions.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-flame-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  {pathway.sessions.map((session, index) => (
                    <div
                      key={session.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        index === currentSessionIndex
                          ? 'bg-flame-100 dark:bg-flame-900/30 border border-flame-300 dark:border-flame-700'
                          : completedSessions.has(index)
                          ? 'bg-sage-100 dark:bg-sage-900/30'
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setCurrentSessionIndex(index)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                          completedSessions.has(index)
                            ? 'bg-sage-500 text-white'
                            : index === currentSessionIndex
                            ? 'bg-flame-500 text-white'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {completedSessions.has(index) ? '✓' : session.id}
                        </div>
                        <span className={`text-sm font-medium ${
                          index === currentSessionIndex
                            ? 'text-flame-700 dark:text-flame-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {session.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Session */}
      <section className="py-8">
        <PathwaySession
          session={currentSession}
          onComplete={handleSessionComplete}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentSessionIndex === 0}
          isLast={currentSessionIndex === pathway.sessions.length - 1}
        />
      </section>
    </div>
  );
};

export default PathwayDetail;