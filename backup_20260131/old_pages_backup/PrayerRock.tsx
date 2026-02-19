'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, BookOpen, Users, Star, ArrowRight, Calendar, User, Clock, Tag, Search, Filter } from 'lucide-react';
import { blogPosts, getBlogPostsByCategory, getFeaturedPosts, getRecentPosts } from '../data/blogPosts';

const PrayerRock = () => {
  const [activeTab, setActiveTab] = useState<'prayers' | 'blog'>('blog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const prayerCategories = [
    {
      title: "Prayers for Healing",
      description: "Heartfelt prayers for physical, emotional, and spiritual healing",
      icon: Heart,
      count: 45,
      color: "flame"
    },
    {
      title: "Breakthrough Prayers",
      description: "Powerful prayers for breaking through barriers and strongholds",
      icon: Star,
      count: 32,
      color: "sky"
    },
    {
      title: "Prayers for Families",
      description: "Prayers for restoration, unity, and healing within families",
      icon: Users,
      count: 28,
      color: "sage"
    },
    {
      title: "Scripture-Based Prayers",
      description: "Prayers rooted in God's Word and promises",
      icon: BookOpen,
      count: 38,
      color: "purple"
    }
  ];

  const testimonies = [
    {
      title: "From Addiction to Freedom",
      excerpt: "After 15 years of struggling with addiction, God met me in my darkest hour. Through the prayers and support of this community, I've been clean for 2 years now.",
      author: "Sarah M.",
      category: "Addiction Recovery",
      date: "2 weeks ago"
    },
    {
      title: "Healing After Loss",
      excerpt: "When I lost my husband, I thought my world had ended. The prayers here helped me find hope again and discover that God's love never fails.",
      author: "Margaret K.",
      category: "Grief & Loss",
      date: "1 month ago"
    },
    {
      title: "Restored Marriage",
      excerpt: "We were on the brink of divorce, but God intervened. Through prayer and counseling, our marriage is stronger than ever before.",
      author: "David & Lisa",
      category: "Relationships",
      date: "3 weeks ago"
    }
  ];

  const blogCategories = [
    { value: 'all', label: 'All Posts', count: blogPosts.length },
    { value: 'personal', label: 'Personal Reflections', count: getBlogPostsByCategory('personal').length },
    { value: 'reflection', label: 'Spiritual Reflections', count: getBlogPostsByCategory('reflection').length },
    { value: 'teaching', label: 'Teachings', count: getBlogPostsByCategory('teaching').length },
    { value: 'testimony', label: 'Testimonies', count: getBlogPostsByCategory('testimony').length },
    { value: 'prayer', label: 'Prayer Insights', count: getBlogPostsByCategory('prayer').length }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      flame: "from-flame-400 to-flame-600",
      sky: "from-sky-400 to-sky-600",
      sage: "from-sage-400 to-sage-600",
      purple: "from-purple-400 to-purple-600"
    };
    return colorMap[color] || colorMap.flame;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = getFeaturedPosts();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-flame-400 to-flame-600 rounded-full shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Prayer Rock Archive
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            A sacred collection of prayers, personal reflections, and spiritual insights 
            that have emerged from my journey of faith and healing. Here, on this digital Prayer Rock, 
            I share the lessons God has taught me through pain, prayer, and His transforming grace.
          </p>
          
          {/* Origin Story Highlight */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50 max-w-2xl mx-auto">
            <div className="text-gray-700 dark:text-gray-200 leading-relaxed">
              <h3 className="font-serif text-xl font-semibold text-flame-700 dark:text-flame-300 mb-4">
                My Journey: From Grief and Confusion to Identity and Calling
              </h3>
              <p className="mb-4">
                The story behind "Prayer Rock" and "Shame to Flame" is a journey through deep grief, loss, and the struggle to understand who I am. After losing close family members and enduring years of hardship—including adoption, family separation, and caring for a controlling parent—I was left with a profound sense of confusion about my identity and place in the world.
              </p>
              <p className="mb-4">
                Family, which should have been a source of belonging, often left me feeling even more lost. The pain of separation, tragedy, and rejection made me question who I truly was and where I belonged. My search for answers led me through many difficult seasons, but it was in these moments of brokenness that I discovered something life-changing.
              </p>
              <p className="mb-4">
                In a quiet spot among the trees in Helena Valley, kneeling at what I called "prayer rock," I found hope and clarity through prayer and faith in Christ. Here, I realized that my true identity is not defined by family history, loss, or the opinions of others, but by God's love and purpose for me. Embracing my identity in Christ brought me peace, contentment, and a renewed sense of calling—a calling to help others who are struggling with shame, confusion, or a sense of not belonging.
              </p>
              <div className="bg-flame-50 dark:bg-flame-900/30 rounded-lg p-4 border-l-4 border-flame-400 mt-6">
                <p className="font-medium text-flame-800 dark:text-flame-200 mb-2">
                  "Shame to Flame" exists to share this message:
                </p>
                <p className="italic text-flame-700 dark:text-flame-300">
                  No matter your past or pain, you can find a new identity, purpose, and hope in Christ. You are not alone on this journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === 'blog'
                    ? 'bg-flame-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400'
                }`}
              >
                Brian's Reflections
              </button>
              <button
                onClick={() => setActiveTab('prayers')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === 'prayers'
                    ? 'bg-flame-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400'
                }`}
              >
                Prayer Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {activeTab === 'blog' ? (
        <>
          {/* Featured Blog Posts */}
          <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
                Featured Reflections
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-white/20 dark:border-gray-700/50">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      
                      <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3 hover:text-flame-600 dark:hover:text-flame-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <Link
                          href={`/prayer-rock/blog/${post.id}`}
                          className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium flex items-center group"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Filters and Search */}
          <section className="py-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {blogCategories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category.value
                            ? 'bg-flame-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-flame-100 dark:hover:bg-flame-900/30 hover:text-flame-600 dark:hover:text-flame-400'
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reflections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* All Blog Posts */}
          <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
                All Reflections
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-white/20 dark:border-gray-700/50">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}m</span>
                        </div>
                      </div>
                      
                      <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-flame-600 dark:hover:text-flame-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span>{formatDate(post.publishDate)}</span>
                        <span>by {post.author}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/prayer-rock/blog/${post.id}`}
                        className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium text-sm flex items-center group"
                      >
                        Read Full Reflection
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    No reflections found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Featured Prayer */}
          <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 dark:border-gray-700/50">
                <div className="text-center mb-6">
                  <Heart className="h-12 w-12 text-flame-500 mx-auto mb-4" />
                  <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white">Prayer of the Week</h2>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                  <h3 className="font-serif text-2xl font-semibold text-flame-700 dark:text-flame-300 mb-4 text-center">
                    A Prayer for Those Carrying Shame
                  </h3>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic mb-4">
                      "Heavenly Father, I come before You carrying the weight of shame that feels too heavy for my heart. 
                      I have believed lies about my worth, my past, and my future. Today, I choose to believe Your truth instead.
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic mb-4">
                      You see me not as I see myself, but as Your beloved child. You remember my sins no more, 
                      and You have plans to give me hope and a future. Help me to release the shame that binds me 
                      and embrace the identity You have given me in Christ.
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic mb-4">
                      Transform my pain into purpose, my wounds into wisdom, and my shame into a flame that lights the way for others. 
                      I trust in Your unfailing love and Your power to make all things new.
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic text-center">
                      In Jesus' precious name, Amen."
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-6">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Based on Isaiah 61:3, Jeremiah 29:11, and 2 Corinthians 5:17
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prayer Categories */}
          <section className="py-16 bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
                Prayer Collections
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {prayerCategories.map((category, index) => (
                  <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer border border-white/20 dark:border-gray-700/50">
                    <div className={`h-32 bg-gradient-to-br ${getColorClasses(category.color)} flex items-center justify-center`}>
                      <category.icon className="h-12 w-12 text-white" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-flame-600 dark:group-hover:text-flame-400 transition-colors duration-200">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{category.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{category.count} prayers</span>
                        <ArrowRight className="h-4 w-4 text-flame-500 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Answered Prayers / Testimonies */}
          <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
                Answered Prayers & Testimonies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonies.map((testimony, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 dark:border-gray-700/50">
                    <div className="mb-4">
                      <span className="inline-block bg-flame-100 dark:bg-flame-900/30 text-flame-700 dark:text-flame-300 text-xs font-medium px-3 py-1 rounded-full">
                        {testimony.category}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3">
                      {testimony.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic">
                      "{testimony.excerpt}"
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>- {testimony.author}</span>
                      <span>{testimony.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button className="bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  Read More Testimonies
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Submit Prayer Request */}
      <section className="py-16 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Submit a Prayer Request
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe in the power of prayer and would be honored to pray for you. 
                Share your request below, and our prayer team will lift you up in prayer.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name (optional)
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="How can we address you in prayer?"
                  />
                </div>
                
                <div>
                  <label htmlFor="prayerType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prayer Category
                  </label>
                  <select
                    id="prayerType"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    <option value="healing">Physical/Emotional Healing</option>
                    <option value="relationships">Relationships & Family</option>
                    <option value="addiction">Addiction Recovery</option>
                    <option value="grief">Grief & Loss</option>
                    <option value="spiritual">Spiritual Growth</option>
                    <option value="breakthrough">Breakthrough Needed</option>
                    <option value="gratitude">Thanksgiving & Praise</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Prayer Request
                </label>
                <textarea
                  id="prayerRequest"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Share your heart with us. We'll pray with you and for you."
                ></textarea>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="publicShare"
                  className="mt-1 h-4 w-4 text-flame-600 focus:ring-flame-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="publicShare" className="text-sm text-gray-600 dark:text-gray-300">
                  I'm comfortable with this prayer request being shared anonymously with the community for prayer support
                </label>
              </div>
              
              <div className="bg-sky-50/90 dark:bg-sky-900/30 backdrop-blur-sm rounded-lg p-4 border border-sky-200/50 dark:border-sky-700/50">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Privacy Note:</strong> Your prayer request will be treated with utmost confidentiality. 
                  Only our prayer team will see your request unless you opt to share it with the community.
                </p>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Submit Prayer Request
                  <Heart className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            The Power of Prayer in Our Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-flame-400 mb-2">500+</div>
              <p className="text-gray-300">Prayer Requests</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">1,200+</div>
              <p className="text-gray-300">Prayers Offered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sage-400 mb-2">150+</div>
              <p className="text-gray-300">Answered Prayers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <p className="text-gray-300">Reflections Shared</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Every prayer offered, every testimony shared, and every reflection written reminds us that 
              God is still in the business of transformation. Your story could be the next one that 
              brings hope to someone who needs it most.
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-sky-600 dark:text-sky-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Built on God's Promises
          </h2>
          
          <div className="space-y-6">
            <blockquote className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "And pray in the Spirit on all occasions with all kinds of prayers and requests. 
                With this in mind, be alert and always keep on praying for all the Lord's people."
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-medium">Ephesians 6:18</cite>
            </blockquote>
            
            <blockquote className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <p className="font-serif text-xl text-gray-700 dark:text-gray-200 italic mb-3">
                "Therefore confess your sins to each other and pray for each other so that you may be healed. 
                The prayer of a righteous person is powerful and effective."
              </p>
              <cite className="text-flame-600 dark:text-flame-400 font-medium">James 5:16</cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrayerRock;