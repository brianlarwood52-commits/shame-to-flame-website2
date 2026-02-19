'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, Calendar, BookOpen, WifiOff } from 'lucide-react';
import { offlineStorage } from '@/services/offlineStorage';
import OfflineDownload from './OfflineDownload';

interface Devotional {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  scripture: {
    text: string;
    reference: string;
  };
  message: string[];
  reflection: string;
  prayer: string;
}

interface DevotionalContentProps {
  devotionalId: number;
  devotional: Devotional | null;
  isToday: boolean;
  relatedDevotionals: Devotional[];
}

export default function DevotionalContent({
  devotionalId,
  devotional: initialDevotional,
  isToday,
  relatedDevotionals,
}: DevotionalContentProps) {
  const [devotional, setDevotional] = useState<Devotional | null>(initialDevotional);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoadingOffline, setIsLoadingOffline] = useState(false);

  useEffect(() => {
    const checkOfflineContent = async () => {
      if (!navigator.onLine && !devotional) {
        setIsOffline(true);
        setIsLoadingOffline(true);

        try {
          const offlineContent = await offlineStorage.getContent(devotionalId.toString());

          if (offlineContent) {
            setDevotional(offlineContent.content);
          }
        } catch (error) {
          console.error('Error loading offline content:', error);
        } finally {
          setIsLoadingOffline(false);
        }
      }
    };

    checkOfflineContent();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [devotionalId, devotional]);

  if (isLoadingOffline) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-flame-50 via-orange-50 to-yellow-50 dark:from-flame-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-flame-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading offline content...</p>
        </div>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-flame-50 via-orange-50 to-yellow-50 dark:from-flame-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff className="h-10 w-10 text-orange-600 dark:text-orange-400" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Content Not Available Offline
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              This devotional isn't downloaded for offline viewing yet. When you're back online,
              visit this page and click "Download for Offline" to save it to your device!
            </p>

            <div className="bg-flame-50 dark:bg-flame-900/20 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-flame-800 dark:text-flame-300 mb-3">
                How to Access Content Offline:
              </h3>
              <ol className="text-left text-gray-700 dark:text-gray-300 space-y-2 max-w-md mx-auto">
                <li className="flex gap-3">
                  <span className="font-semibold text-flame-600 dark:text-flame-400">1.</span>
                  <span>Connect to the internet</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-flame-600 dark:text-flame-400">2.</span>
                  <span>Visit the devotional page you want to save</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-flame-600 dark:text-flame-400">3.</span>
                  <span>Click the "Download for Offline" button</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-flame-600 dark:text-flame-400">4.</span>
                  <span>Access it anytime, even without internet!</span>
                </li>
              </ol>
            </div>

            <Link
              href="/daily-fire"
              className="inline-flex items-center text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Daily Fire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="pt-24 pb-12 bg-gradient-to-br from-flame-50 via-orange-50 to-yellow-50 dark:from-flame-900/30 dark:via-orange-900/30 dark:to-yellow-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/daily-fire"
            className="inline-flex items-center text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Daily Fire
          </Link>

          <div className="flex items-center gap-4 mb-4">
            {isToday && (
              <span className="bg-flame-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Today's Fire
              </span>
            )}
            <span className="bg-white dark:bg-gray-800 px-4 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
              Day {devotional.id}
            </span>
            <span className="bg-white dark:bg-gray-800 px-4 py-1 rounded-full text-sm font-medium text-flame-600 dark:text-flame-400">
              {devotional.category}
            </span>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-flame-500 rounded-full flex items-center justify-center animate-float">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            {devotional.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {devotional.date}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {devotional.readTime} read
            </span>
          </div>

          <div className="flex justify-center">
            <OfflineDownload
              contentId={devotional.id.toString()}
              contentType="devotional"
              contentTitle={devotional.title}
              contentData={devotional}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <blockquote className="border-l-4 border-flame-300 pl-6 mb-8 bg-gradient-to-r from-flame-50 to-orange-50 dark:from-flame-900/30 dark:to-orange-900/30 rounded-r-lg p-6">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "{devotional.scripture.text}"
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-semibold text-lg">
                - {devotional.scripture.reference}
              </cite>
            </blockquote>

            {devotional.message.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}

            <div className="bg-flame-100 dark:bg-flame-900/30 rounded-xl p-6 mb-8">
              <h2 className="font-serif text-2xl font-semibold text-flame-800 dark:text-flame-300 mb-3">
                Today's Reflection
              </h2>
              <p className="text-flame-700 dark:text-flame-300 text-lg leading-relaxed">
                {devotional.reflection}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Prayer for Today
              </h2>
              <p className="text-gray-700 dark:text-gray-200 italic text-lg leading-relaxed">
                {devotional.prayer}
              </p>
            </div>
          </article>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit-prayer"
              className="bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 text-center"
            >
              Submit a Prayer Request
            </Link>
            <Link
              href="/healing-pathways"
              className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 text-center"
            >
              Explore Healing Pathways
            </Link>
          </div>
        </div>
      </section>

      {relatedDevotionals.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              More on {devotional.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedDevotionals.map((related) => (
                <Link key={related.id} href={`/daily-fire/${related.slug}`}>
                  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Day {related.id}</span>
                        <span className="text-xs text-flame-600 dark:text-flame-400">{related.readTime}</span>
                      </div>

                      <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-flame-600 dark:hover:text-flame-400 transition-colors duration-200">
                        {related.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {related.message[0]}
                      </p>

                      <span className="text-sm text-sky-600 dark:text-sky-400 font-medium">
                        {related.scripture.reference}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/daily-fire"
                className="inline-flex items-center text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium"
              >
                View All Daily Fires
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
