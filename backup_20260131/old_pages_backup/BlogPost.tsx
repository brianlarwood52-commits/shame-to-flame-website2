'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Heart } from 'lucide-react';
import { getBlogPostById } from '../data/blogPosts';

const BlogPost = () => {
  const post = null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <Link
            href="/prayer-rock"
            className="text-flame-600 hover:text-flame-700 font-medium"
          >
            Return to Prayer Rock Archive
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      personal: 'bg-flame-100 text-flame-700 dark:bg-flame-900/30 dark:text-flame-300',
      reflection: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
      teaching: 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300',
      testimony: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      prayer: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/prayer-rock"
              className="inline-flex items-center text-flame-600 hover:text-flame-700 dark:text-flame-400 dark:hover:text-flame-300 font-medium mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prayer Rock Archive
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/\n\n/g, '</p><p class="mb-6">')
                  .replace(/\n/g, '<br>')
                  .replace(/^/, '<p class="mb-6">')
                  .replace(/$/, '</p>')
                  .replace(/# (.*?)(<\/p>|<br>)/g, '<h2 class="font-serif text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">$1</h2>')
                  .replace(/## (.*?)(<\/p>|<br>)/g, '<h3 class="font-serif text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
              }}
            />
          </article>
        </div>
      </section>

      {/* Tags and Sharing */}
      <section className="py-8 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Share this reflection:</span>
              <button className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-flame-100 dark:hover:bg-flame-900/30 transition-colors duration-200 border border-gray-200 dark:border-gray-600">
                <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-flame-100 dark:hover:bg-flame-900/30 transition-colors duration-200 border border-gray-200 dark:border-gray-600">
                <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-flame-400 to-flame-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  About {post.author}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Brian is the founder of Shame to Flame Ministry, a wounded healer who has walked through 
                  the valley of shame, family dysfunction, and spiritual wounds to discover God's incredible 
                  power to transform pain into purpose. His reflections come from a heart that has been 
                  broken and healed, offering hope to others on similar journeys.
                </p>
                <div className="mt-4">
                  <Link
                    href="/my-story"
                    className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium"
                  >
                    Read Brian's full story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            More Reflections
          </h2>
          
          <div className="text-center">
            <Link
              href="/prayer-rock"
              className="inline-flex items-center px-8 py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Explore All Reflections
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;